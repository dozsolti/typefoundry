declare const TYPE_FOUNDRY_REF: unique symbol;

export type RefMarker<FieldName extends PropertyKey> = {
  [TYPE_FOUNDRY_REF]: true;
  fieldName: FieldName;
};

// Recursively swaps RefMarker placeholders for the matching field on Self.
export type ResolveRefs<V, Self> =
  V extends RefMarker<infer FieldName>
    ? FieldName extends keyof Self
      ? Self[FieldName]
      : never
    : V extends (...args: infer Args) => infer Return
      ? (
          ...args: { [I in keyof Args]: ResolveRefs<Args[I], Self> }
        ) => ResolveRefs<Return, Self>
      : V extends readonly unknown[]
        ? { [I in keyof V]: ResolveRefs<V[I], Self> }
        : V extends object
          ? { [K in keyof V]: ResolveRefs<V[K], Self> }
          : V;
