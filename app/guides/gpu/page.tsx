'use client';
import React from 'react';
import Script from 'next/script';
import GuideLayout from '@/components/GuideLayout';

/* ── Palette ──────────────────────────────────────────────────── */
const C = { bg:'#0A0A0F', cyan:'#00D4FF', purple:'#8B5CF6', silver:'#8080a0' };

/* ── Shared CSS ───────────────────────────────────────────────── */
const CSS = `
  model-viewer { background:#0A0A0F; --progress-bar-color:#00D4FF; }
  .mv-label {
    position:absolute; font-family:monospace; font-size:11px;
    padding:4px 10px; border-radius:4px; pointer-events:none;
    white-space:nowrap; transform:translate(-50%,-50%);
    animation:lbl-pulse 2.2s ease-in-out infinite;
  }
  @keyframes lbl-pulse   { 0%,100%{opacity:.55} 50%{opacity:1} }
  @keyframes push-right  { 0%,100%{opacity:.35;transform:translate(0,-50%)} 50%{opacity:1;transform:translate(10px,-50%)} }
  @keyframes bounce-down { 0%,100%{opacity:.4;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(12px)} }
  @keyframes ring-pulse  { 0%{transform:translate(-50%,-50%) scale(.75);opacity:1} 100%{transform:translate(-50%,-50%) scale(2);opacity:0} }
  @keyframes drop-cable  { 0%,100%{opacity:.3;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(8px)} }
`;

const MV_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';

/* ── Types ────────────────────────────────────────────────────── */
type LabelDef = { x:string; y:string; text:string; color?:string };

/* ── model-viewer props builder ───────────────────────────────── */
function buildMvProps(
  model:'gpu'|'motherboard', orbit:string, fov:string, anim?:string
): Record<string,any> {
  const p: Record<string,any> = {
    src:`/models/${model}.glb`,
    'camera-orbit':orbit, 'field-of-view':fov,
    'camera-controls':'true', 'shadow-intensity':'1.2',
    exposure:'0.9', 'environment-image':'neutral',
    style:{ width:'100%', height:'100%' },
  };
  if (anim) { p['animation-name']=anim; p.autoplay='true'; }
  return p;
}

/* ── Label component ──────────────────────────────────────────── */
function Lbl({ x, y, text, color=C.cyan }: LabelDef) {
  return (
    <div className="mv-label" style={{
      left:x, top:y, color,
      background:'rgba(10,10,15,0.88)',
      border:`1px solid ${color}`,
      boxShadow:`0 0 10px ${color}55`,
    }}>{text}</div>
  );
}

/* ── Single-model step panel ──────────────────────────────────── */
function StepModel({ model, orbit, fov='30deg', anim, labels=[], note, height=460, children }:{
  model:'gpu'|'motherboard'; orbit:string; fov?:string; anim?:string;
  labels?:LabelDef[]; note?:string; height?:number; children?:React.ReactNode;
}) {
  return (
    <div style={{ position:'relative', width:'100%', height, background:C.bg, borderRadius:8 }}>
      <style>{CSS}</style>
      <Script type="module" src={MV_SRC} strategy="afterInteractive" />
      {React.createElement('model-viewer', buildMvProps(model, orbit, fov, anim))}
      {labels.map((l,i) => <Lbl key={i} {...l} />)}
      {children}
      {note && (
        <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center', fontFamily:'monospace', fontSize:10, color:C.silver, pointerEvents:'none' }}>
          {note}
        </div>
      )}
      <div style={{ position:'absolute', top:8, right:10, fontFamily:'monospace', fontSize:9, color:C.silver, opacity:.5, pointerEvents:'none' }}>
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}

/* ── STEP 2: Dual-panel — motherboard left, GPU right ─────────── */
function DualPanel() {
  return (
    <div style={{ position:'relative', width:'100%', height:460, background:C.bg, borderRadius:8 }}>
      <style>{CSS}</style>
      <Script type="module" src={MV_SRC} strategy="afterInteractive" />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3, height:'100%' }}>

        {/* LEFT — motherboard zoomed to PCIe slot */}
        <div style={{ position:'relative', overflow:'hidden', borderRadius:'8px 0 0 8px' }}>
          {React.createElement('model-viewer', buildMvProps('motherboard','18deg 68deg auto','20deg'))}
          <Lbl x="50%" y="70%" text="← PCIe x16 slot (GPU goes here)" />
          <div style={{ position:'absolute', bottom:8, left:0, right:0, textAlign:'center', fontFamily:'monospace', fontSize:9, color:C.silver, opacity:.5 }}>
            MOTHERBOARD
          </div>
        </div>

        {/* RIGHT — GPU with fans spinning */}
        <div style={{ position:'relative', overflow:'hidden', borderRadius:'0 8px 8px 0' }}>
          {React.createElement('model-viewer', buildMvProps('gpu','40deg 60deg auto','28deg','Animation'))}
          <Lbl x="50%" y="84%" text="Gold contacts → align with slot below" />
          <div style={{ position:'absolute', bottom:8, left:0, right:0, textAlign:'center', fontFamily:'monospace', fontSize:9, color:C.silver, opacity:.5 }}>
            GPU · fans spinning
          </div>
        </div>
      </div>

      {/* Centre overlay: instruction + animated arrow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', zIndex:10, pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{
          marginTop:12, fontFamily:'monospace', fontSize:10,
          color:C.purple, background:'rgba(10,10,15,0.92)',
          border:`1px solid ${C.purple}`, borderRadius:4, padding:'3px 8px',
          whiteSpace:'nowrap', animation:'lbl-pulse 2.2s ease-in-out infinite',
        }}>
          Press BOTH ends evenly — listen for click
        </div>
        <div style={{ fontSize:30, color:C.cyan, marginTop:6, animation:'bounce-down 1s ease-in-out infinite', textShadow:`0 0 14px ${C.cyan}88` }}>
          ↓
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ Step visuals ══════════════════════════ */

/* Step 1 — PCIe latch: animated push-right arrow */
const S1 = (
  <StepModel model="motherboard" orbit="25deg 65deg auto" fov="28deg"
    labels={[
      { x:'52%', y:'68%', text:'PCIe x16 ← GPU slot (longest slot)' },
      { x:'76%', y:'76%', text:'Latch tab — push outward →', color:C.purple },
    ]}
    note="Rotate to find the PCIe x16 slot — longest horizontal slot, closest to the CPU"
  >
    {/* animated → nudge at latch position */}
    <div style={{
      position:'absolute', left:'86%', top:'76%',
      fontFamily:'monospace', fontSize:16, fontWeight:'bold',
      color:C.purple, pointerEvents:'none',
      animation:'push-right 1.1s ease-in-out infinite',
      textShadow:`0 0 8px ${C.purple}`,
    }}>→</div>
  </StepModel>
);

/* Step 2 — GPU install: dual panel */
const S2 = <DualPanel />;

/* Step 3 — Bracket screws: try short end at 270deg, pulsing screw rings */
const S3 = (
  <StepModel model="gpu" orbit="270deg 82deg auto" fov="15deg"
    labels={[
      { x:'42%', y:'40%', text:'Bracket plate — flush against case wall' },
      { x:'22%', y:'22%', text:'Screw ① — top',    color:C.purple },
      { x:'22%', y:'62%', text:'Screw ② — bottom', color:C.purple },
    ]}
    note="Wrong side? Drag left to rotate — find the thin metal plate with the port slot cutouts"
  >
    <div style={{ position:'absolute', left:'22%', top:'22%', width:22, height:22, borderRadius:'50%', border:`2px solid ${C.purple}`, animation:'ring-pulse 1.4s ease-out infinite', pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:'22%', top:'62%', width:22, height:22, borderRadius:'50%', border:`2px solid ${C.purple}`, animation:'ring-pulse 1.4s ease-out 0.7s infinite', pointerEvents:'none' }} />
  </StepModel>
);

/* Step 4 — Power cables: side-top view to catch 8-pin connectors */
const S4 = (
  <StepModel model="gpu" orbit="90deg 30deg auto" fov="20deg"
    labels={[
      { x:'38%', y:'20%', text:'8-pin ① — press until clip CLICKS' },
      { x:'62%', y:'14%', text:'8-pin ② — press until clip CLICKS' },
      { x:'50%', y:'6%',  text:'↑ PSU cables come from above', color:C.purple },
    ]}
    note="Can't see connectors? Drag the model — look for the two chunky sockets at the TOP edge of the card"
  >
    <div style={{ position:'absolute', left:'38%', top:'6%', fontSize:20, color:C.cyan, animation:'drop-cable 1.2s ease-in-out infinite', pointerEvents:'none', textShadow:`0 0 10px ${C.cyan}`, transform:'translateX(-50%)' }}>⬇</div>
    <div style={{ position:'absolute', left:'62%', top:'6%', fontSize:20, color:C.cyan, animation:'drop-cable 1.2s ease-in-out 0.5s infinite', pointerEvents:'none', textShadow:`0 0 10px ${C.cyan}`, transform:'translateX(-50%)' }}>⬇</div>
  </StepModel>
);

/* Step 5 — Verify: motherboard with CPU inspect animation */
const S5 = (
  <StepModel model="motherboard" orbit="30deg 65deg auto" fov="32deg" anim="CPU inspect"
    labels={[
      { x:'50%', y:'50%', text:'✓ GPU installed — verify all 5 points before boot' },
    ]}
    note="Use the checklist on the right — confirm every point before powering on"
  />
);

/* ── Steps data ───────────────────────────────────────────────── */
const steps = [
  {
    title:'Open the PCIe latch',
    desc:'Find the PCIe x16 slot — the longest horizontal slot, usually topmost. Push the latch tab at the far right end outward until it clicks open.',
    tip:'Look at the RIGHT END of the slot. A click confirms it is open.',
    animated: S1,
  },
  {
    title:'Align and press GPU into slot',
    desc:'Lower the GPU straight down with gold contacts facing the motherboard. Press both ends down firmly and evenly until you hear a clear click — latch locks automatically.',
    tip:'More force than you expect. Wobble at either end = not fully seated, press again.',
    animated: S2,
  },
  {
    title:'Secure bracket with screws',
    desc:'The metal bracket must be screwed to the case — one screw top, one bottom — sitting completely flush against the case wall with no gap.',
    tip:'A gap means the GPU is not fully seated. Never overtighten — bracket steel is thin.',
    animated: S3,
  },
  {
    title:'Connect the PCIe power cables',
    desc:'Plug the 8-pin cables from your PSU into the top edge of the GPU firmly until the black retention clip clicks on each connector.',
    tip:'No click = not locked. To remove later: press the clip first, then pull. Red wires face outward.',
    animated: S4,
  },
  {
    title:'Verify and power on',
    desc:'Confirm: latch closed, bracket screwed both top and bottom, power cables clicked, card sits level. Power on — display output = success. Install drivers from nvidia.com.',
    tip:'No display? Press GPU down again first, then re-check power connectors are clicked.',
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
