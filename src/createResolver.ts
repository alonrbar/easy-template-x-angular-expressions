import { ResolverOptions } from './resolverOptions';
import type { ScopeDataResolver } from 'easy-template-x';
import { AngularResolver } from './resolver';

export function createResolver(options?: ResolverOptions): ScopeDataResolver {
    const resolver = new AngularResolver(options);
    return resolver.resolve.bind(resolver);
}
