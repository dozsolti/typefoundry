import { TypeFoundry } from "../src";
import type { Equal, Expect } from "./utils";

// #region Example 1: Basic usage with variants
type Example1 = TypeFoundry<{
  variants: {
    size: {
      small: {};
      large: {};
    };
  };
}>;
type Example1Compiled = { size: "small" } | { size: "large" };

export type testBasic = Expect<Equal<Example1, Example1Compiled>>;
// #endregion

// #region Example 2: Adding common properties to variants
type Example2 = TypeFoundry<{
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
type Example2Compiled =
  | { size: "small"; label: string }
  | { size: "large"; label: string };

export type testBasicCommon = Expect<Equal<Example2, Example2Compiled>>;
// #endregion

// #region Example 3: Variants with nested properties
type Example3 = TypeFoundry<{
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

type Example3Compiled =
  | {
      selectionMode: "single";
      value: string;
    }
  | {
      selectionMode: "multiple";
      value: string[];
    };

export type testBasicMultiple = Expect<Equal<Example3, Example3Compiled>>;
// #endregion

// #region Example 4: Combining multiple variants
type Example4 = TypeFoundry<{
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
        onChange: unknown;
      };

      uncontrolled: {
        defaultValue: unknown;
      };
    };
  };
}>;

type Example4Compiled =
  | {
      selectionMode: "single";
      control: "controlled";
      value: string;
      onChange: unknown;
    }
  | {
      selectionMode: "single";
      control: "uncontrolled";
      value: string;
      defaultValue: unknown;
    }
  | {
      selectionMode: "multiple";
      control: "controlled";
      value: string[];
      onChange: unknown;
    }
  | {
      selectionMode: "multiple";
      control: "uncontrolled";
      value: string[];
      defaultValue: unknown;
    };

export type testCombinedMultiVariants = Expect<
  Equal<Example4, Example4Compiled>
>;
//#endregion

//#region Example 5: Extending existing props with variants
type Example5ExistingProps = {
  disabled?: boolean;
  label: string;
  value: string | string[];
};

type Example5 = TypeFoundry<{
  extends: Example5ExistingProps;
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

type Example5Compiled =
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

export type testBasicExtends = Expect<Equal<Example5, Example5Compiled>>;
//#endregion

//#region Example Big
type Example6 = TypeFoundry<{
  common: {
    disabled?: boolean;
    placeholder?: string;
  };

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
        // depends on selectionMode
      };

      uncontrolled: {
        // depends on selectionMode
      };
    };

    searchable: {
      enabled: {
        searchValue?: string;
        onSearchChange?: (value: string) => void;
      };

      disabled: {};
    };
  };
}>;

// TODO:
//#endregion
