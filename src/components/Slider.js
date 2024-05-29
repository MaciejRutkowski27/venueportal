import React, { useState, useEffect } from "react";
import "./index.css";

const RangeSlider = () => {
  const [value, setValue] = useState(0);

  const handleInputChange = (e) => {
    const newValue = +e.target.value;
    setValue(newValue);
  };

  useEffect(() => {
    const range = document.getElementById("range");
    const label = range.nextElementSibling;

    const rangeWidth = +getComputedStyle(range)
      .getPropertyValue("width")
      .slice(0, -2);
    const labelWidth = +getComputedStyle(label)
      .getPropertyValue("width")
      .slice(0, -2);

    const max = +range.max;
    const min = +range.min;

    const left =
      value * (rangeWidth / max) -
      labelWidth / 2 +
      scale(value, min, max, 10, -10);

    label.style.left = left + "px";

    label.innerHTML = value;
  }, [value]);

  // Function to map a range of numbers to another range of numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  return (
    <div className="slider-container">
      <div className="range-container">
        <p className="subdescription">Price</p>
        <input
          type="range"
          id="range"
          min="0"
          max="10000"
          value={value}
          onChange={handleInputChange}
        />
        <label htmlFor="range">{value}</label>
      </div>
    </div>
  );
};

export default RangeSlider;
