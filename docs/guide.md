# Guide

TypeFoundry builds TypeScript unions from variant options. Define the options
and their properties; it generates every combination.

> It only affects types. It creates no JavaScript and does not validate values at runtime.

## Basic variants

Pass a `variants` object to `TypeFoundry`. Each top-level key names a
discriminant. Its nested keys are the available options:

```ts
import type { TypeFoundry } from "typefoundry";

type ButtonProps = TypeFoundry<{
  variants: {
    size: {
      small: {};
      large: {};
    };
  };
}>;
```

This produces:

```ts
type ButtonProps = { size: "small" } | { size: "large" };
```

## Properties attached to an option

Define option-specific properties inside that option. They appear only in
that option's union member:

```ts
type SelectionProps = TypeFoundry<{
  variants: {
    selectionMode: {
      single: {
        value: string;
      };
      multiple: {
        value: string[];
      };
    };
  };
}>;
```

This compiles to:

```ts
type SelectionProps =
  | { selectionMode: "single"; value: string }
  | { selectionMode: "multiple"; value: string[] };
```

Checking `selectionMode` narrows `value` too:

```ts
function getSelection(props: SelectionProps) {
  if (props.selectionMode === "single") {
    return props.value; // string
  }

  return props.value; // string[]
}
```

## Common properties

Use `common` for properties included in every variant:

```ts
type LabeledSelectionProps = TypeFoundry<{
  common: {
    label: string;
  };
  variants: {
    size: {
      small: {};
      large: {};
    };
  };
}>;
```

Both members include `label: string`:

```ts
type LabeledSelectionProps =
  | { size: "small"; label: string }
  | { size: "large"; label: string };
```

Optional properties stay optional.

## Combining independent variants

Each top-level key in `variants` is a separate dimension. TypeFoundry combines
all options across dimensions:

```ts
type SelectProps = TypeFoundry<{
  variants: {
    selectionMode: {
      single: { value: string };
      multiple: { value: string[] };
    };
    control: {
      controlled: { onChange: unknown };
      uncontrolled: { defaultValue: unknown };
    };
  };
}>;
```

This example has two choices for each dimension, so it produces four members:

```ts
type SelectProps =
  | {
      selectionMode: "single";
      value: string;
      control: "controlled";
      onChange: unknown;
    }
  | {
      selectionMode: "single";
      value: string;
      control: "uncontrolled";
      defaultValue: unknown;
    }
  | {
      selectionMode: "multiple";
      value: string[];
      control: "controlled";
      onChange: unknown;
    }
  | {
      selectionMode: "multiple";
      value: string[];
      control: "uncontrolled";
      defaultValue: unknown;
    };
```

Each option keeps its own properties in every combination. The total number
of members is the product of the option counts. See
[references](#referencing) for how to link property types across options.

## Extending an existing type

Use `extends` to include properties from an existing type:

```ts
type ExistingProps = {
  disabled?: boolean;
  label: string;
  value: string | string[];
};

type SelectionProps = TypeFoundry<{
  extends: ExistingProps;
  variants: {
    selectionMode: {
      single: { value: string };
      multiple: { value: string[] };
    };
  };
}>;
```

The variant's `value` type replaces the broader type from `ExistingProps`:

```ts
type SelectionProps =
  | {
      disabled?: boolean;
      label: string;
      value: string;
      selectionMode: "single";
    }
  | {
      disabled?: boolean;
      label: string;
      value: string[];
      selectionMode: "multiple";
    };
```

This lets you reuse an existing type and narrow its properties for each
variant.

## Referencing

Use `TypeFoundryRef` when one property must match another property in the same
union member. For example, a callback argument can match `value` even when
its type changes by variant:

```ts
import type { TypeFoundry, TypeFoundryRef } from "typefoundry";

type SelectProps = TypeFoundry<{
  variants: {
    selectionMode: {
      single: { value: string };
      multiple: { value: string[] };
    };
    control: {
      controlled: {
        onChange: (value: TypeFoundryRef<SelectProps, "value">) => void;
      };
      uncontrolled: {
        defaultValue: TypeFoundryRef<SelectProps, "value">;
      };
    };
  };
}>;
```

TypeFoundry resolves the reference for each branch. The callback and default
value then match `value` for the selected `selectionMode`:

```ts
type SelectProps =
  | {
      selectionMode: "single";
      value: string;
      control: "controlled";
      onChange: (value: string) => void;
    }
  | {
      selectionMode: "single";
      value: string;
      control: "uncontrolled";
      defaultValue: string;
    }
  | {
      selectionMode: "multiple";
      value: string[];
      control: "controlled";
      onChange: (value: string[]) => void;
    }
  | {
      selectionMode: "multiple";
      value: string[];
      control: "uncontrolled";
      defaultValue: string[];
    };
```

References only affect types; they do not look up values at runtime. If a
referenced property is missing from a union member, its type is `never`.

## Precedence when keys overlap

If a key appears in multiple sections, the more specific section wins:

1. Variant properties override properties in `common` and `extends`.
2. `common` overrides properties in `extends`.

In this example, the variant defines `value` while `common` and `extends`
also define overlapping keys:

```ts
type Props = TypeFoundry<{
  extends: {
    label: string;
    value: string | string[];
  };
  common: {
    label: number;
  };
  variants: {
    selectionMode: {
      single: { value: string };
    };
  };
}>;
```

The result uses `label: number` from `common` and `value: string` from the
variant:

```ts
type Props = {
  label: number;
  selectionMode: "single";
  value: string;
};
```

Variant keys also win over conflicting keys in `common`. For example, a
`size` variant produces `"small" | "large"` for `size`.

## Empty variants

`variants` must contain at least one dimension. An empty object resolves to
`never`:

```ts
type NoCases = TypeFoundry<{
  variants: {};
}>; // never
```

## When to use TypeFoundry

Use TypeFoundry when an API has several states and a property's type depends
on the selected state. For a simple object, use a regular TypeScript type.
TypeFoundry does not validate runtime data; use a validator for untrusted
input.
