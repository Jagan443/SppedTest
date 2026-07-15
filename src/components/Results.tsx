interface ResultsProps {
  ping: number;
  download: number;
  upload: number;
  jitter: number;
}

export default function Results({
  ping,
  download,
  upload,
  jitter,
}: ResultsProps) {
  return (
    <div className="results">
      <div className="results-grid">
        <div className="result-card">
          <div className="result-card-icon download">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <div className="result-card-content">
            <span className="result-card-label">Download</span>
            <span className="result-card-value">{download.toFixed(1)}</span>
            <span className="result-card-unit">Mbps</span>
          </div>
        </div>

        <div className="result-card">
          <div className="result-card-icon upload">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="result-card-content">
            <span className="result-card-label">Upload</span>
            <span className="result-card-value">{upload.toFixed(1)}</span>
            <span className="result-card-unit">Mbps</span>
          </div>
        </div>

        <div className="result-card">
          <div className="result-card-icon ping">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="result-card-content">
            <span className="result-card-label">Latency</span>
            <span className="result-card-value">{ping}</span>
            <span className="result-card-unit">ms</span>
          </div>
        </div>

        <div className="result-card">
          <div className="result-card-icon jitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="result-card-content">
            <span className="result-card-label">Jitter</span>
            <span className="result-card-value">{jitter}</span>
            <span className="result-card-unit">ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
