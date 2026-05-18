import { useState } from "react";

const STEPS = [
  { id: 1, label: "Customer" },
  { id: 2, label: "Profile" },
  { id: 3, label: "Garment" },
  { id: 4, label: "AI Scan" },
  { id: 5, label: "Order" },
];

function Stepper({ current }) {
  return (
    <nav aria-label="Progress" className="nm-stepper">
      <ol className="nm-stepper-list" role="list">
        {STEPS.map((step, idx) => {
          const isActive = step.id === current;
          const isDone = step.id < current;
          const isLast = idx === STEPS.length - 1;

          return (
            <li key={step.id} className="nm-step-item">
              {!isLast && <div className="nm-stepper-line" />}
              <span
                className={`nm-step-circle ${
                  isActive
                    ? "step-active"
                    : isDone
                      ? "step-done"
                      : "step-inactive"
                }`}
                // style={"left: 5px"}
              >
                {isDone ? "✓" : step.id}
              </span>
              <span
                className={`nm-step-label ${
                  isActive ? "label-active" : "label-inactive"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function SelecterBar() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  handleBack;

  return (
    <div>
      <main className="nm-main">
        <Stepper current={currentStep} />
      </main>
    </div>
  );
}

export default SelecterBar;
