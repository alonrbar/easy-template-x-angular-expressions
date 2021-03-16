import { ScopeData, ScopeDataArgs, ScopeDataResolver } from 'easy-template-x';
import { ResolverOptions } from './resolverOptions';
import { isNumber, isObject } from './utils';
const expressions = require('angular-expressions');

export function createResolver(options?: ResolverOptions): ScopeDataResolver {
    options = new ResolverOptions(options);
    const fallback = options.defaultFallback ? ScopeData.defaultResolver : undefinedResolver;

    return (args: ScopeDataArgs) => {

        // Fallback on empty paths.
        if (!args.path.length) {
            return fallback(args);
        }

        // Fallback on number paths.
        const lastPart = args.path[args.path.length - 1];
        if (isNumber(lastPart)) {
            return fallback(args);
        }

        // Check required prefix.
        let exp = (lastPart?.name || "").trim();
        if (options.requiredPrefix && !exp.startsWith(options.requiredPrefix)) {
            return fallback(args);
        }
        if (options.requiredPrefix) {
            exp = exp.substr(options.requiredPrefix.length);
        }

        // Flatten the scope.
        const finalScope = Object.assign({}, args.data);
        let curScop: any = finalScope;
        for (const part of args.strPath) {
            // Parts with the required prefix are skipped.
            if (options.requiredPrefix && exp.startsWith(options.requiredPrefix)) {
                continue;
            }
            // If it's not an object don't go deeper.
            curScop = curScop[part];
            if (!isObject(curScop)) {
                break;
            }
            Object.assign(finalScope, curScop);
        }

        // Resolve the expression.
        return expressions.compile(exp)(finalScope);
    };
}

const undefinedResolver: ScopeDataResolver = () => {
    return undefined;
};
