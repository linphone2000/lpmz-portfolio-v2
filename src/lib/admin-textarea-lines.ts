/**
 * Parse a textarea value into lines for CMS state.
 * Does **not** drop blank lines — so Enter works while editing (unlike
 * `.filter(Boolean)` after split, which removes the line the user just added).
 * Trim each line only; callers can filter empties when saving or rendering.
 */
export function parseTextareaLines(value: string): string[] {
  return value.split('\n').map((line) => line.trim());
}

/**
 * Stack list: multiple lines, or a single comma-separated line (legacy / paste).
 */
export function parseStackOrCommaLines(value: string): string[] {
  const lines = parseTextareaLines(value);
  if (lines.length === 1 && lines[0].includes(',')) {
    return lines[0]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return lines;
}
