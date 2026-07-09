
// ── Body Measurements Results Panel ──────────────────
const MEASUREMENTS = [
  {
    group: "UPPER BODY",
    items: [
      { key: "shoulder", label: "SHOULDER", value: 42.5 },
      { key: "waist", label: "WAIST", value: 74.0 },
      { key: "hip", label: "HIP", value: 96.0 },
      { key: "crossBack", label: "CROSS BACK", value: 37.0 },
      { key: "armhole", label: "ARMHOLE", value: 22.0 },
    ],
  },
  {
    group: "ARMS & SLEEVES",
    items: [
      { key: "sleeveLen", label: "SLEEVE LENGTH", value: 63.5 },
      { key: "wrist", label: "WRIST", value: 16.5 },
      { key: "fullLen", label: "FULL LENGTH", value: 158.0 },
    ],
  },
  {
    group: "LOWER BODY",
    items: [
      { key: "thigh", label: "THIGH", value: 58.0 },
      { key: "knee", label: "KNEE", value: 36.0 },
      { key: "inseam", label: "INSEAM", value: 76.5 },
      { key: "outseam", label: "OUTSEAM", value: 104.0 },
    ],
  },
];

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

      {/* {resultSummary && (
        <div className="bm-group">
          <p className="bm-group-label">SCAN OUTPUT</p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
            {resultSummary}
          </pre>
        </div>
      )} */}

      {MEASUREMENTS.map(({ group, items }) => (
        <div key={group} className="bm-group">
          <p className="bm-group-label">{group}</p>
          <div className="bm-grid">
            {items.map(({ key, label, value }) => (
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
                <p className="bm-tile-value">
                  {value.toFixed(1)}
                  <span className="bm-tile-unit"> cm</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
