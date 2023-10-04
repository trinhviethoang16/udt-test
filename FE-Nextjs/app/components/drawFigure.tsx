import React from "react";
import { Shape } from "../utils/enum";
import { DrawFigureProps } from "../utils/iProps";
import Figure from "./figure";
import { getValidArray } from "../utils/isArray";

const DrawFigure: React.FC<DrawFigureProps> = ({ color, symbol, measurement, shape }) => {
  let figures: string[] = [];

  function drawDiamondFigure(figures: string[], symbol: string, height: number) {
    if (height % 2 === 1) {
      drawDiamondWithMiddleLine(figures, symbol, height); //add one more symbol line for the odd case
    } else {
      drawDiamondWithoutMiddleLine(figures, symbol, height);
    }
    return figures;
  }
  
  function createRow(symbol: string, numCols: number): string {
    return Array.from({ length: numCols }, () => symbol).join("");
  }

  function drawDiamondWithMiddleLine(figures: string[], symbol: string, height: number) {
    for (let numRowTop = 1; numRowTop <= height / 2 + 1; numRowTop++) {
      const numCols = numRowTop * 2 - 1;
      const row = createRow(symbol, numCols);
      figures.push(row);
    }
    for (let rowNumBottom = height / 2; rowNumBottom >= 1; rowNumBottom--) {
      const numCols = rowNumBottom * 2 - 2;
      const row = createRow(symbol, numCols);
      figures.push(row);
    }
  }

  function drawDiamondWithoutMiddleLine(figures: string[], symbol: string, height: number) {
    for (let rowNumTop = 1; rowNumTop <= height / 2; rowNumTop++) {
      const numCols = rowNumTop * 2 - 1;
      const row = createRow(symbol, numCols);
      figures.push(row);
    }
    for (let rowNumBottom = height / 2; rowNumBottom >= 1; rowNumBottom--) {
      const numCols = rowNumBottom * 2 - 1;
      const row = createRow(symbol, numCols);
      figures.push(row);
    }
  }

  if (shape === Shape.RECTANGLE) {
    figures = Array.from({ length: measurement }, () => {
      return Array.from({ length: measurement }, () => symbol).join("");
    });
  } else if (shape === Shape.PERFECT_TRIANGLE) {
    figures = Array.from({ length: measurement }, (_, rowIndex) => {
      const numCols = rowIndex * 2 + 1;
      const row = Array.from({ length: numCols }, () => symbol).join("");
      return row;
    });
  } else if (shape === Shape.DIAMOND) {
    const newArray = drawDiamondFigure(figures, symbol, measurement);
    const validFigures = getValidArray(newArray);
    return <Figure figures={validFigures} color={color} />;
  }
  const validFigures = getValidArray(figures);
  return <Figure figures={validFigures} color={color} />;
};
export default DrawFigure;