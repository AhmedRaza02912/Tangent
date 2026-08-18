import { useEffect, useRef, useState, useCallback } from "react";
import { driverImages } from "../../../utils/driverImages";
import "./RaceFinishGraph.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/* ── Team colour palette ── */
const TEAM_COLORS = {
  red_bull:      "#3671C6",
  mercedes:      "#6CD3BF",
  ferrari:       "#E8002D",
  mclaren:       "#FF8000",
  alpine:        "#FF87BC",
  aston_martin:  "#229971",
  haas:          "#B6BABD",
  racing_bulls:  "#6692FF",
  williams:      "#1868DB",
  cadillac:      "#888888",
  audi:          "#C00000",
};
const FALLBACK_COLOR = "#9ca3af";

/* Podium dot colours */
const DOT_GOLD   = "#FFD700";
const DOT_SILVER = "#C0C0C0";
const DOT_BRONZE = "#CD7F32";
const DOT_DNF    = "#ef4444";

/* All selectable drivers (keyed by ergast driverId) */
const ALL_DRIVERS = [
  { id: "max_verstappen",  label: "Max Verstappen" },
  { id: "hamilton",        label: "Lewis Hamilton" },
  { id: "leclerc",         label: "Charles Leclerc" },
  { id: "norris",          label: "Lando Norris" },
  { id: "piastri",         label: "Oscar Piastri" },
  { id: "russell",         label: "George Russell" },
  { id: "antonelli",       label: "Kimi Antonelli" },
  { id: "sainz",           label: "Carlos Sainz" },
  { id: "alonso",          label: "Fernando Alonso" },
  { id: "stroll",          label: "Lance Stroll" },
  { id: "gasly",           label: "Pierre Gasly" },
  { id: "colapinto",       label: "Franco Colapinto" },
  { id: "albon",           label: "Alexander Albon" },
  { id: "lawson",          label: "Liam Lawson" },
  { id: "hadjar",          label: "Isack Hadjar" },
  { id: "bearman",         label: "Ollie Bearman" },
  { id: "ocon",            label: "Esteban Ocon" },
  { id: "hulkenberg",      label: "Nico Hülkenberg" },
  { id: "bortoleto",       label: "Gabriel Bortoleto" },
  { id: "arvid_lindblad",  label: "Arvid Lindblad" },
];

function getDotColor(position, constructorId) {
  if (position === 1) return DOT_GOLD;
  if (position === 2) return DOT_SILVER;
  if (position === 3) return DOT_BRONZE;
  return TEAM_COLORS[constructorId] ?? FALLBACK_COLOR;
}

function getTeamColor(constructorId) {
  return TEAM_COLORS[constructorId] ?? FALLBACK_COLOR;
}

/* ── Tooltip state ── */
const TOOLTIP_NONE = { visible: false };

export default function RaceFinishGraph() {
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [driverData, setDriverData]               = useState([]);
  const [loading, setLoading]                     = useState(false);
  const [tooltip, setTooltip]                     = useState(TOOLTIP_NONE);
  const [addOpen, setAddOpen]                     = useState(false);
  const canvasRef   = useRef(null);
  const containerRef = useRef(null);

  /* ── Fetch whenever selectedDriverIds changes ── */
  useEffect(() => {
    if (selectedDriverIds.length === 0) {
      setDriverData([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const params = selectedDriverIds.map(id => `ids=${encodeURIComponent(id)}`).join("&");
    fetch(`${API_BASE_URL}/api/f1/drivers/position-history?${params}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { setDriverData(data); setLoading(false); })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [selectedDriverIds]);

  /* ── Draw canvas ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr    = window.devicePixelRatio || 1;
    const W      = container.clientWidth;
    const H      = container.clientHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    canvas._dots = [];

    if (driverData.length === 0) return;

    const PAD_TOP    = 24;
    const PAD_BOTTOM = 52;
    const PAD_LEFT   = 40;
    const PAD_RIGHT  = 16;
    const plotW = W - PAD_LEFT - PAD_RIGHT;
    const plotH = H - PAD_TOP - PAD_BOTTOM;

    /* Collect all unique rounds/races */
    const allRaces = [];
    const seenRounds = new Set();
    for (const driver of driverData) {
      for (const r of driver.races) {
        if (!seenRounds.has(r.round)) {
          seenRounds.add(r.round);
          allRaces.push({ round: r.round, country: r.country, raceName: r.raceName });
        }
      }
    }
    allRaces.sort((a, b) => a.round - b.round);
    const numRaces = allRaces.length;
    if (numRaces === 0) return;

    const MAX_POS   = 20;
    const xStep     = plotW / (numRaces - 1 || 1);
    const yScale    = (pos) => PAD_TOP + ((pos - 1) / (MAX_POS - 1)) * plotH;
    const xScale    = (i)   => PAD_LEFT + i * xStep;
    const roundIndex = new Map(allRaces.map((r, i) => [r.round, i]));

    /* ── Grid lines ── */
    const gridPositions = [1, 3, 5, 10, 15, 20];
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth   = 1;
    gridPositions.forEach(pos => {
      const y = yScale(pos);
      ctx.beginPath();
      ctx.moveTo(PAD_LEFT, y);
      ctx.lineTo(PAD_LEFT + plotW, y);
      ctx.stroke();
    });

    /* ── Y-axis labels ── */
    ctx.fillStyle  = "rgba(200,210,255,0.55)";
    ctx.font       = "11px Inter, sans-serif";
    ctx.textAlign  = "right";
    gridPositions.forEach(pos => {
      ctx.fillText(pos === 1 ? "P1" : `P${pos}`, PAD_LEFT - 6, yScale(pos) + 4);
    });

    /* ── X-axis race labels ── */
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(200,210,255,0.55)";
    ctx.font      = "10px Inter, sans-serif";
    const maxLabels = Math.floor(plotW / 46);
    const labelStep = Math.max(1, Math.ceil(numRaces / maxLabels));
    allRaces.forEach((race, i) => {
      if (i % labelStep !== 0 && i !== numRaces - 1) return;
      const x = xScale(i);
      // Short country name — up to 3 chars
      const label = race.country.slice(0, 3).toUpperCase();
      ctx.save();
      ctx.translate(x, PAD_TOP + plotH + 14);
      ctx.rotate(-Math.PI / 5);
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });

    /* ── Per-driver: line then dots ── */
    // Store dot hit-areas for mousemove tooltip

    for (const driver of driverData) {
      const color = getTeamColor(driver.constructorId);
      const points = driver.races
        .map(r => {
          const idx = roundIndex.get(r.round);
          if (idx === undefined) return null;
          const y = r.dnf ? yScale(MAX_POS) + 8 : (r.position != null ? yScale(r.position) : null);
          return y != null ? { x: xScale(idx), y, r } : null;
        })
        .filter(Boolean);

      /* Line */
      if (points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
        ctx.lineJoin    = "round";
        ctx.setLineDash([]); 
        points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      /* Dots */
      points.forEach(pt => {
        const dotColor = pt.r.dnf
          ? DOT_DNF
          : getDotColor(pt.r.position, driver.constructorId);

        const radius = (pt.r.position <= 3 && !pt.r.dnf) ? 7 : 5;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle   = dotColor;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.6)";
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // Store for tooltip hit-test
        canvas._dots.push({ x: pt.x, y: pt.y, r: radius + 4, data: pt.r, driver, dotColor });
      });
    }
  }, [driverData]);

  useEffect(() => {
    draw();
    const ro = new ResizeObserver(draw);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [draw]);

  /* ── Mouse tooltip ── */
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas._dots) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = canvas._dots.find(d => {
      const dx = mx - d.x, dy = my - d.y;
      return Math.sqrt(dx * dx + dy * dy) <= d.r;
    });

    if (hit) {
      setTooltip({
        visible: true,
        x: hit.x, y: hit.y,
        race: hit.data.raceName,
        country: hit.data.country,
        driver: hit.driver.driverName,
        pos: hit.data.dnf ? "DNF" : `P${hit.data.position}`,
        color: hit.dotColor,
      });
    } else {
      setTooltip(TOOLTIP_NONE);
    }
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(TOOLTIP_NONE), []);

  /* ── Driver management ── */
  const removeDriver = (id) =>
    setSelectedDriverIds(prev => prev.filter(d => d !== id));

  const addDriver = (id) => {
    if (selectedDriverIds.includes(id) || selectedDriverIds.length >= 5) return;
    setSelectedDriverIds(prev => [...prev, id]);
    setAddOpen(false);
  };

  const available = ALL_DRIVERS.filter(d => !selectedDriverIds.includes(d.id));

  return (
    <div className="rfg-card">
      {/* Header */}
      <div className="rfg-header">
        <h3 className="rfg-title">Race Finish Positions</h3>

        <div className="rfg-controls">
          {/* Active driver chips */}
          <div className="rfg-chips">
            {selectedDriverIds.map(id => {
              const meta    = driverData.find(d => d.driverId === id);
              const color   = getTeamColor(meta?.constructorId);
              const label   = ALL_DRIVERS.find(d => d.id === id)?.label ?? id;
              return (
                <span
                  key={id}
                  className="rfg-chip"
                  style={{ borderColor: color, color }}
                >
                  <span className="rfg-chip-dot" style={{ background: color }} />
                  {label}
                  <button className="rfg-chip-remove" onClick={() => removeDriver(id)}>×</button>
                </span>
              );
            })}
          </div>

          {/* Add driver */}
          {selectedDriverIds.length < 5 && (
            <div className="rfg-add-wrap">
              <button
                className="rfg-add-btn"
                onClick={() => setAddOpen(o => !o)}
              >
                + Add Driver
              </button>
              {addOpen && (
                <div className="rfg-dropdown">
                  {available.map(d => (
                    <button
                      key={d.id}
                      className="rfg-dropdown-item"
                      onClick={() => addDriver(d.id)}
                    >
                      {driverImages[d.id] && (
                        <img src={driverImages[d.id]} alt={d.label} className="rfg-dropdown-avatar" />
                      )}
                      {d.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="rfg-legend">
        <span className="rfg-legend-item"><span className="rfg-legend-dot" style={{ background: DOT_GOLD }} />1st</span>
        <span className="rfg-legend-item"><span className="rfg-legend-dot" style={{ background: DOT_SILVER }} />2nd</span>
        <span className="rfg-legend-item"><span className="rfg-legend-dot" style={{ background: DOT_BRONZE }} />3rd</span>
        <span className="rfg-legend-item"><span className="rfg-legend-dot" style={{ background: DOT_DNF }} />DNF</span>
      </div>

      {/* Canvas */}
      <div className="rfg-canvas-wrap" ref={containerRef}>
        {loading && <div className="rfg-loading">Loading data…</div>}
        {!loading && driverData.length === 0 && (
          <div className="rfg-loading">No race data yet this season.</div>
        )}
        <canvas
          ref={canvasRef}
          className="rfg-canvas"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="rfg-tooltip"
            style={{ left: tooltip.x + 14, top: tooltip.y - 14 }}
          >
            <div className="rfg-tooltip-pos" style={{ color: tooltip.color }}>
              {tooltip.pos}
            </div>
            <div className="rfg-tooltip-driver">{tooltip.driver}</div>
            <div className="rfg-tooltip-race">{tooltip.race}</div>
          </div>
        )}
      </div>
    </div>
  );
}
