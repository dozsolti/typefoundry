import React from "react";
import { type TypeFoundry, type TypeFoundryRef } from "typefoundry";

type SelectProps = TypeFoundry<{
  common: {
    label: string;
    options: {
      value: string;
      label: string;
    }[];
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
        onChange: (value: TypeFoundryRef<SelectProps, "value">) => void;
      };

      uncontrolled: {
        defaultValue?: TypeFoundryRef<SelectProps, "value">;
      };
    };
  };
}>;

const Select: React.FC<SelectProps> = (props) => {
  const { options, label } = props;

  const onOptionSelected = (option: string) => {
    if (props.control !== "controlled") return;
    if (props.selectionMode === "single") {
      props.onChange(option);
    } else {
      props.onChange([option]);
    }
  };

  return (
    <>
      <p>{label}</p>
      <select onChange={(e) => onOptionSelected(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
