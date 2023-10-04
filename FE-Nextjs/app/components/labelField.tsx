import React from "react";
import { LabelFieldProps } from "../utils/iProps";

const LabelField: React.FC<LabelFieldProps> = ({ htmlFor, name }) => {
  return (
    <label htmlFor={htmlFor} className="form-label">{name}</label>
  );
};
export default LabelField;