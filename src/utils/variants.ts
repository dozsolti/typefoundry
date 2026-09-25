import { Variant } from "../types";

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type LastOf<U> =
  UnionToIntersection<U extends unknown ? () => U : never> extends () => infer R
    ? R
    : never;

type UnionToTuple<U, Last = LastOf<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type Cartesian<A, B> = A extends unknown
  ? B extends unknown
    ? A & B
    : never
  : never;

type VariantOptions<T extends Variant, VariantName extends keyof T> = {
  [VariantOptionName in keyof T[VariantName]]: {
    [P in VariantName]: VariantOptionName;
  } & {
    [Fields in keyof T[VariantName][VariantOptionName]]: T[VariantName][VariantOptionName][Fields];
  };
}[keyof T[VariantName]];

export type VariantCompiler<
  T extends Variant,
  Keys = UnionToTuple<keyof T>,
> = Keys extends [infer First, ...infer Rest]
  ? First extends keyof T
    ? Rest extends (keyof T)[]
      ? Rest extends []
        ? VariantOptions<T, First>
        : Cartesian<VariantOptions<T, First>, VariantCompiler<T, Rest>>
      : never
    : never
  : never;
