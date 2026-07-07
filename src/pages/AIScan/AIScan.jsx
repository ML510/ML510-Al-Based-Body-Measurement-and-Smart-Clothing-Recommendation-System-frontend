import { useState, useRef, useEffect, forwardRef } from "react";
import "./AIScan.css";
import Header from "../../components/Header";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import UploadButton from "../../components/Button/UploadButton";
import GetMeasurementsController from "../../controlller/GetMeasurementsController";
import HeightInput from "../../components/HeightInput";
import { useLocation } from "react-router-dom";
import GetMeasurementsService from "../../services/GetMeasurementsService";

// ── Camera Viewport ───────────────────────────────────
const CameraViewport = forwardRef(function CameraViewport(
  { stream, cameraEnabled, onEnable, scanning, progress, done, onRescan },
  videoRef,
) {
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="ais-viewport">
      <div className="ais-corner ais-corner-tl" />
      <div className="ais-corner ais-corner-tr" />
      <div className="ais-corner ais-corner-bl" />
      <div className="ais-corner ais-corner-br" />

      {stream && (
        <video ref={videoRef} autoPlay playsInline muted className="ais-video" />
      )}

      {scanning && (
        <>
          <div className="ais-scan-line" />
          <div className="ais-scan-overlay" />
          <div className="ais-scan-progress-ring">
            <svg viewBox="0 0 80 80" className="ais-ring-svg">
              <circle cx="40" cy="40" r="32" className="ais-ring-track" />
              <circle
                cx="40" cy="40" r="32" className="ais-ring-fill"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress / 100)}`}
              />
            </svg>
            <span className="ais-ring-pct">{progress}%</span>
          </div>
        </>
      )}

      {done && !scanning && (
        <div className="ais-done-overlay">
          <svg className="ais-done-icon" width="40" height="40" fill="none"
            stroke="#EBB355" strokeWidth="1.2" strokeLinecap="round"
            strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <p className="ais-done-text">Scan Complete</p>
          <button className="ais-rescan-btn" onClick={onRescan} type="button">Rescan</button>
        </div>
      )}

      {!cameraEnabled && !scanning && !done && (
        <div className="ais-idle-overlay">
          <div className="ais-camera-glow" />
          <svg className="ais-camera-icon" width="48" height="48" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
            strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <p className="ais-idle-text">Allow camera access to begin AI body scan</p>
          <button className="ais-enable-btn" onClick={onEnable} type="button">
            Enable Camera
          </button>
          <UploadButton />
        </div>
      )}

      {cameraEnabled && !scanning && !done && (
        <div className="ais-ready-overlay">
          <p className="ais-ready-text">Camera ready — position yourself in frame</p>
        </div>
      )}
    </div>
  );
});

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

function MeasurementsPanel({ visible }) {
  return (
    <div className={`bm-panel ${visible ? "bm-panel--visible" : ""}`}>
      <div className="bm-card-head">
        <div className="bm-card-icon">
          <svg width="18" height="18" fill="none" stroke="#EBB355"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="bm-divider" />

      <div className="bm-stats">
        <div className="bm-body-icon">
          <svg width="48" height="80" viewBox="0 0 56 96" fill="none"
            stroke="#EBB355" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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
              <span className={`bm-stat-value ${gold ? "bm-stat-gold" : ""}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bm-divider" />

      {MEASUREMENTS.map(({ group, items }) => (
        <div key={group} className="bm-group">
          <p className="bm-group-label">{group}</p>
          <div className="bm-grid">
            {items.map(({ key, label, value }) => (
              <div key={key} className="bm-tile">
                <div className="bm-tile-head">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="1" y="1" width="8" height="8" rx="1.5"
                      stroke="#EBB355" strokeWidth="1.2" />
                  </svg>
                  <span className="bm-tile-dot" />
                </div>
                <p className="bm-tile-label">{label}</p>
                <p className="bm-tile-value">
                  {value.toFixed(1)}<span className="bm-tile-unit"> cm</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────
export default function AIScan() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [height, setHeight] = useState("");

  const location = useLocation();

  const measurementsDataObject =location.state?.measurementsImageAndHeightObject;
  const newMeasurementsDataObject = { ...measurementsDataObject };

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
      setError("Camera access denied. Please allow camera permission and try again.");
    }
  };

  const handleDisableCamera = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCameraEnabled(false);
  };

  const handleStartScan = () => {
    if (!cameraEnabled) { setError("Please enable the camera first."); return; }
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
          setCapturedImage(imageDataURL);

          newMeasurementsDataObject.image = imageDataURL;
          newMeasurementsDataObject.heightCm = height;
          

          try {
            const getMeasurementsService = new GetMeasurementsService();
            const getAllMeasurements = getMeasurementsService.getMeasurements(newMeasurementsDataObject);
console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",getAllMeasurements);


          }catch (error) {
            console.error("Error sending data to GetMeasurementsController:", error);
          }

          GetMeasurementsController({ image: imageDataURL, height });
          handleDisableCamera();
          setDone(true);
          setTimeout(() => setShowResults(true), 300);
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  const handleRescan = () => {
    setDone(false);
    setShowResults(false);
    setCapturedImage(null);
    setError("");
    setProgress(0);
  };

  const handleContinue = () => {
    if (!done) { setError("Please complete the AI scan before continuing."); return; }
    // next step
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
            <svg width="15" height="15" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Scan complete — measurements captured successfully!
          </div>
        )}

        <main className="ais-card">
          <div className={`ais-two-col ${showResults ? "ais-two-col--results" : ""}`}>

            {/* LEFT — Camera side */}
            <div className="ais-left-col">
              <div className="ais-col-header">
                <div className="ais-card-icon">
                  <svg width="18" height="18" fill="none" stroke="#EBB355"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.22 6.66L21.88 12l-6.66 2.22L13 20.88l-2.22-6.66L4.12 12l6.66-2.22L13 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="ais-card-title">AI Body Scan</h2>
                  <p className="ais-card-sub">Stand still while we capture measurements.</p>
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
                />

                <div className="ais-height-slot">
                  <HeightInput value={height} onChange={setHeight} />
                </div>
              </div>

              {error && <p className="ais-error">{error}</p>}

              <div className="ais-btn-group">
                {cameraEnabled && !scanning && !done && (
                  <button className="ais-scan-btn" onClick={handleStartScan}>
                    <svg width="16" height="16" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
                  <MeasurementsPanel visible={showResults} />
                </div>
              </>
            )}
          </div>

          <div className="ais-divider" />

          <div className="ais-actions">
            <button className="ais-back-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
              <svg width="18" height="18" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}