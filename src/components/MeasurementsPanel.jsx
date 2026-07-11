import { useState } from "react";

const UPPER_BODY_KEYS = [
  "shoulder",
  "crossBack",
  "waist",
  "neck",
  "chest",
  "bust",
  "upperBust",
  "underBust",
  "shoulderToWaist",
  "apexPoint",
  "neckDepthFront",
  "neckDepthBack",
  "headCircumference",
  "headHeight",
];

const ARMS_SLEEVES_KEYS = [
  "armhole",
  "armLength",
  "sleeveLength",
  "sleeveOpening",
  "cuff",
  "wrist",
];

const LOWER_BODY_KEYS = [
  "hip",
  "thigh",
  "knee",
  "inseam",
  "outseam",
  "ankle",
  "fullLength",
  "skirtLength",
  "sideSplitHeight",
];


function ResultsArray({ resultsArray, onMeasurementsChange }) {
  const isValidObject =
    resultsArray &&
    typeof resultsArray === "object" &&
    !Array.isArray(resultsArray);

  const excludedKeys = ["aiConfidence", "gender", "notes"];

  // filteredResults - recomputed every render straight from props (cheap, no need to memoize unless huge)
  const filteredResults = isValidObject
    ? Object.fromEntries(
        Object.entries(resultsArray).filter(
          ([key, value]) => value != null && !excludedKeys.includes(key),
        ),
      )
    : {};

  // editedValues - current values shown/edited in UI (key -> value)
  const [editedValues, setEditedValues] = useState(filteredResults);

  // Track the last resultsArray we synced from, WITHOUT useEffect.
  // This is React's official "adjusting state when a prop changes" pattern.
  const [prevResultsArray, setPrevResultsArray] = useState(resultsArray);

  if (resultsArray !== prevResultsArray) {
    setPrevResultsArray(resultsArray);
    if (isValidObject) {
      setEditedValues(filteredResults);
    }
  }

  // editingKey - which tile is currently in "edit mode"
  const [editingKey, setEditingKey] = useState(null);

  // tempInput - the text currently typed in the active input box
  const [tempInput, setTempInput] = useState("");

  if (!isValidObject) {
    console.log("INVALID RESULTS ARRAY:", resultsArray);
    return null;
  }

  const createItems = (keys) =>
    keys
      .filter((key) => key in editedValues)
      .map((key) => ({
        key,
        label: key
          .replace(/([A-Z])/g, " $1")
          .toUpperCase()
          .trim(),
        value: editedValues[key],
      }));

  const MEASUREMENTS = [
    {
      group: "UPPER BODY",
      items: createItems(UPPER_BODY_KEYS),
    },
    {
      group: "ARMS & SLEEVES",
      items: createItems(ARMS_SLEEVES_KEYS),
    },
    {
      group: "LOWER BODY",
      items: createItems(LOWER_BODY_KEYS),
    },
  ];

  // Build the "edited measurements" array whenever editedValues changes,
  // and push it up to the parent via callback (if provided)
  const buildMeasurementsArray = (updatedValues) => {
    const arr = Object.entries(updatedValues).map(([key, value]) => ({
      key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .toUpperCase()
        .trim(),
      value,
    }));

    if (typeof onMeasurementsChange === "function") {
      onMeasurementsChange(arr);
    }

    return arr;
  };

  const startEditing = (key, currentValue) => {
    setEditingKey(key);
    setTempInput(String(currentValue ?? ""));
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setTempInput("");
  };

  const saveEditing = (key) => {
    const numericValue = parseFloat(tempInput);
    const newValue = Number.isNaN(numericValue) ? tempInput : numericValue;

    const updatedValues = {
      ...editedValues,
      [key]: newValue,
    };

    setEditedValues(updatedValues);
    buildMeasurementsArray(updatedValues);

    setEditingKey(null);
    setTempInput("");
  };

  const handleKeyDown = (e, key) => {
    if (e.key === "Enter") {
      saveEditing(key);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  console.log("editedValues:", editedValues);

  return (
    <>
      {MEASUREMENTS.map(({ group, items }) => (
        <div key={group} className="bm-group">
          <p className="bm-group-label">{group}</p>
          <div className="bm-grid">
            {items.map(({ key, label, value }) => {
              const isEditing = editingKey === key;

              const displayValue =
                typeof value === "number"
                  ? value.toFixed(1)
                  : String(value ?? "");

              return (
                <div key={key} className="bm-tile">
                  <div className="bm-tile-head">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect
                        x="1"
                        y="1"
                        width="8"
                        height="8"
                        rx="1.5"
                        stroke="#EBB355"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <span className="bm-tile-dot" />
                  </div>

                  <p className="bm-tile-label">{label}</p>

                  {isEditing ? (
                    <div className="bm-tile-edit-wrap">
                      <input
                        type="text"
                        inputMode="decimal"
                        className="bm-tile-input"
                        value={tempInput}
                        autoFocus
                        onChange={(e) => setTempInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, key)}
                        onBlur={() => saveEditing(key)}
                      />
                      <span className="bm-tile-unit"> cm</span>
                    </div>
                  ) : (
                    <p
                      className="bm-tile-value bm-tile-value-editable"
                      onClick={() => startEditing(key, value)}
                      title="Click to edit"
                    >
                      {displayValue}
                      <span className="bm-tile-unit"> cm</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default function MeasurementsPanel({ visible, results }) {
  const resultSummary =
    results && typeof results === "object"
      ? JSON.stringify(results, null, 2)
      : null;

  console.log("Results:-----------", results);
  console.log("resultSummary:-----------", resultSummary);

  return (
    <div className={`bm-panel ${visible ? "bm-panel--visible" : ""}`}>
      <div className="bm-card-head">
        <div className="bm-card-icon">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#EBB355"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <div>
          <h3 className="bm-title">Body Measurements</h3>
          <p className="bm-subtitle">
            AI-captured body scan results &bull;{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="bm-divider" />

      <div className="bm-stats">
        <div className="bm-body-icon">
          <svg
            width="48"
            height="80"
            viewBox="0 0 56 96"
            fill="none"
            stroke="#EBB355"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="28" cy="10" r="7" />
            <line x1="28" y1="17" x2="28" y2="52" />
            <line x1="28" y1="28" x2="8" y2="44" />
            <line x1="28" y1="28" x2="48" y2="44" />
            <line x1="28" y1="52" x2="16" y2="80" />
            <line x1="28" y1="52" x2="40" y2="80" />
            <line x1="16" y1="80" x2="14" y2="96" />
            <line x1="40" y1="80" x2="42" y2="96" />
          </svg>
        </div>
        <div className="bm-stat-list">
          {[
            { label: "Scan quality", value: "Excellent", gold: true },
            { label: "Confidence", value: "98.4%", gold: true },
            { label: "Points mapped", value: "12 / 12" },
            { label: "Unit", value: "cm" },
            { label: "Profile", value: "Standard" },
          ].map(({ label, value, gold }) => (
            <div key={label} className="bm-stat-row">
              <span className="bm-stat-label">{label}</span>
              <span className={`bm-stat-value ${gold ? "bm-stat-gold" : ""}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bm-divider" />
      <ResultsArray resultsArray={results} />
    </div>
  );
}
