import React, { useMemo, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   VIETNAMESE MASTER GUIDE — Comprehensive Edition
   From absolute beginner to advanced proficiency
   Pure SVG icon system · No external icon libraries
   4-level progressive structure · Visual-first pedagogy
   ═══════════════════════════════════════════════════════════ */

// ─── SVG ICON PATHS ────────────────────────────────────────
const ICON_PATHS = {
  bookOpen: "M3 5.5A2.5 2.5 0 0 1 5.5 3H11a3 3 0 0 1 3 3v13.5a2.5 2.5 0 0 0-2.5-2.5H5.5A2.5 2.5 0 0 0 3 19.5zm18 0A2.5 2.5 0 0 0 18.5 3H13a3 3 0 0 0-3 3v13.5a2.5 2.5 0 0 1 2.5-2.5h6A2.5 2.5 0 0 1 21 19.5z",
  globe: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.5 10h-3.2a15.8 15.8 0 0 0-1.1-5A8.04 8.04 0 0 1 19.5 12zM12 4.1c1 .9 2.4 3 3 5.9H9c.6-2.9 2-5 3-5.9zM8.8 7A15.8 15.8 0 0 0 7.7 12H4.5A8.04 8.04 0 0 1 8.8 7zM4.5 13h3.2a15.8 15.8 0 0 0 1.1 5A8.04 8.04 0 0 1 4.5 13zM12 19.9c-1-.9-2.4-3-3-5.9h6c-.6 2.9-2 5-3 5.9zm3.2-1.1a15.8 15.8 0 0 0 1.1-4.8h3.2A8.04 8.04 0 0 1 15.2 18.8z",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8zM19 14l1 2.8L23 18l-3 1.2L19 22l-1-2.8L15 18l3-1.2z",
  layers: "M12 3 3 8l9 5 9-5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5",
  chart: "M4 19V5m0 14h16M8 16V9m4 7V6m4 10v-4",
  volume: "M11 5 7 8H4v8h3l4 3V5zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a8 8 0 0 1 0 12",
  userTree: "M12 5a2.5 2.5 0 1 0 0 .01zM6 19a2.5 2.5 0 1 0 0 .01zM18 19a2.5 2.5 0 1 0 0 .01zM12 7.5V12m0 0H6m6 0h6",
  message: "M4 5h16v10H8l-4 4V5z",
  pen: "M4 20l4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20zm8-11 3 3",
  route: "M6 19a2 2 0 1 0 0 .01zM18 5a2 2 0 1 0 0 .01zM6 17V9a4 4 0 0 1 4-4h6",
  check: "m5 12 4 4L19 7",
  alert: "M12 9v4m0 4h.01M10.3 3.9 2.6 17.2A1 1 0 0 0 3.5 18.7h17a1 1 0 0 0 .9-1.5L13.7 3.9a1 1 0 0 0-1.7 0z",
  clock: "M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
  target: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
  list: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  arrowRight: "M5 12h14m-5-5 5 5-5 5",
  arrowDown: "M12 5v14m-5-5 5 5 5-5",
  map: "M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2zm0 0V4m6 16V6",
  mic: "M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm0 0v4m-4 0h8M7 11a5 5 0 0 0 10 0",
  chevDown: "M6 9l6 6 6-6",
  chevRight: "M9 6l6 6-6 6",
  hash: "M4 9h16M4 15h16M10 3v18M14 3v18",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  mapPin: "M12 21s-8-6.6-8-11a8 8 0 1 1 16 0c0 4.4-8 11-8 11zm0-14a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  coffee: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zm0 12h18",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  compass: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M16.2 7.8l-2 4.4-4.4 2 2-4.4 4.4-2z",
  award: "M8.2 17 12 2l3.8 15M17 17H7l-3 5h16z",
  headphones: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
};

function Icon({ name, className = "h-5 w-5", strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICON_PATHS[name] || ""} />
    </svg>
  );
}

function cn(...c) { return c.filter(Boolean).join(" "); }

// ─── LEVEL SYSTEM ──────────────────────────────────────────
const LEVELS = [
  { id: "all", label: "All Levels", color: "slate" },
  { id: "L1", label: "Foundation", color: "emerald", num: 1, desc: "Sounds, tones, first words" },
  { id: "L2", label: "Survival", color: "sky", num: 2, desc: "Situations, grammar basics, pronouns" },
  { id: "L3", label: "Conversational", color: "amber", num: 3, desc: "Complex sentences, culture, accents" },
  { id: "L4", label: "Advanced", color: "rose", num: 4, desc: "Idioms, registers, fluency" },
];

const LEVEL_STYLES = {
  L1: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", card: "border-emerald-200 bg-emerald-50/60" },
  L2: { badge: "bg-sky-100 text-sky-800 border-sky-200", card: "border-sky-200 bg-sky-50/60" },
  L3: { badge: "bg-amber-100 text-amber-800 border-amber-200", card: "border-amber-200 bg-amber-50/60" },
  L4: { badge: "bg-rose-100 text-rose-800 border-rose-200", card: "border-rose-200 bg-rose-50/60" },
};

// ─── REUSABLE COMPONENTS ───────────────────────────────────

function LevelBadge({ level }) {
  const s = LEVEL_STYLES[level];
  if (!s) return null;
  const l = LEVELS.find(x => x.id === level);
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest", s.badge)}>
      L{l?.num} {l?.label}
    </span>
  );
}

function Section({ id, eyebrow, title, desc, icon, level, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl border border-black/[0.04] bg-white/[0.92] shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
      <button type="button" onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left md:p-7">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              <Icon name={icon} className="h-3 w-3" strokeWidth={2.2} />{eyebrow}
            </span>
            {level && <LevelBadge level={level} />}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{title}</h2>
          {desc && <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-500">{desc}</p>}
        </div>
        <div className="mt-2 shrink-0 rounded-xl bg-slate-100 p-1.5 text-slate-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
          <Icon name="chevDown" className="h-4 w-4" strokeWidth={2.5} />
        </div>
      </button>
      {open && <div className="space-y-4 px-5 pb-6 md:px-7 md:pb-8">{children}</div>}
    </section>
  );
}

function Card({ title, subtitle, icon, children, tone = "default", className: cx }) {
  const tones = {
    default: "border-slate-200/80 bg-slate-50/60",
    emerald: "border-emerald-200/80 bg-emerald-50/60",
    amber: "border-amber-200/80 bg-amber-50/60",
    rose: "border-rose-200/80 bg-rose-50/60",
    sky: "border-sky-200/80 bg-sky-50/60",
    violet: "border-violet-200/80 bg-violet-50/60",
  };
  return (
    <div className={cn("rounded-2xl border p-4", tones[tone], cx)}>
      {(title || subtitle || icon) && (
        <div className="mb-3 flex items-start gap-2.5">
          {icon && <div className="mt-0.5 rounded-xl bg-white p-1.5 text-slate-600 shadow-sm"><Icon name={icon} className="h-4 w-4" /></div>}
          <div className="min-w-0">
            {title && <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="text-[13px] leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all",
        active ? "border-slate-900 bg-slate-900 text-white shadow-md" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")}>
      {children}
    </button>
  );
}

function ExRow({ vi, en, note }) {
  return (
    <div className="rounded-xl border border-white/80 bg-white p-3 shadow-sm">
      <div className="break-words text-[15px] font-semibold text-slate-900">{vi}</div>
      <div className="mt-0.5 text-[13px] text-slate-600">{en}</div>
      {note && <div className="mt-1.5 text-[12px] leading-relaxed text-slate-400">{note}</div>}
    </div>
  );
}

function DataTable({ headers, rows, stripe = true }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80">
      <table className="w-full text-left text-[13px]" style={{ minWidth: headers.length > 3 ? 600 : "auto" }}>
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100/80">
            {headers.map((h, i) => <th key={i} className="whitespace-nowrap px-3 py-2.5 font-semibold text-slate-700">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={cn("border-b border-slate-100 last:border-0", stripe && ri % 2 === 1 && "bg-slate-50/50")}>
              {row.map((cell, ci) => (
                <td key={ci} className={cn("px-3 py-2.5 text-slate-700", ci === 0 && "font-semibold text-slate-900 whitespace-nowrap")}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info: "border-sky-200 bg-sky-50/60 text-sky-900",
    warn: "border-amber-200 bg-amber-50/60 text-amber-900",
    tip: "border-emerald-200 bg-emerald-50/60 text-emerald-900",
    danger: "border-rose-200 bg-rose-50/60 text-rose-900",
  };
  const icons = { info: "alert", warn: "alert", tip: "sparkles", danger: "alert" };
  return (
    <div className={cn("flex gap-3 rounded-xl border p-3.5", styles[type])}>
      <Icon name={icons[type]} className="mt-1 h-4 w-4 shrink-0 opacity-70" strokeWidth={2} />
      <div className="min-w-0 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── TONE PITCH CONTOUR DIAGRAM (SVG) ─────────────────────
function ToneDiagram() {
  // Vietnamese 6 tones shown as pitch contours over time
  // Y-axis: pitch (5=high, 1=low), X-axis: time
  const W = 600, H = 260, PAD = 50, RPAD = 20, TPAD = 20, BPAD = 40;
  const plotW = W - PAD - RPAD;
  const plotH = H - TPAD - BPAD;
  const pitchY = (p) => TPAD + plotH - (p - 1) * (plotH / 4);
  const timeX = (t) => PAD + t * plotW;

  const tones = [
    { name: "Ngang", mark: "(no mark)", word: "ma", meaning: "ghost", color: "#059669", points: [[0,3],[1,3]], desc: "Level mid" },
    { name: "Sắc", mark: "´", word: "má", meaning: "cheek / mom (South)", color: "#e11d48", points: [[0,3],[0.4,3.3],[1,4.8]], desc: "Rising" },
    { name: "Huyền", mark: "`", word: "mà", meaning: "but / which", color: "#2563eb", points: [[0,3],[0.5,2.3],[1,1.5]], desc: "Falling" },
    { name: "Hỏi", mark: "ˀ", word: "mả", meaning: "grave / tomb", color: "#d97706", points: [[0,3],[0.35,1.8],[0.65,1.5],[1,3.5]], desc: "Dipping then rising" },
    { name: "Ngã", mark: "˜", word: "mã", meaning: "horse / code", color: "#7c3aed", points: [[0,3],[0.3,4],[0.45,2.5],[0.55,2.5],[1,4.8]], desc: "Rising, broken, rising" },
    { name: "Nặng", mark: ".", word: "mạ", meaning: "rice seedling", color: "#64748b", points: [[0,3],[0.5,1.8],[0.85,1.2],[1,1]], desc: "Low, heavy drop" },
  ];

  const toPath = (pts) => {
    if (pts.length < 2) return "";
    const coords = pts.map(([t, p]) => [timeX(t), pitchY(p)]);
    let d = `M${coords[0][0]},${coords[0][1]}`;
    for (let i = 1; i < coords.length; i++) {
      const [px, py] = coords[i - 1];
      const [cx, cy] = coords[i];
      const cpx1 = px + (cx - px) * 0.4;
      const cpx2 = px + (cx - px) * 0.6;
      d += ` C${cpx1},${py} ${cpx2},${cy} ${cx},${cy}`;
    }
    return d;
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="mb-3 text-center text-[15px] font-semibold text-slate-800">Pitch Contour Diagram — The 6 Vietnamese Tones</div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 480, maxHeight: 280 }}>
        {/* Grid */}
        {[1,2,3,4,5].map(p => (
          <g key={p}>
            <line x1={PAD} y1={pitchY(p)} x2={W - RPAD} y2={pitchY(p)} stroke="#e2e8f0" strokeWidth={1} strokeDasharray={p === 3 ? "0" : "4 3"} />
            <text x={PAD - 8} y={pitchY(p) + 4} textAnchor="end" fontSize={11} fill="#94a3b8">{p}</text>
          </g>
        ))}
        <text x={PAD - 8} y={TPAD - 6} textAnchor="end" fontSize={10} fill="#94a3b8">Pitch</text>
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#94a3b8">Time →</text>
        {/* Tone curves */}
        {tones.map((t) => (
          <path key={t.name} d={toPath(t.points)} fill="none" stroke={t.color} strokeWidth={2.8} strokeLinecap="round" />
        ))}
      </svg>
      </div>
      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {tones.map(t => (
          <div key={t.name} className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="inline-block h-2 w-5 rounded-full" style={{ background: t.color }} />
              <span className="text-[15px] font-bold text-slate-900">{t.word}</span>
            </div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-600">{t.name}</div>
            <div className="text-[11px] text-slate-400">{t.desc}</div>
            <div className="mt-0.5 text-[11px] text-slate-500">= {t.meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VOWEL CHART (SVG TRAPEZOID) ──────────────────────────
function VowelChart() {
  const W = 520, H = 320;
  // Vowel positions: [x%, y%] in trapezoid space
  // y: 0 = close/high, 1 = open/low
  // x: 0 = front, 1 = back
  const vowels = [
    { letter: "i / y", ipa: "/i/", x: 0.08, y: 0.05, color: "#059669" },
    { letter: "ê", ipa: "/e/", x: 0.15, y: 0.3, color: "#059669" },
    { letter: "e", ipa: "/ɛ/", x: 0.22, y: 0.55, color: "#059669" },
    { letter: "ư", ipa: "/ɨ/", x: 0.5, y: 0.07, color: "#d97706" },
    { letter: "â", ipa: "/ə̆/", x: 0.5, y: 0.35, color: "#d97706" },
    { letter: "ơ", ipa: "/əː/", x: 0.5, y: 0.5, color: "#d97706" },
    { letter: "ă", ipa: "/ă/", x: 0.45, y: 0.75, color: "#d97706" },
    { letter: "a", ipa: "/aː/", x: 0.38, y: 0.92, color: "#d97706" },
    { letter: "u", ipa: "/u/", x: 0.9, y: 0.05, color: "#2563eb" },
    { letter: "ô", ipa: "/o/", x: 0.85, y: 0.3, color: "#2563eb" },
    { letter: "o", ipa: "/ɔ/", x: 0.78, y: 0.55, color: "#2563eb" },
  ];

  const PAD = 40;
  const topL = PAD + 60, topR = W - PAD - 20;
  const botL = PAD, botR = W - PAD;
  const top = PAD + 10, bot = H - PAD;

  const pos = (x, y) => {
    const leftX = topL + (botL - topL) * y;
    const rightX = topR + (botR - topR) * y;
    return [leftX + (rightX - leftX) * x, top + (bot - top) * y];
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="mb-3 text-center text-[15px] font-semibold text-slate-800">Vowel Chart — Tongue Position Map</div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full" style={{ minWidth: 420, maxHeight: 320 }}>
        {/* Axis labels */}
        <text x={W / 2} y={18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>Front ← → Back</text>
        <text x={14} y={H / 2} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600} transform={`rotate(-90,14,${H / 2})`}>Close → Open</text>
        {/* Trapezoid outline */}
        <polygon points={`${pos(0, 0).join(",")} ${pos(1, 0).join(",")} ${pos(1, 1).join(",")} ${pos(0, 1).join(",")}`}
          fill="none" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="6 3" />
        {/* Grid lines */}
        {[0.33, 0.66].map(y => {
          const [lx, ly] = pos(0, y);
          const [rx, ry] = pos(1, y);
          return <line key={y} x1={lx} y1={ly} x2={rx} y2={ry} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="4 3" />;
        })}
        {/* Vowel dots */}
        {vowels.map(v => {
          const [cx, cy] = pos(v.x, v.y);
          return (
            <g key={v.letter}>
              <circle cx={cx} cy={cy} r={20} fill={v.color} fillOpacity={0.08} stroke={v.color} strokeWidth={1.5} />
              <text x={cx} y={cy - 3} textAnchor="middle" fontSize={15} fontWeight={700} fill={v.color}>{v.letter}</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize={9} fill="#64748b">{v.ipa}</text>
            </g>
          );
        })}
      </svg>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-slate-500">
        <span><span className="inline-block h-2 w-4 rounded" style={{ background: "#059669" }} /> Front vowels</span>
        <span><span className="inline-block h-2 w-4 rounded" style={{ background: "#d97706" }} /> Central vowels</span>
        <span><span className="inline-block h-2 w-4 rounded" style={{ background: "#2563eb" }} /> Back vowels</span>
      </div>
    </div>
  );
}

// ─── REGIONAL ACCENT MAP (SVG) ────────────────────────────
function AccentMap() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="mb-3 text-center text-[15px] font-semibold text-slate-800">Three Major Dialect Regions</div>
      <svg viewBox="0 0 240 420" className="mx-auto w-full" style={{ maxWidth: 200, maxHeight: 340 }}>
        {/* Simplified Vietnam shape */}
        <path d="M120 10 C95 10 70 30 60 60 C50 90 55 110 60 130 C58 150 50 165 55 185 C60 200 70 210 75 225
                  C80 245 78 260 80 280 C82 295 88 310 95 325 C100 340 110 355 120 370
                  C128 380 140 385 150 375 C155 365 152 350 148 335
                  C145 320 140 305 138 290 C136 270 135 255 137 240
                  C140 220 150 205 155 190 C158 175 155 160 148 145
                  C142 130 138 120 140 105 C142 90 148 75 145 60
                  C142 40 135 20 120 10Z"
          fill="#f1f5f9" stroke="#94a3b8" strokeWidth={1.5} />
        {/* Northern region */}
        <ellipse cx={100} cy={70} rx={35} ry={30} fill="#059669" fillOpacity={0.15} stroke="#059669" strokeWidth={1.2} />
        <text x={100} y={60} textAnchor="middle" fontSize={11} fontWeight={700} fill="#059669">Northern</text>
        <text x={100} y={74} textAnchor="middle" fontSize={8.5} fill="#047857">Hà Nội standard</text>
        <text x={100} y={86} textAnchor="middle" fontSize={7.5} fill="#64748b">d = /z/, tr = /ʈ/</text>
        {/* Central region */}
        <ellipse cx={130} cy={185} rx={30} ry={35} fill="#d97706" fillOpacity={0.15} stroke="#d97706" strokeWidth={1.2} />
        <text x={130} y={175} textAnchor="middle" fontSize={11} fontWeight={700} fill="#d97706">Central</text>
        <text x={130} y={189} textAnchor="middle" fontSize={8.5} fill="#b45309">Huế accent</text>
        <text x={130} y={201} textAnchor="middle" fontSize={7.5} fill="#64748b">Distinct vowel shifts</text>
        {/* Southern region */}
        <ellipse cx={115} cy={320} rx={35} ry={38} fill="#2563eb" fillOpacity={0.15} stroke="#2563eb" strokeWidth={1.2} />
        <text x={115} y={310} textAnchor="middle" fontSize={11} fontWeight={700} fill="#2563eb">Southern</text>
        <text x={115} y={324} textAnchor="middle" fontSize={8.5} fill="#1d4ed8">Sài Gòn standard</text>
        <text x={115} y={336} textAnchor="middle" fontSize={7.5} fill="#64748b">d = /j/, v = /j/</text>
      </svg>
    </div>
  );
}

// ─── PRONOUN RELATIONSHIP DIAGRAM (SVG) ───────────────────
function PronounDiagram() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="mb-3 text-center text-[15px] font-semibold text-slate-800">Vietnamese Pronoun System — Age & Relationship</div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 300" className="w-full" style={{ minWidth: 500, maxHeight: 300 }}>
        {/* Age axis */}
        <line x1={60} y1={270} x2={540} y2={270} stroke="#cbd5e1" strokeWidth={1.5} markerEnd="url(#arrowSvg)" />
        <defs><marker id="arrowSvg" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto"><path d="M0 0 L8 3 L0 6" fill="#94a3b8" /></marker></defs>
        <text x={300} y={295} textAnchor="middle" fontSize={11} fill="#94a3b8">Older →</text>
        <text x={55} y={295} textAnchor="end" fontSize={11} fill="#94a3b8">Younger</text>
        {/* Boxes */}
        {[
          { x: 70, label: "em", sub: "younger person", color: "#059669", y: 110 },
          { x: 165, label: "bạn", sub: "peer / friend", color: "#0ea5e9", y: 110 },
          { x: 260, label: "anh", sub: "older male", color: "#d97706", y: 70 },
          { x: 260, label: "chị", sub: "older female", color: "#e11d48", y: 155 },
          { x: 365, label: "cô / chú", sub: "parent's age", color: "#7c3aed", y: 110 },
          { x: 465, label: "ông / bà", sub: "grandparent age", color: "#64748b", y: 110 },
        ].map(b => (
          <g key={b.label + b.y}>
            <rect x={b.x} y={b.y} width={85} height={52} rx={14} fill={b.color} fillOpacity={0.1} stroke={b.color} strokeWidth={1.5} />
            <text x={b.x + 42} y={b.y + 23} textAnchor="middle" fontSize={16} fontWeight={700} fill={b.color}>{b.label}</text>
            <text x={b.x + 42} y={b.y + 40} textAnchor="middle" fontSize={9} fill="#64748b">{b.sub}</text>
          </g>
        ))}
        {/* Safe default box */}
        <rect x={130} y={15} width={200} height={32} rx={16} fill="#059669" fillOpacity={0.08} stroke="#059669" strokeWidth={1} strokeDasharray="4 2" />
        <text x={230} y={36} textAnchor="middle" fontSize={11} fontWeight={600} fill="#059669">Safe default: tôi (I) + bạn (you)</text>
        {/* Connector lines */}
        <line x1={155} y1={136} x2={165} y2={136} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={250} y1={96} x2={260} y2={96} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={250} y1={181} x2={260} y2={181} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={345} y1={136} x2={365} y2={136} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={450} y1={136} x2={465} y2={136} stroke="#cbd5e1" strokeWidth={1} />
      </svg>
      </div>
    </div>
  );
}

// ─── SENTENCE STRUCTURE DIAGRAM ───────────────────────────
function SentenceStructureDiagram() {
  const patterns = [
    { blocks: [["Subject","emerald"],["→",""],["Verb","sky"],["→",""],["Object","amber"]], ex: "Tôi uống cà phê." },
    { blocks: [["S","emerald"],["→",""],["đã / đang / sẽ","rose-dashed"],["→",""],["V","sky"],["→",""],["O","amber"]], ex: "Tôi đang ăn phở." },
    { blocks: [["Number","violet"],["→",""],["Classifier","violet-dashed"],["→",""],["Noun","amber"]], ex: "hai con mèo = two cats" },
    { blocks: [["Noun","amber"],["→",""],["Adjective","rose"]], ex: "nhà lớn = big house (not \"lớn nhà\")" },
  ];
  const blockStyle = (t) => {
    const map = {
      "emerald": "bg-emerald-100 text-emerald-800",
      "sky": "bg-sky-100 text-sky-800",
      "amber": "bg-amber-100 text-amber-800",
      "rose": "bg-rose-100 text-rose-800",
      "violet": "bg-violet-100 text-violet-800",
      "rose-dashed": "border-2 border-dashed border-rose-300 bg-rose-50 text-rose-700",
      "violet-dashed": "border-2 border-dashed border-violet-300 bg-violet-50 text-violet-700",
    };
    return map[t] || "";
  };
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="mb-3 text-center text-[15px] font-semibold text-slate-800">Core Sentence Patterns</div>
      <div className="space-y-3">
        {patterns.map((p, pi) => (
          <div key={pi} className="rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {p.blocks.map(([label, tone], bi) =>
                tone === "" ? <span key={bi} className="text-slate-300">→</span> :
                <span key={bi} className={cn("rounded-lg px-2.5 py-1 text-[13px] font-bold", blockStyle(tone))}>{label}</span>
              )}
            </div>
            <div className="mt-1.5 text-[12px] italic text-slate-500">{p.ex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DATA ──────────────────────────────────────────────────

const vowelData = [
  ["a", "/aː/", "Like 'father' — long open 'ah'", "ba (three)", "L1"],
  ["ă", "/ă/", "Same mouth as 'a' but shorter, cut off quicker", "ăn (eat)", "L1"],
  ["â", "/ə̆/", "Short, reduced — like the 'a' in 'about'", "cần (need)", "L1"],
  ["e", "/ɛ/", "Like 'bed' — open mid front", "em (younger person)", "L1"],
  ["ê", "/e/", "Like French é — tighter, higher than 'e'", "bê (carry)", "L1"],
  ["i / y", "/i/", "Like 'machine' — high front 'ee'", "đi (go)", "L1"],
  ["o", "/ɔ/", "Like 'thought' — rounded, open back", "to (big)", "L1"],
  ["ô", "/o/", "Like 'go' but without the glide — pure closed 'o'", "cô (aunt / Ms.)", "L1"],
  ["ơ", "/əː/", "No direct English match — mid central, lips slightly rounded", "mơ (dream)", "L1"],
  ["u", "/u/", "Like 'food' — high back rounded", "tu (monk / to practice)", "L1"],
  ["ư", "/ɨ/", "No English match — say 'oo' then spread your lips flat", "từ (word / from)", "L1"],
];

const diphthongData = [
  ["ai", "/aːj/", "Like 'eye'"],
  ["ao", "/aːw/", "Like 'ow' in 'cow'"],
  ["au", "/aw/", "Shorter 'ow'"],
  ["âu", "/əw/", "'uh-oo' compressed"],
  ["ay", "/aj/", "Short 'a' + 'y'"],
  ["ây", "/əj/", "Like 'ay' in 'say' (short)"],
  ["eo", "/ɛw/", "'eh-oo'"],
  ["êu", "/ew/", "'ay-oo'"],
  ["ia / iê", "/iə/", "'ee-uh' glide"],
  ["iu", "/iw/", "'ee-oo'"],
  ["oi", "/ɔj/", "Like 'boy'"],
  ["ôi", "/oj/", "Like 'oy' (tighter)"],
  ["ơi", "/əːj/", "'uh-ee'"],
  ["ua / uô", "/uə/", "'oo-uh' glide"],
  ["ui", "/uj/", "'oo-ee'"],
  ["ưa / ươ", "/ɨə/", "Spread 'oo-uh'"],
  ["ưi", "/ɨj/", "Spread 'oo-ee'"],
  ["ươi", "/ɨəj/", "Three-part glide"],
];

const consonantData = [
  ["b", "/ɓ/", "Implosive b (air inward)", "bạn (friend)", "initial"],
  ["c / k / q", "/k/", "All represent the 'k' sound in different spelling contexts", "cá (fish), kem (ice cream), quá (too)", "initial"],
  ["ch", "/tɕ/", "Like 'ch' in 'church'", "chào (greet)", "initial"],
  ["d", "/z/ (N) or /j/ (S)", "Northern: like English 'z'; Southern: like English 'y'", "da (skin)", "initial"],
  ["đ", "/ɗ/", "Implosive d — hard 'd' with a catch, not a soft 'd'", "đi (go)", "initial"],
  ["g / gh", "/ɣ/", "Voiced velar fricative — back of throat", "gà (chicken)", "initial"],
  ["gi", "/z/ (N) or /j/ (S)", "Often same sound as 'd'; Northern: /z/, Southern: /j/", "gì (what)", "initial"],
  ["h", "/h/", "Like English 'h'", "học (study)", "initial"],
  ["kh", "/x/", "Like German 'ch' in 'Bach' — rough aspirated k", "không (no)", "initial"],
  ["l", "/l/", "Like English 'l'", "là (is)", "initial"],
  ["m", "/m/", "Like English 'm'", "mẹ (mother)", "both"],
  ["n", "/n/", "Like English 'n'", "nước (water)", "both"],
  ["ng / ngh", "/ŋ/", "Like 'ng' in 'sing' — but can START a word", "ngon (tasty)", "both"],
  ["nh", "/ɲ/", "Like 'ny' in 'canyon'", "nhà (house)", "initial"],
  ["ph", "/f/", "Always 'f' — never 'p-h'", "phở (phở noodle soup)", "initial"],
  ["r", "/z/ (N) or /ɹ/ (S)", "Northern: like 'z'; Southern: like English 'r' (retroflex)", "ra (go out)", "initial"],
  ["s", "/ʂ/ (N) or /ʃ/ (S)", "Northern: retroflex 'sh'; Southern: 'sh'", "số (number)", "initial"],
  ["t", "/t/", "Unaspirated t (no puff of air)", "tốt (good)", "both"],
  ["th", "/tʰ/", "Aspirated t (with a puff of air) — NOT like English 'th'", "thơ (poem)", "initial"],
  ["tr", "/ʈ/ (N) or /tɕ/ (S)", "Northern: retroflex; Southern: often same as 'ch'", "trà (tea)", "initial"],
  ["v", "/v/ (N) or /j/ (S)", "Northern: English 'v'; Southern: often like 'y'", "và (and)", "initial"],
  ["x", "/s/", "Light 's' — like English 's' in 'see'", "xin (please)", "initial"],
];

const finalConsonantData = [
  ["-c / -ch", "/k̚/", "Unreleased stop — mouth closes but no sound released"],
  ["-m", "/m/", "Same as English final -m"],
  ["-n", "/n/", "Same as English final -n"],
  ["-ng / -nh", "/ŋ/", "Nasal ending — 'ng' as in 'sing'"],
  ["-p", "/p̚/", "Unreleased — lips close, no burst of air"],
  ["-t", "/t̚/", "Unreleased — tongue touches palate, no burst"],
];

const classifierData = [
  ["cái", "General objects, tools, most inanimate things", "cái bàn (table), cái ghế (chair)"],
  ["con", "Animals, children (informal), some objects", "con mèo (cat), con dao (knife)"],
  ["người", "People (formal count)", "người bạn (a friend)"],
  ["chiếc", "Single items (especially from pairs), vehicles", "chiếc xe (a vehicle), chiếc giày (a shoe)"],
  ["quyển / cuốn", "Books, notebooks", "quyển sách (book)"],
  ["tờ", "Flat sheets: paper, newspapers, money", "tờ giấy (sheet of paper)"],
  ["cây", "Long thin objects, trees, plants", "cây bút (pen), cây cầu (bridge)"],
  ["bức", "Pictures, paintings, walls, letters", "bức tranh (painting)"],
  ["ly / cốc", "Glasses, cups of liquid", "ly cà phê (a cup of coffee)"],
  ["đôi", "Pairs", "đôi giày (a pair of shoes)"],
  ["bộ", "Sets, collections, outfits", "bộ quần áo (a set of clothes)"],
];

const numberData = [
  ["0–10", [["0","không"],["1","một"],["2","hai"],["3","ba"],["4","bốn"],["5","năm"],["6","sáu"],["7","bảy"],["8","tám"],["9","chín"],["10","mười"]]],
  ["11–19", [["11","mười một"],["12","mười hai"],["13","mười ba"],["14","mười bốn"],["15","mười lăm*"],["16","mười sáu"],["17","mười bảy"],["18","mười tám"],["19","mười chín"]]],
  ["Tens", [["20","hai mươi"],["21","hai mươi mốt*"],["25","hai mươi lăm"],["30","ba mươi"],["40","bốn mươi"],["50","năm mươi"],["99","chín mươi chín"]]],
  ["Big", [["100","một trăm"],["200","hai trăm"],["1,000","một nghìn (N) / ngàn (S)"],["10,000","mười nghìn"],["1,000,000","một triệu"]]],
];

const situationData = {
  food: {
    title: "Food & Drink", icon: "coffee",
    phrases: [
      ["Cho tôi một ___.", "One ___, please.", "Most useful ordering pattern"],
      ["Cho tôi xem thực đơn.", "Let me see the menu.", ""],
      ["Cái này là gì?", "What is this?", "Point and ask"],
      ["Không cay.", "Not spicy.", ""],
      ["Ít đường.", "Less sugar.", "For drinks"],
      ["Ngon lắm!", "Very delicious!", ""],
      ["Tính tiền.", "Check, please.", ""],
      ["Bao nhiêu tiền?", "How much?", ""],
    ],
  },
  travel: {
    title: "Travel & Directions", icon: "compass",
    phrases: [
      ["___ ở đâu?", "Where is ___?", ""],
      ["Nhà vệ sinh ở đâu?", "Where is the restroom?", "Survival essential"],
      ["Tôi muốn đi ___.", "I want to go to ___.", ""],
      ["Bên trái / bên phải", "Left / right", ""],
      ["Đi thẳng.", "Go straight.", ""],
      ["Mất bao lâu?", "How long does it take?", ""],
      ["Gần đây / xa", "Nearby / far", ""],
      ["Dừng ở đây.", "Stop here.", "For taxis"],
    ],
  },
  emergency: {
    title: "Emergency & Help", icon: "shield",
    phrases: [
      ["Giúp tôi!", "Help me!", ""],
      ["Gọi cảnh sát!", "Call the police!", ""],
      ["Gọi xe cấp cứu!", "Call an ambulance!", ""],
      ["Tôi bị lạc.", "I am lost.", ""],
      ["Tôi không hiểu.", "I don't understand.", ""],
      ["Nói chậm lại.", "Speak slower.", ""],
      ["Tôi bị đau ___.", "My ___ hurts.", "Head = đầu, stomach = bụng"],
      ["Tôi dị ứng với ___.", "I am allergic to ___.", ""],
    ],
  },
  social: {
    title: "Social & Politeness", icon: "heart",
    phrases: [
      ["Xin chào.", "Hello.", "Safe in all situations"],
      ["Cảm ơn (anh/chị/bạn).", "Thank you.", "Add pronoun for politeness"],
      ["Xin lỗi.", "Sorry / Excuse me.", ""],
      ["Không sao.", "It's okay / No problem.", ""],
      ["Hẹn gặp lại.", "See you again.", ""],
      ["Chúc ngủ ngon.", "Good night.", ""],
      ["Tạm biệt.", "Goodbye.", ""],
      ["Rất vui được gặp bạn.", "Nice to meet you.", ""],
    ],
  },
  shopping: {
    title: "Shopping & Money", icon: "grid",
    phrases: [
      ["Cái này bao nhiêu tiền?", "How much is this?", ""],
      ["Đắt quá!", "Too expensive!", ""],
      ["Giảm giá được không?", "Can you give a discount?", ""],
      ["Tôi muốn mua ___.", "I want to buy ___.", ""],
      ["Có màu khác không?", "Do you have another color?", ""],
      ["Có size lớn hơn không?", "Do you have a bigger size?", ""],
      ["Tôi chỉ xem thôi.", "I'm just looking.", ""],
      ["Trả bằng tiền mặt / thẻ.", "Pay with cash / card.", ""],
    ],
  },
};

const advancedConnectors = [
  ["vì ... nên ...", "because ... therefore ...", "Vì trời mưa nên tôi ở nhà. = Because it's raining, I stayed home."],
  ["nếu ... thì ...", "if ... then ...", "Nếu bạn rảnh thì gọi tôi. = If you're free, call me."],
  ["mặc dù ... nhưng ...", "although ... but ...", "Mặc dù mệt nhưng tôi vẫn đi. = Although tired, I still went."],
  ["không những ... mà còn ...", "not only ... but also ...", "Không những rẻ mà còn ngon. = Not only cheap but also delicious."],
  ["càng ... càng ...", "the more ... the more ...", "Càng học càng giỏi. = The more you study, the better you get."],
  ["vừa ... vừa ...", "simultaneously ... and ...", "Vừa ăn vừa nói. = Eating and talking at the same time."],
];

const comparisonStructures = [
  ["A hơn B", "A is more than B", "Cái này rẻ hơn cái kia. = This is cheaper than that."],
  ["A ... nhất", "A is the most ...", "Đây là món ngon nhất. = This is the most delicious dish."],
  ["A bằng B", "A equals B", "Anh ấy cao bằng tôi. = He is as tall as me."],
  ["A không bằng B", "A is not as ... as B", "Cái này không tốt bằng cái kia. = This isn't as good as that."],
  ["A giống B", "A resembles B", "Con gái giống mẹ. = The daughter looks like her mother."],
  ["A khác B", "A differs from B", "Cái này khác cái kia. = This is different from that."],
];

const particles = [
  ["ạ", "Politeness / respect marker at end of sentence", "Cảm ơn ạ. = Thank you (polite)"],
  ["nhé", "Soft suggestion / gentle confirmation", "Đi nhé! = Let's go, okay?"],
  ["nhỉ", "Seeking agreement (like 'right?')", "Trời đẹp nhỉ? = Nice weather, right?"],
  ["đấy / đó", "Emphasis / 'you see'", "Tôi nói rồi đấy. = I told you so."],
  ["mà", "Mild contrast / explanation", "Tôi biết mà. = I know (though)."],
  ["thôi", "Enough / just", "Thôi, đừng nói nữa. = Enough, stop talking."],
  ["chứ", "Rhetorical confirmation", "Đẹp chứ? = Beautiful, isn't it?"],
  ["nha (S)", "Southern equivalent of nhé", "Đi nha! = Let's go!"],
];

const idioms = [
  ["Nước chảy đá mòn.", "Water flows, stone erodes.", "Persistence overcomes all obstacles."],
  ["Ăn quả nhớ kẻ trồng cây.", "Eating fruit, remember who planted the tree.", "Be grateful to those who helped you."],
  ["Có công mài sắt, có ngày nên kim.", "If you grind iron long enough, it becomes a needle.", "Hard work pays off eventually."],
  ["Đi một ngày đàng, học một sàng khôn.", "Travel one day's journey, learn a basketful of wisdom.", "Travel broadens the mind."],
  ["Một con ngựa đau, cả tàu bỏ cỏ.", "One horse is sick, the whole stable stops eating.", "Community solidarity in hardship."],
];

const culturalNotes = [
  { title: "Pronouns are social navigation", text: "Choosing the right pronoun shows respect. When unsure, use 'anh' (to a male who appears older) or 'chị' (to a female who appears older). Use 'em' to someone clearly younger. Vietnamese people may directly ask your age early in conversation — this is not rude; it helps them choose the correct pronoun." },
  { title: "Saying 'no' directly is uncommon", text: "Vietnamese speakers often soften refusals. Instead of a blunt 'không,' you may hear 'chắc không được' (probably can't) or a change of subject. As a learner, be aware that a vague or non-committal answer may actually mean no." },
  { title: "Greetings include personal questions", text: "Questions like 'Ăn cơm chưa?' (Have you eaten yet?) or 'Đi đâu đấy?' (Where are you going?) are casual greetings, not intrusive inquiries. A simple 'rồi' (already) or 'đi chơi' (just going out) is sufficient." },
  { title: "Respectful address in service settings", text: "In restaurants or shops, call the server 'anh' or 'chị' (or 'em' if they are clearly younger). 'Ơi' is the Vietnamese attention-getter: 'Anh ơi!' or 'Chị ơi!' to get someone's attention politely." },
  { title: "North vs South differences are real", text: "Pronunciation, vocabulary, and even some grammar differ between regions. Southern speakers often merge several consonant sounds (tr/ch, s/x, d/gi/r). Neither accent is 'wrong.' Pick one standard to learn first, then recognize the other." },
];

// ─── SECTION NAVIGATION ───────────────────────────────────
const NAV_SECTIONS = [
  { id: "tones", label: "Tones", level: "L1" },
  { id: "vowels", label: "Vowels", level: "L1" },
  { id: "consonants", label: "Consonants", level: "L1" },
  { id: "first-words", label: "First Words", level: "L1" },
  { id: "numbers", label: "Numbers", level: "L1" },
  { id: "first-convo", label: "Dialogue", level: "L1" },
  { id: "pronouns", label: "Pronouns", level: "L2" },
  { id: "classifiers", label: "Classifiers", level: "L2" },
  { id: "grammar", label: "Grammar", level: "L2" },
  { id: "situations", label: "Situations", level: "L2" },
  { id: "connectors", label: "Connectors", level: "L3" },
  { id: "accents", label: "Accents", level: "L3" },
  { id: "culture", label: "Culture", level: "L3" },
  { id: "particles", label: "Particles", level: "L4" },
  { id: "idioms", label: "Idioms", level: "L4" },
  { id: "practice", label: "Practice", level: "L1" },
];

const firstWords = [
  ["xin chào", "hello (formal)"],
  ["chào bạn", "hi (friendly)"],
  ["cảm ơn", "thank you"],
  ["xin lỗi", "sorry / excuse me"],
  ["vâng / dạ", "yes (polite) — vâng (N), dạ (S)"],
  ["không", "no / not"],
  ["tôi", "I / me"],
  ["bạn", "you (peer)"],
  ["tên", "name"],
  ["là", "is / am / are (identity)"],
  ["có", "to have / there is"],
  ["gì", "what"],
  ["ở đâu", "where"],
  ["bao nhiêu", "how much / how many"],
  ["được", "can / okay / able to"],
  ["muốn", "to want"],
  ["ăn", "to eat"],
  ["uống", "to drink"],
  ["đi", "to go"],
  ["biết", "to know"],
];

const introDialogue = [
  ["A: Xin chào.", "Hello."],
  ["B: Chào bạn.", "Hi."],
  ["A: Tôi tên là Alex. Còn bạn?", "My name is Alex. And you?"],
  ["B: Tôi tên là Linh.", "My name is Linh."],
  ["A: Rất vui được gặp bạn.", "Nice to meet you."],
  ["B: Tôi cũng vậy. Bạn là người nước nào?", "Me too. What country are you from?"],
  ["A: Tôi là người Mỹ. Còn bạn?", "I'm American. And you?"],
  ["B: Tôi là người Việt Nam.", "I'm Vietnamese."],
  ["A: Tôi đang học tiếng Việt.", "I'm learning Vietnamese."],
  ["B: Tốt lắm! Cố lên!", "Great! Keep it up!"],
];

const drills = [
  { frame: "Tôi tên là ___.", en: "My name is ___.", fill: "your name" },
  { frame: "Tôi là ___.", en: "I am a ___.", fill: "sinh viên, giáo viên, kỹ sư..." },
  { frame: "Tôi là người ___.", en: "I am from ___.", fill: "Mỹ, Anh, Đài Loan..." },
  { frame: "Cho tôi một ___.", en: "One ___, please.", fill: "cà phê, phở, nước..." },
  { frame: "Đây là gì?", en: "What is this?", fill: "(point at anything)" },
  { frame: "___ ở đâu?", en: "Where is ___?", fill: "nhà vệ sinh, sân bay, khách sạn..." },
  { frame: "Cái này bao nhiêu tiền?", en: "How much is this?", fill: "(point and ask)" },
  { frame: "Tôi muốn ___.", en: "I want ___.", fill: "ăn, uống, đi, mua..." },
  { frame: "Tôi không hiểu.", en: "I don't understand.", fill: "(use freely)" },
  { frame: "Nói chậm lại, được không?", en: "Can you speak slower?", fill: "(use when needed)" },
];


// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function VietnameseMasterGuide() {
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeSituation, setActiveSituation] = useState("food");
  const [activeNumberTab, setActiveNumberTab] = useState("0–10");

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filteredNav = useMemo(() => {
    if (activeLevel === "all") return NAV_SECTIONS;
    return NAV_SECTIONS.filter(s => s.level === activeLevel);
  }, [activeLevel]);

  const showSection = useCallback((level) => {
    return activeLevel === "all" || activeLevel === level;
  }, [activeLevel]);

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-slate-900 selection:bg-emerald-200/60" style={{ fontFamily: "'Noto Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">

        {/* ═══ SCROLLING TITLE BANNER ═══ */}
        <div className="mb-4 rounded-3xl border border-white/60 bg-white/[0.93] p-4 shadow-[0_8px_30px_rgba(15,23,42,0.07)] md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                <Icon name="globe" className="h-3 w-3" strokeWidth={2.2} />
                Complete Vietnamese — English-first edition
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Learn Vietnamese <span className="text-emerald-700">Directly</span>
              </h1>
              <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-slate-500">
                From first sounds to fluent conversation. Sounds → Tones → Words → Sentences → Real situations.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">
              {LEVELS.slice(1).map(lv => (
                <div key={lv.id} className={cn("rounded-2xl border px-3 py-2 text-center", LEVEL_STYLES[lv.id].card)}>
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: lv.color === "emerald" ? "#047857" : lv.color === "sky" ? "#0369a1" : lv.color === "amber" ? "#b45309" : "#be123c" }}>
                    L{lv.num}
                  </div>
                  <div className="mt-0.5 text-[13px] font-bold text-slate-900">{lv.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ STICKY NAV BAR (compact) ═══ */}
        <div className="sticky top-0 z-30 mb-5 rounded-2xl border border-white/60 bg-white/[0.95] px-4 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] backdrop-blur-lg">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="mr-1 shrink-0 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Level</span>
            {LEVELS.map(lv => (
              <Pill key={lv.id} active={activeLevel === lv.id} onClick={() => setActiveLevel(lv.id)}>
                {lv.label}
              </Pill>
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5 overflow-x-auto">
            {filteredNav.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} type="button"
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ CONTENT GRID ═══ */}
        <div className="grid gap-5">

          {/* ═══ HERO ═══ */}
          <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-[#0c2920] via-[#10412f] to-[#7a1a24] p-6 text-white shadow-[0_14px_40px_rgba(15,23,42,0.12)] md:p-8">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                <Icon name="sparkles" className="h-3 w-3" strokeWidth={2.2} />
                How this guide works
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">Sounds first.<br />Then speak.</h2>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  "Master the 11 vowels before vocabulary lists.",
                  "Treat each tone as a completely different word.",
                  "Learn one safe self-introduction today.",
                  "Use short sentence frames immediately.",
                  "Drill one real situation per session.",
                  "Pick one accent (Northern or Southern) and stick with it.",
                ].map((t,i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.08] p-3.5 text-[13px] leading-relaxed text-white/80">{t}</div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white/[0.92] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] md:p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700"><Icon name="route" className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-[16px] font-bold text-slate-900">Day 1 learning path</h3>
                  <p className="text-[12px] text-slate-500">Top to bottom. Do not skip.</p>
                </div>
              </div>
              <ol className="space-y-2">
                {[
                  "Study the tone pitch diagram. Say all 6 tones of 'ma' out loud.",
                  "Read the vowel chart. Focus on ơ, ư, â, ă — the unfamiliar ones.",
                  "Read consonant pairs that trip up English speakers: d vs đ, s vs x.",
                  "Memorize the first 20 words.",
                  "Read the self-introduction dialogue out loud 3 times.",
                  "Pick one situation (food or travel) and drill every phrase.",
                  "Practice numbers 0–10 forward and backward.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">{i + 1}</span>
                    <span className="text-[13px] leading-relaxed text-slate-600">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ═══ L1: TONES ═══ */}
          {showSection("L1") && (
            <Section id="tones" eyebrow="Tones" title="The 6 tones are 6 different words" level="L1"
              desc="This is the single most important concept in Vietnamese. One base syllable changes meaning entirely depending on tone. Wrong tone = wrong word."
              icon="chart">
              <ToneDiagram />
              <div className="grid gap-3 lg:grid-cols-2">
                <Callout type="tip">
                  <strong>Beginner strategy:</strong> Repeat "ma, má, mà, mả, mã, mạ" out loud 10 times daily until the muscle memory is automatic. Tone is physical — it lives in your throat and pitch, not on paper.
                </Callout>
                <Callout type="warn">
                  <strong>Common mistake:</strong> Treating tone marks as optional decoration. They are not. "Ma" (ghost) and "mạ" (rice seedling) are as different as "cat" and "car" in English.
                </Callout>
              </div>
              <div>
                <DataTable
                  headers={["Tone Name", "Mark", "Contour", "Example", "Meaning"]}
                  rows={[
                    ["Ngang (level)", "(none)", "Mid, flat ˉ", "ma", "ghost"],
                    ["Sắc (rising)", "´", "Mid → high ˊ", "má", "cheek; mother (South)"],
                    ["Huyền (falling)", "`", "Mid → low ˋ", "mà", "but; which"],
                    ["Hỏi (dipping)", "ˀ (hook)", "Mid → low → mid ˅", "mả", "grave; tomb"],
                    ["Ngã (broken)", "˜", "Mid → up → break → up ˜", "mã", "horse; code"],
                    ["Nặng (heavy)", ".", "Low, drops sharply ˍ", "mạ", "rice seedling"],
                  ]}
                />
              </div>
              <Callout type="info">
                <strong>North vs South tones:</strong> In Northern speech, all 6 tones are clearly distinct. In Southern speech, the Hỏi and Ngã tones often merge into a single dipping-rising tone. If you learn Northern pronunciation, you will distinguish all 6. If you learn Southern, you will naturally merge two. Both are correct in their respective regions.
              </Callout>
            </Section>
          )}

          {/* ═══ L1: VOWELS ═══ */}
          {showSection("L1") && (
            <Section id="vowels" eyebrow="Vowels" title="11 monophthongs + 18 diphthongs" level="L1"
              desc="Vietnamese has more vowel distinctions than English. The chart below maps each vowel to tongue position. Focus first on ơ, ư, â, ă — these have no direct English equivalent."
              icon="mic">
              <VowelChart />
              <div>
                <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Monophthongs (single vowels)</h3>
                <DataTable
                  headers={["Letter", "IPA", "English Approximation", "Example"]}
                  rows={vowelData.map(([l, ipa, cue, ex]) => [l, ipa, cue, ex])}
                />
              </div>
              <div>
                <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Common diphthongs & triphthongs</h3>
                <DataTable
                  headers={["Combination", "IPA", "Sound Description"]}
                  rows={diphthongData}
                />
              </div>
              <Callout type="tip">
                <strong>Key pairs to distinguish:</strong> a vs ă vs â (long open → short open → short central); e vs ê (open vs close); o vs ô vs ơ (open back → close back → central); u vs ư (rounded back → unrounded central).
              </Callout>
            </Section>
          )}

          {/* ═══ L1: CONSONANTS ═══ */}
          {showSection("L1") && (
            <Section id="consonants" eyebrow="Consonants" title="Initial consonants, final consonants, and the traps" level="L1"
              desc="Most Vietnamese consonants look familiar but do not always sound the way you expect. Some sounds change depending on whether they appear at the start or end of a syllable."
              icon="list">
              <div>
                <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Initial consonants</h3>
                <DataTable
                  headers={["Letter(s)", "IPA", "How It Sounds", "Example"]}
                  rows={consonantData.map(([u, ipa, s, ex]) => [u, ipa, s, ex])}
                />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Final consonants</h3>
                  <DataTable
                    headers={["Ending", "IPA", "Key Point"]}
                    rows={finalConsonantData}
                  />
                </div>
                <div className="space-y-3">
                  <Callout type="warn">
                    <strong>Biggest trap — d vs đ:</strong> 'd' is NOT a hard 'd' sound. In the North it sounds like /z/ (like 'zero'); in the South like /j/ (like 'yes'). The hard 'd' sound is written 'đ' with a crossbar.
                  </Callout>
                  <Callout type="warn">
                    <strong>Unreleased final stops:</strong> Vietnamese -p, -t, -c at the end of words are NOT released. Your mouth moves to the position but no air escapes. English speakers tend to release these — practice holding them shut.
                  </Callout>
                  <Callout type="tip">
                    <strong>'ng' can start a word:</strong> Unlike English, 'ng' appears at the beginning of syllables in Vietnamese. 'Ngon' (tasty) starts with the 'ng' sound. Practice saying 'sing' then dropping the 'si-'.
                  </Callout>
                </div>
              </div>
            </Section>
          )}

          {/* ═══ L1: FIRST WORDS ═══ */}
          {showSection("L1") && (
            <Section id="first-words" eyebrow="First Words" title="The 20 words that unlock basic survival" level="L1"
              desc="These are not random vocabulary. Every word here appears in the dialogues and situations later in this guide. Memorize them first."
              icon="bookOpen">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {firstWords.map(([vi, en], i) => (
                  <div key={vi} className={cn("rounded-xl border p-3",
                    i < 6 ? "border-emerald-200 bg-emerald-50/60" :
                    i < 12 ? "border-sky-200 bg-sky-50/60" :
                    i < 16 ? "border-amber-200 bg-amber-50/60" :
                    "border-rose-200 bg-rose-50/60")}>
                    <div className="text-[16px] font-bold text-slate-900">{vi}</div>
                    <div className="mt-0.5 text-[12px] text-slate-500">{en}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ═══ L1: NUMBERS ═══ */}
          {showSection("L1") && (
            <Section id="numbers" eyebrow="Numbers" title="From 0 to 1,000,000" level="L1"
              desc="You need numbers for prices, times, addresses, ages, and daily life. Start with 0–10, then learn the pattern for larger numbers."
              icon="hash">
              <div className="flex flex-wrap gap-1.5">
                {numberData.map(([tab]) => (
                  <Pill key={tab} active={activeNumberTab === tab} onClick={() => setActiveNumberTab(tab)}>{tab}</Pill>
                ))}
              </div>
              {numberData.filter(([tab]) => tab === activeNumberTab).map(([tab, nums]) => (
                <div key={tab} className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {nums.map(([n, w], i) => (
                    <div key={n} className={cn("rounded-xl border p-3 text-center",
                      i % 3 === 0 ? "border-emerald-200 bg-emerald-50/60" : i % 3 === 1 ? "border-sky-200 bg-sky-50/60" : "border-amber-200 bg-amber-50/60")}>
                      <div className="text-lg font-bold text-slate-900">{n}</div>
                      <div className="mt-0.5 break-words text-[12px] text-slate-600">{w}</div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="grid gap-3 lg:grid-cols-2">
                <Callout type="tip">
                  <strong>Special rules:</strong> '5' changes form depending on position: năm (standalone or tens place) vs lăm (in ones place, e.g. 15 = mười lăm). '1' in the ones place of 21+ becomes mốt (hai mươi mốt). '4' can be tư in the ones place (hai mươi tư = 24).
                </Callout>
                <Callout type="info">
                  <strong>North vs South for 1,000:</strong> Northern speakers say "nghìn" while Southern speakers say "ngàn." Both mean one thousand. You will hear both.
                </Callout>
              </div>
            </Section>
          )}

          {/* ═══ L1: FIRST CONVERSATION ═══ */}
          {showSection("L1") && (
            <Section id="first-convo" eyebrow="First Conversation" title="Read this dialogue until it feels easy" level="L1"
              desc="A complete self-introduction dialogue. Read it out loud at least 3 times. Then swap in your own name and nationality."
              icon="message">
              <div className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
                <Card title="Self-introduction dialogue" icon="message" tone="sky">
                  <div className="space-y-2">
                    {introDialogue.map(([vi, en]) => <ExRow key={vi} vi={vi} en={en} />)}
                  </div>
                </Card>
                <Card title="Sentence frames to reuse" subtitle="Change only the blank" icon="route" tone="emerald">
                  <div className="space-y-2">
                    {[
                      ["Tôi tên là ___.", "My name is ___."],
                      ["Tôi là sinh viên / giáo viên / kỹ sư.", "I am a student / teacher / engineer."],
                      ["Tôi là người Mỹ / Anh / Đài Loan.", "I am American / British / Taiwanese."],
                      ["Tôi đang học tiếng Việt.", "I am learning Vietnamese."],
                      ["Rất vui được gặp (anh/chị/bạn).", "Nice to meet you."],
                    ].map(([vi, en]) => <ExRow key={vi} vi={vi} en={en} />)}
                  </div>
                </Card>
              </div>
            </Section>
          )}

          {/* ═══ L2: PRONOUNS ═══ */}
          {showSection("L2") && (
            <Section id="pronouns" eyebrow="Pronouns" title="Vietnamese pronouns encode relationships, not just grammar" level="L2"
              desc="This is one of the hardest parts for English speakers. Vietnamese has no single word for 'you' or 'I' — the choice depends on relative age, gender, and social relationship."
              icon="userTree">
              <PronounDiagram />
              <div>
                <DataTable
                  headers={["Pronoun", "Used For", "When to Use", "Notes"]}
                  rows={[
                    ["tôi", "I / me", "Safe default for learners in all situations", "Somewhat formal; locals may switch to anh/chị/em for 'I' too"],
                    ["bạn", "you (peer)", "Safe default for someone your age", "Casual; not for elders or formal settings"],
                    ["anh", "older male / I (male) / you (to older male)", "To a man who appears older, or a male peer", "Also used by wives to husbands"],
                    ["chị", "older female / I (female) / you (to older female)", "To a woman who appears older, or a female peer", "Also used as a respectful default for women"],
                    ["em", "younger person / I (to elder) / you (to younger)", "To someone clearly younger than you", "Children, junior colleagues, younger siblings"],
                    ["cô", "aunt / Ms. / teacher (female)", "To a woman around your parent's age", "Also means 'teacher' in school settings"],
                    ["chú", "uncle (younger than father)", "To a man around your parent's age (younger side)", ""],
                    ["bác", "uncle/aunt (older than parent)", "To someone older than your parents", "Gender-neutral respect"],
                    ["ông", "grandfather / Mr. / sir", "To elderly men; very formal address", ""],
                    ["bà", "grandmother / Mrs. / ma'am", "To elderly women; very formal address", ""],
                  ]}
                />
              </div>
              <Callout type="tip">
                <strong>When in doubt:</strong> Use "anh" for any man and "chị" for any woman until corrected. It is slightly too polite (implying they are older), which is always safer than being accidentally rude. Vietnamese people will gently correct you if needed.
              </Callout>
            </Section>
          )}

          {/* ═══ L2: CLASSIFIERS ═══ */}
          {showSection("L2") && (
            <Section id="classifiers" eyebrow="Classifiers" title="Every noun needs its classifier" level="L2"
              desc="Vietnamese uses classifiers (measure words) between numbers/demonstratives and nouns. Think of them as mandatory labels that categorize every noun."
              icon="grid">
              <SentenceStructureDiagram />
              <div>
                <DataTable
                  headers={["Classifier", "Used For", "Examples"]}
                  rows={classifierData}
                />
              </div>
              <Callout type="tip">
                <strong>Survival shortcut:</strong> If you forget the correct classifier, "cái" works as a general fallback for most inanimate objects. It is not always elegant, but it will be understood. Never use "cái" for people — use "người."
              </Callout>
            </Section>
          )}

          {/* ═══ L2: GRAMMAR ═══ */}
          {showSection("L2") && (
            <Section id="grammar" eyebrow="Grammar" title="Core grammar patterns" level="L2"
              desc="Vietnamese grammar is simpler than English in some ways (no conjugation, no articles, no plural markers) but has its own logic. Master these patterns first."
              icon="layers">
              <div className="grid gap-4 md:grid-cols-2">
                <Card title="Word order: S + V + O" icon="arrowRight" tone="emerald">
                  <div className="space-y-2">
                    <ExRow vi="Tôi học tiếng Việt." en="I study Vietnamese." />
                    <ExRow vi="Bạn uống cà phê." en="You drink coffee." />
                    <ExRow vi="Chị ấy mua áo." en="She buys a shirt." />
                  </div>
                </Card>
                <Card title="Identity: S + là + Noun" icon="arrowRight" tone="sky">
                  <div className="space-y-2">
                    <ExRow vi="Tôi là sinh viên." en="I am a student." />
                    <ExRow vi="Đây là bạn tôi." en="This is my friend." />
                    <ExRow vi="Anh ấy là bác sĩ." en="He is a doctor." note="Do NOT use 'là' for adjectives. Say 'Tôi vui' (I happy), not 'Tôi là vui.'" />
                  </div>
                </Card>
                <Card title="Time markers: đã / đang / sẽ" icon="clock" tone="amber">
                  <div className="space-y-2">
                    <ExRow vi="Tôi đã ăn." en="I already ate. (past)" />
                    <ExRow vi="Tôi đang ăn." en="I am eating. (in progress)" />
                    <ExRow vi="Tôi sẽ ăn." en="I will eat. (future)" />
                  </div>
                  <div className="mt-2 text-[12px] text-slate-500">These are optional when context makes time clear. "Hôm qua tôi ăn phở" (Yesterday I ate phở) — no need for "đã."</div>
                </Card>
                <Card title="Negation: không + Verb" icon="alert" tone="rose">
                  <div className="space-y-2">
                    <ExRow vi="Tôi không biết." en="I don't know." />
                    <ExRow vi="Tôi không muốn." en="I don't want to." />
                    <ExRow vi="Không phải." en="That's not right. / Not so." note="Use 'không phải' to negate 'là' sentences: 'Đây không phải là nhà tôi.' (This is not my house.)" />
                  </div>
                </Card>
                <Card title="Questions: add question word or không?" icon="message" tone="violet">
                  <div className="space-y-2">
                    <ExRow vi="Bạn khỏe không?" en="Are you well?" note="Add 'không' at end = yes/no question" />
                    <ExRow vi="Đây là gì?" en="What is this?" note="gì = what" />
                    <ExRow vi="Bạn ở đâu?" en="Where are you?" note="ở đâu = where" />
                    <ExRow vi="Tại sao?" en="Why?" />
                    <ExRow vi="Khi nào?" en="When?" />
                    <ExRow vi="Ai?" en="Who?" />
                  </div>
                </Card>
                <Card title="Possession: Noun + của + Owner" icon="userTree" tone="emerald">
                  <div className="space-y-2">
                    <ExRow vi="sách của tôi" en="my book" note="'của' is often dropped in casual speech: 'sách tôi'" />
                    <ExRow vi="nhà của bạn" en="your house" />
                    <ExRow vi="tên của anh ấy" en="his name" />
                  </div>
                </Card>
              </div>
              <Callout type="tip">
                <strong>Adjectives follow nouns:</strong> "nhà lớn" = big house (house big). "Cà phê đen" = black coffee (coffee black). This is the opposite of English word order.
              </Callout>
            </Section>
          )}

          {/* ═══ L2: SITUATIONS ═══ */}
          {showSection("L2") && (
            <Section id="situations" eyebrow="Situations" title="Speak in real situations immediately" level="L2"
              desc="Pick one tab. Drill every phrase. Repeat until the block feels natural. Then move to the next."
              icon="target">
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(situationData).map(([key, val]) => (
                  <Pill key={key} active={activeSituation === key} onClick={() => setActiveSituation(key)}>{val.title}</Pill>
                ))}
              </div>
              <Card title={situationData[activeSituation].title} icon={situationData[activeSituation].icon} tone="amber">
                <div className="grid gap-2 sm:grid-cols-2">
                  {situationData[activeSituation].phrases.map(([vi, en, note]) => (
                    <ExRow key={vi} vi={vi} en={en} note={note} />
                  ))}
                </div>
              </Card>
            </Section>
          )}

          {/* ═══ L3: CONNECTORS ═══ */}
          {showSection("L3") && (
            <Section id="connectors" eyebrow="Complex Sentences" title="Connectors & comparisons" level="L3"
              desc="These paired connectors let you build adult-level sentences. Each pair works as a framework — fill in your own content."
              icon="route">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Connectors</h3>
                  <DataTable
                    headers={["Pattern", "Meaning", "Example"]}
                    rows={advancedConnectors}
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Comparison structures</h3>
                  <DataTable
                    headers={["Pattern", "Meaning", "Example"]}
                    rows={comparisonStructures}
                  />
                </div>
              </div>
            </Section>
          )}

          {/* ═══ L3: REGIONAL ACCENTS ═══ */}
          {showSection("L3") && (
            <Section id="accents" eyebrow="Regional Accents" title="Northern, Central, and Southern Vietnamese" level="L3"
              desc="Vietnamese is one language with three major dialect groups. Knowing the differences helps you understand real speakers."
              icon="map">
              <div className="grid gap-4 lg:grid-cols-[0.65fr_1.35fr]">
                <AccentMap />
                <div className="space-y-3">
                  <DataTable
                    headers={["Feature", "Northern (Hà Nội)", "Southern (Sài Gòn)"]}
                    rows={[
                      ["d / gi / r", "All → /z/", "All → /j/ (like 'y')"],
                      ["v", "/v/ (like English 'v')", "/j/ (often like 'y')"],
                      ["tr", "/ʈ/ (retroflex)", "/tɕ/ (same as 'ch')"],
                      ["s", "/ʂ/ (retroflex sh)", "/ʃ/ (same as English 'sh')"],
                      ["x", "/s/ (light s)", "/s/ (light s)"],
                      ["Hỏi vs Ngã tones", "Clearly distinct", "Often merged into one tone"],
                      ["-n vs -ng (final)", "Distinct", "Often merged"],
                      ["1,000", "nghìn", "ngàn"],
                      ["Overall impression", "Sharper, more tonal contrast", "Softer, more melodic"],
                    ]}
                  />
                  <Callout type="info">
                    <strong>Which should you learn?</strong> Both are correct. Northern (Hà Nội) is the official standard used in education and media. Southern (Sài Gòn) is spoken by more overseas Vietnamese communities. Most textbooks teach Northern, but much media content uses Southern. Pick one and be consistent.
                  </Callout>
                </div>
              </div>
            </Section>
          )}

          {/* ═══ L3: CULTURE ═══ */}
          {showSection("L3") && (
            <Section id="culture" eyebrow="Culture" title="Communication norms that affect your Vietnamese" level="L3"
              desc="Language and culture are inseparable. These are not trivia — they directly affect how your Vietnamese is received."
              icon="heart">
              <div className="grid gap-3 md:grid-cols-2">
                {culturalNotes.map((n, i) => (
                  <Card key={i} title={n.title} tone={i % 4 === 0 ? "emerald" : i % 4 === 1 ? "sky" : i % 4 === 2 ? "amber" : "rose"}
                    className={i === culturalNotes.length - 1 && culturalNotes.length % 2 !== 0 ? "md:col-span-2" : ""}>
                    {n.text}
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {/* ═══ L4: PARTICLES ═══ */}
          {showSection("L4") && (
            <Section id="particles" eyebrow="Particles" title="End-of-sentence particles that change everything" level="L4"
              desc="These small words at the end of sentences convey tone, attitude, politeness, and nuance. They are what make you sound natural instead of robotic."
              icon="zap">
              <DataTable
                headers={["Particle", "Function", "Example"]}
                rows={particles}
              />
              <Callout type="tip">
                <strong>Start with just two:</strong> Add "ạ" to the end of any sentence when speaking to someone older or in a formal setting. Add "nhé" when making a friendly suggestion. These two alone will make you sound significantly more natural.
              </Callout>
            </Section>
          )}

          {/* ═══ L4: IDIOMS ═══ */}
          {showSection("L4") && (
            <Section id="idioms" eyebrow="Idioms & Proverbs" title="Thành ngữ — The soul of the language" level="L4"
              desc="Vietnamese proverbs (thành ngữ / tục ngữ) reveal cultural values. Knowing even a few will deeply impress native speakers."
              icon="star">
              <div className="grid gap-3 md:grid-cols-2">
                {idioms.map(([vi, literal, meaning], i) => (
                  <Card key={i} title={vi} tone={i % 3 === 0 ? "emerald" : i % 3 === 1 ? "amber" : "rose"}
                    className={i === idioms.length - 1 && idioms.length % 2 !== 0 ? "md:col-span-2" : ""}>
                    <div className="mb-1 text-[13px] font-medium text-slate-700">Literal: {literal}</div>
                    <div className="text-[13px] text-slate-500">Meaning: {meaning}</div>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {/* ═══ PRACTICE ═══ */}
          {showSection("L1") && (
            <Section id="practice" eyebrow="Practice" title="Do these drills out loud every day" level="L1"
              desc="Silent reading is not learning. Replace the blank, speak the line, and repeat. The goal is automatic recall, not comprehension."
              icon="mic">
              <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
                <Card title="Core sentence drills" icon="mic" tone="sky">
                  <div className="space-y-2">
                    {drills.map((d, i) => (
                      <div key={i} className="rounded-xl border border-white/80 bg-white p-3 shadow-sm">
                        <div className="text-[15px] font-semibold text-slate-900">{d.frame}</div>
                        <div className="mt-0.5 text-[13px] text-slate-600">{d.en}</div>
                        <div className="mt-1 text-[11px] text-slate-400">Fill: {d.fill}</div>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="space-y-3">
                  <Card title="Daily repetition targets" subtitle="Say each line 10 times" icon="check" tone="emerald">
                    <ol className="space-y-2">
                      {[
                        "ma / má / mà / mả / mã / mạ (all 6 tones)",
                        "xin chào / cảm ơn / xin lỗi / không / vâng",
                        "Tôi tên là ___. / Tôi là ___. / Tôi là người ___.",
                        "Cho tôi một ___. / ___ ở đâu? / Bao nhiêu tiền?",
                        "Numbers 0–10 forward, then 10–0 backward",
                        "One full situation block (food, travel, or emergency)",
                      ].map((t, i) => (
                        <li key={i} className="rounded-xl border border-white/80 bg-white px-3 py-2 shadow-sm text-[13px]">
                          <span className="font-semibold text-slate-800">{i + 1}.</span> {t}
                        </li>
                      ))}
                    </ol>
                  </Card>
                  <Callout type="tip">
                    <strong>Week 1 goal:</strong> Greet someone, say your name and nationality, order food, ask "where" and "how much," and count to 10. That is enough to survive a day in Vietnam.
                  </Callout>
                  <Callout type="info">
                    <strong>Week 2–4 goal:</strong> Use correct pronouns, add classifiers to nouns, use time markers (đã/đang/sẽ), handle 5 situation categories, and count to 1,000.
                  </Callout>
                </div>
              </div>
            </Section>
          )}

          {/* ═══ FOOTER ═══ */}
          <section className="rounded-3xl border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-[0_14px_40px_rgba(15,23,42,0.12)] md:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                  <Icon name="sparkles" className="h-3 w-3" strokeWidth={2.2} />
                  Quick reference
                </div>
                <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">What this guide covers</h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
                  4 progressive levels from zero to advanced proficiency. Tone pitch diagrams, vowel charts, pronoun relationship maps, sentence structure visuals, 5 situation categories, classifiers, connectors, regional accent comparison, cultural communication norms, particles, and idioms.
                   <br />
                   Vietnamese Learning Guide
                   <br />
                   © 2026 EugeneYip.com All Rights Reserved.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { n: "11", l: "Vowels + 18 diphthongs" },
                  { n: "6", l: "Tones with pitch diagrams" },
                  { n: "22+", l: "Initial consonants" },
                  { n: "5", l: "Situation categories" },
                  { n: "11", l: "Classifiers" },
                  { n: "6", l: "Connector patterns" },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3 text-center">
                    <div className="text-xl font-extrabold text-white">{s.n}</div>
                    <div className="mt-0.5 text-[11px] text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
