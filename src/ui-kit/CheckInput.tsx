import React from "react";
import { ICheckInputProps } from "./props.inteface";
import Styles from "./CheckInput.module.scss";

const TextInput : React.FC<ICheckInputProps> = ({
  name,
  onChange = () => {
    // do nothing.
  },
  label = "label",
  value = "value",
  checked = false,
}: ICheckInputProps) => {
  return (
    <div
      className={Styles.container}
      onClick={() => {
        onChange(value);
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <span className={Styles.label}>{label}</span>
    </div>
  );
};
export default TextInput;
