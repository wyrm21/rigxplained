'use client';
import GuideLayout from '@/components/GuideLayout';

/* ─── ISO PROJECTION ─────────────────────────────────────────────────── */
function mkIso(ox:number, oy:number, s:number, mirror=false) {
  const px = (x:number,y:number) => mirror ? ox+(y-x)*0.866*s : ox+(x-y)*0.866*s;
  const py = (x:number,y:number,z:number) => oy+(x+y)*0.5*s-z*s;
  const p  = (x:number,y:number,z:number) => `${px(x,y).toFixed(1)},${py(x,y,z).toFixed(1)}`;
  const pl = (pts:[number,number,number][]) => pts.map(([x,y,z])=>p(x,y,z)).join(' ');
  const pt = (x:number,y:number,z:number) => ({x:px(x,y), y:py(x,y,z)});
  return {p,pl,pt};
}

/* ─── COLORS ──────────────────────────────────────────────────────────── */
const K = {
  bg:'#0A0A0F', mobo:'#0d1a0d', moboB:'#1d3d1d', moboE:'#060e06',
  pcie:'#0a0a1c', gold:'#b8860b', shroud:'#1d1d1d', pcb:'#152215',
  chip:'#181818', cpu:'#18180c', bracket:'#383848', dark:'#101010',
  cyan:'#00D4FF', purple:'#8B5CF6', red:'#cc2a2a',
};

/* ─── ANIMATIONS ─────────────────────────────────────────────────────── */
const A = `
  @keyframes gpu_dn { 0%,15%{transform:translateY(-52px);opacity:.5;} 65%,100%{transform:translateY(0);opacity:1;} }
  @keyframes latch_o { 0%,30%{transform:rotate(0deg);} 70%,100%{transform:rotate(-52deg);} }
  @keyframes latch_c { 0%,42%{transform:rotate(-52deg);} 74%,100%{transform:rotate(0deg);} }
  @keyframes pls { 0%,100%{opacity:.2;stroke-opacity:.4;} 50%{opacity:1;stroke-opacity:1;} }
  @keyframes ring { 0%,100%{transform:scale(1);opacity:.9;} 50%{transform:scale(1.22);opacity:.45;} }
  @keyframes dn_arr { 0%,100%{transform:translateY(-5px);opacity:.3;} 50%{transform:translateY(0);opacity:1;} }
  @keyframes click_pop { 0%,55%{transform:scale(0) translateX(-50%);opacity:0;} 70%{transform:scale(1.08) translateX(-50%);opacity:1;} 86%,100%{transform:scale(.92) translateX(-50%);opacity:0;} }
  @keyframes screw_r { to{transform:rotate(360deg);} }
  @keyframes plug_dn { 0%,15%{transform:translateY(-62px);} 62%,100%{transform:translateY(0);} }
  @keyframes rgb { 0%,100%{opacity:.45;} 50%{opacity:1;} }
  @keyframes chk { from{stroke-dashoffset:44;} to{stroke-dashoffset:0;} }
  @keyframes slide { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }
`;

/* ─── ISO MOTHERBOARD ────────────────────────────────────────────────── */
function Mobo({iso, hi=false}:{iso:ReturnType<typeof mkIso>;hi?:boolean}) {
  const {pl,pt} = iso;
  return (
  <g>
    {/* PCB faces */}
    <polygon points={pl([[0,0,5],[200,0,5],[200,165,5],[0,165,5]])} fill={K.mobo} stroke={K.moboB} strokeWidth="1"/>
    <polygon points={pl([[0,165,5],[200,165,5],[200,165,0],[0,165,0]])} fill={K.moboE} stroke={K.moboB}/>
    <polygon points={pl([[200,0,5],[200,165,5],[200,165,0],[200,0,0]])} fill="#060c06" stroke={K.moboB}/>
    {/* I/O area */}
    <polygon points={pl([[0,0,5],[90,0,5],[90,28,5],[0,28,5]])} fill="#141414" stroke="#222"/>
    {/* CPU socket */}
    <polygon points={pl([[18,35,5],[68,35,5],[68,82,5],[18,82,5]])} fill={K.dark} stroke="#333"/>
    <polygon points={pl([[23,40,5],[63,40,5],[63,77,5],[23,77,5]])} fill={K.cpu} stroke="#555"/>
    <polygon points={pl([[23,40,26],[63,40,26],[63,77,26],[23,77,26]])} fill="#22220e" stroke="#555"/>
    <polygon points={pl([[23,40,5],[23,77,5],[23,77,26],[23,40,26]])} fill="#1a1a0a" stroke="#333"/>
    <polygon points={pl([[63,40,5],[63,77,5],[63,77,26],[63,40,26]])} fill="#1e1e0e" stroke="#333"/>
    {/* VRM fins */}
    <polygon points={pl([[70,35,5],[92,35,5],[92,82,5],[70,82,5]])} fill={K.chip} stroke="#2a2a2a"/>
    {[35,42,49,56,63,70,77].map(yr=>(
      <polygon key={yr} points={pl([[70,yr,5],[92,yr,5],[92,yr,18],[70,yr,18]])} fill="#1e1e1e" stroke="#2a2a2a" strokeWidth=".5"/>
    ))}
    {/* RAM ×4 with height */}
    {[0,1,2,3].map(i=>(
      <g key={i}>
        <polygon points={pl([[100+i*20,10,5],[114+i*20,10,5],[114+i*20,84,5],[100+i*20,84,5]])} fill={K.dark} stroke="#252525"/>
        <polygon points={pl([[100+i*20,10,5],[114+i*20,10,5],[114+i*20,10,40],[100+i*20,10,40]])} fill="#0c0c14" stroke="#1e1e2e"/>
        <polygon points={pl([[114+i*20,10,5],[114+i*20,84,5],[114+i*20,84,40],[114+i*20,10,40]])} fill="#0a0a10" stroke="#1e1e2e"/>
        <polygon points={pl([[100+i*20,10,40],[114+i*20,10,40],[114+i*20,84,40],[100+i*20,84,40]])} fill="#111826" stroke="#2a2a3a"/>
        {[18,34,50,66].map(yr=>(
          <polygon key={yr} points={pl([[102+i*20,yr,40],[112+i*20,yr,40],[112+i*20,yr+10,40],[102+i*20,yr+10,40]])} fill="#1e1e2e" stroke="#2a2a3a" strokeWidth=".5"/>
        ))}
      </g>
    ))}
    {/* PCIe x16 */}
    <polygon points={pl([[5,98,5],[195,98,5],[195,114,5],[5,114,5]])}
      fill={hi?'#0a0a22':K.pcie} stroke={hi?K.cyan:'#334'} strokeWidth={hi?'2':'1.5'}
      style={hi?{animation:'pls 2s ease-in-out infinite'}:{}}/>
    {Array.from({length:16}).map((_,i)=>(
      <polygon key={i} points={pl([[8+i*11,99,5],[16+i*11,99,5],[16+i*11,113,5],[8+i*11,113,5]])} fill={K.gold} opacity=".85"/>
    ))}
    {/* Latch */}
    <polygon points={pl([[188,110,5],[198,110,5],[198,110,13],[188,110,13]])} fill="#3a3a7a" stroke={K.cyan}/>
    {/* PCIe x1 slots */}
    <polygon points={pl([[5,120,5],[195,120,5],[195,126,5],[5,126,5]])} fill={K.dark} stroke="#222"/>
    <polygon points={pl([[5,132,5],[195,132,5],[195,138,5],[5,138,5]])} fill={K.dark} stroke="#222"/>
    {/* Chipset */}
    <polygon points={pl([[120,120,5],[165,120,5],[165,158,5],[120,158,5]])} fill={K.chip} stroke="#2a2a2a"/>
    {[120,127,134,141,148,155].map(yr=>(
      <polygon key={yr} points={pl([[120,yr,5],[165,yr,5],[165,yr,9],[120,yr,9]])} fill="#1e1e1e" stroke="#2a2a2a" strokeWidth=".5"/>
    ))}
    {/* Fan headers */}
    {[18,36,54].map(x=>(
      <polygon key={x} points={pl([[x,150,5],[x+15,150,5],[x+15,158,5],[x,158,5]])} fill={K.dark} stroke="#222"/>
    ))}
    {/* SATA */}
    {[0,1,2].map(i=>(
      <polygon key={i} points={pl([[170,122+i*14,5],[190,122+i*14,5],[190,132+i*14,5],[170,132+i*14,5]])} fill={K.dark} stroke="#222"/>
    ))}
    {/* 24-pin */}
    <polygon points={pl([[180,12,5],[198,12,5],[198,65,5],[180,65,5]])} fill={K.dark} stroke="#333"/>
    <polygon points={pl([[180,12,5],[198,12,5],[198,12,24],[180,12,24]])} fill="#0c0c14" stroke="#1e1e2e"/>
    <polygon points={pl([[198,12,5],[198,65,5],[198,65,24],[198,12,24]])} fill="#0a0a12" stroke="#1e1e2e"/>
  </g>
  );
}

/* ─── ISO GPU (animated group) ───────────────────────────────────────── */
function Gpu({iso,mirror=false}:{iso:ReturnType<typeof mkIso>;mirror?:boolean}) {
  const {pl,pt} = iso;
  const z0=88, z1=170;
  return (
  <g>
    {/* PCB bottom */}
    <polygon points={pl([[5,95,z0],[195,95,z0],[195,119,z0],[5,119,z0]])} fill={K.pcb} stroke={K.moboB}/>
    {/* Sides */}
    <polygon points={pl([[5,95,z0],[5,119,z0],[5,119,z1],[5,95,z1]])} fill="#0c180c" stroke={K.moboB}/>
    <polygon points={pl([[195,95,z0],[195,119,z0],[195,119,z1],[195,95,z1]])} fill="#0a140a" stroke={K.moboB}/>
    {/* Front face */}
    <polygon points={pl([[5,119,z0],[195,119,z0],[195,119,z1],[5,119,z1]])} fill="#141414" stroke="#1e1e1e"/>
    {/* Shroud top */}
    <polygon points={pl([[5,95,z1],[195,95,z1],[195,119,z1],[5,119,z1]])} fill={K.shroud} stroke="#2a2a2a"/>
    {/* Fan circles on top */}
    {[58,138].map(fx=>{
      const c = pt(fx,107,z1);
      return (
        <g key={fx}>
          <ellipse cx={c.x} cy={c.y} rx={18} ry={10} fill="#0c0c0c" stroke="#222" strokeWidth="1.5"/>
          {[0,45,90,135,180,225,270,315].map(a=>(
            <line key={a}
              x1={c.x} y1={c.y}
              x2={c.x+14*Math.cos(a*Math.PI/180)*0.95}
              y2={c.y+7.5*Math.sin(a*Math.PI/180)*0.95}
              stroke="#1c1c1c" strokeWidth="2.8" strokeLinecap="round"/>
          ))}
          <ellipse cx={c.x} cy={c.y} rx={4} ry={2.2} fill="#181818" stroke="#2a2a2a"/>
          <ellipse cx={c.x} cy={c.y} rx={1.5} ry={0.9} fill="#222"/>
        </g>
      );
    })}
    {/* RGB stripe on top front edge */}
    <polygon points={pl([[5,119,z1-5],[195,119,z1-5],[195,119,z1],[5,119,z1]])} fill={K.cyan} opacity=".7" style={{animation:'rgb 2s ease-in-out infinite'}}/>
    <polygon points={pl([[5,95,z1-5],[195,95,z1-5],[195,95,z1],[5,95,z1]])} fill={K.cyan} opacity=".35" style={{animation:'rgb 2s ease-in-out infinite'}}/>
    {/* Gold contacts bottom */}
    {Array.from({length:16}).map((_,i)=>(
      <polygon key={i} points={pl([[8+i*11,96,z0],[16+i*11,96,z0],[16+i*11,118,z0],[8+i*11,118,z0]])} fill={K.gold}/>
    ))}
    {/* Bracket left */}
    <polygon points={pl([[0,95,z0],[5,95,z0],[5,119,z0],[0,119,z0]])} fill={K.bracket} stroke="#555"/>
    <polygon points={pl([[0,95,z0],[0,119,z0],[0,119,z1],[0,95,z1]])} fill="#2a2a3a" stroke="#444"/>
    <polygon points={pl([[0,95,z1],[5,95,z1],[5,119,z1],[0,119,z1]])} fill="#3a3a4a" stroke="#555"/>
    {/* Power connectors */}
    <polygon points={pl([[148,95,z1],[168,95,z1],[168,95,z1+18],[148,95,z1+18]])} fill="#181818" stroke="#444"/>
    <polygon points={pl([[172,95,z1],[192,95,z1],[192,95,z1+18],[172,95,z1+18]])} fill="#181818" stroke="#444"/>
    {/* Heatsink fins visible on top (mirror side) */}
    {Array.from({length:10}).map((_,i)=>(
      <polygon key={i} points={pl([[20+i*16,95,z1],[34+i*16,95,z1],[34+i*16,96,z1+4],[20+i*16,96,z1+4]])} fill="#1a1a1a" stroke="#111" strokeWidth=".5"/>
    ))}
  </g>
  );
}

/* ─── STEP 1 ─────────────────────────────────────────────────────────── */
function S1() {
  const iso = mkIso(330, 110, 0.76);
  const {pt} = iso;
  const slotC = pt(100,106,5);
  const latchPt = pt(193,111,9);
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <defs><style>{A}</style>
        <pattern id="tr" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 0v24M0 12h24" stroke="#192319" strokeWidth=".4"/>
          <circle cx="12" cy="12" r="1" fill="#192319"/>
        </pattern>
      </defs>

      {/* Left: full motherboard */}
      <text x="14" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">FULL MOTHERBOARD VIEW</text>
      <Mobo iso={iso} hi={true}/>

      {/* Slot label */}
      <line x1={slotC.x} y1={slotC.y-6} x2={slotC.x-20} y2={slotC.y-38} stroke={K.cyan} strokeWidth="1" strokeDasharray="3,2"/>
      <text x={slotC.x-70} y={slotC.y-44} fill={K.cyan} fontSize="11" fontFamily="monospace">PCIe x16 ← GPU slot</text>
      {/* Latch callout */}
      <line x1={latchPt.x} y1={latchPt.y} x2={latchPt.x+30} y2={latchPt.y-30} stroke={K.cyan} strokeWidth="1" strokeDasharray="2,2"/>
      <text x={latchPt.x+32} y={latchPt.y-32} fill={K.cyan} fontSize="10" fontFamily="monospace">latch →</text>

      {/* Divider */}
      <line x1="380" y1="12" x2="380" y2="468" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Right: latch close-up */}
      <text x="392" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">LATCH — CLOSE-UP</text>

      {/* Slot body */}
      <rect x="394" y="110" width="290" height="58" rx="4" fill={K.pcie} stroke="#334" strokeWidth="2"/>
      {Array.from({length:18}).map((_,i)=>(
        <g key={i}>
          <rect x={400+i*14} y={114} width="9" height="50" rx="1" fill={K.gold} opacity=".88"/>
          <line x1={404+i*14} y1={114} x2={404+i*14} y2={164} stroke="#8a6000" strokeWidth=".5" opacity=".4"/>
        </g>
      ))}
      {/* Key notch */}
      <rect x="514" y="114" width="16" height="50" fill="#0a0a0a" stroke="#111"/>
      <text x="510" y="105" fill="#6B7280" fontSize="8" fontFamily="monospace">key notch</text>
      {/* Slot rails */}
      <rect x="394" y="104" width="290" height="8" rx="2" fill="#1c1c1c"/>
      <rect x="394" y="168" width="290" height="8" rx="2" fill="#1c1c1c"/>

      {/* Latch housing */}
      <rect x="658" y="106" width="30" height="56" rx="4" fill="#1c1c2c" stroke="#3a3a4a" strokeWidth="1.5"/>
      <rect x="661" y="109" width="24" height="50" rx="2" fill="#161626"/>
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1="664" y1={116+i*5} x2="680" y2={116+i*5} stroke="#252535" strokeWidth="1.2"/>
      ))}
      {/* Tab animates open */}
      <g style={{animation:'latch_o 2.8s ease-in-out infinite',transformOrigin:'660px 162px'}}>
        <rect x="648" y="152" width="26" height="17" rx="3" fill="#4a4a8c" stroke={K.cyan} strokeWidth="1.8"/>
        <rect x="651" y="155" width="20" height="11" rx="2" fill={K.cyan} opacity=".5"/>
        {[0,1,2].map(r=><line key={r} x1="654" y1={156+r*2.5} x2="666" y2={156+r*2.5} stroke="#9090cc" strokeWidth=".8"/>)}
      </g>
      {/* Push arrow */}
      <g style={{animation:'pls 1.5s ease-in-out infinite'}}>
        <line x1="626" y1="160" x2="645" y2="160" stroke={K.cyan} strokeWidth="2.5"/>
        <polygon points="643,156 652,160 643,164" fill={K.cyan}/>
        <text x="565" y="155" fill={K.cyan} fontSize="12" fontFamily="monospace">push →</text>
      </g>

      {/* Annotation */}
      <line x1="674" y1="172" x2="674" y2="210" stroke="#555" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="642" y="224" fill="#9CA3AF" fontSize="11" fontFamily="monospace">latch tab</text>
      <text x="642" y="238" fill="#6B7280" fontSize="10" fontFamily="monospace">clicks open</text>

      {/* Dimension */}
      <line x1="394" y1="184" x2="658" y2="184" stroke="#252525" strokeWidth=".8"/>
      <line x1="394" y1="181" x2="394" y2="187" stroke="#444"/>
      <line x1="658" y1="181" x2="658" y2="187" stroke="#444"/>
      <text x="512" y="197" fill="#555" fontSize="9" fontFamily="monospace" textAnchor="middle">89mm — PCIe x16 slot</text>

      <text x="392" y="300" fill="#6B7280" fontSize="11" fontFamily="monospace">① Find the LONGEST slot — usually topmost</text>
      <text x="392" y="318" fill="#6B7280" fontSize="11" fontFamily="monospace">② Latch at FAR RIGHT end of the slot</text>
      <text x="392" y="336" fill="#6B7280" fontSize="11" fontFamily="monospace">③ Push tab outward — click = open</text>
    </svg>
  );
}

/* ─── STEP 2 (merged align + press) ─────────────────────────────────── */
function S2() {
  // Two simultaneous isometric views
  const isoR = mkIso(195, 140, 0.72, false); // upper-right camera
  const isoL = mkIso(505, 140, 0.72, true);  // upper-left camera (mirrored)
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <defs><style>{A}</style></defs>

      {/* Labels */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">VIEW 1 — UPPER-RIGHT ANGLE</text>
      <text x="362" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">VIEW 2 — UPPER-LEFT ANGLE</text>
      <line x1="350" y1="10" x2="350" y2="470" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* ── VIEW 1 ── */}
      <Mobo iso={isoR} hi={true}/>
      {/* GPU dropping - View 1 */}
      <g style={{animation:'gpu_dn 3.5s ease-in-out infinite'}}>
        <Gpu iso={isoR}/>
        {/* Down arrows */}
        <g style={{animation:'dn_arr 1.4s ease-in-out infinite'}}>
          {[55,150].map(fx=>{
            const {pt}=isoR; const c=pt(fx,80,170);
            return <g key={fx}>
              <line x1={c.x} y1={c.y-28} x2={c.x} y2={c.y-8} stroke={K.cyan} strokeWidth="2.5"/>
              <polygon points={`${c.x-5},${c.y-10} ${c.x},${c.y} ${c.x+5},${c.y-10}`} fill={K.cyan}/>
            </g>;
          })}
        </g>
      </g>
      {/* CLICK badge View 1 */}
      <g style={{animation:'click_pop 3.5s ease-in-out infinite'}}>
        {(()=>{const {pt}=isoR;const c=pt(100,106,5);return(
          <g>
            <rect x={c.x-42} y={c.y+10} width={84} height={28} rx={14} fill={K.cyan}/>
            <text x={c.x} y={c.y+29} fill="#0A0A0F" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</text>
          </g>
        );})()}
      </g>
      {/* Latch closing View 1 */}
      {(()=>{const {pt}=isoR;const lp=pt(193,111,9);return(
        <g style={{animation:'latch_c 3.5s ease-in-out infinite',transformOrigin:`${lp.x}px ${lp.y}px`}}>
          <circle cx={lp.x} cy={lp.y} r={6} fill={K.cyan} opacity=".8"/>
        </g>
      );})()}

      {/* ── VIEW 2 (mirrored) ── */}
      <Mobo iso={isoL} hi={true}/>
      {/* GPU dropping - View 2 */}
      <g style={{animation:'gpu_dn 3.5s ease-in-out infinite'}}>
        <Gpu iso={isoL} mirror={true}/>
        <g style={{animation:'dn_arr 1.4s ease-in-out infinite'}}>
          {[55,150].map(fx=>{
            const {pt}=isoL; const c=pt(fx,80,170);
            return <g key={fx}>
              <line x1={c.x} y1={c.y-28} x2={c.x} y2={c.y-8} stroke={K.cyan} strokeWidth="2.5"/>
              <polygon points={`${c.x-5},${c.y-10} ${c.x},${c.y} ${c.x+5},${c.y-10}`} fill={K.cyan}/>
            </g>;
          })}
        </g>
      </g>
      {/* CLICK badge View 2 */}
      <g style={{animation:'click_pop 3.5s ease-in-out infinite 0.3s'}}>
        {(()=>{const {pt}=isoL;const c=pt(100,106,5);return(
          <g>
            <rect x={c.x-42} y={c.y+10} width={84} height={28} rx={14} fill={K.cyan}/>
            <text x={c.x} y={c.y+29} fill="#0A0A0F" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</text>
          </g>
        );})()}
      </g>

      {/* Bottom notes */}
      <text x="10" y="450" fill="#6B7280" fontSize="10" fontFamily="monospace">Press both ends evenly · latch snaps shut automatically · card sits level = fully seated</text>
    </svg>
  );
}

/* ─── STEP 3 — bracket screws ───────────────────────────────────────── */
function S3() {
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <defs><style>{A}</style></defs>
      <text x="14" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">PC CASE — REAR EXPANSION AREA</text>
      <text x="400" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">SCREW — DETAIL</text>
      <line x1="385" y1="10" x2="385" y2="470" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* ── LEFT: Full case rear panel ── */}
      {/* Case body */}
      <rect x="14" y="32" width="364" height="420" rx="5" fill="#181818" stroke="#2a2a2a" strokeWidth="2"/>
      {/* Ribbing */}
      {Array.from({length:18}).map((_,i)=>(
        <rect key={i} x="16" y={34+i*23} width="360" height="1.5" fill="#1e1e1e"/>
      ))}
      {/* Expansion slot openings */}
      {[1,2,3,4,5,6].map(i=>(
        <rect key={i} x="52" y={36+i*56} width="46" height="52" rx="2" fill="#101010" stroke="#2a2a2a"/>
      ))}

      {/* GPU BRACKET — occupies slot 0 (full height) */}
      <rect x="52" y="36" width="46" height="390" rx="2" fill="#323245" stroke="#666" strokeWidth="1.5"/>

      {/* Display outputs on bracket */}
      {[{y:55,h:12,t:'DP'},{y:71,h:12,t:'DP'},{y:87,h:18,t:'HDMI'},{y:109,h:12,t:'DP'}].map(({y,h,t},i)=>(
        <g key={i}>
          <rect x="56" y={y} width="38" height={h} rx="1" fill="#0d0d0d" stroke="#3a3a3a"/>
          <text x="58" y={y+h-2} fill="#555" fontSize="6.5" fontFamily="monospace">{t}</text>
        </g>
      ))}

      {/* GPU card body behind bracket */}
      <rect x="98" y="44" width="268" height="160" rx="2" fill="#141414" stroke="#1e1e1e"/>
      {/* Three fans visible */}
      {[60,150,240].map(cx=>(
        <g key={cx}>
          <circle cx={cx+98} cy={124} r={54} fill="#111" stroke="#1e1e1e" strokeWidth="1.5"/>
          <circle cx={cx+98} cy={124} r={44} fill="#0d0d0d"/>
          {[0,45,90,135,180,225,270,315].map(a=>(
            <line key={a}
              x1={cx+98} y1={124}
              x2={cx+98+38*Math.cos(a*Math.PI/180)}
              y2={124+38*Math.sin(a*Math.PI/180)}
              stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"/>
          ))}
          <circle cx={cx+98} cy={124} r={9} fill="#111" stroke="#2a2a2a"/>
        </g>
      ))}
      {/* RGB on card */}
      <rect x="98" y="198" width="268" height="4" rx="2" fill={K.cyan} opacity=".5" style={{animation:'rgb 2s ease-in-out infinite'}}/>

      {/* TOP screw hole */}
      <circle cx="75" cy="44" r="10" fill="#0c0c0c" stroke="#666" strokeWidth="2"/>
      <g style={{animation:'screw_r 2s linear infinite',transformOrigin:'75px 44px'}}>
        <rect x="67" y="42" width="16" height="4" rx="1.5" fill="#bbb"/>
        <rect x="73" y="36" width="4" height="16" rx="1.5" fill="#bbb"/>
        <line x1="69" y1="38" x2="81" y2="50" stroke="#999" strokeWidth="1.2"/>
        <line x1="81" y1="38" x2="69" y2="50" stroke="#999" strokeWidth="1.2"/>
      </g>
      <text x="22" y="48" fill={K.cyan} fontSize="12" fontFamily="monospace">①</text>

      {/* BOTTOM screw hole */}
      <circle cx="75" cy="390" r="10" fill="#0c0c0c" stroke="#666" strokeWidth="2"/>
      <g style={{animation:'screw_r 2s linear infinite 0.5s',transformOrigin:'75px 390px'}}>
        <rect x="67" y="388" width="16" height="4" rx="1.5" fill="#bbb"/>
        <rect x="73" y="382" width="4" height="16" rx="1.5" fill="#bbb"/>
        <line x1="69" y1="384" x2="81" y2="396" stroke="#999" strokeWidth="1.2"/>
        <line x1="81" y1="384" x2="69" y2="396" stroke="#999" strokeWidth="1.2"/>
      </g>
      <text x="22" y="394" fill={K.cyan} fontSize="12" fontFamily="monospace">②</text>

      {/* Flush indicator */}
      <line x1="50" y1="36" x2="50" y2="424" stroke={K.cyan} strokeWidth="1" strokeDasharray="4,3" opacity=".5"/>
      <text x="16" y="220" fill={K.cyan} fontSize="9" fontFamily="monospace" writingMode="tb-rl" transform="rotate(-90,20,240)">BRACKET MUST SIT FLUSH HERE</text>

      {/* ── RIGHT: Screw detail ── */}
      {/* Case wall slice */}
      <rect x="396" y="50" width="24" height="220" rx="2" fill="#1c1c1c" stroke="#333"/>
      {/* Bracket slice */}
      <rect x="420" y="50" width="36" height="220" rx="2" fill="#2e2e40" stroke="#777" strokeWidth="1.5"/>
      {/* GPU card behind */}
      <rect x="456" y="60" width="220" height="60" rx="2" fill="#141414" stroke="#1e1e1e"/>
      {/* Fan visible */}
      <circle cx="530" cy="90" r="26" fill="#111" stroke="#1e1e1e"/>
      {[0,45,90,135,180,225,270,315].map(a=>(
        <line key={a} x1="530" y1="90"
          x2={530+20*Math.cos(a*Math.PI/180)} y2={90+20*Math.sin(a*Math.PI/180)}
          stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round"/>
      ))}

      {/* Screw close-up */}
      <circle cx="438" cy="130" r="14" fill="#0d0d0d" stroke="#888" strokeWidth="2.5"/>
      <circle cx="438" cy="130" r="8" fill="#0a0a0a" stroke="#aaa" strokeWidth="1.2"/>
      <g style={{animation:'screw_r 2s linear infinite',transformOrigin:'438px 130px'}}>
        <rect x="430" y="128" width="16" height="4" rx="1.5" fill="#ccc"/>
        <rect x="436" y="122" width="4" height="16" rx="1.5" fill="#ccc"/>
        <line x1="432" y1="124" x2="444" y2="136" stroke="#aaa" strokeWidth="1.2"/>
        <line x1="444" y1="124" x2="432" y2="136" stroke="#aaa" strokeWidth="1.2"/>
      </g>

      {/* Screwdriver */}
      <g style={{animation:'dn_arr 2s ease-in-out infinite'}}>
        <rect x="472" y="68" width="32" height="52" rx="9" fill="#ddd" stroke="#bbb"/>
        {[0,1,2,3,4].map(i=>(<rect key={i} x="472" y={74+i*8} width="32" height="5" rx="2.5" fill="#ccc" opacity=".6"/>))}
        <rect x="481" y="119" width="10" height="30" rx="1" fill="#999" stroke="#777"/>
        <path d="M 481 149 L 486 160 L 491 149 Z" fill="#666"/>
        <rect x="483" y="150" width="6" height="4" rx=".5" fill="#555"/>
        <line x1="483" y1="153" x2="489" y2="153" stroke="#444" strokeWidth="2"/>
        <line x1="486" y1="150" x2="486" y2="156" stroke="#444" strokeWidth="2"/>
      </g>

      {/* Instructions */}
      <rect x="398" y="290" width="286" height="120" rx="6" fill="#0d0d0d" stroke="#1E1E2E"/>
      {['① Align bracket in slot opening','② Finger-tighten top + bottom screw','③ Check bracket sits FLUSH — no gap','④ Quarter-turn snug with screwdriver'].map((t,i)=>(
        <text key={i} x="412" y={312+i*22} fill="#9CA3AF" fontSize="11" fontFamily="monospace">{t}</text>
      ))}

      <text x="396" y="435" fill={K.red} fontSize="10" fontFamily="monospace">Gap between bracket + case wall = GPU not fully seated</text>
      <text x="396" y="450" fill="#6B7280" fontSize="10" fontFamily="monospace">Never overtighten — bracket steel is thin</text>
    </svg>
  );
}

/* ─── STEP 4 — power connectors (front-right angle) ─────────────────── */
function S4() {
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <defs><style>{A}</style></defs>
      <text x="14" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">GPU — FRONT-RIGHT ANGLE  (where power ports sit)</text>
      <text x="418" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">CONNECTOR — DETAIL</text>
      <line x1="402" y1="10" x2="402" y2="470" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* ── LEFT: GPU front-right 3/4 view ── */}
      {/* GPU shroud body */}
      <rect x="14" y="80" width="380" height="280" rx="5" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      {/* Top edge — where power ports are */}
      <rect x="14" y="80" width="380" height="28" rx="4" fill="#141414" stroke="#2a2a2a"/>
      {/* RGB on top front */}
      <rect x="18" y="83" width="372" height="5" rx="2" fill="url(#rgb_grad)" style={{animation:'rgb 2s ease-in-out infinite'}}/>
      <defs>
        <linearGradient id="rgb_grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={K.cyan} stopOpacity="0"/>
          <stop offset="30%" stopColor={K.cyan}/>
          <stop offset="70%" stopColor={K.purple}/>
          <stop offset="100%" stopColor={K.purple} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Accent line */}
      <rect x="18" y="90" width="372" height="2" fill="#1e1e1e"/>

      {/* THREE FANS */}
      {[80,200,320].map(cx=>(
        <g key={cx}>
          <circle cx={cx} cy={230} r={76} fill="#111" stroke="#1e1e1e" strokeWidth="2"/>
          <circle cx={cx} cy={230} r={72} fill="#0d0d0d"/>
          {[0,51,102,153,204,255,306].map(a=>{
            const r=a*Math.PI/180; const r2=(a+38)*Math.PI/180;
            return <path key={a}
              d={`M ${cx} ${230} L ${cx+61*Math.cos(r)} ${230+61*Math.sin(r)} A 61 61 0 0 1 ${cx+61*Math.cos(r2)} ${230+61*Math.sin(r2)} Z`}
              fill="#171717" stroke="#1e1e1e" strokeWidth=".5"/>;
          })}
          <circle cx={cx} cy={230} r={13} fill="#111" stroke="#252525"/>
          <circle cx={cx} cy={230} r={5} fill="#181818"/>
          {/* Stator struts */}
          {[0,120,240].map(a=>(
            <line key={a} x1={cx+13*Math.cos(a*Math.PI/180)} y1={230+13*Math.sin(a*Math.PI/180)}
              x2={cx+70*Math.cos(a*Math.PI/180)} y2={230+70*Math.sin(a*Math.PI/180)}
              stroke="#181818" strokeWidth="4" strokeLinecap="round"/>
          ))}
        </g>
      ))}

      {/* Power ports ON TOP EDGE of GPU (8-pin × 2) */}
      {/* Port 1 */}
      <rect x="22" y="66" width="60" height="32" rx="3" fill="#111" stroke="#444" strokeWidth="1.8"/>
      <rect x="25" y="68" width="54" height="28" rx="2" fill="#0a0a0a"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={31+(i%4)*13} cy={i<4?75:84} r={4.5} fill="#181818" stroke="#333" strokeWidth=".8"/>
      ))}
      {/* Port label */}
      <text x="22" y="60" fill="#888" fontSize="9" fontFamily="monospace">8-pin ①</text>

      {/* Port 2 */}
      <rect x="90" y="66" width="60" height="32" rx="3" fill="#111" stroke="#444" strokeWidth="1.8"/>
      <rect x="93" y="68" width="54" height="28" rx="2" fill="#0a0a0a"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={99+(i%4)*13} cy={i<4?75:84} r={4.5} fill="#181818" stroke="#333" strokeWidth=".8"/>
      ))}
      <text x="90" y="60" fill="#888" fontSize="9" fontFamily="monospace">8-pin ②</text>

      {/* Highlight boxes on ports */}
      <rect x="20" y="64" width="64" height="36" rx="3" fill="none" stroke={K.red} strokeWidth="2" style={{animation:'pls 1.5s ease-in-out infinite'}}/>
      <rect x="88" y="64" width="64" height="36" rx="3" fill="none" stroke={K.red} strokeWidth="2" style={{animation:'pls 1.5s ease-in-out infinite 0.3s'}}/>

      {/* GPU model text */}
      <text x="160" y="110" fill="#1e1e1e" fontSize="14" fontFamily="monospace" letterSpacing="3">RTX ○○○○</text>
      <text x="160" y="125" fill="#181818" fontSize="9" fontFamily="monospace">GRAPHICS CARD  ·  300W TDP</text>

      {/* Bottom info */}
      <text x="14" y="382" fill="#6B7280" fontSize="10" fontFamily="monospace">GPU CANNOT run from motherboard slot alone — needs direct PSU power</text>
      <text x="14" y="398" fill="#6B7280" fontSize="10" fontFamily="monospace">Route cables toward TOP of case for clean airflow</text>

      {/* ── RIGHT: connector detail ── */}
      {/* 8-pin cable dropping in */}
      <g style={{animation:'plug_dn 3s ease-in-out infinite'}}>
        <rect x="420" y="95" width="68" height="46" rx="3" fill="#b82020" stroke="#982020" strokeWidth="1.8"/>
        <rect x="423" y="98" width="62" height="40" rx="2" fill="#c83030"/>
        {Array.from({length:8}).map((_,i)=>(
          <g key={i}>
            <circle cx={429+(i%4)*14} cy={i<4?107:118} r={5} fill="#ffc0c0" stroke="#ff5050" strokeWidth=".8"/>
            <circle cx={429+(i%4)*14} cy={i<4?107:118} r={2.5} fill="#ff9090"/>
          </g>
        ))}
        {/* Latch clip */}
        <rect x="432" y="139" width="26" height="9" rx="2.5" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
        <rect x="435" y="141" width="20" height="5" rx="1" fill="#3e3e3e"/>
        {/* Wire bundle */}
        {Array.from({length:8}).map((_,i)=>(
          <line key={i} x1={429+(i%4)*14} y1={95}
            x2={427+(i%4)*14} y2={62}
            stroke={i<4?'#c03030':'#0a0a0a'} strokeWidth="4" strokeLinecap="round"/>
        ))}
        <rect x="424" y="52" width="60" height="12" rx="3" fill="#1a1a1a" stroke="#2a2a2a"/>
        <text x="420" y="46" fill={K.red} fontSize="10" fontFamily="monospace">8-pin PCIe cable</text>
      </g>

      {/* GPU socket (static) */}
      <rect x="420" y="190" width="68" height="46" rx="3" fill="#111" stroke="#444" strokeWidth="1.8"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={426+(i%4)*14} cy={i<4?199:210} r={5} fill="#0e0e0e" stroke="#282828"/>
      ))}
      <text x="416" y="184" fill="#555" fontSize="9" fontFamily="monospace">GPU socket</text>

      {/* Down arrow */}
      <g style={{animation:'dn_arr 1.5s ease-in-out infinite'}}>
        <line x1="454" y1="175" x2="454" y2="190" stroke={K.cyan} strokeWidth="2.5"/>
        <polygon points="448,188 454,198 460,188" fill={K.cyan}/>
      </g>
      <text x="416" y="215" fill="#9CA3AF" fontSize="10" fontFamily="monospace">press until</text>
      <text x="416" y="228" fill="#9CA3AF" fontSize="10" fontFamily="monospace">clip CLICKS</text>

      {/* Clip detail */}
      <rect x="418" y="248" width="72" height="48" rx="4" fill="#0d0d0d" stroke="#1E1E2E"/>
      <text x="426" y="266" fill="#9CA3AF" fontSize="10" fontFamily="monospace">clip = black</text>
      <text x="426" y="280" fill="#9CA3AF" fontSize="10" fontFamily="monospace">tab on back</text>
      <text x="426" y="294" fill="#6B7280" fontSize="9" fontFamily="monospace">of connector</text>

      <text x="408" y="360" fill="#6B7280" fontSize="10" fontFamily="monospace">Red wires face OUTWARD</text>
      <text x="408" y="376" fill="#6B7280" fontSize="10" fontFamily="monospace">6+2 split = combine for 8-pin</text>
      <text x="408" y="392" fill="#6B7280" fontSize="10" fontFamily="monospace">Modern GPU: may use 16-pin</text>
    </svg>
  );
}

/* ─── STEP 5 — verify ────────────────────────────────────────────────── */
function S5() {
  const iso = mkIso(320, 110, 0.76);
  return (
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg"
      style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <defs><style>{A}</style></defs>
      <text x="14" y="22" fill={K.cyan} fontSize="12" fontFamily="monospace" letterSpacing=".8">✓ INSTALLATION COMPLETE — VERIFY BEFORE BOOT</text>

      {/* Mobo + GPU installed */}
      <Mobo iso={iso}/>
      <Gpu iso={iso}/>

      {/* RGB installed glow */}
      {(()=>{
        const {pt}=iso;
        const l=pt(5,119,170); const r=pt(195,119,170);
        return <line x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke={K.cyan} strokeWidth="4" opacity=".6" style={{animation:'rgb 2s ease-in-out infinite'}}/>;
      })()}

      {/* Latch closed indicator */}
      {(()=>{const {pt}=iso;const lp=pt(191,111,9);return(
        <circle cx={lp.x} cy={lp.y} r={7} fill={K.cyan} stroke={K.cyan} strokeWidth="2" style={{animation:'rgb 1.5s ease-in-out infinite'}}/>
      );})()}

      {/* Power cable indicator */}
      {(()=>{const {pt}=iso;const pp=pt(160,95,188);return(
        <circle cx={pp.x} cy={pp.y} r={5} fill={K.red} opacity=".8"/>
      );})()}

      {/* Divider */}
      <line x1="420" y1="10" x2="420" y2="470" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Checklist */}
      <text x="432" y="22" fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">VERIFY BEFORE BOOT</text>
      {[
        {l:'PCIe latch CLOSED', s:'flush — no tab sticking out', d:'0s'},
        {l:'Bracket SCREWED IN', s:'no gap against case wall',   d:'.35s'},
        {l:'Power cables CLICKED',s:'all connectors locked',     d:'.7s'},
        {l:'Card sits LEVEL',   s:'no wobble from either end',   d:'1.05s'},
        {l:'Install DRIVERS',   s:'nvidia.com or amd.com',       d:'1.4s'},
      ].map((item,i)=>(
        <g key={i} style={{animation:'slide .4s ease both',animationDelay:item.d}}>
          <circle cx={446} cy={68+i*52} r={16} fill="#0a1a0a" stroke={K.cyan} strokeWidth="1.5"/>
          <polyline
            points={`437,${68+i*52} 445,${77+i*52} 457,${58+i*52}`}
            fill="none" stroke={K.cyan} strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="44"
            style={{animation:'chk 1.2s ease both',animationDelay:item.d}}/>
          <text x="470" y={63+i*52} fill="#F0F4FF" fontSize="12" fontFamily="monospace" fontWeight="500">{item.l}</text>
          <text x="470" y={78+i*52} fill="#6B7280" fontSize="10" fontFamily="monospace">{item.s}</text>
        </g>
      ))}

      {/* Troubleshoot */}
      <rect x="430" y="328" width="256" height="52" rx="5" fill="#1a0a0a" stroke={K.red} strokeWidth="1" opacity=".9"/>
      <text x="442" y="346" fill={K.red} fontSize="10" fontFamily="monospace">No display after boot?</text>
      <text x="442" y="360" fill="#888" fontSize="10" fontFamily="monospace">① Press GPU down again (latch)</text>
      <text x="442" y="374" fill="#888" fontSize="10" fontFamily="monospace">② Re-check power connectors</text>
    </svg>
  );
}

/* ─── STEPS ──────────────────────────────────────────────────────────── */
const steps = [
  {
    title:'Open the PCIe latch',
    desc:'Find the PCIe x16 slot on your motherboard — the longest horizontal slot, usually the topmost one. At the far right end is a small plastic latch tab. Push it outward until you hear a soft click. This unlocks the slot so the GPU can fully seat and lock.',
    tip:'Look at the RIGHT END of the slot. The tab pivots outward. A click confirms it is open.',
    animated:<S1/>,
  },
  {
    title:'Align and press GPU into slot',
    desc:'Hold the GPU with both hands, one near each end. Lower it straight down above the slot with gold contacts facing toward the motherboard. Apply firm, even downward pressure on both ends simultaneously until you hear a clear click — the latch locks automatically. The card must sit perfectly level with zero wobble.',
    tip:'Needs more force than you expect. If the card wobbles or sits high at one end, press again — it is not fully seated.',
    animated:<S2/>,
  },
  {
    title:'Secure bracket with screws',
    desc:'The metal bracket at the left end of the GPU must be screwed to the case — one screw at the top, one at the bottom. The bracket must sit completely flush against the case wall with no visible gap. Start finger-tight, confirm flush, then snug with a screwdriver.',
    tip:'A gap between bracket and case means the GPU is not fully seated. Never overtighten — bracket steel is thin.',
    animated:<S3/>,
  },
  {
    title:'Connect the PCIe power cables',
    desc:'Look at the top edge of the GPU for power connector ports — usually two 8-pin sockets (or a 16-pin on newer cards). Plug the matching cables from your PSU in firmly. Each connector has a plastic clip that audibly clicks when fully locked. Route cables toward the top of the case.',
    tip:'If your PSU cable is a 6+2 split, combine both halves for the 8-pin port. Red wires face outward.',
    animated:<S4/>,
  },
  {
    title:'Verify and power on',
    desc:'Before closing the case, confirm: latch is closed flush, bracket has both screws, all power cables are clicked, and the card sits level. Power on — display output confirms success. Then download and install the latest GPU drivers from NVIDIA or AMD.',
    tip:'No display? Press GPU down again first, then check power connectors are fully clicked. These cause 90% of installation issues.',
    animated:<S5/>,
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
