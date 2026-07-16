import EditDocument from "@mui/icons-material/EditDocument";
import ArrForward from "@mui/icons-material/ArrowForward";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import { useState } from "react";
import "./DescriptionEntry.css";

/**
 * DescriptionEntry
 *
 * Props:
 * - value: string             -> current textarea value (controlled)
 * - onChange: function(str)   -> called on every keystroke
 * - onSave: function(str)     -> called when "Save Details" is clicked
 * - placeholder: string       -> optional custom placeholder text
 */
const DescriptionEntry = ({
  value,
  onChange,
  onSave,
  placeholder = "Enter detailed garment specifications, fabric choices, and styling notes...",
}) => {
  // fallback to internal state if component is used uncontrolled
  const [internalValue, setInternalValue] = useState("");

  const text = value !== undefined ? value : internalValue;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleSave = () => {
    if (onSave) onSave(text);
  };

  return (
    <div className="de-wrapper">
      {/* Subtle background glow */}
      <div className="de-glow"></div>

      <div className="de-card">
        <div className="de-inner">
          {/* Label Header */}
          <div className="de-header">
            <EditDocument className="material-symbols-outlined de-header-icon" />
            <h2 className="de-title">DESCRIPTION</h2>
          </div>

          {/* Input Area */}
          <div className="de-input-group">
            <textarea
              id="garment-description"
              rows="4"
              className="de-textarea"
              placeholder={placeholder}
              value={text}
              onChange={handleChange}
            />

            {/* Status indicator */}
            <div className="de-status">
                <AutoAwesome className="material-symbols-outlined de-status-icon" />
              <span className="de-status-text">AI READY</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="de-actions">
            <button className="de-save-btn" onClick={handleSave}>
              <span>Save Details</span>
              <ArrForward className="material-symbols-outlined de-save-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEntry;