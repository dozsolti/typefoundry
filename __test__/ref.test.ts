import { TypeFoundry, TypeFoundryRef } from "../src";
import type { Equal, Expect } from "./utils";

// #region Example 1: Basic usage with variants
type Example1 = TypeFoundry<{
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
        onChange: (value: TypeFoundryRef<Example1, "value">) => void;
      };

      uncontrolled: {
        defaultValue: TypeFoundryRef<Example1, "value">;
      };
    };
  };
}>;
type Example1Compiled =
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

export type testBasic = Expect<Equal<Example1, Example1Compiled>>;
// #endregion
