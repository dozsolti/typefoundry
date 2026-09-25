import { TypeFoundry } from "../src";
import type { Equal, Expect } from "./utils";

// Test 1: empty variants object
type EmptyVariants = TypeFoundry<{
  variants: {};
}>;
export type testEmpty = Expect<Equal<EmptyVariants, never>>;

// Test 2: common/extends key collision
type CollideExtends = { label: string };

type Collide = TypeFoundry<{
  extends: CollideExtends;
  common: { label: number };
  variants: { size: { small: {} } };
}>;
type CollideCompiled = {
  label: number;
  size: "small";
};
export type testCollide = Expect<Equal<Collide, CollideCompiled>>;

// Test 3: variant key collides with common key (incompatible types)
type VariantCommonCollide = TypeFoundry<{
  common: { size: number };
  variants: { size: { small: {}; large: {} } };
}>;
type VariantCommonCollideCompiled = { size: "small" } | { size: "large" };

// should be never or should be the new tpe?
export type testVariantCommonCollide = Expect<
  Equal<VariantCommonCollide, VariantCommonCollideCompiled>
>;
