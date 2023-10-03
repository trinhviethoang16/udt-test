import React from "react";

interface FigureProps {
  figures: string[];
  color: string;
}

const Figure: React.FC<FigureProps> = ({ figures, color }) => {
  return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {figures.map((row, index) => (
            <div
              style={{ color: color, backgroundColor: "transparent" }}
              key={index}
            >
              {row}
            </div>
          ))}
        </div>
      );
}
export default Figure;