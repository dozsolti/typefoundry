# TypeFoundry

TypeFoundry is a type-level utility for building **correlated TypeScript types**.

It helps you describe an API as a set of independent variants and relationships, then generates the resulting union automatically.

Instead of manually maintaining large discriminated unions:

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

## Installation

```bash
npm install typefoundry
```

---

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

Produces the equivalent of:

```ts
type ButtonProps =
  | {
      size: "small";
      padding: 4;
    }
  | {
      size: "large";
      padding: 12;
    };
```

But three two-state variants produce eight possible states. TypeFoundry constructs the combinations while keeping their relationships intact.

See more examples in the [docs](./docs).

---

# Who should use TypeFoundry?

## Component library authors

If you're building reusable React components with combinations such as:

- controlled / uncontrolled
- single / multiple
- synchronous / asynchronous
- enabled / disabled
- editable / read-only
- virtualized / non-virtualized

TypeFoundry can keep those relationships represented in the type system.

Instead of maintaining dozens of union members manually, you define the dimensions and their relationships.

---

## Design system teams

Design systems often have APIs where one option changes the meaning or type of another option.

For example:

```text
variant
size
selection mode
interaction mode
loading mode
data source
```

As these dimensions grow, manually maintaining every valid combination becomes increasingly difficult.

TypeFoundry provides a single model from which those combinations are derived.

---

## Headless component authors

Headless libraries often expose highly configurable APIs where behavior changes depending on several independent options.

TypeFoundry is useful when those relationships need to be visible to consumers through TypeScript rather than documented only in prose.

---

## TypeScript library authors

You don't have to be building React components.

The same pattern can model any TypeScript API where:

> **the type of one property depends on the state of another property.**

Examples include:

- configuration objects
- client APIs
- state machines
- builder configuration
- plugin options
- protocol models
- strongly typed library options

---

# Why use TypeFoundry?

Chances are you don't, [see why](#when-typefoundry-may-not-be-necessary).

### Without TypeFoundry

Complex APIs often become manually maintained unions:

```ts
type Props = CaseA | CaseB | CaseC | CaseD | CaseE | CaseF;
// ...
```

Adding another independent dimension can multiply the number of cases you need to reason about.

### With TypeFoundry

You describe the dimensions:

```ts
variants: {
  selectionMode: { ... };
  control: { ... };
  searchable: { ... };
  creation: { ... };
}
```

and correlations where types need to stay synchronized:

```ts
Ref<"selectionMode", "value">;
```

The resulting type is generated from the model.

---

# TypeFoundry is not a runtime schema library

TypeFoundry focuses on **TypeScript API modeling**.

It does not try to replace runtime validation libraries.

You can continue using tools such as runtime validators alongside TypeFoundry when runtime validation is required.

Its job is to make the **static API contract** precise.

---

# When TypeFoundry may not be necessary

You probably don't need TypeFoundry for simple APIs.

If your component only has a couple of independent props:

```ts
type ButtonProps = {
  label: string;
  disabled?: boolean;
};
```

normal TypeScript is already excellent.

TypeFoundry becomes useful when your API starts accumulating **multiple correlated states and constraints**.

---
