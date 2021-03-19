import { ScopeData, ScopeDataArgs, ScopeDataResolver, TemplateContent, TemplateData } from 'easy-template-x';
import { ResolverOptions } from './resolverOptions';
import { isNumber, isObject } from './utils';
const expressions = require('angular-expressions');

const undefinedResolver: ScopeDataResolver = () => undefined;

export class AngularResolver {

    private readonly options: ResolverOptions;
    private readonly fallback: ScopeDataResolver;

    constructor(options? : ResolverOptions) {
        this.options = new ResolverOptions(options);
        this.fallback = this.options.defaultFallback ? ScopeData.defaultResolver : undefinedResolver;
    }

    public resolve(args: ScopeDataArgs): TemplateContent | TemplateData[] {

        // Fallback on empty paths.
        if (!args.path.length) {
            return this.fallback(args);
        }

        // Fallback on number paths.
        const lastPart = args.path[args.path.length - 1];
        if (isNumber(lastPart)) {
            return this.fallback(args);
        }

        // Check required prefix.
        let exp = (lastPart?.name || "").trim();
        if (this.options.requiredPrefix && !exp.startsWith(this.options.requiredPrefix)) {
            return this.fallback(args);
        }
        if (this.options.requiredPrefix) {
            exp = exp.substr(this.options.requiredPrefix.length);
        }

        // Flatten the scope.
        const finalScope = Object.assign({}, args.data);
        let curScop: any = finalScope;
        for (const part of args.strPath) {
            // Parts with the required prefix are skipped.
            if (this.options.requiredPrefix && exp.startsWith(this.options.requiredPrefix)) {
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
    }
}
