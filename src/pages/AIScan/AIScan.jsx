import { useState, useRef, useEffect, forwardRef } from "react";
import "./AIScan.css";
import Header from "../../components/Header";
import HeaderTitel from "../../components/HeaderTitel";
import SelecterBar from "../../components/SelecterBar";
import UploadButton from "../../components/Button/UploadButton";

// ── Camera Viewport ───────────────────────────────────
const CameraViewport = forwardRef(function CameraViewport(
  { stream, cameraEnabled, onEnable, scanning, progress },
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
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="ais-video"
        />
      )}

      {scanning && (
        <>
          <div className="ais-scan-line" />
          <div className="ais-scan-overlay" />
          <div className="ais-scan-progress-ring">
            <svg viewBox="0 0 80 80" className="ais-ring-svg">
              <circle cx="40" cy="40" r="32" className="ais-ring-track" />
              <circle
                cx="40"
                cy="40"
                r="32"
                className="ais-ring-fill"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress / 100)}`}
              />
            </svg>
            <span className="ais-ring-pct">{progress}%</span>
          </div>
        </>
      )}

      {!cameraEnabled && !scanning && (
        <div className="ais-idle-overlay">
          <div className="ais-camera-glow" />
          <svg
            className="ais-camera-icon"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <p className="ais-idle-text">
            Allow camera access to begin AI body scan
          </p>
          <button className="ais-enable-btn" onClick={onEnable} type="button">
            Enable Camera
          </button>

          <UploadButton />          
        </div>
      )}

      {cameraEnabled && !scanning && (
        <div className="ais-ready-overlay">
          <p className="ais-ready-text">
            Camera ready — position yourself in frame
          </p>
        </div>
      )}
    </div>
  );
});

// ── Main Component ────────────────────────────────────
export default function AIScan() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // Base64 data URL

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
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setStream(null);
    setCameraEnabled(false);
  };

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

    // 1. Video frame එක capture කරනවා
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");

    // 2. Scan animation start
    setScanning(true);
    setProgress(0);
    setDone(false);
    setError("");

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setScanning(false);

          // 3. Animation ඉවර වූ විට capturedImage state එකට assign
          setCapturedImage(imageDataURL);
          console.log("Captured Image:", imageDataURL);
          handleDisableCamera(); // Camera stream එක stop කරනවා

          setDone(true);
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  const handleContinue = () => {
    if (!done) {
      setError("Please complete the AI scan before continuing.");
      return;
    }
    // capturedImage state එකේ Base64 image eka available — next step handle කරන්න
  };

  return (
    <div className="atelier-root">
      <Header />
    <div className="atelier-page">
      <HeaderTitel />
      <SelecterBar />
      <div className="ais-glow-bottom" />

      <main className="ais-card">
        <div className="ais-card-header">
          <div className="ais-card-icon">
            <svg
              width="20"
              height="20"
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

        <CameraViewport
          ref={videoRef}
          stream={stream}
          cameraEnabled={cameraEnabled}
          onEnable={handleEnableCamera}
          scanning={scanning}
          progress={progress}
        />

        {error && <p className="ais-error">{error}</p>}

        {done && (
          <div className="ais-success">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Scan complete — measurements captured!
          </div>
        )}

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
