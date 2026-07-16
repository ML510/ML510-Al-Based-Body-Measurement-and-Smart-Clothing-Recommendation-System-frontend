import { useState, useRef, useEffect, useCallback } from "react";
import "./AIScan.css";
import Header from "../../components/Header";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import HeightInput from "../../components/HeightInput";
import { useLocation } from "react-router-dom";
import GetMeasurementsService from "../../services/GetMeasurementsService";
import MeasurementsPanel from "../../components/MeasurementsPanel";
import { CameraViewport } from "../../components/CameraViewport";
import EditMeasurementModal from "../../components/EditMeasurementModal/EditMeasurementModal";
import DescriptionEntry from "../../components/DescriptionEntry/DescriptionEntry";

// ── Main Component ────────────────────────────────────
export default function AIScan(props) {
  const [uploadedImage, setUploadedImage] = useState(props.image || null);
  console.log("UPLOADED IMAGE", uploadedImage);

  const [FinalMesurements, setFinalMesurements] = useState(
    props.EditedValues || null,
  );
  console.log("FinalMesurements", FinalMesurements);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [height, setHeight] = useState("");
  const [measurementResults, setMeasurementResults] = useState(null);

  const location = useLocation();

  const measurementsDataObject =
    location.state?.measurementsImageAndHeightObject;

  console.log(measurementsDataObject);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      clearInterval(intervalRef.current);
    };
  }, [stream]);

  const handleEnableCamera = async () => {
    setError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      setCameraEnabled(true);
    } catch {
      setError(
        "Camera access denied. Please allow camera permission and try again.",
      );
    }
  };

  const handleDisableCamera = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCameraEnabled(false);
  };

  const passMeasurements = useCallback(() => {
    const finalImage = capturedImage || uploadedImage;

    if (!finalImage) {
      console.log("passMeasurements skipped — no image yet");
      return;
    }

    const gender = measurementsDataObject?.gender;
    const clothingCodes = measurementsDataObject?.clothingCodes;

    if (!gender) {
      console.error(
        "Missing gender — measurementsDataObject:",
        measurementsDataObject,
      );
      setError(
        "Gender information is missing. Please go back and select gender.",
      );
      return;
    }

    if (!clothingCodes || clothingCodes.length === 0) {
      console.error(
        "Missing clothingCodes — measurementsDataObject:",
        measurementsDataObject,
      );
      setError(
        "Clothing selection is missing. Please go back and select clothing.",
      );
      return;
    }

    const payload = {
      ...(measurementsDataObject || {}),
      gender,
      clothingCodes,
      image: finalImage,
      heightCm: height,
    };

    console.log("Sending payload:", payload);

    const getMeasurementsService = new GetMeasurementsService();
    getMeasurementsService
      .getMeasurements(payload)
      .then((result) => {
        setMeasurementResults(result);
        console.log("Measurements result:", result);

        setTimeout(() => setShowResults(true), 300);
      })
      .catch((error) => {
        console.error(
          "Error sending data to GetMeasurementsController:",
          error,
        );
        setError("Failed to analyze scan. Please try again.");
      });
  }, [capturedImage, height, measurementsDataObject, uploadedImage]);

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");

    const mime = arr[0].match(/:(.*?);/)[1];

    const bstr = atob(arr[1]);

    let n = bstr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleStartScan = () => {
    if (!cameraEnabled) {
      setError("Please enable the camera first.");
      return;
    }
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      setError("Camera not ready yet. Please wait a moment and try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");
    const imageFile = dataURLtoFile(imageDataURL, "scan.png");

    setScanning(true);
    setProgress(0);
    setDone(false);
    setShowResults(false);
    setError("");
    setCapturedImage(null);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setScanning(false);
          setCapturedImage(imageFile);
          handleDisableCamera();
          setDone(true);
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  useEffect(() => {
    if (!capturedImage && !uploadedImage) return;

    const timeoutId = window.setTimeout(() => {
      passMeasurements();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [capturedImage, uploadedImage, passMeasurements]);

  const handleRescan = () => {
    setDone(false);
    setShowResults(false);
    setCapturedImage(null);
    setError("");
    setProgress(0);
  };

  const handleContinue = () => {
    if (!done) {
      setError("Please complete the AI scan before continuing.");
      return;
    }
  };

  return (
    <div className="atelier-root">
      <Header />
      <div className="atelier-page">
        <HeaderTitel />
        <SelecterBar />
        <div className="ais-glow-bottom" />

        {done && (
          <div className="ais-banner">
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Scan complete — measurements captured successfully!
          </div>
        )}

        <main className="ais-card">
          <div
            className={`ais-two-col ${showResults ? "ais-two-col--results" : ""}`}
          >
            {/* LEFT — Camera side */}
            <div className="ais-left-col">
              <div className="ais-col-header">
                <div className="ais-card-icon">
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
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.22 6.66L21.88 12l-6.66 2.22L13 20.88l-2.22-6.66L4.12 12l6.66-2.22L13 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="ais-card-title">AI Body Scan</h2>
                  <p className="ais-card-sub">
                    Stand still while we capture measurements.
                  </p>
                </div>
              </div>

              <div className="ais-camera-row">
                <CameraViewport
                  ref={videoRef}
                  stream={stream}
                  cameraEnabled={cameraEnabled}
                  onEnable={handleEnableCamera}
                  scanning={scanning}
                  progress={progress}
                  done={done}
                  onRescan={handleRescan}
                  onImageSelect={setUploadedImage}
                />

                <div className="ais-height-slot">
                  <HeightInput value={height} onChange={setHeight} />
                  {showResults && (
                    <div className="edit-measurement-panal">
                      <EditMeasurementModal />
                    </div>
                  )}
                </div>
              </div>

              {showResults && (
                <div className="description-entry-panal">
                  <DescriptionEntry />
                </div>
              )}

              {error && <p className="ais-error">{error}</p>}

              <div className="ais-btn-group">
                {cameraEnabled && !scanning && !done && (
                  <button className="ais-scan-btn" onClick={handleStartScan}>
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
                      <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.22 6.66L21.88 12l-6.66 2.22L13 20.88l-2.22-6.66L4.12 12l6.66-2.22L13 3z" />
                    </svg>
                    Start AI Scan
                  </button>
                )}
                {scanning && (
                  <div className="ais-scanning-indicator">
                    <span className="ais-pulse-dot" />
                    Scanning… {progress}%
                  </div>
                )}
              </div>
            </div>

            {showResults && (
              <>
                <div className="ais-col-divider" />
                <div className="ais-right-col">
                  <MeasurementsPanel
                    visible={showResults}
                    results={measurementResults}
                  />
                </div>
              </>
            )}
          </div>

          <div className="ais-divider" />

          <div className="ais-actions">
            <button className="ais-back-btn">
              <svg
                width="18"
                height="18"
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
            <button
              className={`ais-continue-btn ${done ? "" : "ais-continue-disabled"}`}
              onClick={handleContinue}
              disabled={!done}
            >
              Continue
              <svg
                width="18"
                height="18"
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
