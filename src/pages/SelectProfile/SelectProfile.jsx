import { useState } from "react";
import "./SelectProfile.css";
import Header from "../../components/Header";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";



const PROFILES = [
  {
    id: "male",
    emoji: "🤵",
    title: "Male",
    desc: "Shirts, suits, trousers",
  },
  {
    id: "female",
    emoji: "👰",
    title: "Female",
    desc: "Dresses, blouses, sarees",
  },
];

export default function SelectProfile() {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!selected) {
      setError("Please select a profile to continue.");
      return;
    }
    setError("");
    // if (onContinue) onContinue(selected);
  };

  const handleSelect = (id) => {
    setSelected(id);
    setError("");
  };

  return (
    <div className="atelier-root">
      <Header />
    <div className="sp-root">
      {/* Header */}
      <header className="sp-header">
        <HeaderTitel />
      </header>

      <SelecterBar />

      {/* Card */}
      <main className="sp-card">
        {/* Card header */}
        <div className="sp-card-header">
          <div className="sp-card-icon">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#c08d44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="sp-card-title">Select Profile</h2>
            <p className="sp-card-sub">
              Choose customer profile for tailored options.
            </p>
          </div>
        </div>

        {/* Profile grid */}
        <div className="sp-grid">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              className={`sp-profile-card ${selected === p.id ? "sp-profile-selected" : ""}`}
              onClick={() => handleSelect(p.id)}
              aria-pressed={selected === p.id}
            >
              <span className="sp-profile-emoji">{p.emoji}</span>
              <h3 className="sp-profile-title">{p.title}</h3>
              <p className="sp-profile-desc">{p.desc}</p>
              {selected === p.id && (
                <span className="sp-selected-chip">Selected ✓</span>
              )}
            </button>
          ))}
        </div>

        {error && <p className="sp-error">{error}</p>}

        <div className="sp-divider" />

        {/* Actions */}
        <div className="sp-actions">
          <button className="sp-back-btn" >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <button className="sp-continue-btn" onClick={handleContinue}>
            Continue
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </main>
    </div>
    </div>
  );
}
