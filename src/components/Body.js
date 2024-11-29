import React, { useState } from "react";

const Body = () => {
  const [color, setColor] = useState("hex");
  const [colorCode, setColorCode] = useState("rgb(255,255,255)");

  const handleClick = (type) => {
    setColor(type);
    let currentColor = colorCode;
    if (type === "rgb" && color === "hex") {
      const { r, g, b } = hexToRgb(colorCode);
      currentColor = `rgb(${r}, ${g}, ${b})`;
    }

    if (type === "hex" && color === "rgb") {
      const rgbData = colorCode?.substring(4);
      const rgbValues = rgbData?.split(",");
      const last = rgbValues[2];
      const r = rgbValues[0];
      const g = rgbValues[1];
      const b = last
        ?.split("")
        ?.filter((e) => !isNaN(e))
        ?.join("");

      currentColor = rgbToHex(Number(r), Number(g), Number(b));
    }

    setColorCode(currentColor);
  };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const handleRandomGenerator = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const rgb = `rgb(${r} ${g} ${b})`;
    if (color === "rgb") {
      setColorCode(rgb);
    } else {
      const hexa = rgbToHex(r, g, b);
      setColorCode(hexa);
    }
  };

  return (
    <div style={{ backgroundColor: colorCode }} className="colorCode_container">
      <div className="colorCode_button">
        <button onClick={() => handleClick("hex")}>Create Hex Color </button>
        <button onClick={() => handleClick("rgb")}>Create RGB Color </button>
        <button onClick={handleRandomGenerator}>Generate random Color </button>
      </div>
      <div className="colorCode_title">
        {color === "hex" ? "HEX Color" : "RGB Color"}
      </div>
      <div className="colorCode_code">{colorCode}</div>
    </div>
  );
};

export default Body;
