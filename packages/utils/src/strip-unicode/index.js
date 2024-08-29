/**
 * Removes all unicode characters from a string.
 * Used primarily for sanitizing screenreader-only text.
 */
export function stripUnicode(text) {
    return text.replace(/[\u{0080}-\u{FFFF}]/gu, '');
}
