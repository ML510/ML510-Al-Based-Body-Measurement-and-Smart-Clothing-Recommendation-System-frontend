import { useState, useRef } from "react";

function UploadButton() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

//   useEffect(() => {
//     console.log("selectedImage changed:", selectedImage);
//   }, [selectedImage]);

  const uploadImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);

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

      {/* {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Preview"
          width={200}
        />
      )} */}
    </div>
  );
}

export default UploadButton;
