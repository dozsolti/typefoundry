---
layout: home

hero:
  name: "TypeFoundry"
  tagline: Build complex TypeScript types with variants instead of manual unions.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: API reference
      link: /api-reference

features:
  - title: Compose variant
    details: Describe variant and their properties; it combines every valid choice into a discriminated union.
  - title: Refine existing types
    details: Add common properties and extend existing object types while letting variant-specific types take precedence.
---

```bash
npm install typefoundry
```

TypeFoundry is a **compile-time TypeScript utility** for APIs whose property
types change with their configuration. It generates types only; it does not
create runtime values or validate input.

## Basic usage

A simple variant model:

```ts
type ButtonProps = TypeFoundry<{
  variants: {
    size: {
      small: {
        padding: 4;
      };

      large: {
        padding: 12;
      };
    };
  };
}>;
```

Compiles to:

```ts
type ButtonProps =
  | { size: "small"; padding: 4 }
  | { size: "large"; padding: 12 };
```

## Advanced usage

<table>
  <tr>
      <th scope="col">You describe the model</th>
      <th scope="col">TypeFoundry generates the combinations for you</th>
    </tr>
  <tr>
    <td valign="top">
    
```ts
type SelectProp = TypeFoundry<{
  variants: {
    selectionMode: {
      single: {
        value: string;
      };
      multiple: {
        value: string[];
      };
    };

    control: {
      controlled: {
        onChange: (value: TypeFoundryRef<SelectProp, "value">) => void;
      };
      uncontrolled: {
        defaultValue: TypeFoundryRef<SelectProp, "value">;
      };
    };

};
}>;

````

</td>

<td valign="top">

```ts
type SelectProp =
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
      onChange: (value: string[]) => void; // <- same as value
    }
  | {
      selectionMode: "multiple";
      value: string[];
      control: "uncontrolled";
      defaultValue: string[]; // <- same as value
    };
````

</td>

  </tr>
</table>

## Who should use TypeFoundry?

- **React component library authors** — Model complex component props with multiple variants and correlated types.
- **Design system maintainers** — Keep component APIs consistent as variants and configuration options grow.
- **Headless UI library authors** — Represent complex component behavior with precise, type-safe APIs.
- **TypeScript library authors** — Define APIs where the type of one property depends on another.
- **Developers building configurable APIs** — Model valid combinations of options without manually maintaining large unions.
- **Maintainers of complex configuration types** — Express constraints between configuration options and eliminate invalid combinations.
- **Developers building state-dependent APIs** — Represent different states and their associated properties in the type system.

TypeFoundry is most useful when an API has multiple variants, relationships between properties, and enough possible combinations that manually maintaining discriminated unions becomes difficult.

## When TypeFoundry may not be necessary

You probably don't need TypeFoundry for simple APIs.

If your component only has a couple of independent props:

```ts
type ButtonProps = {
  label: string;
  disabled?: boolean;
  // ...
};
```

normal TypeScript is already excellent.
