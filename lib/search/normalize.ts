/** Lower-case, accent-free form used for both indexing and querying: "Effiloché" → "effiloche". */
export function fold(text: string): string {
  return text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Same tokenizer for index and query: splits on whitespace and punctuation (keeps `esp32`, `i2s_audio` parts). */
export function tokenize(text: string): string[] {
  return text.split(/[\s\p{P}\p{S}]+/u).filter(Boolean);
}

export type Highlighted = { text: string; match: boolean }[];

/**
 * Splits `text` into plain and matched parts. A word matches when its folded form starts with
 * one of the folded `terms` (prefix search) — positions map 1:1 because folding is done per character.
 */
export function highlight(text: string, terms: readonly string[]): Highlighted {
  const wanted = terms.map(fold).filter((term) => term.length > 0);
  if (wanted.length === 0 || !text) return [{ text, match: false }];
  const parts: Highlighted = [];
  const word = /[\p{L}\p{N}_]+/gu;
  let last = 0;
  for (const found of text.matchAll(word)) {
    const value = found[0];
    const start = found.index ?? 0;
    const folded = fold(value);
    const term = wanted.find((candidate) => folded.startsWith(candidate) || (candidate.length >= 4 && folded.includes(candidate)));
    if (!term) continue;
    // Highlight just the matched part when folding kept the length (it does for precomposed Latin text).
    const sameLength = folded.length === value.length;
    const offset = sameLength ? folded.indexOf(term) : 0;
    const length = sameLength ? term.length : value.length;
    if (start + offset > last) parts.push({ text: text.slice(last, start + offset), match: false });
    parts.push({ text: value.slice(offset, offset + length), match: true });
    last = start + offset + length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), match: false });
  return parts;
}

/** A ~`size`-character window of `text` around the first word matching `terms`, with ellipses. */
export function snippet(text: string, terms: readonly string[], size = 140): string {
  if (!text) return '';
  const folded = fold(text);
  const wanted = terms.map(fold).filter((term) => term.length > 1);
  let at = -1;
  for (const term of wanted) {
    const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'u');
    const found = pattern.exec(folded);
    if (found) {
      const index = found.index + found[1]!.length;
      if (at === -1 || index < at) at = index;
    }
  }
  if (at === -1) return text.length > size ? `${text.slice(0, size).replace(/\s+\S*$/, '')}…` : text;
  let start = Math.max(0, at - Math.floor(size / 3));
  if (start > 0) {
    const space = text.indexOf(' ', start);
    start = space !== -1 && space < at ? space + 1 : start;
  }
  let end = Math.min(text.length, start + size);
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end);
    end = space > at ? space : end;
  }
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}
