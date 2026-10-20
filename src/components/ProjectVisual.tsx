export default function ProjectVisual({
  theme,
  label,
}: {
  theme: string;
  label: string;
}) {
  return (
    <div className={`project-visual ${theme}`} aria-hidden="true">
      <div className="visual-top">
        <span>ILLUSTRATIVE DIAGRAM</span>
        <span className="visual-dot" />
      </div>
      {theme === "pathology" && (
        <div className="cell-field">
          {Array.from({ length: 14 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 19) % 85}%`,
                top: `${(i * 31) % 65}%`,
                width: 45 + ((i * 17) % 60),
                transform: `rotate(${i * 47}deg)`,
              }}
            />
          ))}
          <div className="scan-frame">
            <span>REGION OF INTEREST</span>
            <b>SEGMENTATION</b>
          </div>
        </div>
      )}
      {theme === "flood" && (
        <div className="terrain">
          <svg viewBox="0 0 600 300" preserveAspectRatio="none">
            <defs>
              <pattern
                id="terrain-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".5"
                />
              </pattern>
            </defs>
            <rect width="600" height="300" fill="url(#terrain-grid)" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M-20 ${35 + i * 38} C100 ${-80 + i * 42} 140 ${210 + i * 21} 280 ${80 + i * 35} S470 ${120 + i * 30} 630 ${20 + i * 45}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
            <path
              d="M190 -20 C400 60 180 120 340 175 S290 250 440 330"
              fill="none"
              stroke="#a8d9dd"
              strokeWidth="46"
            />
            <path
              d="M190 -20 C400 60 180 120 340 175 S290 250 440 330"
              fill="none"
              stroke="#267a88"
              strokeWidth="24"
            />
          </svg>
          <span className="map-marker">
            + <small>FLOOD EXTENT</small>
          </span>
        </div>
      )}
      {theme === "pipeline" && (
        <div className="data-flow">
          <div className="raw-data">
            <span>{"{ raw_data }"}</span>
            <span>text / csv / logs</span>
            <span>{"[ unstructured ]"}</span>
          </div>
          <div className="flow-line" />
          <div className="model-node">
            <span>LLAMA 3</span>
            <b>
              Schema
              <br />
              inference
            </b>
            <span>↓</span>
          </div>
          <div className="flow-line" />
          <div className="data-table">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i}>
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
        </div>
      )}
      {theme === "security" && (
        <div className="security-console">
          <div>
            <span>01</span> ingest.system_logs()
          </div>
          <div>
            <span>02</span> normalize(events)
          </div>
          <div>
            <span>03</span> correlate(context)
          </div>
          <div className="console-highlight">
            <span>→</span> threat.signal_detected
          </div>
          <div className="signal-bars">
            {[
              20, 35, 25, 55, 32, 80, 40, 95, 60, 30, 45, 25, 65, 36, 20, 48,
              28, 18,
            ].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}
      <span className="visual-label">{label}</span>
    </div>
  );
}
