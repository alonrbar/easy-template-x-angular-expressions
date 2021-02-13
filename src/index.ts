import { PathPart, ScopeDataResolver, TemplateData } from 'easy-template-x';
const expressions = require('angular-expressions');

export const resolver: ScopeDataResolver = (path: PathPart[], data: TemplateData) => {
    // Ignore empty paths.
    if (!path.length) {
        return undefined;
    }

    // Ignore number paths.
    const lastPart = path[path.length - 1];
    if (isNumber(lastPart)) {
        return undefined;
    }

    // This resolver only handles expression that begins with $.
    let exp = lastPart?.name;
    if (!exp || !exp.startsWith("$")) {
        return undefined;
    }

    // Resolve the expression.
    exp = exp.substr(1);
    return expressions.compile(exp)(data);
};

function isNumber(value: unknown): value is number {
    return Number.isFinite(value);
}
