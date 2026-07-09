import { forwardRef, useEffect } from "react";
import UploadButton from "./Button/UploadButton";

export const CameraViewport = forwardRef(function CameraViewport(
  {
    stream,
    cameraEnabled,
    onEnable,
    scanning,
    progress,
    done,
    onRescan,
    onImageSelect,
  },
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

      {done && !scanning && (
        <div className="ais-done-overlay">
          <svg
            className="ais-done-icon"
            width="40"
            height="40"
            fill="none"
            stroke="#EBB355"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <p className="ais-done-text">Scan Complete</p>
          <button className="ais-rescan-btn" onClick={onRescan} type="button">
            Rescan
          </button>
        </div>
      )}

      {!cameraEnabled && !scanning && !done && (
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
          <UploadButton onImageSelect={onImageSelect} />
        </div>
      )}

      {cameraEnabled && !scanning && !done && (
        <div className="ais-ready-overlay">
          <p className="ais-ready-text">
            Camera ready — position yourself in frame
          </p>
        </div>
      )}
    </div>
  );
});
