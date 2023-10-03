"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Figure from "../components/figure";

enum Shape {
  RECTANGLE = "Rectangle",
  PERFECT_TRIANGLE = "Perfect Triangle",
  DIAMOND = "Diamond",
}

const CreateNew = () => {
  const [selectedShape, setSelectedShape] = useState<Shape | "" | undefined>("");
  const handleShapeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Shape;
    setSelectedShape(value);

    setFormData({
      ...formData,
      shape: value,
    });
  };

  const [formData, setFormData] = useState({
    shape: selectedShape,
    color: "",
    symbol: "",
    measurement: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/figures/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error("Draw fail");
      } else {
        alert("Draw successful !!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function drawFigure() {
    let color = "#" + formData.color;
    let symbol = formData.symbol.toString();
    let height = formData.measurement;
    let shape = formData.shape;
    let figures = [];
    if (shape === Shape.RECTANGLE) {
      figures = Array.from({ length: height }, () => {
        return Array.from({ length: height }, () => symbol).join('');
      });
      return (
        <Figure figures={figures} color={color} />
      );
    } else if (shape === Shape.PERFECT_TRIANGLE) {
      figures = Array.from({ length: height }, (_, rowIndex) => {
        const numCols = rowIndex * 2 + 1;
        const row = Array.from({ length: numCols }, () => symbol).join('');
        return row;
      });
      return (
        <Figure figures={figures} color={color} />
      );
    } else if (shape === Shape.DIAMOND) {
    if (height % 2 == 1) {
      for (let numRowTop = 1; numRowTop <= height / 2 + 1; numRowTop++) {
        const numCols = numRowTop * 2 - 1;
        const row = Array.from({ length: numCols }, () => symbol).join('');
        figures.push(row);
      }
      for (let rowNumBottom = height / 2; rowNumBottom >= 1; rowNumBottom--) {
        const numCols = rowNumBottom * 2 - 2;
        const row = Array.from({ length: numCols }, () => symbol).join('');
        figures.push(row);
      }
    } else {
      for (let rowNumTop = 1; rowNumTop <= height / 2; rowNumTop++) {
        const numCols = rowNumTop * 2 - 1;
        const row = Array.from({ length: numCols }, () => symbol).join('');
        figures.push(row);
      }
      for (let rowNumBottom = height / 2; rowNumBottom >= 1; rowNumBottom--) {
        const numCols = rowNumBottom * 2 - 1;
        const row = Array.from({ length: numCols }, () => symbol).join('');
        figures.push(row);
      }
    }
      return (
        <Figure figures={figures} color={color} />
      );
    }
  };

  return (
    <div className="create-new-layout">
      <div className="create-new-content-layout">
        <div className="title-holder">
          <Link className="col-3" href="/draw-list">
            <div className="back-to-list">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_535_14)">
                    <path
                      d="M16.5758 8.24251L3.25322 8.24251L5.74787 5.74787C6.04373 5.45206 6.04373 4.97236 5.74787 4.6765C5.59994 4.52863 5.40605 4.45464 5.21216 4.45464C5.01827 4.45464 4.82438 4.52863 4.6765 4.67655L0.888626 8.46443C0.592768 8.76024 0.592768 9.23994 0.888626 9.5358L4.6765 13.3237C4.97231 13.6195 5.45201 13.6195 5.74787 13.3237C6.04373 13.0279 6.04373 12.5482 5.74787 12.2523L3.25322 9.75767L16.5758 9.75767C16.9942 9.75767 17.3334 9.41847 17.3334 9.00009C17.3334 8.58171 16.9942 8.24251 16.5758 8.24251Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_535_14">
                      <rect
                        width="16.6667"
                        height="16.6667"
                        fill="white"
                        transform="matrix(-1 0 0 -1 17.3334 17.3334)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>Back to list</span>
            </div>
          </Link>
          <div className="create-title col-8">
            <p>Create New Draw</p>
          </div>
          <div></div>
        </div>
        <div className="create-form">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="symbol" className="form-label">
                Symbol
              </label>
              <input
                type="text"
                className="form-control"
                id="symbol"
                name="symbol"
                placeholder="Ex: &"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="shape" className="form-label">
                State
              </label>
              <select
                name="shape"
                id="shape"
                className="form-select"
                value={selectedShape}
                onChange={handleShapeChange}
              >
                <option value="">Choose shape</option>
                <option value={Shape.PERFECT_TRIANGLE}>Perfect Triangle</option>
                <option value={Shape.DIAMOND}>Diamond</option>
                <option value={Shape.RECTANGLE}>Rectangle</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                placeholder="Ex: #111111"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="measurement" className="form-label">
                Measurement
              </label>
              <input
                type="text"
                className="form-control"
                id="measurement"
                name="measurement"
                placeholder="Ex: 7"
                onChange={handleChange}
              />
            </div>
            {drawFigure()}
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <button type="submit" className="draw-btn">
                <span className="draw-btn-text">Draw</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateNew;