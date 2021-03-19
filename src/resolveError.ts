import { strEscape } from './utils';

export class ResolveError extends Error {

    constructor(
        public readonly expression: string,
        public readonly path: string[],
        public readonly innerError: Error
    ) {
        super(`Failed to resolve expression "${strEscape(expression)}" (path: ${printPath(path)}). Inner error: ${innerError?.message}.`);

        // typescript hack: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, ResolveError.prototype);
    }
}

function printPath(path: string[]): string {
    const strPath = (path || [])
        .map(p => `"${strEscape(p ?? '')}"`)
        .join(", ");
    return `[ ${strPath} ]`;
}
