'use client';
import React from 'react';
import Script from 'next/script';
import GuideLayout from '@/components/GuideLayout';

/* ─── Site palette ───────────────────────────────────────────────────── */
const C = {
  bg:     '#0A0A0F',
  cyan:   '#00D4FF',
  purple: '#8B5CF6',
  silver: '#8080a0',
};

/* ─── Shared CSS injected once ───────────────────────────────────────── */
const CSS = `
  model-viewer { background: #0A0A0F; --progress-bar-color: #00D4FF; }
  .mv-label {
    position: absolute;
    font-family: monospace;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 4px;
    pointer-events: none;
    white-space: nowrap;
    transform: translate(-50%, -50%);
    animation: lbl-pulse 2.2s ease-in-out infinite;
  }
  @keyframes lbl-pulse { 0%,100%{opacity:.55} 50%{opacity:1} }
`;

type Label = { x: string; y: string; text: string; color?: string };

/* ─── Step viewer ────────────────────────────────────────────────────── */
function StepModel({
  model, orbit, target, fov = '30deg',
  anim, autoplay = false, labels = [], note,
}: {
  model: 'gpu' | 'motherboard';
  orbit: string;
  target?: string;
  fov?: string;
  anim?: string;
  autoplay?: boolean;
  labels?: Label[];
  note?: string;
}) {
  /* Build props as plain object — React.createElement accepts any string
     element name, completely bypassing TSX type checking for custom elements */
  const mvProps: Record<string, any> = {
    src:                  `/models/${model}.glb`,
    'camera-orbit':       orbit,
    'field-of-view':      fov,
    'camera-controls':    'true',
    'shadow-intensity':   '1.2',
    exposure:             '0.9',
    'environment-image':  'neutral',
    style: { width: '100%', height: '100%' },
  };
  if (target)           mvProps['camera-target']   = target;
  if (anim && autoplay) { mvProps['animation-name'] = anim; mvProps.autoplay = 'true'; }

  return (
    <div style={{ position: 'relative', width: '100%', height: 460, background: C.bg, borderRadius: 8 }}>
      <style>{CSS}</style>

      {/* Load model-viewer once via Next.js Script */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {/* React.createElement with a string renders any DOM/custom element
          without TypeScript complaining about unknown JSX elements */}
      {React.createElement('model-viewer', mvProps)}

      {/* Overlay labels */}
      {labels.map((l, i) => (
        <div key={i} className="mv-label" style={{
          left: l.x, top: l.y,
          color:      l.color ?? C.cyan,
          background: 'rgba(10,10,15,0.88)',
          border:     `1px solid ${l.color ?? C.cyan}`,
          boxShadow:  `0 0 10px ${(l.color ?? C.cyan)}55`,
        }}>
          {l.text}
        </div>
      ))}

      {note && (
        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'monospace', fontSize: 10,
          color: C.silver, pointerEvents: 'none',
        }}>{note}</div>
      )}

      <div style={{
        position: 'absolute', top: 8, right: 10,
        fontFamily: 'monospace', fontSize: 9,
        color: C.silver, opacity: 0.5, pointerEvents: 'none',
      }}>
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}

/* ─── Step 1 — PCIe latch: motherboard overview ──────────────────────── */
const S1 = (
  <StepModel
    model="motherboard" orbit="30deg 65deg auto" fov="32deg"
    labels={[
      { x: '52%', y: '72%', text: 'PCIe x16 ← GPU slot (longest slot)' },
      { x: '74%', y: '78%', text: 'Latch tab — push outward', color: C.purple },
    ]}
    note="Rotate to find the PCIe x16 slot — longest horizontal slot, closest to the CPU"
  />
);

/* ─── Step 2 — GPU installation: fans visible, spinning ─────────────── */
const S2 = (
  <StepModel
    model="gpu" orbit="40deg 60deg auto" fov="30deg"
    anim="Animation" autoplay
    labels={[
      { x: '50%', y: '82%', text: 'Gold contacts → align with PCIe slot below' },
      { x: '50%', y: '18%', text: 'Press BOTH ends evenly — listen for click', color: C.purple },
    ]}
    note="Fans spinning — GPU shown as it appears when fully installed"
  />
);

/* ─── Step 3 — Bracket screws: rear bracket view ────────────────────── */
const S3 = (
  <StepModel
    model="gpu" orbit="175deg 88deg auto" fov="26deg"
    labels={[
      { x: '28%', y: '42%', text: 'Bracket sits flush against case wall' },
      { x: '20%', y: '28%', text: 'Screw ① — top',    color: C.purple },
      { x: '20%', y: '62%', text: 'Screw ② — bottom', color: C.purple },
    ]}
    note="Rotate to the bracket end — the thin metal plate with port openings"
  />
);

/* ─── Step 4 — Power cables: top connector view ─────────────────────── */
const S4 = (
  <StepModel
    model="gpu" orbit="8deg 35deg auto" fov="26deg"
    anim="Animation" autoplay
    labels={[
      { x: '38%', y: '22%', text: '8-pin ① — press until clip CLICKS' },
      { x: '58%', y: '16%', text: '8-pin ② — press until clip CLICKS' },
      { x: '48%', y: '8%',  text: '↑ PSU cables come from above', color: C.purple },
    ]}
    note="Look at the top edge of the GPU — both 8-pin power connectors are there"
  />
);

/* ─── Step 5 — Verify: motherboard with CPU inspect animation ────────── */
const S5 = (
  <StepModel
    model="motherboard" orbit="30deg 65deg auto" fov="32deg"
    anim="CPU inspect" autoplay
    labels={[
      { x: '50%', y: '50%', text: '✓ GPU installed — verify all 5 points before boot' },
    ]}
    note="Use the checklist on the right — confirm every point before powering on"
  />
);

/* ─── Steps array ────────────────────────────────────────────────────── */
const steps = [
  {
    title: 'Open the PCIe latch',
    desc:  'Find the PCIe x16 slot — the longest horizontal slot, usually topmost. Push the latch tab at the far right end outward until it clicks open.',
    tip:   'Look at the RIGHT END of the slot. A click confirms it is open.',
    animated: S1,
  },
  {
    title: 'Align and press GPU into slot',
    desc:  'Lower the GPU straight down with gold contacts facing the motherboard. Press both ends down firmly and evenly until you hear a clear click — latch locks automatically.',
    tip:   'More force than you expect. Wobble at either end = not fully seated, press again.',
    animated: S2,
  },
  {
    title: 'Secure bracket with screws',
    desc:  'The metal bracket must be screwed to the case — one screw top, one bottom — sitting completely flush against the case wall with no gap.',
    tip:   'A gap means the GPU is not fully seated. Never overtighten — bracket steel is thin.',
    animated: S3,
  },
  {
    title: 'Connect the PCIe power cables',
    desc:  'Plug the 8-pin cables from your PSU into the top edge of the GPU firmly until the black retention clip clicks on each connector.',
    tip:   'No click = not locked. To remove later: press the clip first, then pull. Red wires face outward.',
    animated: S4,
  },
  {
    title: 'Verify and power on',
    desc:  'Confirm: latch closed, bracket screwed both top and bottom, power cables clicked, card sits level. Power on — display output = success. Install drivers from nvidia.com.',
    tip:   'No display? Press GPU down again first, then re-check power connectors are clicked.',
    animated: S5,
  },
];

export default function GpuPage() {
  return (
    <GuideLayout
      title="GPU Installation"
      category="Assembly Guides"
      categoryHref="/#assembly"
      steps={steps}
    />
  );
}
