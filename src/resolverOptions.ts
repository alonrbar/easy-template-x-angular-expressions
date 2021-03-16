export class ResolverOptions {
    /**
     * If set to a non-empty string the resolver will require the tag name to
     * have this prefix (ignoring leading whitespace).
     *
     * Default: "$"
     */
    public requiredPrefix?: string | false = "$";
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
    constructor(initial?: Partial<ResolverOptions>) {
        Object.assign(this, initial);
        if (this.requiredPrefix && this.requiredPrefix.trim() != this.requiredPrefix) {
            throw new Error("requirePrefix cannot contain leading or trailing whitespace");
        }
    }
}
