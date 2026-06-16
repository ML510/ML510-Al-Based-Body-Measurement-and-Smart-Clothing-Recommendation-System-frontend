import { useState } from "react";
import "./SelectClothing.css";
import Header from "../../components/Header";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import { useNavigate } from "react-router-dom";
import GetMeasurementsController from "../../controlller/GetMeasurementsController";

// ─── Static Data ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "upper",
    emoji: "👕",
    label: "Upper Body",
    garments: [
      { id: "shirt", name: "Shirt" },
      { id: "tshirt", name: "T-Shirt" },
      { id: "vest", name: "Vest" },
      { id: "kurta", name: "Kurta" },
      { id: "hoodie", name: "Hoodies & Sweatshirts" },
    ],
  },
  {
    id: "lower",
    emoji: "👖",
    label: "Lower Body",
    garments: [
      { id: "jeans", name: "Jeans" },
      { id: "chinos", name: "Chinos" },
      { id: "shorts", name: "Shorts" },
      { id: "trackpant", name: "Track Pant" },
      { id: "pyjama", name: "Pyjama" },
    ],
  },
  {
    id: "formal",
    emoji: "🤵",
    label: "Formal",
    garments: [
      { id: "suit", name: "Suit" },
      { id: "waistcoat", name: "Waistcoat" },
      { id: "sherwani", name: "Sherwani" },
    ],
  },
  {
    id: "traditional",
    emoji: "🥻",
    label: "Traditional",
    garments: [{ id: "dhoti", name: "Dhoti / Panche" }],
  },
  {
    id: "special",
    emoji: "🌙",
    label: "Special",
    garments: [{ id: "nightsuit", name: "Night Suit" }],
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconCheck = ({ size = 20 }) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    viewBox="0 0 24 24"
    style={{ width: size, height: size }}
  >
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = ({ open }) => (
  <svg
    className={`accordion-chevron${open ? " accordion-chevron--open" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M19 9l-7 7-7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const IconArrowLeft = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    style={{ width: 20, height: 20 }}
  >
    <path
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const IconArrowRight = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    style={{ width: 20, height: 20 }}
  >
    <path
      d="M14 5l7 7m0 0l-7 7m7-7H3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const IconGarment = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 4v16m8-8H4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path
      d="M12 4a8 8 0 018 8v1h-3a1 1 0 01-1-1v-4a1 1 0 00-1 1h-6a1 1 0 00-1 1v4a1 1 0 01-1 1H4v-1a8 8 0 018-8z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

// ─── Chip (multi-select + quantity) ──────────────────────────────────────────

function Chip({ garment, qty, onToggle, onIncrement, onDecrement }) {
  const selected = qty > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`chip${selected ? " chip--selected" : ""}`}
      onClick={() => onToggle(garment.id)}
      onKeyDown={(e) => e.key === "Enter" && onToggle(garment.id)}
    >
      <span
        className={`chip__checkbox${selected ? " chip__checkbox--checked" : ""}`}
      >
        {selected && <IconCheck size={10} />}
      </span>
      {garment.name}

      {/* ── Quantity Control (only when selected) ── */}
      {selected && (
        <span className="chip__qty" onClick={(e) => e.stopPropagation()}>
          <button
            className="chip__qty-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDecrement(garment.id);
            }}
          >
            −
          </button>
          <span className="chip__qty-value">{qty}</span>
          <button
            className="chip__qty-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIncrement(garment.id);
            }}
          >
            +
          </button>
        </span>
      )}
    </div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({
  category,
  quantities,
  onToggle,
  onIncrement,
  onDecrement,
}) {
  const [open, setOpen] = useState(category.id === "upper");

  const selectedCount = category.garments.filter(
    (g) => quantities[g.id] > 0,
  ).length;
  const total = category.garments.length;

  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="accordion-trigger__left">
          <span className="accordion-emoji">{category.emoji}</span>
          <div className="accordion-trigger__meta">
            <h3 className="accordion-trigger__label">{category.label}</h3>
            <span className="accordion-trigger__count">
              ({selectedCount}/{total} selected)
            </span>
          </div>
        </div>
        <IconChevron open={open} />
      </button>

      {open && (
        <div className="chip-wrap">
          {category.garments.map((g) => (
            <Chip
              key={g.id}
              garment={g}
              qty={quantities[g.id]}
              onToggle={onToggle}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SelectClothing() {
  const [init2, setInit2] = useState(null);

  const [selectClothing, setSelectClothing] = useState("");

  const [quantities, setQuantities] = useState(() => {
    const init = {};
    CATEGORIES.forEach((cat) =>
      cat.garments.forEach((g) => {
        init[g.id] = 0;
      }),
    );
    setInit2(init);
    return init;
  });

  const handleToggle = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? 0 : 1,
    }));
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));
  };

  function searchSelectClothing() {
    const clothingList = [];
    Object.entries(quantities).forEach(([key, value]) => {
      if (value > 0) {
        //console.log(`${key}: ${value}`);
        clothingList.push(`${key}`);
        setSelectClothing((prev) => prev + `${key}: ${value}, `);
      }
    });

    GetMeasurementsController({ clothing: clothingList });
  }

  console.log("setSelectClothing:", selectClothing);
  console.log("new quantities:", quantities);

  const navigate = useNavigate();

  return (
    <div className="atelier-root">
      <Header />
      <div className="atelier-page">
        <HeaderTitel />
        <SelecterBar />

        <main className="atelier-card">
          <div className="card-header">
            <div className="card-icon-wrap">
              <IconGarment />
            </div>
            <div>
              <h2 className="card-title">Select Garment</h2>
              <p className="card-subtitle">Pick the piece to be tailored.</p>
            </div>
          </div>

          <div className="accordion-grid">
            {CATEGORIES.map((cat) => (
              <AccordionItem
                key={cat.id}
                category={cat}
                quantities={quantities}
                onToggle={handleToggle}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>

          <div className="divider" />

          <div className="nav-footer">
            <button className="btn-back">
              <IconArrowLeft />
              Back
            </button>
            <button
              className="btn-continue"
              onClick={() => {
                searchSelectClothing();
                navigate("/ai-scan");
              }}
            >
              Continue
              <IconArrowRight />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
