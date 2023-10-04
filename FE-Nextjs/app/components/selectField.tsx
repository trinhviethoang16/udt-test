import React from "react";
import { Shape } from "../utils/enum";
import { SelectFieldProps } from "../utils/iProps";

const SelectField: React.FC<SelectFieldProps> = ({ name, id, value, onChange }) => {
  return (
    <select name={name} id={id} className="form-select" value={value} onChange={onChange}>
      <option value="">Choose shape</option>
      <option value={Shape.PERFECT_TRIANGLE}>Perfect Triangle</option>
      <option value={Shape.DIAMOND}>Diamond</option>
      <option value={Shape.RECTANGLE}>Rectangle</option>
    </select>
  );
};
export default SelectField;
