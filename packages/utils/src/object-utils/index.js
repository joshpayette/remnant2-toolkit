/**
 * Groups members of an iterable according to the return value of the passed callback.
 * Prefer over Object.groupBy due to browser compatibility issues.
 * @param items An iterable.
 * @param keySelector A callback which will be invoked for each item in items.
 * @see https://caniuse.com/?search=object.groupby
 */
export function groupBy(items, keySelector) {
    const result = {};
    Array.from(items).forEach((item, index) => {
        const key = keySelector(item, index);
        if (!result[key]) {
            result[key] = [];
        }
        result[key]?.push(item);
    });
    return result;
}
