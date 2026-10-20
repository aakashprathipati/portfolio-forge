import { useId, useState } from "react";
import {
  facilities,
  floodExtents,
  parseExampleLogs,
  pointInPolygon,
  sampleLogs,
  sampleOrders,
  segmentationTiles,
  transformOrders,
} from "@/data/project-examples";
import type { PortfolioProject } from "@/data/projects";

function SegmentationExplorer() {
  const [view, setView] = useState("overlay");
  const [threshold, setThreshold] = useState(50);
  const id = useId();
  const selected = segmentationTiles.filter(
    (tile) => tile.score >= threshold,
  ).length;
  return (
    <>
      <div className="explorer-controls">
        <fieldset className="segmented-controls">
          <legend>Image view</legend>
          {["source", "overlay", "mask"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`${id}-view`}
                value={option}
                checked={view === option}
                onChange={() => setView(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        <label className="range-control" htmlFor={`${id}-threshold`}>
          Selection threshold{" "}
          <output htmlFor={`${id}-threshold`}>{threshold} / 100</output>
          <input
            id={`${id}-threshold`}
            type="range"
            min="20"
            max="80"
            step="5"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="explorer-workspace segmentation-workspace">
        <figure>
          <svg
            viewBox="0 0 600 400"
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>Synthetic segmentation {view}</title>
            <desc id={`${id}-desc`}>
              A generated 12 by 8 tile field. {selected} of 96 tiles meet the
              selected threshold. These are generated shapes, not a medical
              scan.
            </desc>
            <rect
              width="600"
              height="400"
              fill={view === "mask" ? "#182b29" : "#eadce8"}
            />
            {segmentationTiles.map((tile, i) => (
              <g key={i}>
                {view !== "mask" && (
                  <>
                    <rect
                      x={tile.x * 50}
                      y={tile.y * 50}
                      width="50"
                      height="50"
                      fill={`hsl(${285 + tile.score / 10} 24% ${88 - tile.score / 3}%)`}
                    />
                    <ellipse
                      cx={tile.x * 50 + 25}
                      cy={tile.y * 50 + 24}
                      rx={10 + (i % 9)}
                      ry={7 + (i % 11)}
                      transform={`rotate(${i * 29} ${tile.x * 50 + 25} ${tile.y * 50 + 24})`}
                      fill="#754d86"
                      opacity="0.5"
                    />
                  </>
                )}
                {view !== "source" && tile.score >= threshold && (
                  <rect
                    x={tile.x * 50 + 1}
                    y={tile.y * 50 + 1}
                    width="48"
                    height="48"
                    rx="5"
                    fill="#dce69c"
                    fillOpacity={view === "mask" ? 1 : 0.65}
                    stroke="#294c3d"
                  />
                )}
              </g>
            ))}
          </svg>
          <figcaption>
            Generated tile field ·{" "}
            {view === "source" ? "source only" : "selected regions in lime"}
          </figcaption>
        </figure>
        <div className="explorer-reading">
          <p className="eyebrow">SPATIAL EVIDENCE</p>
          <p className="explorer-number" aria-live="polite">
            {selected}
            <span> / 96 tiles</span>
          </p>
          <p>
            Move the threshold to see how the selected region changes. Switch
            views to keep the source and mask distinct.
          </p>
          <div
            className="sample-meter"
            role="img"
            aria-label={`${selected} of 96 synthetic tiles selected`}
          >
            <span style={{ width: `${(selected / 96) * 100}%` }} />
          </div>
          <h3>What this explains</h3>
          <p>
            A mask is a spatial artifact. A written interpretation should remain
            attached to that artifact and its original coordinates.
          </p>
        </div>
      </div>
      <p className="example-caption">
        Synthetic illustration. Threshold values are arbitrary selection scores,
        not calibrated probabilities, diagnostic findings, or measured model
        performance.
      </p>
    </>
  );
}

function FloodExplorer() {
  const [extent, setExtent] = useState(1);
  const [facilityId, setFacilityId] = useState("central");
  const id = useId();
  const polygon = floodExtents[extent];
  const facility = facilities.find((item) => item.id === facilityId)!;
  const inside = pointInPolygon(facility.point, polygon);
  const matches = facilities.filter((item) =>
    pointInPolygon(item.point, polygon),
  ).length;
  return (
    <>
      <div className="explorer-controls">
        <label className="range-control" htmlFor={`${id}-extent`}>
          Illustrative flood extent{" "}
          <output htmlFor={`${id}-extent`}>
            {["Narrow", "Medium", "Wide"][extent]}
          </output>
          <input
            id={`${id}-extent`}
            type="range"
            min="0"
            max="2"
            step="1"
            value={extent}
            onChange={(event) => setExtent(Number(event.target.value))}
          />
        </label>
        <label className="select-control" htmlFor={`${id}-facility`}>
          Feature to query
          <select
            id={`${id}-facility`}
            value={facilityId}
            onChange={(event) => setFacilityId(event.target.value)}
          >
            {facilities.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="explorer-workspace flood-workspace">
        <figure>
          <svg
            viewBox="0 0 640 380"
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>
              Schematic flood extent and fictional facilities
            </title>
            <desc id={`${id}-desc`}>
              {facility.name} is {inside ? "inside" : "outside"} the selected
              polygon. {matches} of four fictional facilities intersect the
              flood extent.
            </desc>
            <rect width="640" height="380" fill="#e4e7d6" />
            {Array.from({ length: 14 }, (_, i) => (
              <path
                key={i}
                d={`M-30 ${i * 32 - 80} C120 ${i * 32 + 90} 170 ${i * 32 - 90} 350 ${i * 32 + 10} S540 ${i * 32 - 20} 680 ${i * 32 + 60}`}
                stroke="#a9b49d"
                strokeWidth="1"
                fill="none"
              />
            ))}
            <path
              d="M0 75 L155 110 L300 190 L445 120 L640 80 M190 0 L225 150 L225 380"
              stroke="#f6f5ef"
              strokeWidth="18"
              fill="none"
            />
            <path
              d="M0 75 L155 110 L300 190 L445 120 L640 80 M190 0 L225 150 L225 380"
              stroke="#8a927e"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              fill="none"
            />
            <polygon
              points={polygon.map((point) => point.join(",")).join(" ")}
              fill="#5da6a7"
              fillOpacity="0.65"
              stroke="#24666c"
              strokeWidth="2"
            />
            {facilities.map((item) => (
              <g key={item.id}>
                <circle
                  cx={item.point[0]}
                  cy={item.point[1]}
                  r={item.id === facilityId ? 10 : 6}
                  fill={item.id === facilityId ? "#dce69c" : "#f6f5ef"}
                  stroke="#1c2923"
                  strokeWidth="2"
                />
                <text
                  x={item.point[0] + 14}
                  y={item.point[1] - 12}
                  fontSize="13"
                  fill="#1c2923"
                >
                  {item.name}
                </text>
              </g>
            ))}
            <text x="24" y="350" fontSize="12" fill="#344b40">
              SCHEMATIC · NO REAL COORDINATES
            </text>
          </svg>
          <figcaption>
            Teal: synthetic flood polygon · Lime: selected feature
          </figcaption>
        </figure>
        <div className="explorer-reading">
          <p className="eyebrow">POINT-IN-POLYGON QUERY</p>
          <h3 className="query-result" aria-live="polite">
            {facility.name}
            <span>
              {inside ? "Intersects flood extent" : "Outside flood extent"}
            </span>
          </h3>
          <p>
            The result is calculated from the selected point and polygon in this
            browser. Boundary points count as intersections.
          </p>
          <p className="explorer-number">
            {matches}
            <span> / 4 features intersect</span>
          </p>
          <h3>Geometry, then context</h3>
          <p>
            An intersection identifies a spatial match. It does not establish
            damage, flood depth, or whether a facility is operating.
          </p>
        </div>
      </div>
      <p className="example-caption">
        Synthetic map and fictional facilities. No satellite data, geolocation
        service, Mapbox connection, or live emergency information is used.
      </p>
    </>
  );
}

function EtlExplorer() {
  const [deduplicate, setDeduplicate] = useState(true);
  const result = transformOrders(sampleOrders, deduplicate);
  const groups = [
    {
      name: "Candidate records",
      count: result.accepted.length,
      kind: "accepted",
    },
    { name: "Duplicates removed", count: result.duplicates, kind: "duplicate" },
    { name: "Quarantined", count: result.rejected.length, kind: "rejected" },
  ];
  return (
    <>
      <div className="explorer-controls">
        <label className="checkbox-control">
          <input
            type="checkbox"
            checked={deduplicate}
            onChange={(event) => setDeduplicate(event.target.checked)}
          />{" "}
          Remove identical duplicate orders
        </label>
        <span className="sample-label">8 fictional input records</span>
      </div>
      <figure className="reconciliation-chart">
        <div className="reconciliation-bar" aria-hidden="true">
          {groups.map((group) => (
            <span
              className={group.kind}
              key={group.name}
              style={{ width: `${(group.count / sampleOrders.length) * 100}%` }}
            />
          ))}
        </div>
        <figcaption>
          {groups.map((group) => (
            <span key={group.name}>
              <i className={group.kind} aria-hidden="true" />
              {group.name} <strong>{group.count}</strong>
            </span>
          ))}
        </figcaption>
      </figure>
      <div className="etl-tables">
        <div>
          <h3>01 / Source records</h3>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Source order table"
          >
            <table>
              <caption className="sr-only">Synthetic raw order records</caption>
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <code>{row.order}</code>
                    </td>
                    <td>{row.customer || "—"}</td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3>02 / Candidate orders</h3>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Candidate order table"
          >
            <table>
              <caption className="sr-only">
                Cleaned candidate order records
              </caption>
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer key</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {result.accepted.map((row, index) => (
                  <tr key={index}>
                    <td>{row.order}</td>
                    <td>{row.customer}</td>
                    <td>{row.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="schema-preview">
        <div>
          <p className="eyebrow">CUSTOMERS</p>
          <strong>{result.customers.length} entities</strong>
          <p>
            <code>customer_id</code> → <code>name</code>
          </p>
        </div>
        <span className="schema-relationship">1 → many</span>
        <div>
          <p className="eyebrow">ORDERS</p>
          <strong>{result.accepted.length} candidates</strong>
          <p>
            <code>order_id</code> · <code>customer_id</code> ·{" "}
            <code>amount</code>
          </p>
        </div>
      </div>
      <p
        className={`validation-message ${result.uniqueKeys ? "valid" : "blocked"}`}
        role="status"
      >
        {result.uniqueKeys
          ? "Sample key check passed: each candidate order has a unique identifier."
          : "Promotion blocked: duplicate order keys remain. Enable deduplication to reconcile them."}
      </p>
      <details className="sample-details">
        <summary>
          Inspect quarantined records ({result.rejected.length})
        </summary>
        <ul>
          {result.rejected.map((row) => (
            <li key={row.order}>
              <code>{row.order}</code>
              <span>{row.reason}</span>
            </li>
          ))}
        </ul>
      </details>
      <p className="example-caption">
        Deterministic browser example with fictional records. Counts reconcile
        to the eight input rows. The schema illustration is not an LLM call or a
        proof of automatic 3NF normalization.
      </p>
    </>
  );
}

function SecurityExplorer() {
  const [text, setText] = useState(sampleLogs);
  const [errorsOnly, setErrorsOnly] = useState(false);
  const id = useId();
  const result = parseExampleLogs(text);
  const categories = [1, 2, 3, 4, 5].map((group) => ({
    label: `${group}xx`,
    count: result.parsed.filter((row) => Math.floor(row.status / 100) === group)
      .length,
  }));
  const max = Math.max(1, ...categories.map((item) => item.count));
  const visible = result.parsed.filter(
    (row) => !errorsOnly || row.status >= 400,
  );
  return (
    <>
      <div className="explorer-controls">
        <label className="checkbox-control">
          <input
            type="checkbox"
            checked={errorsOnly}
            onChange={(event) => setErrorsOnly(event.target.checked)}
          />{" "}
          Show only 4xx / 5xx events in the table
        </label>
        <button
          className="text-link"
          type="button"
          onClick={() => {
            setText(sampleLogs);
            setErrorsOnly(false);
          }}
        >
          Reset sample
        </button>
      </div>
      <div className="security-example-grid">
        <div>
          <label className="code-label" htmlFor={`${id}-logs`}>
            Edit sample log lines
          </label>
          <textarea
            id={`${id}-logs`}
            className="log-input"
            value={text}
            maxLength={8000}
            spellCheck={false}
            onChange={(event) => setText(event.target.value)}
          />
          <p className="input-help">
            Local parser · first 100 nonempty lines · 8,000-character limit · no
            network requests
          </p>
        </div>
        <figure className="event-chart">
          <h3>HTTP status distribution</h3>
          <p>Counts across all parsed sample events</p>
          <div className="event-bars">
            {categories.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <div>
                  <i style={{ width: `${(item.count / max) * 100}%` }} />
                </div>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
          <figcaption aria-live="polite">
            {result.parsed.length} parsed · {result.rejected.length} unparsed ·{" "}
            {result.total} input lines
          </figcaption>
        </figure>
      </div>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Parsed security event table"
      >
        <table>
          <caption>
            Normalized sample events{errorsOnly ? " · 4xx / 5xx filter" : ""}
          </caption>
          <thead>
            <tr>
              <th scope="col">Source address</th>
              <th scope="col">Timestamp / source offset</th>
              <th scope="col">Request</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length ? (
              visible.map((row, index) => (
                <tr key={index}>
                  <td>
                    <code>{row.source}</code>
                  </td>
                  <td>{row.timestamp}</td>
                  <td>
                    <code>
                      {row.method} {row.path}
                    </code>
                  </td>
                  <td>
                    <span
                      className={`status-code ${row.status >= 400 ? "status-review" : ""}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  No matching events. Edit the input or reset the sample.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {result.rejected.length > 0 && (
        <details className="sample-details">
          <summary>Inspect unparsed lines ({result.rejected.length})</summary>
          <ul>
            {result.rejected.map((line, i) => (
              <li key={i}>
                <code>{line}</code>
                <span>
                  Does not match this example’s IPv4 access-log format.
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <p className="example-caption">
        Fictional access logs with reserved example IPs. HTTP errors are review
        signals, not proof of malicious activity. This format-limited parser
        performs no attribution, IP lookup, or AI inference.
      </p>
    </>
  );
}

export default function ProjectExplorer({
  theme,
}: {
  theme: PortfolioProject["theme"];
}) {
  return (
    <div className={`project-explorer explorer-${theme}`}>
      {theme === "pathology" ? (
        <SegmentationExplorer />
      ) : theme === "flood" ? (
        <FloodExplorer />
      ) : theme === "pipeline" ? (
        <EtlExplorer />
      ) : (
        <SecurityExplorer />
      )}
    </div>
  );
}
