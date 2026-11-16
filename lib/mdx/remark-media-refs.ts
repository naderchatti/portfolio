import type { Image, Paragraph, Root } from 'mdast';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import { visit, SKIP } from 'unist-util-visit';

const REF = /^(media|diagram):([a-z0-9-]+)$/;

export type MediaRef = { kind: 'media' | 'diagram'; name: string; alt: string };

/** Every `![alt](media:x)` / `![alt](diagram:x)` ref in a Markdown body. */
export function extractRefs(source: string): MediaRef[] {
  const refs: MediaRef[] = [];
  for (const match of source.matchAll(/!\[([^\]]*)\]\((media|diagram):([a-z0-9-]+)\)/g)) {
    refs.push({ alt: match[1] ?? '', kind: match[2] as MediaRef['kind'], name: match[3] ?? '' });
  }
  return refs;
}

function attr(name: string, value: string): MdxJsxAttribute {
  return { type: 'mdxJsxAttribute', name, value };
}

function onlyImage(paragraph: Paragraph): Image | undefined {
  const children = paragraph.children.filter((child) => !(child.type === 'text' && child.value.trim() === ''));
  const [first] = children;
  return children.length === 1 && first?.type === 'image' ? first : undefined;
}

/**
 * Turns block-level image refs into components:
 * `![alt](media:name)` → `<Figure name alt />`, `![alt](diagram:slug)` → `<WiringDiagram slug alt />`.
 * Unknown names are left for `pnpm check:content` to report; the components render a fallback.
 */
export function remarkMediaRefs() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const image = onlyImage(node);
      const match = image ? REF.exec(image.url) : null;
      if (!image || !match) return;
      const [, kind, name = ''] = match;
      const element: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: kind === 'media' ? 'Figure' : 'WiringDiagram',
        attributes: [attr(kind === 'media' ? 'name' : 'slug', name), attr('alt', image.alt ?? '')],
        children: [],
      };
      parent.children.splice(index, 1, element);
      return [SKIP, index + 1];
    });
  };
}
