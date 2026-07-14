import EditSquareIcon from "@mui/icons-material/EditSquare";
import "./EditMeasurementModal.css";

const EditMeasurementModal = ({
  isOpen = true,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  if (!isOpen) return null;

  return (
    //<div className="emc-backdrop" onClick={onCancel}>
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
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            type="button"
            className="emc-btn emc-btn-secondary"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    //</div>
  );
};

export default EditMeasurementModal;
