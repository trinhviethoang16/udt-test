import { Shape } from "./enum";

export interface FigureProps {
  figures: string[];
  color: string;
}

export interface InputFieldProps {
  id: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LabelFieldProps {
  htmlFor: string;
  name: string;
}

export interface SelectFieldProps {
  name: string;
  id: string;
  value: Shape | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface DrawFigureProps {
  color: string;
  symbol: string;
  measurement: number;
  shape: Shape | undefined;
}