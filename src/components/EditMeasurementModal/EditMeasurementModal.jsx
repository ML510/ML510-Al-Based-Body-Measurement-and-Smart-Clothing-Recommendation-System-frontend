import EditSquareIcon from "@mui/icons-material/EditSquare";
import "./EditMeasurementModal.css";

export default function EditMeasurementModal() {
  

  return (
      <div
        className="emc-card"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking card
      >
        {/* Icon */}
        <div className="emc-icon-wrapper">
          <EditSquareIcon className="emc-icon" />
        </div>

        {/* Title */}
        <h2 className="emc-title">Do you want to Edit Measurement?</h2>

        {/* Actions */}
        <div className="emc-actions">
          <button
            type="button"
            className="emc-btn emc-btn-primary"
            // onClick={}
          >
            Yes
          </button>
          <button
            type="button"
            className="emc-btn emc-btn-secondary"
            // onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
  );
};
