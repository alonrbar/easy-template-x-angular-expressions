export function isNumber(value: unknown): value is number {
    return Number.isFinite(value);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(value: unknown): value is object {
    return value !== null && value !== undefined && typeof value === 'object';
}

/**
 * Naive string escaping.
 */
export function strEscape(str: string): string {
    return str.replace(/\"/g, '\\"');
}
