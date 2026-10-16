# API reference

TypeFoundry exports two type-only utilities from its package entry point.
Neither utility adds a runtime function or value.

## `TypeFoundry`

Builds a discriminated union from a variant model and optional shared or
inherited properties.

```ts
type TypeFoundry<
  T extends {
    variants: Variant;
    common?: Common;
    extends?: Extends;
  }
>
```

### Model fields

| Field      | Required | Purpose                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------- |
| `variants` | Yes      | Maps each discriminant key to its options. Each option maps to the properties it contributes. |
| `common`   | No       | Adds properties to every union member.                                                        |
| `extends`  | No       | Adds properties from an existing object type before variant-specific overrides.               |

For a complete walkthrough of the output and precedence rules, see
[Guide](/guide).

## `TypeFoundryRef`

Marks a property type to be replaced with the type of another property in the
same generated union member:

```ts
type TypeFoundryRef<T, FieldName extends keyof T>
```

Use it in a property type within the model, commonly in a callback parameter
or a default value:

```ts
type Props = TypeFoundry<{
  variants: {
    selectionMode: {
      single: { value: string };
      multiple: { value: string[] };
    };
    control: {
      controlled: {
        onChange: (value: TypeFoundryRef<Props, "value">) => void;
      };
      uncontrolled: {
        defaultValue: TypeFoundryRef<Props, "value">;
      };
    };
  };
}>;
```

The resolved reference depends on the current union member, so the callback
parameter and default value become `string` in the `"single"` branch and
`string[]` in the `"multiple"` branch.

`FieldName` is constrained to keys of `T`. If the referenced key does not
exist on a particular generated member, the reference resolves to `never` for
that member.

## Type-only usage

Import the utilities with `import type` when using them only to declare types:

```ts
import type { TypeFoundry, TypeFoundryRef } from "typefoundry";
```

TypeFoundry does not provide runtime parsing, validation, or default values.
Add a runtime validation library when values from an untrusted source must be
checked.
