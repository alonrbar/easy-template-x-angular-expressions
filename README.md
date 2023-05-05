# easy-template-x-angular-expressions

Angular expressions support for [easy-template-x](https://github.com/alonrbar/easy-template-x).

## Usage

For basic usage and how to write `easy-template-x` templates please read the main package [docs](https://github.com/alonrbar/easy-template-x).

To enable [Angular](https://angular.io/) expressions support set the `scopeDataResolver` option of the handler.
You can also define custom filters, as seen below:

```typescript
import { TemplateHandler } from "easy-template-x"
import { createResolver } from "easy-template-x-angular-expressions"

const handler = new TemplateHandler({
    scopeDataResolver: createResolver({
        angularFilters: {
            upper: (input: string) => (input || "").toUpperCase(),
            lower: (input: string) => (input || "").toLowerCase()
        }
    })
});
```

You can then use templates like this one:

Input:

![input template](./docs/assets/main-example-in.png?raw=true)

Data:

```javascript
 {
    myLoop: [
        {
            casing: "upper",
            item: {
                name: "Bla"
            }
        },
        {
            casing: "lower",
            item: {
                name: "Some"
            }
        },
    ]
}
```

Output:

![output document](./docs/assets/main-example-out.png?raw=true)

## Resolver options

The resolver behavior is configurable, read more in the [options file](https://github.com/alonrbar/easy-template-x-angular-expressions/blob/master/src/resolverOptions.ts).
