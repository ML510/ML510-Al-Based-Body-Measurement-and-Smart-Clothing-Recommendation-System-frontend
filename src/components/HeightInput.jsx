import { useState } from "react";
import GetMeasurementsController from "../controlller/GetMeasurementsController";

function HeightInput({ value, onChange }) {
  const [unit, setUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  GetMeasurementsController({ height: value });

  const handleCmChange = (e) => {
    const v = e.target.value;
    if (v === "" || (/^\d{0,3}(\.\d{0,1})?$/.test(v) && Number(v) <= 250)) {
      onChange?.(v);
    }
  };

  const handleFeetChange = (e) => {
    const v = e.target.value;
    if (v === "" || (/^\d{0,1}$/.test(v) && Number(v) <= 8)) {
      setFeet(v);
      const cm = (Number(v) * 30.48 + Number(inches || 0) * 2.54).toFixed(1);
      onChange?.(cm);
    }
  };

  const handleInchesChange = (e) => {
    const v = e.target.value;
    if (v === "" || (/^\d{0,2}(\.\d{0,1})?$/.test(v) && Number(v) < 12)) {
      setInches(v);
      const cm = (Number(feet || 0) * 30.48 + Number(v) * 2.54).toFixed(1);
      onChange?.(cm);
    }
  };

  console.log("Unit:", unit, "Feet:", feet, "Inches:", inches);

  return (
    <div className="hi-root">
      <div className="hi-label-row">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="#EBB355" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <polyline points="17 7 12 2 7 7" />
          <polyline points="7 17 12 22 17 17" />
        </svg>
        <span className="hi-label">HEIGHT</span>
        <div className="hi-unit-toggle">
          <button type="button"
            className={`hi-unit-btn ${unit === "cm" ? "hi-unit-active" : ""}`}
            onClick={() => setUnit("cm")}>cm</button>
          <button type="button"
            className={`hi-unit-btn ${unit === "ft" ? "hi-unit-active" : ""}`}
            onClick={() => setUnit("ft")}>ft</button>
        </div>
      </div>

      {unit === "cm" ? (
        <div className="hi-input-wrap">
          <input
            className="hi-input"
            type="number"
            inputMode="decimal"
            placeholder="170"
            value={value ?? ""}
            onChange={handleCmChange}
            min={50} max={250}
          />
          <span className="hi-unit-badge">cm</span>
        </div>
      ) : (
        <div className="hi-ft-row">
          <div className="hi-input-wrap hi-input-wrap--half">
            <input className="hi-input" type="number" inputMode="numeric"
              placeholder="5" value={feet} onChange={handleFeetChange} min={1} max={8} />
            <span className="hi-unit-badge">ft</span>
          </div>
          <div className="hi-input-wrap hi-input-wrap--half">
            <input className="hi-input" type="number" inputMode="decimal"
              placeholder="8" value={inches} onChange={handleInchesChange} min={0} max={11} />
            <span className="hi-unit-badge">in</span>
          </div>
        </div>
      )}

      <p className="hi-hint">Used to calibrate scan accuracy</p>
    </div>
  );
}

export default HeightInput;