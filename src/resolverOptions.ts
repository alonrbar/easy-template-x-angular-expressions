import { defaultPathFilter, PathFilter } from './pathFilter';
import { IMap } from './types';

export type AngularFilter = (value: any) => any;

export class ResolverOptions {
    /**
     * If set to a non-empty string the resolver will require the tag name to
     * have this prefix (ignoring leading whitespace).
     *
     * Default: false
     */
    public requiredPrefix?: string | false = false;
    /**
     * The path filter is used to determine which path parts to consider when
     * traversing the data object to construct the expression scope. Path parts
     * that returns `false` are skipped and the traversal moves to the next
     * part.
     */
    public pathFilter?: PathFilter = defaultPathFilter;
    /**
     * Setting this option to `true` instructs the resolver to fallback to the default `easy-template-x` data resolver.
     * Setting it to `false` will return `undefined` instead.
     *
     * The fallback is used in the following cases:
     *
     *   1. Empty path.
     *   2. Numeric path parts (loop iteration index).
     *   3. When the `requiredPrefix` is specified and the tag name does not meet the requirement.
     *
     * Default: true
     */
    public defaultFallback?= true;
    /**
     * Map of Angular filters.
     *
     * **Notice**: The filters are global. That is, filters of one Resolver may
     * override filters of another Resolver.
     */
    public angularFilters?: IMap<AngularFilter> = {};

    constructor(initial?: Partial<ResolverOptions>) {
        Object.assign(this, initial);
        if (this.requiredPrefix && this.requiredPrefix.trim() != this.requiredPrefix) {
            throw new Error("requirePrefix cannot contain leading or trailing whitespace");
        }
    }
}
