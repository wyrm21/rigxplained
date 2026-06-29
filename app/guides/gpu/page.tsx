'use client';
import Script from 'next/script';
import GuideLayout from '@/components/GuideLayout';

/* model-viewer types are declared in types/model-viewer.d.ts */

/* ─── Site palette ───────────────────────────────────────────────────── */
const C = {
  bg:     '#0A0A0F',
  cyan:   '#00D4FF',
  purple: '#8B5CF6',
  silver: '#8080a0',
};

/* ─── Shared CSS ─────────────────────────────────────────────────────── */
const CSS = `
  model-viewer { background: #0A0A0F; }
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

/* ─── Step model viewer ──────────────────────────────────────────────── */
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
  const src = `/models/${model}.glb`;

  /* Build model-viewer props as a plain object to avoid TSX attribute issues */
  const mvProps: { [key: string]: any } = {
    src,
    'camera-orbit': orbit,
    'field-of-view': fov,
    'camera-controls': 'true',
    'shadow-intensity': '1.2',
    exposure: '0.9',
    'environment-image': 'neutral',
    style: { width: '100%', height: '100%', '--progress-bar-color': C.cyan },
  };
  if (target)            mvProps['camera-target']  = target;
  if (anim && autoplay)  { mvProps['animation-name'] = anim; mvProps.autoplay = 'true'; }

  return (
    <div style={{ position: 'relative', width: '100%', height: 460, background: C.bg, borderRadius: 8 }}>
      <style>{CSS}</style>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <model-viewer {...mvProps} />

      {labels.map((l, i) => (
        <div key={i} className="mv-label" style={{
          left: l.x, top: l.y,
          color: l.color ?? C.cyan,
          background: 'rgba(10,10,15,0.88)',
          border: `1px solid ${l.color ?? C.cyan}`,
          boxShadow: `0 0 10px ${(l.color ?? C.cyan)}55`,
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
        color: C.silver, opacity: 0.6, pointerEvents: 'none',
      }}>
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}

/* ─── Steps ──────────────────────────────────────────────────────────── */
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

const S2 = (
  <StepModel
    model="gpu" orbit="40deg 60deg auto" fov="30deg"
    anim="Animation" autoplay
    labels={[
      { x: '50%', y: '82%', text: 'Gold contacts → face toward slot' },
      { x: '50%', y: '18%', text: 'Press BOTH ends down evenly — listen for click', color: C.purple },
    ]}
    note="Fans spinning — showing the GPU as it appears when fully installed"
  />
);

const S3 = (
  <StepModel
    model="gpu" orbit="175deg 88deg auto" fov="26deg"
    labels={[
      { x: '28%', y: '42%', text: 'Bracket sits against case wall' },
      { x: '20%', y: '28%', text: 'Screw ① — top', color: C.purple },
      { x: '20%', y: '62%', text: 'Screw ② — bottom', color: C.purple },
    ]}
    note="Rotate to see the bracket end — the thin metal plate with port openings"
  />
);

const S4 = (
  <StepModel
    model="gpu" orbit="8deg 35deg auto" fov="26deg"
    anim="Animation" autoplay
    labels={[
      { x: '38%', y: '22%', text: '8-pin ① — press until clip CLICKS' },
      { x: '58%', y: '16%', text: '8-pin ② — press until clip CLICKS' },
      { x: '48%', y: '8%',  text: '↑ PSU cables come from above', color: C.purple },
    ]}
    note="Look at the top edge of the GPU — that is where both 8-pin power connectors are"
  />
);

const S5 = (
  <StepModel
    model="motherboard" orbit="30deg 65deg auto" fov="32deg"
    anim="CPU inspect" autoplay
    labels={[
      { x: '50%', y: '50%', text: '✓ GPU installed — verify all 5 points before boot' },
    ]}
    note="Use the checklist on the right — all 5 points must pass before powering on"
  />
);

const steps = [
  {
    title: 'Open the PCIe latch',
    desc:  'Find the PCIe x16 slot on your motherboard — the longest horizontal slot, usually the topmost one. At the far right end is a small plastic latch tab. Push it outward until you hear a soft click.',
    tip:   'Look at the RIGHT END of the slot. The tab pivots outward. A click confirms it is open.',
    animated: S1,
  },
  {
    title: 'Align and press GPU into slot',
    desc:  'Hold the GPU with both hands. Lower it straight down with gold contacts facing the motherboard. Apply firm even pressure on both ends simultaneously until you hear a clear click — the latch locks automatically.',
    tip:   'Needs more force than you expect. If it wobbles at either end, press again — not fully seated.',
    animated: S2,
  },
  {
    title: 'Secure bracket with screws',
    desc:  'The metal bracket at the left end of the GPU must be screwed to the case — one screw at top, one at bottom. It must sit completely flush against the case wall with no gap.',
    tip:   'A gap between bracket and case wall means the GPU is not fully seated. Never overtighten.',
    animated: S3,
  },
  {
    title: 'Connect the PCIe power cables',
    desc:  'Look at the top edge of your GPU for power connector ports — two 8-pin sockets. Plug the matching cables from your PSU firmly until the black retention clip clicks.',
    tip:   'No click = not locked. To remove later: press the clip first, then pull. Red wires face outward.',
    animated: S4,
  },
  {
    title: 'Verify and power on',
    desc:  'Confirm: latch closed flush, bracket screwed both top and bottom, all power cables clicked, card sits level. Power on — display output = success. Install drivers from nvidia.com.',
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
