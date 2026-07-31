"use client";

import { animate, createScope, stagger } from "animejs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, Check, Copy, Download, Leaf, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  decodePlan,
  encodePlan,
  gardenArea,
  matchPlants,
  type GardenSize,
  type Moisture,
  type PlanInput,
  type Plant,
  type Sun,
} from "@/lib/planner";

const defaultInput: PlanInput = { place: "", zone: 4, sun: "full", moisture: "average", size: "medium" };
const monthNames = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const monthNumbers = [4, 5, 6, 7, 8, 9, 10];

function BotanicalPlate() {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduceMotion) return;
    const scope = createScope({ root }).add(() => {
      animate(".specimen-stem", { strokeDashoffset: [1, 0], duration: 1400, ease: "inOut(3)" });
      animate(".specimen-leaf", { opacity: [0, 1], scale: [0.75, 1], rotate: [-5, 0], delay: stagger(95, { start: 500 }), duration: 650, ease: "out(3)" });
      animate(".plate-note", { opacity: [0, 1], translateX: [10, 0], delay: stagger(120, { start: 900 }), duration: 500, ease: "out(3)" });
    });
    return () => scope.revert();
  }, [reduceMotion]);

  return (
    <div className="botanical-plate" ref={root} aria-label="An illustrated wild bergamot specimen">
      <div className="plate-number">PLATE 04 / PRAIRIE</div>
      <svg viewBox="0 0 480 660" role="img" aria-hidden="true">
        <path className="specimen-stem" pathLength="1" d="M235 625 C229 519 259 431 238 344 C225 287 250 231 255 129" />
        <path className="specimen-stem fine" pathLength="1" d="M239 417 C186 388 158 350 146 311" />
        <path className="specimen-stem fine" pathLength="1" d="M240 353 C291 323 319 291 334 246" />
        <g className="specimen-leaf"><path d="M225 510 C164 481 157 435 168 399 C213 424 233 459 225 510Z" /><path d="M249 474 C302 447 325 406 310 370 C271 397 247 430 249 474Z" /></g>
        <g className="specimen-leaf"><path d="M229 405 C184 384 173 348 184 318 C218 337 235 369 229 405Z" /><path d="M249 353 C291 332 302 299 292 270 C260 291 243 320 249 353Z" /></g>
        <g className="specimen-leaf flower">
          <circle cx="256" cy="121" r="48" />
          {Array.from({ length: 18 }).map((_, index) => {
            const angle = (index / 18) * Math.PI * 2;
            return <path key={index} d={`M256 121 C ${256 + Math.cos(angle - 0.18) * 32} ${121 + Math.sin(angle - 0.18) * 32}, ${256 + Math.cos(angle) * 69} ${121 + Math.sin(angle) * 69}, ${256 + Math.cos(angle + 0.18) * 37} ${121 + Math.sin(angle + 0.18) * 37}`} />;
          })}
        </g>
      </svg>
      <div className="plate-note note-one"><span>01</span> aromatic leaf pair</div>
      <div className="plate-note note-two"><span>02</span> composite flower head</div>
      <div className="plate-caption"><em>Monarda fistulosa</em><span>wild bergamot</span></div>
    </div>
  );
}

function PlantMark({ plant, index }: { plant: Plant; index: number }) {
  const petals = 5 + (index % 4);
  return (
    <svg className="plant-mark" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="4" fill={plant.color} />
      {Array.from({ length: petals }).map((_, petal) => {
        const angle = (petal / petals) * Math.PI * 2;
        const x = 36 + Math.cos(angle) * 14;
        const y = 36 + Math.sin(angle) * 14;
        return <ellipse key={petal} cx={x} cy={y} rx="7" ry="14" fill={plant.color} transform={`rotate(${(petal / petals) * 360 + 90} ${x} ${y})`} />;
      })}
      <circle cx="36" cy="36" r="27" fill="none" stroke="currentColor" strokeDasharray="1 5" />
    </svg>
  );
}

function PlantingMap({ matches }: { matches: Plant[] }) {
  const positions = [[20, 25], [50, 18], [79, 27], [31, 51], [64, 48], [16, 75], [48, 76], [82, 70], [65, 87], [36, 91]];
  return (
    <div className="planting-map" aria-label="Suggested planting arrangement">
      <div className="north">N ↑</div>
      <svg viewBox="0 0 100 100" role="img">
        <path className="bed-outline" d="M8 19 C23 4 64 7 88 19 C99 31 89 60 94 78 C78 98 38 95 10 85 C1 67 11 47 8 19Z" />
        {matches.map((plant, index) => (
          <g key={plant.id} transform={`translate(${positions[index][0]} ${positions[index][1]})`}>
            <circle r={index % 3 === 0 ? 8 : 6} fill={plant.color} opacity=".72" />
            <circle r={index % 3 === 0 ? 4 : 3} fill="var(--ink)" opacity=".7" />
            <text y="1.5" textAnchor="middle">{index + 1}</text>
          </g>
        ))}
      </svg>
      <p>Place taller forms toward the north edge. Repeat low plants between numbered anchors to close open soil.</p>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState<PlanInput>(defaultInput);
  const [hasPlan, setHasPlan] = useState(false);
  const [copyState, setCopyState] = useState("Copy plan link");
  const [isExporting, setIsExporting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const matches = useMemo(() => matchPlants(input), [input]);

  useEffect(() => {
    const shared = decodePlan(new URLSearchParams(window.location.search));
    if (shared) requestAnimationFrame(() => { setInput(shared); setHasPlan(true); requestAnimationFrame(() => document.querySelector("#your-plan")?.scrollIntoView()); });
  }, []);

  function update<K extends keyof PlanInput>(key: K, value: PlanInput[K]) { setInput((current) => ({ ...current, [key]: value })); }

  function buildPlan(event: React.FormEvent) {
    event.preventDefault();
    setHasPlan(true);
    window.history.replaceState({}, "", `${window.location.pathname}?${encodePlan(input)}#your-plan`);
    requestAnimationFrame(() => document.querySelector("#your-plan")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }

  async function copyPlan() {
    const url = `${window.location.origin}${window.location.pathname}?${encodePlan(input)}#your-plan`;
    try { await navigator.clipboard.writeText(url); setCopyState("Link copied"); } catch { window.prompt("Copy your plan link", url); }
    window.setTimeout(() => setCopyState("Copy plan link"), 1800);
  }

  async function downloadPdf() {
    setIsExporting(true);
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    pdf.setFillColor(242, 237, 220); pdf.rect(0, 0, 210, 297, "F"); pdf.setTextColor(42, 48, 36);
    pdf.setFont("times", "bold"); pdf.setFontSize(28); pdf.text("ACREKIND", 18, 24);
    pdf.setFont("times", "italic"); pdf.setFontSize(16); pdf.text(`${input.place || "My garden"} planting field note`, 18, 37);
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.text(`Zone ${input.zone}  /  ${input.sun} sun  /  ${input.moisture} soil  /  ${gardenArea(input.size)}`, 18, 47); pdf.line(18, 52, 192, 52);
    let y = 64;
    matches.forEach((plant, index) => {
      pdf.setFont("times", "bold"); pdf.setFontSize(12); pdf.text(`${index + 1}. ${plant.common}`, 18, y);
      pdf.setFont("times", "italic"); pdf.setFontSize(10); pdf.text(plant.latin, 67, y);
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.text(`${plant.bloomLabel} · ${plant.heightCm[0]}–${plant.heightCm[1]} cm · ${plant.role}`, 18, y + 5);
      pdf.text(pdf.splitTextToSize(plant.note, 172), 18, y + 10); y += 22;
    });
    pdf.setFontSize(7.5); pdf.text("Planning aid only. Confirm local suitability and availability with a native-plant nursery before planting.", 18, 284);
    pdf.save(`acrekind-${(input.place || "garden").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`); setIsExporting(false);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Acrekind home"><Leaf size={17} strokeWidth={1.5} />ACREKIND</a>
        <nav aria-label="Primary navigation"><a href="#method">Field method</a><a href="#planner">Make a plan</a></nav>
        <a className="text-link" href="mailto:hello@acrekind.com">Write to us <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A small field guide for planted places</p>
          <h1>Plan a patch that <em>belongs</em> there.</h1>
          <p className="lede">Acrekind turns a few observations about your site into a practical starting palette of hardy, regionally appropriate plants.</p>
          <a className="paper-button" href="#planner">Open the field planner <ArrowDown size={16} /></a>
          <div className="field-note"><span>NOTE 01</span><p>Built for Canadian cold-climate gardens. The planner is a starting point, not a substitute for local ecological advice.</p></div>
        </div>
        <BotanicalPlate />
      </section>

      <section className="method" id="method">
        <div className="section-index">I.</div>
        <div className="method-heading"><p className="eyebrow">Read the ground first</p><h2>Good planting starts with constraints, not a shopping list.</h2></div>
        <ol className="method-list">
          <li><span>01</span><h3>Locate</h3><p>Start with your hardiness zone and the character of the place.</p></li>
          <li><span>02</span><h3>Observe</h3><p>Notice the light, moisture and real amount of ground available.</p></li>
          <li><span>03</span><h3>Compose</h3><p>Layer flowering times and heights into a resilient living patch.</p></li>
        </ol>
      </section>

      <section className="planner" id="planner">
        <div className="section-index">II.</div>
        <div className="planner-intro"><p className="eyebrow">The field planner</p><h2>Describe the patch.</h2><p>Five answers create a planting note you can save, share, and bring to a nursery.</p></div>
        <form className="planner-form" onSubmit={buildPlan}>
          <label className="wide-field"><span>Where is the garden?</span><input value={input.place} onChange={(event) => update("place", event.target.value.slice(0, 80))} placeholder="City, town, or region" autoComplete="address-level2" /></label>
          <fieldset><legend>Hardiness zone</legend><div className="choice-row compact">{[2, 3, 4, 5, 6, 7, 8].map((zone) => <label key={zone}><input type="radio" name="zone" checked={input.zone === zone} onChange={() => update("zone", zone)} /><span>{zone}</span></label>)}</div></fieldset>
          <fieldset><legend>Daily light</legend><div className="choice-row">{(["full", "part", "shade"] as Sun[]).map((sun) => <label key={sun}><input type="radio" name="sun" checked={input.sun === sun} onChange={() => update("sun", sun)} /><span>{sun === "full" ? "6+ hours" : sun === "part" ? "3–6 hours" : "Under 3 hours"}<small>{sun} sun</small></span></label>)}</div></fieldset>
          <fieldset><legend>Typical soil moisture</legend><div className="choice-row">{(["dry", "average", "moist"] as Moisture[]).map((moisture) => <label key={moisture}><input type="radio" name="moisture" checked={input.moisture === moisture} onChange={() => update("moisture", moisture)} /><span>{moisture}<small>{moisture === "dry" ? "drains quickly" : moisture === "average" ? "holds, then dries" : "stays cool"}</small></span></label>)}</div></fieldset>
          <fieldset><legend>Planting area</legend><div className="choice-row">{(["small", "medium", "large"] as GardenSize[]).map((size) => <label key={size}><input type="radio" name="size" checked={input.size === size} onChange={() => update("size", size)} /><span>{size}<small>{gardenArea(size)}</small></span></label>)}</div></fieldset>
          <button className="press-button" type="submit">Compose my planting note <span>→</span></button>
        </form>
      </section>

      <AnimatePresence initial={false}>
        {hasPlan && (
          <motion.section className="results" id="your-plan" initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="result-masthead">
              <div><p className="eyebrow">Field note / {new Date().getFullYear()}</p><h2>{input.place || "Your garden"}</h2><p>Zone {input.zone} · {input.sun} sun · {input.moisture} soil · {gardenArea(input.size)}</p></div>
              <div className="result-actions"><button type="button" onClick={copyPlan}>{copyState === "Link copied" ? <Check size={15} /> : <Copy size={15} />}{copyState}</button><button type="button" onClick={downloadPdf} disabled={isExporting}><Download size={15} />{isExporting ? "Preparing…" : "Save PDF"}</button></div>
            </div>
            <div className="result-layout">
              <PlantingMap matches={matches} />
              <div className="plant-list">{matches.map((plant, index) => <article className="plant-entry" key={plant.id}><div className="plant-number">{String(index + 1).padStart(2, "0")}</div><PlantMark plant={plant} index={index} /><div className="plant-name"><h3>{plant.common}</h3><em>{plant.latin}</em></div><dl><div><dt>Flower</dt><dd>{plant.bloomLabel}</dd></div><div><dt>Height</dt><dd>{plant.heightCm[0]}–{plant.heightCm[1]} cm</dd></div></dl><p>{plant.note}</p></article>)}</div>
            </div>
            <div className="season-table">
              <div className="season-title"><span>III.</span><h3>Seasonal continuity</h3><p>A useful patch offers something across the growing season.</p></div>
              <div className="season-chart"><div className="month-row"><span />{monthNames.map((month) => <b key={month}>{month}</b>)}</div>{matches.map((plant) => <div className="season-row" key={plant.id}><span>{plant.common}</span>{monthNumbers.map((month) => <i key={month} className={plant.bloom.includes(month) ? "active" : ""} style={plant.bloom.includes(month) ? { backgroundColor: plant.color } : undefined} />)}</div>)}</div>
            </div>
            <div className="result-endnote"><p><strong>Before you buy:</strong> confirm provenance, mature spread, local restrictions and site fit with a reputable native-plant nursery. Avoid collecting plants from the wild.</p><button type="button" onClick={() => { setHasPlan(false); document.querySelector("#planner")?.scrollIntoView({ behavior: "smooth" }); }}><RotateCcw size={14} /> Adjust the observations</button></div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer>
        <div><a className="wordmark" href="#top"><Leaf size={17} />ACREKIND</a><p>A quiet planning tool for thoughtful, place-aware gardens.</p></div>
        <div><h2>Reference shelf</h2><a href="https://can-plant.ca/" target="_blank" rel="noreferrer">CanPlant database ↗</a><a href="https://planthardiness.gc.ca/" target="_blank" rel="noreferrer">Canada plant hardiness ↗</a></div>
        <div><h2>Small print</h2><a href="/privacy/">Privacy</a><a href="/terms/">Terms &amp; limitations</a><a href="mailto:hello@acrekind.com">hello@acrekind.com</a></div>
        <p className="copyright">© {new Date().getFullYear()} Acrekind · Independent field tool</p>
      </footer>
    </main>
  );
}
