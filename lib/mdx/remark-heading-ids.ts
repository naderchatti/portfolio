import type { Heading, Root, RootContent, PhrasingContent } from 'mdast';
import { visit } from 'unist-util-visit';

export type TocEntry = { id: string; text: string };

/** URL-safe, accent-free id: "Flashing & config" → "flashing-config", "Câblage" → "cablage". */
export function slugify(text: string): string {
  return (
    text
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
}

function plainText(node: RootContent | PhrasingContent): string {
  if ('value' in node && typeof node.value === 'string') return node.value;
  if ('children' in node) return (node.children as PhrasingContent[]).map(plainText).join('');
  return '';
}

/**
 * Gives every `##` / `###` an id (deduplicated) and records the `##` headings in `toc`,
 * which the post page renders as “On this page”.
 */
export function remarkHeadingIds(options: { toc: TocEntry[]; reserved?: string[] }) {
  return (tree: Root) => {
    const seen = new Map<string, number>((options.reserved ?? []).map((id) => [id, 1]));
    visit(tree, 'heading', (node: Heading) => {
      if (node.depth < 2 || node.depth > 3) return;
      const text = node.children.map(plainText).join('').trim();
      const base = slugify(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      if (node.depth === 2) options.toc.push({ id, text });
    });
  };
}
