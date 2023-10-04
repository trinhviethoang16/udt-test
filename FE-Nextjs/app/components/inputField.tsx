import React from "react";
import { InputFieldProps } from "../utils/iProps";

const InputField: React.FC<InputFieldProps> = ({ id, name, placeholder, onChange }) => {
  return (
    <input type="text" className="form-control" id={id} name={name} placeholder={placeholder} onChange={onChange}/>
  );
};
export default InputField;
