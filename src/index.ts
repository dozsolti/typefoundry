import type { Common, Extends, Variant } from "./types";
import { VariantCompiler } from "./utils/variants";
import { RefMarker, ResolveRefs } from "./utils/ref";

type Flatten<T> = {
  [K in keyof T]: T[K];
} & {};

type ResolveAllRefs<U> = U extends unknown ? Flatten<ResolveRefs<U, U>> : never;

export type TypeFoundry<
  T extends {
    variants: Variant;
    common?: Common;
    extends?: Extends;
  },
  Variants = VariantCompiler<T["variants"]>,
> = ResolveAllRefs<
  Flatten<
    Omit<T["extends"], keyof Variants | keyof T["common"]> &
      Omit<T["common"], keyof Variants> &
      Variants
  >
>;

export type TypeFoundryRef<T, FieldName extends keyof T> = RefMarker<FieldName>;
