"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const CreateNew = () => {
  const router = useRouter();

  const [selectedShape, setSelectedShape] = useState('');
  const handleShapeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedShape(value);

    setFormData({
      ...formData,
      shape: value,
    });
  };

  const [formData, setFormData] = useState({
    shape: selectedShape,
    color: '',
    symbol: '',
    measurement: 0,
    // user_id: '',
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
      const response = await fetch('http://127.0.0.1:3000/figures/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error('Draw fail');
        //alert(`Shape: ${selectedShape}, Color: ${formData.color}, Symbol: ${formData.symbol}, Measurement: ${formData.measurement}`)
      }
      else {
        alert("Draw successful !!!")
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const drawFigure = () => {
    const shape = formData.shape;
    if (shape === "Rectangle") {
      const width = 5;
      const height = formData.measurement;
      const color = "#" + formData.color;
      const symbol = formData.symbol.toString();
        const rectangle = {
        width,
        height,
        color,
        symbol,
      };
  
      const rows = [];
      for (let i = 0; i < rectangle.height; i++) {
        const row = Array(rectangle.width).fill(rectangle.symbol).join('');
        rows.push(row);
      }
  
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rows.map((row, index) => (
            <div style={{ color: rectangle.color, backgroundColor: "transparent" }}key={index}>{row}</div>
          ))}
        </div>
      );
    } else if (shape === "Perfect Triangle") {
      const height = formData.measurement;
      const color = "#" + formData.color;
      const symbol = formData.symbol.toString();
      
      const triangle = {
        height,
        color,
        symbol,
      };
    
      const rows = [];
      for (let i = 1; i <= triangle.height; i++) {
        const spaces = ' '.repeat(triangle.height - i);
        const stars = triangle.symbol.repeat(i * 2 - 1);
        rows.push(spaces + stars);
      }
    
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rows.map((row, index) => (
            <div style={{ color: triangle.color, backgroundColor: "transparent" }} key={index}>{row}</div>
          ))}
        </div>
      );
    } else if (shape === "Diamond") {
      const height = (formData.measurement / 2) + 2;
      const color = "#" + formData.color;
      const symbol = formData.symbol.toString();
      
      const diamond = {
        height,
        color,
        symbol,
      };
    
      const rows = [];
      for (let i = 1; i <= diamond.height; i++) {
        const spaces = ' '.repeat(Math.abs(diamond.height - i));
        const stars = diamond.symbol.repeat(2 * i - 1);
        rows.push(spaces + stars);
      }
    
      for (let i = diamond.height - 1; i >= 1; i--) {
        const spaces = ' '.repeat(Math.abs(diamond.height - i));
        const stars = diamond.symbol.repeat(2 * i - 1);
        rows.push(spaces + stars);
      }
    
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rows.map((row, index) => (
            <div style={{ color: diamond.color, backgroundColor: "transparent" }} key={index}>{row}</div>
          ))}
        </div>
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
                      <select name="shape" id="shape" className="form-select" value={selectedShape} onChange={handleShapeChange}>
                        <option value="">Choose shape</option>
                        <option value="Perfect Triangle">Perfect Triangle</option>
                        <option value="Diamond">Diamond</option>
                        <option value="Rectangle">Rectangle</option>
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
                    <div
                      className="d-flex"
                      style={{ justifyContent: 'center' }}
                    >
                    <button type="submit" className="draw-btn">
                      <span className="draw-btn-text">Draw</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  )
}
export default CreateNew;