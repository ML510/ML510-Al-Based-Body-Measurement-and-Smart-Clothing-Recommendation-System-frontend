import { useState, useRef } from "react";
import GetMeasurementsController from "../../controlller/GetMeasurementsController";

function UploadButton() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const uploadImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      GetMeasurementsController({ image: file });

      console.log("Selected File:", file);
      console.log("Selected File:", file.name);
    }
  };

  return (
    <div>
      <button
        className="ais-enable-btn-two"
        type="button"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Image
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={uploadImage}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default UploadButton;
