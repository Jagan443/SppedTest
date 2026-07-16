import type { TestPhase } from "../utils/speedTest";

interface SpeedDisplayProps {
  value: number;
  unit: string;
  isActive: boolean;
  phase: TestPhase;
}

const PHASE_LABELS: Record<string, string> = {
  ping: "PING",
  download: "DOWNLOAD",
  upload: "UPLOAD",
  idle: "",
  done: "",
};

const MAX_SPEED = 500;
const SEGMENTS = 40;

export default function SpeedDisplay({
  value,
  unit,
  isActive,
  phase,
}: SpeedDisplayProps) {
  const displayValue =
    value < 10 ? value.toFixed(1) : value < 100 ? value.toFixed(1) : Math.round(value);

  const fillRatio = Math.min(value / MAX_SPEED, 1);
  const activeSegments = Math.round(fillRatio * SEGMENTS);
  const label = PHASE_LABELS[phase] ?? "";

  return (
    <div className={`speed-display ${isActive ? "active" : ""}`}>
      <div className="dash-frame">
        <div className="dash-top-bar">
          <span className="dash-brand">SPEEDTEST</span>
          <span className="dash-max">MAX {MAX_SPEED}</span>
        </div>

        <div className="dash-body">
          <div className="dash-segments">
            {Array.from({ length: SEGMENTS }, (_, i) => {
              const ratio = i / (SEGMENTS - 1);
              const isActive = i < activeSegments;
              let color = "#00d4ff";
              if (ratio > 0.7) color = "#ff6b6b";
              else if (ratio > 0.45) color = "#ffc107";
              return (
                <div
                  key={i}
                  className={`dash-segment ${isActive ? "on" : ""}`}
                  style={{
                    backgroundColor: isActive ? color : "rgba(255,255,255,0.04)",
                    boxShadow: isActive ? `0 0 8px ${color}40` : "none",
                  }}
                />
              );
            })}
          </div>

          <div className="dash-speed">
            <span className="dash-digits">{displayValue}</span>
            <span className="dash-unit">{unit}</span>
          </div>
        </div>

        <div className="dash-bottom">
          {label ? (
            <span className="dash-phase">{label}</span>
          ) : (
            <span className="dash-phase idle">READY</span>
          )}
          <div className="dash-underline" style={{ width: `${fillRatio * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
