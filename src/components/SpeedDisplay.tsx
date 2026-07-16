import type { TestPhase } from "../utils/speedTest";

interface SpeedDisplayProps {
  value: number;
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
const BARS = 30;

export default function SpeedDisplay({
  value,
  isActive,
  phase,
}: SpeedDisplayProps) {
  const displayValue =
    value < 10 ? value.toFixed(1) : value < 100 ? value.toFixed(1) : Math.round(value);

  const fillRatio = Math.min(value / MAX_SPEED, 1);
  const activeBars = Math.round(fillRatio * BARS);
  const label = PHASE_LABELS[phase] ?? "";

  return (
    <div className={`speed-display ${isActive ? "active" : ""}`}>
      <div className="dig-frame">
        {/* Top status row */}
        <div className="dig-header">
          <span className="dig-dot" />
          <span className="dig-label">SPEED</span>
          <span className="dig-label right">Mbps</span>
        </div>

        {/* Main digital readout */}
        <div className="dig-display">
          <span className="dig-num">{displayValue}</span>
        </div>

        {/* Segmented bar */}
        <div className="dig-bar-row">
          <div className="dig-bar">
            {Array.from({ length: BARS }, (_, i) => {
              const ratio = i / (BARS - 1);
              const on = i < activeBars;
              let color = "var(--accent)";
              if (ratio > 0.7) color = "var(--accent-red)";
              else if (ratio > 0.45) color = "var(--accent-yellow)";
              return (
                <div
                  key={i}
                  className={`dig-seg ${on ? "on" : ""}`}
                  style={
                    on
                      ? { backgroundColor: color, boxShadow: `0 0 6px ${color}50, inset 0 0 2px ${color}30` }
                      : undefined
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Scale row */}
        <div className="dig-scale">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>400</span>
          <span>500</span>
        </div>

        {/* Bottom row */}
        <div className="dig-footer">
          <div className="dig-phase-box">
            {label ? (
              <span className="dig-phase">{label}</span>
            ) : (
              <span className="dig-phase off">READY</span>
            )}
          </div>
          <div className="dig-peak">
            <span className="dig-peak-label">PEAK</span>
            <span className="dig-peak-val">{displayValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
