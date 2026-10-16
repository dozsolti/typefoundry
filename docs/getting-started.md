# Getting started

TypeFoundry helps you build TypeScript types for APIs with multiple states.
It generates a discriminated union from the variants you define.

## Install

```bash
npm install typefoundry
```

TypeFoundry provides types only. It does not add runtime code or validate
values.

## Define your first type

Import `TypeFoundry` as a type and describe the available options:

```ts
import type { TypeFoundry } from "typefoundry";

type ButtonProps = TypeFoundry<{
  variants: {
    size: {
      small: { padding: 4 };
      large: { padding: 12 };
    };
  };
}>;
```

This is equivalent to:

```ts
type ButtonProps =
  | { size: "small"; padding: 4 }
  | { size: "large"; padding: 12 };
```

TypeScript can narrow the type based on the selected option:

```ts
function getPadding(props: ButtonProps) {
  if (props.size === "small") {
    return props.padding; // 4
  }

  return props.padding; // 12
}
```

## Next steps

- Read the [guide](/guide) to learn about common
  properties, extending types, and references.
- See the [API reference](/api-reference) for details on each exported type.
