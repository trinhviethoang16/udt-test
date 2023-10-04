import React from "react";
import { FigureProps } from "../utils/iProps";
import { getValidArray } from "../utils/isArray";

const Figure: React.FC<FigureProps> = ({ figures, color }) => {
  return (
    <div className="figure-background">
      {getValidArray(figures).map((row, index) => (
        <div className="figure" style={{ color: color }} key={index}>
          {row}
        </div>
      ))}
    </div>
  );
};
export default Figure;
