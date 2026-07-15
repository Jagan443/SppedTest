interface SpeedDisplayProps {
  value: number;
  unit: string;
  isActive: boolean;
}

export default function SpeedDisplay({
  value,
  unit,
  isActive,
}: SpeedDisplayProps) {
  const displayValue =
    value < 10 ? value.toFixed(1) : value < 100 ? value.toFixed(1) : Math.round(value);

  return (
    <div className={`speed-display ${isActive ? "active" : ""}`}>
      <div className="speed-ring-container">
        <svg className="speed-ring" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="3"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="3"
            strokeDasharray="565.48"
            strokeDashoffset={565.48 * 0.75}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            filter={isActive ? "url(#glow)" : "none"}
            className={isActive ? "ring-spin" : ""}
          />
        </svg>

        <div className="speed-number">
          <span className="speed-value">{displayValue}</span>
          <span className="speed-unit">{unit}</span>
        </div>
      </div>


    </div>
  );
}
