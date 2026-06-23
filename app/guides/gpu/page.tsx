'use client';
import GuideLayout from '@/components/GuideLayout';

/* ══════════════════════════════════════════════════════════════
   SHARED DEFS — all animations, gradients, filters, patterns
══════════════════════════════════════════════════════════════ */
function Defs() {
  return (
    <defs>
      <style>{`
        @keyframes spin_cw   { to { transform:rotate(360deg);  } }
        @keyframes spin_ccw  { to { transform:rotate(-360deg); } }
        @keyframes latch_o   { 0%,30%{transform:rotate(0deg);} 70%,100%{transform:rotate(-54deg);} }
        @keyframes latch_c   { 0%,40%{transform:rotate(-54deg);} 72%,100%{transform:rotate(0deg);} }
        @keyframes drop_in   { 0%,10%{transform:translateY(-85px);opacity:.7;} 60%,100%{transform:translateY(0);opacity:1;} }
        @keyframes press_dn  { 0%,10%{transform:translateY(-14px);} 46%,56%{transform:translateY(5px);} 70%,100%{transform:translateY(0);} }
        @keyframes click_pop { 0%,52%{opacity:0;transform:scale(.15);} 68%{opacity:1;transform:scale(1.1);} 84%,100%{opacity:0;transform:scale(.9);} }
        @keyframes pls       { 0%,100%{opacity:.2;} 50%{opacity:1;} }
        @keyframes d_arr     { 0%,100%{opacity:.3;transform:translateY(-6px);} 50%{opacity:1;transform:translateY(0);} }
        @keyframes screw_r   { to{transform:rotate(360deg);} }
        @keyframes plug_in   { 0%,15%{transform:translateY(-60px);} 62%,100%{transform:translateY(0);} }
        @keyframes rgb_anim  { 0%,100%{opacity:.45;} 50%{opacity:1;} }
        @keyframes chk_draw  { from{stroke-dashoffset:55;} to{stroke-dashoffset:0;} }
        @keyframes wipe_in   { from{opacity:0;transform:translateX(-8px);} to{opacity:1;transform:translateX(0);} }
      `}</style>

      {/* ── GRADIENTS ── */}
      <linearGradient id="gShroud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#3e3e3e"/>
        <stop offset="50%"  stopColor="#1e1e1e"/>
        <stop offset="100%" stopColor="#0c0c0c"/>
      </linearGradient>
      <linearGradient id="gShroudSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#2a2a2a"/>
        <stop offset="60%"  stopColor="#181818"/>
        <stop offset="100%" stopColor="#0d0d0d"/>
      </linearGradient>
      <linearGradient id="gFanRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#303030"/>
        <stop offset="100%" stopColor="#0f0f0f"/>
      </linearGradient>
      <linearGradient id="gBlade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#383838"/>
        <stop offset="100%" stopColor="#0d0d0d"/>
      </linearGradient>
      <linearGradient id="gHub" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#2c2c2c"/>
        <stop offset="100%" stopColor="#0a0a0a"/>
      </linearGradient>
      <linearGradient id="gPCB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#162016"/>
        <stop offset="100%" stopColor="#0b120b"/>
      </linearGradient>
      <linearGradient id="gContact" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#e0bc00"/>
        <stop offset="50%"  stopColor="#c8a000"/>
        <stop offset="100%" stopColor="#8a6c00"/>
      </linearGradient>
      <linearGradient id="gBracket" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#585868"/>
        <stop offset="40%"  stopColor="#3e3e50"/>
        <stop offset="100%" stopColor="#262635"/>
      </linearGradient>
      <linearGradient id="gMobo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#1e1e1e"/>
        <stop offset="100%" stopColor="#111"/>
      </linearGradient>
      <linearGradient id="gSlot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#0c0c1c"/>
        <stop offset="100%" stopColor="#060612"/>
      </linearGradient>
      <linearGradient id="gRgb" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0"/>
        <stop offset="30%"  stopColor="#00D4FF"/>
        <stop offset="70%"  stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="gHeatpipe" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#b87333"/>
        <stop offset="50%"  stopColor="#cd8a3a"/>
        <stop offset="100%" stopColor="#a06828"/>
      </linearGradient>
      <linearGradient id="gCase" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#2e2e2e"/>
        <stop offset="100%" stopColor="#1a1a1a"/>
      </linearGradient>
      <linearGradient id="gCableR" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#cc2a2a"/>
        <stop offset="100%" stopColor="#991f1f"/>
      </linearGradient>
      <linearGradient id="gHeatsink" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#424242"/>
        <stop offset="50%"  stopColor="#2e2e2e"/>
        <stop offset="100%" stopColor="#1a1a1a"/>
      </linearGradient>

      {/* ── FILTERS ── */}
      <filter id="fShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity=".85"/>
      </filter>
      <filter id="fShadowSm" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity=".7"/>
      </filter>
      <filter id="fGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="fGlowSt" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="7" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      {/* ── PATTERNS ── */}
      <pattern id="pTrace" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="none"/>
        <path d="M12 0v24M0 12h24" stroke="#192319" strokeWidth=".4"/>
        <circle cx="12" cy="12" r="1.2" fill="#192319"/>
      </pattern>
      <pattern id="pFin" x="0" y="0" width="9" height="1" patternUnits="userSpaceOnUse">
        <rect width="6" height="1" fill="#2e2e2e"/>
        <rect x="6" width="3" height="1" fill="#0f0f0f"/>
      </pattern>
    </defs>
  );
}

/* ══════════════════════════════════════════════════════════════
   FAN — realistic 7-blade spinning fan with stators
══════════════════════════════════════════════════════════════ */
interface FanProps { cx:number; cy:number; r:number; id:string; rpm?:number; }

function Fan({ cx, cy, r, id, rpm=1.0 }: FanProps) {
  const hr   = r * 0.16;
  const N    = 7;

  const blade = (i: number) => {
    const base = (i / N) * 2 * Math.PI;
    const sw   = 0.55;
    const px = (a:number, rad:number) => (cx + rad * Math.cos(a)).toFixed(2);
    const py = (a:number, rad:number) => (cy + rad * Math.sin(a)).toFixed(2);

    const loA = base - 0.18; const toA = base + sw * 0.42;
    const liA = base;        const tiA = base + sw * 0.65;

    const x1=px(loA,r*.88); const y1=py(loA,r*.88);
    const x2=px(toA,r*.84); const y2=py(toA,r*.84);
    const x3=px(tiA,hr*2.2);const y3=py(tiA,hr*2.2);
    const x4=px(liA,hr*1.1);const y4=py(liA,hr*1.1);
    const cpx=(cx+r*.52*Math.cos(base-.04)).toFixed(2);
    const cpy=(cy+r*.52*Math.sin(base-.04)).toFixed(2);
    const mp = (r*.88+r*.84)/2;
    const mpa= (loA+toA)/2;
    const mpx2=(cx+mp*.6*Math.cos(base+sw*.52)).toFixed(2);
    const mpy2=(cy+mp*.6*Math.sin(base+sw*.52)).toFixed(2);

    return `M${x4} ${y4} Q${cpx} ${cpy} ${x1} ${y1} A${(r*.88).toFixed(1)} ${(r*.88).toFixed(1)} 0 0 1 ${x2} ${y2} Q${mpx2} ${mpy2} ${x3} ${y3} Q${(cx+hr*1.6*Math.cos(tiA-.1)).toFixed(2)} ${(cy+hr*1.6*Math.sin(tiA-.1)).toFixed(2)} ${x4} ${y4} Z`;
  };

  return (
    <g>
      <style>{`.${id}r{animation:spin_cw ${rpm}s linear infinite;transform-origin:${cx}px ${cy}px;}`}</style>
      <circle cx={cx} cy={cy} r={r}   fill="url(#gFanRing)" stroke="#1c1c1c" strokeWidth="2.5"/>
      <circle cx={cx} cy={cy} r={r-2} fill="#0c0c0c"/>
      {/* Stator struts */}
      {[0,120,240].map(a => {
        const rad=a*Math.PI/180;
        return <line key={a}
          x1={(cx+hr*2.6*Math.cos(rad)).toFixed(1)} y1={(cy+hr*2.6*Math.sin(rad)).toFixed(1)}
          x2={(cx+(r-3)*Math.cos(rad)).toFixed(1)}   y2={(cy+(r-3)*Math.sin(rad)).toFixed(1)}
          stroke="#181818" strokeWidth="4.5" strokeLinecap="round"/>;
      })}
      {/* Rotating assembly */}
      <g className={`${id}r`}>
        {Array.from({length:N}).map((_,i)=>(
          <path key={i} d={blade(i)} fill="url(#gBlade)" stroke="#111" strokeWidth=".6"/>
        ))}
        <circle cx={cx} cy={cy} r={hr*2.5} fill="url(#gHub)" stroke="#333" strokeWidth="1.2"/>
        <circle cx={cx} cy={cy} r={hr*1.7} fill="#0c0c0c" stroke="#2e2e2e" strokeWidth=".8"/>
        {[0,90,180,270].map(a=>{
          const rad=a*Math.PI/180;
          return <circle key={a} cx={(cx+hr*2.1*Math.cos(rad)).toFixed(1)} cy={(cy+hr*2.1*Math.sin(rad)).toFixed(1)} r="1.8" fill="#3c3c3c" stroke="#555" strokeWidth=".5"/>;
        })}
        <circle cx={cx} cy={cy} r={3.5} fill="#444"/>
        <circle cx={cx} cy={cy} r={1.8} fill="#111"/>
      </g>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════
   GPU SIDE PROFILE — full detail side view
══════════════════════════════════════════════════════════════ */
function GpuSide({ x=0, y=0, cssClass='' }: { x:number; y:number; cssClass?:string }) {
  const W=440; const shrH=82; const pcbH=28; const cH=18;
  return (
    <g transform={`translate(${x},${y})`} className={cssClass}>
      {/* Heatsink fins */}
      {Array.from({length:58}).map((_,i)=>(
        <g key={i}>
          <rect x={55+i*6.2} y={0} width="4.5" height="22" fill="url(#gHeatsink)" rx=".5"/>
          <rect x={55+i*6.2} y={0} width="4.5" height="1"  fill="#4e4e4e" rx=".5"/>
        </g>
      ))}
      {/* Heatpipes visible above shroud */}
      {[140,200,260,320].map(hx=>(
        <ellipse key={hx} cx={hx} cy={11} rx={8} ry={5} fill="none" stroke="url(#gHeatpipe)" strokeWidth="2.5"/>
      ))}

      {/* Main shroud */}
      <rect x={0} y={20} width={W} height={shrH} rx="4" fill="url(#gShroud)" filter="url(#fShadow)"/>
      {/* Top accent line */}
      <rect x={14} y={23} width={W-28} height="2.5" rx="1.2" fill="#282828"/>
      {/* RGB strip */}
      <rect x={14} y={27} width={W-28} height="5" rx="2.5" fill="url(#gRgb)" opacity=".85"
        style={{animation:'rgb_anim 2s ease-in-out infinite'}} filter="url(#fGlow)"/>
      {/* Shroud bottom edge detail */}
      <rect x={0} y={shrH+16} width={W} height="4" rx="0" fill="#141414"/>

      {/* Fan cutouts */}
      <circle cx={120} cy={60} r={38} fill="url(#gFanRing)"/>
      <Fan cx={120} cy={60} r={36} id="sf1" rpm={.85}/>
      <circle cx={255} cy={60} r={38} fill="url(#gFanRing)"/>
      <Fan cx={255} cy={60} r={36} id="sf2" rpm={.85}/>

      {/* GPU text markings */}
      <text x={345} y={48} fill="#2e2e2e" fontSize="11" fontFamily="monospace" letterSpacing="2">RTX</text>
      <text x={345} y={60} fill="#242424" fontSize="8"  fontFamily="monospace">SERIES</text>
      {/* Watt rating */}
      <text x={345} y={75} fill="#1e1e1e" fontSize="7" fontFamily="monospace">300W TDP</text>
      {/* Perf indicator */}
      {[0,1,2,3].map(i=>(<rect key={i} x={345+i*8} y={80} width="6" height="3" rx="1" fill="#1e1e1e"/>))}

      {/* Power connector ports on top edge */}
      <rect x={W-65} y={20} width="24" height="22" rx="2" fill="#1a1a1a" stroke="#484848" strokeWidth="1.2"/>
      <rect x={W-37} y={20} width="24" height="22" rx="2" fill="#1a1a1a" stroke="#484848" strokeWidth="1.2"/>
      {Array.from({length:4}).map((_,i)=>(
        <circle key={i} cx={W-59+i*5} cy={28} r={1.8} fill="#2a2a2a" stroke="#3a3a3a"/>
      ))}
      {Array.from({length:4}).map((_,i)=>(
        <circle key={i} cx={W-59+i*5} cy={35} r={1.8} fill="#2a2a2a" stroke="#3a3a3a"/>
      ))}
      <text x={W-68} y={18} fill="#555" fontSize="7" fontFamily="monospace">PCIe PWR</text>

      {/* Bracket (left end) */}
      <rect x={0} y={20} width={16} height={shrH+pcbH+cH+8} rx="2" fill="url(#gBracket)" stroke="#666" strokeWidth="1"/>
      {/* Display outputs */}
      <rect x={3} y={42}  width={10} height={7}  rx="1" fill="#0c0c0c" stroke="#3a3a3a"/>
      <rect x={3} y={52}  width={10} height={7}  rx="1" fill="#0c0c0c" stroke="#3a3a3a"/>
      <rect x={3} y={62}  width={10} height={11} rx="1" fill="#0c0c0c" stroke="#3a3a3a"/>
      <rect x={3} y={76}  width={10} height={7}  rx="1" fill="#0c0c0c" stroke="#3a3a3a"/>
      <text x={1} y={38} fill="#444" fontSize="4.5" fontFamily="monospace">DP</text>
      <text x={1} y={48} fill="#444" fontSize="4.5" fontFamily="monospace">DP</text>
      <text x={0} y={58} fill="#444" fontSize="4.5" fontFamily="monospace">DP</text>
      <text x={0} y={72} fill="#444" fontSize="4.5" fontFamily="monospace">HDM</text>
      {/* Bracket screws */}
      <circle cx={8} cy={28} r={4.5} fill="#111" stroke="#666" strokeWidth="1.2"/>
      <line x1={3.5} y1={28} x2={12.5} y2={28} stroke="#999" strokeWidth="2"/>
      <line x1={8} y1={23.5} x2={8} y2={32.5} stroke="#999" strokeWidth="2"/>
      <line x1={4.3} y1={24.3} x2={11.7} y2={31.7} stroke="#666" strokeWidth="1"/>
      <line x1={11.7} y1={24.3} x2={4.3} y2={31.7} stroke="#666" strokeWidth="1"/>

      <circle cx={8} cy={shrH+pcbH+cH} r={4.5} fill="#111" stroke="#666" strokeWidth="1.2"/>
      <line x1={3.5} y1={shrH+pcbH+cH} x2={12.5} y2={shrH+pcbH+cH} stroke="#999" strokeWidth="2"/>
      <line x1={8} y1={shrH+pcbH+cH-4.5} x2={8} y2={shrH+pcbH+cH+4.5} stroke="#999" strokeWidth="2"/>

      {/* PCB strip */}
      <rect x={16} y={shrH+20} width={W-84} height={pcbH} rx="1" fill="url(#gPCB)"/>
      <rect x={16} y={shrH+20} width={W-84} height={pcbH} fill="url(#pTrace)" opacity=".35"/>
      {/* VRAM chips on PCB */}
      {[30,55,80,105,260,285,310,335].map(cx2=>(
        <rect key={cx2} x={cx2} y={shrH+23} width={16} height={10} rx="1" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth=".8"/>
      ))}
      {/* GPU die center */}
      <rect x={150} y={shrH+21} width={80} height={24} rx="2" fill="#161616" stroke="#2e2e2e"/>
      <rect x={158} y={shrH+24} width={64} height={18} rx="1" fill="#111" stroke="#333" strokeWidth=".8"/>
      <text x={162} y={shrH+36} fill="#333" fontSize="7" fontFamily="monospace">GPU DIE</text>
      {/* VRMs */}
      {[182,196,210].map(cx2=>(
        <rect key={cx2} x={cx2} y={shrH+23} width={8} height={8} rx="1" fill="#1c1c2c" stroke="#2a2a3a"/>
      ))}

      {/* Gold contacts */}
      <rect x={16} y={shrH+20+pcbH} width={W-84} height={cH+4} rx="1" fill="#0e110e"/>
      {Array.from({length:32}).map((_,i)=>(
        <rect key={i} x={20+i*11} y={shrH+20+pcbH+2} width="7" height={cH} rx=".5"
          fill="url(#gContact)" opacity=".88"/>
      ))}
      {/* Key notch */}
      <rect x={170} y={shrH+20+pcbH} width="12" height={cH+4} fill="#0a0a0a"/>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════
   MOTHERBOARD — detailed top-down view
══════════════════════════════════════════════════════════════ */
function Mobo({ x=0, y=0, w=300, h=280, hi=false }: { x:number; y:number; w:number; h:number; hi?:boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="5" fill="url(#gMobo)"/>
      <rect width={w} height={h} rx="5" fill="url(#pTrace)" opacity=".55"/>
      <rect width={w} height={h} rx="5" fill="none" stroke="#222" strokeWidth="2"/>

      {/* I/O cover */}
      <rect x={0} y={0} width={95} height={32} rx="2" fill="#181818" stroke="#282828"/>
      <text x={8} y={20} fill="#333" fontSize="8" fontFamily="monospace">I/O PANEL</text>
      {/* USB ports on I/O */}
      {[0,1,2].map(i=>(<rect key={i} x={30+i*16} y={6} width={12} height={8} rx="1" fill="#111" stroke="#333"/>))}
      {/* Ethernet port */}
      <rect x={78} y={5} width={14} height={20} rx="1" fill="#111" stroke="#333"/>

      {/* CPU socket */}
      <rect x={22} y={38} width={82} height={82} rx="3" fill="#111" stroke="#3c3c3c" strokeWidth="1.5"/>
      <rect x={28} y={44} width={70} height={70} rx="2" fill="#18180e" stroke="#555" strokeWidth=".8"/>
      {/* Socket pin matrix */}
      {Array.from({length:6}).map((_,row)=>Array.from({length:6}).map((_,col)=>(
        <circle key={`${row}-${col}`} cx={33+col*12} cy={49+row*12} r={1.6} fill="#333"/>
      )))}
      <text x={36} y={127} fill="#444" fontSize="6.5" fontFamily="monospace">LGA1851</text>

      {/* CPU mounting holes */}
      {[[10,34],[112,34],[10,128],[112,128]].map(([hx,hy],i)=>(
        <circle key={i} cx={hx} cy={hy} r={4} fill="#0a0a0a" stroke="#555" strokeWidth="1"/>
      ))}

      {/* VRM heatsink */}
      <rect x={112} y={38} width={32} height={78} rx="2" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      {Array.from({length:9}).map((_,i)=>(
        <rect key={i} x={114} y={40+i*8} width={28} height={5} rx="1" fill="#252525"/>
      ))}
      <text x={114} y={122} fill="#333" fontSize="6" fontFamily="monospace">VRM</text>

      {/* RAM slots */}
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x={152+i*23} y={36} width={15} height={88} rx="2" fill="#111" stroke="#2a2a2a"/>
          <rect x={154+i*23} y={39} width={11} height={82} rx="1" fill="#161616"/>
          {Array.from({length:4}).map((_,j)=>(
            <rect key={j} x={155+i*23} y={43+j*18} width={9} height={10} rx="1" fill="#1e1e1e" stroke="#2a2a2a"/>
          ))}
          {/* Clip latches */}
          <rect x={152+i*23} y={36}  width={15} height={5} rx="1" fill="#1a1a1a" stroke="#333"/>
          <rect x={152+i*23} y={119} width={15} height={5} rx="1" fill="#1a1a1a" stroke="#333"/>
        </g>
      ))}

      {/* M.2 slot */}
      <rect x={22} y={135} width={108} height={8} rx="1" fill="#111" stroke="#252525"/>
      <text x={24} y={131} fill="#333" fontSize="6.5" fontFamily="monospace">M.2 NVMe</text>
      {/* Screw hole for M.2 */}
      <circle cx={128} cy={139} r={3} fill="#0a0a0a" stroke="#555"/>

      {/* PCIe x16 slot */}
      <rect x={10} y={158} width={w-20} height={18} rx="2"
        fill="url(#gSlot)"
        stroke={hi?"#00D4FF":"#334"}
        strokeWidth={hi?2:1.5}
        style={hi?{animation:'pls 2s ease-in-out infinite'}:{}}
        filter={hi?"url(#fGlow)":undefined}/>
      {Array.from({length:Math.floor((w-24)/10)}).map((_,i)=>(
        <rect key={i} x={14+i*10} y={160} width="6.5" height="14" rx=".5"
          fill="url(#gContact)" opacity=".75"/>
      ))}
      {/* Latch at right */}
      <rect x={w-20} y={161} width={10} height={11} rx="2"
        fill={hi?"#2e2e4e":"#222230"} stroke={hi?"#00D4FF":"#444"} strokeWidth="1"/>
      <text x={12} y={155} fill={hi?"#00D4FF":"#444"} fontSize="6.5" fontFamily="monospace">PCIe x16</text>

      {/* PCIe x1 slots */}
      <rect x={10} y={186} width={w-20} height={10} rx="1" fill="#0a0a0a" stroke="#222"/>
      <rect x={10} y={204} width={w-20} height={10} rx="1" fill="#0a0a0a" stroke="#222"/>

      {/* Chipset */}
      <rect x={200} y={148} width={62} height={52} rx="3" fill="#1e1e1e" stroke="#333"/>
      {Array.from({length:7}).map((_,i)=>(<rect key={i} x={202} y={150+i*6} width={58} height={4} rx=".5" fill="#252525"/>))}
      <text x={210} y={208} fill="#333" fontSize="6" fontFamily="monospace">PCH</text>

      {/* Fan headers */}
      {[22,54,86].map((hx,i)=>(
        <g key={i}>
          <rect x={hx} y={222} width={20} height={9} rx="1" fill="#111" stroke="#2a2a2a"/>
          {[0,1,2,3].map(p=>(<circle key={p} cx={hx+3+p*4} cy={227} r={1.2} fill="#222"/>))}
        </g>
      ))}
      <text x={22} y={218} fill="#333" fontSize="6" fontFamily="monospace">CPU_FAN  SYS1  SYS2</text>

      {/* SATA ports */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={w-38} y={188+i*16} width={28} height={12} rx="1" fill="#111" stroke="#222"/>
      ))}
      <text x={w-36} y={185} fill="#333" fontSize="6" fontFamily="monospace">SATA</text>

      {/* 24-pin ATX connector */}
      <rect x={w-18} y={38} width={14} height={60} rx="1" fill="#111" stroke="#333"/>
      {Array.from({length:12}).map((_,i)=>(
        <circle key={i} cx={w-11} cy={42+i*5} r={1.5} fill="#1e1e1e" stroke="#2e2e2e"/>
      ))}
      <text x={w-16} y={35} fill="#333" fontSize="5.5" fontFamily="monospace">ATX</text>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 1 — Open the PCIe latch
══════════════════════════════════════════════════════════════ */
function S1() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">MOTHERBOARD — LOCATE PCIe SLOT + LATCH</text>
      <Mobo x={10} y={26} w={300} h={300} hi={true}/>
      {/* pointer arrow */}
      <line x1={160} y1={196} x2={160} y2={220} stroke="#00D4FF" strokeWidth="1" strokeDasharray="3,2" opacity=".7"/>
      <text x={100} y={232} fill="#00D4FF" fontSize="10" fontFamily="monospace">PCIe x16 slot</text>

      <line x1={320} y1={10} x2={320} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Close-up of slot + latch */}
      <text x={330} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">LATCH MECHANISM — CLOSE-UP</text>

      {/* Slot body (enlarged) */}
      <rect x={335} y={90} width={350} height={52} rx="4" fill="url(#gSlot)" stroke="#334" strokeWidth="2"/>
      {/* Contacts detail */}
      {Array.from({length:22}).map((_,i)=>(
        <g key={i}>
          <rect x={340+i*14} y={94} width="9" height="44" rx="1" fill="url(#gContact)" opacity=".84"/>
          <line x1={344+i*14} y1={94} x2={344+i*14} y2={138} stroke="#8a6400" strokeWidth=".5" opacity=".4"/>
        </g>
      ))}
      {/* Key notch */}
      <rect x={490} y={94} width="16" height="44" fill="#0a0a0a" stroke="#111"/>
      <text x={488} y={86} fill="#6B7280" fontSize="8" fontFamily="monospace">key notch</text>
      {/* Slot housing walls */}
      <rect x={335} y={88} width={350} height={6} rx="2" fill="#1a1a1a"/>
      <rect x={335} y={144} width={350} height={6} rx="2" fill="#1a1a1a"/>

      {/* Latch housing */}
      <rect x={658} y={90} width={38} height={50} rx="4" fill="#1e1e2e" stroke="#444" strokeWidth="1.5"/>
      <rect x={661} y={93} width={32} height={44} rx="2" fill="#18182a"/>
      {/* Spring detail */}
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1={664} y1={98+i*5} x2={674} y2={98+i*5} stroke="#2a2a3a" strokeWidth="1.2"/>
      ))}
      {/* Latch tab — OPENS */}
      <g style={{animation:'latch_o 2.8s ease-in-out infinite', transformOrigin:'660px 140px'}}>
        <rect x={650} y={130} width={24} height={16} rx="3" fill="#4c4c90" stroke="#00D4FF" strokeWidth="1.8"/>
        <rect x={653} y={133} width={18} height={10} rx="2" fill="#00D4FF" opacity=".55"/>
        {[0,1,2].map(r=>(<line key={r} x1={655} y1={134+r*2.5} x2={668} y2={134+r*2.5} stroke="#9090cc" strokeWidth=".8"/>))}
        {/* Grip texture on tab */}
        <text x={652} y={142} fill="#8888cc" fontSize="5" fontFamily="monospace">||||</text>
      </g>

      {/* Push arrow */}
      <g style={{animation:'pls 1.5s ease-in-out infinite'}}>
        <line x1={630} y1={138} x2={648} y2={138} stroke="#00D4FF" strokeWidth="2.5"/>
        <polygon points="646,134 655,138 646,142" fill="#00D4FF" filter="url(#fGlow)"/>
        <text x={588} y={133} fill="#00D4FF" fontSize="11" fontFamily="monospace">push →</text>
      </g>

      {/* Annotations */}
      <line x1={638} y1={168} x2={660} y2={146} stroke="#666" strokeWidth="1" strokeDasharray="2,2"/>
      <text x={595} y={180} fill="#9CA3AF" fontSize="11" fontFamily="monospace">latch tab</text>
      <text x={595} y={194} fill="#6B7280" fontSize="10" fontFamily="monospace">click = open</text>

      {/* Slot dimension */}
      <line x1={335} y1={152} x2={658} y2={152} stroke="#2e2e2e" strokeWidth=".8"/>
      <line x1={335} y1={149} x2={335} y2={155} stroke="#444" strokeWidth="1.2"/>
      <line x1={658} y1={149} x2={658} y2={155} stroke="#444" strokeWidth="1.2"/>
      <text x={480} y={165} fill="#555" fontSize="9" fontFamily="monospace" textAnchor="middle">89mm (PCIe x16)</text>

      <text x={330} y={295} fill="#6B7280" fontSize="10" fontFamily="monospace">① Find the LONGEST slot (top one) on motherboard</text>
      <text x={330} y={310} fill="#6B7280" fontSize="10" fontFamily="monospace">② Latch tab sits at the FAR RIGHT end of the slot</text>
      <text x={330} y={325} fill="#6B7280" fontSize="10" fontFamily="monospace">③ Push tab outward — feel a soft click = open</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 2 — Align GPU above slot
══════════════════════════════════════════════════════════════ */
function S2() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">GPU ALIGNMENT — SIDE + OVERVIEW</text>
      <Mobo x={10} y={26} w={210} h={200} hi={true}/>
      <text x={14} y={238} fill="#00D4FF" fontSize="10" fontFamily="monospace">↑ GPU mounts here</text>

      <line x1={230} y1={10} x2={230} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      <text x={240} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">SIDE PROFILE — LOWERING INTO SLOT</text>

      {/* PCIe slot */}
      <rect x={244} y={255} width={462} height={16} rx="2" fill="url(#gSlot)" stroke="#00D4FF" strokeWidth="1.8"/>
      {Array.from({length:26}).map((_,i)=>(
        <rect key={i} x={248+i*14} y={257} width="9" height="12" rx=".5" fill="url(#gContact)" opacity=".8"/>
      ))}
      {/* Latch open */}
      <rect x={682} y={257} width={18} height={10} rx="2" fill="#4c4c90" stroke="#00D4FF"/>
      {/* Mobo surface */}
      <rect x={238} y={270} width={470} height={16} rx="2" fill="url(#gMobo)" stroke="#222"/>

      {/* GPU descending */}
      <GpuSide x={244} y={148} cssClass="" />
      <g style={{animation:'drop_in 3.2s ease-in-out infinite', transformOrigin:'464px 210px'}}>
        {/* Just the GPU dropping — re-rendered here with animation wrapper */}
        <rect x={244} y={148} width={440} height={22} rx="0" fill="transparent"/>
      </g>

      {/* Full GPU with drop animation */}
      <g style={{animation:'drop_in 3.2s ease-in-out infinite'}}>
        <GpuSide x={244} y={148}/>
        {/* Down arrows on GPU */}
        <g style={{animation:'d_arr 1.4s ease-in-out infinite'}}>
          <line x1={360} y1={126} x2={360} y2={148} stroke="#00D4FF" strokeWidth="3"/>
          <polygon points="354,146 360,156 366,146" fill="#00D4FF" filter="url(#fGlow)"/>
          <line x1={530} y1={126} x2={530} y2={148} stroke="#00D4FF" strokeWidth="3"/>
          <polygon points="524,146 530,156 536,146" fill="#00D4FF" filter="url(#fGlow)"/>
        </g>
      </g>

      {/* Alignment guide lines */}
      <g style={{animation:'pls 1.8s ease-in-out infinite'}}>
        <line x1={260} y1={80} x2={260} y2={255} stroke="#00D4FF" strokeWidth="1.2" strokeDasharray="5,3"/>
        <line x1={668} y1={80} x2={668} y2={255} stroke="#00D4FF" strokeWidth="1.2" strokeDasharray="5,3"/>
      </g>

      <text x={240} y={305} fill="#6B7280" fontSize="10" fontFamily="monospace">Gold contacts FACE DOWN  ·  Hold BOTH ends of card</text>
      <text x={240} y={320} fill="#6B7280" fontSize="10" fontFamily="monospace">Bracket aligns with LEFT edge of case expansion slot</text>
      <text x={240} y={335} fill="#6B7280" fontSize="10" fontFamily="monospace">Lower STRAIGHT DOWN — no tilting or rocking</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 3 — Press until latch clicks
══════════════════════════════════════════════════════════════ */
function S3() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">PRESS DOWN — FIRM EVEN PRESSURE BOTH ENDS</text>

      {/* Left: mobo overview with GPU */}
      <Mobo x={10} y={26} w={210} h={200} hi={true}/>
      <rect x={10} y={152} width={210} height={16} rx="2" fill="#162016" stroke="#2d5d2d"/>
      <circle cx={80} cy={160} r={14} fill="#111" stroke="#333"/>
      <circle cx={140} cy={160} r={14} fill="#111" stroke="#333"/>
      <text x={14} y={235} fill="#9CA3AF" fontSize="10" fontFamily="monospace">Press evenly — both ends</text>

      <line x1={230} y1={10} x2={230} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Right: detailed press view */}
      <text x={240} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">INSERTION FORCE — WHAT HAPPENS</text>

      {/* Static slot + mobo */}
      <rect x={244} y={248} width={462} height={16} rx="2" fill="url(#gSlot)" stroke="#00D4FF" strokeWidth="1.8"/>
      {Array.from({length:26}).map((_,i)=>(
        <rect key={i} x={248+i*14} y={250} width="9" height="12" rx=".5" fill="url(#gContact)" opacity=".8"/>
      ))}
      <rect x={238} y={263} width={470} height={15} rx="2" fill="url(#gMobo)" stroke="#222"/>

      {/* Latch snapping shut */}
      <g style={{animation:'latch_c 3.2s ease-in-out infinite', transformOrigin:'680px 248px'}}>
        <rect x={670} y={250} width={20} height={13} rx="2" fill="#00D4FF" stroke="#00D4FF" filter="url(#fGlow)"/>
      </g>

      {/* GPU pressing down */}
      <g style={{animation:'press_dn 3.2s ease-in-out infinite'}}>
        <GpuSide x={244} y={148}/>
        {/* Press arrows */}
        <g style={{animation:'d_arr 1.5s ease-in-out infinite'}}>
          <line x1={360} y1={128} x2={360} y2={148} stroke="#00D4FF" strokeWidth="3.5"/>
          <polygon points="354,146 360,157 366,146" fill="#00D4FF" filter="url(#fGlowSt)"/>
          <text x={330} y={122} fill="#00D4FF" fontSize="10" fontFamily="monospace">PRESS</text>
          <line x1={530} y1={128} x2={530} y2={148} stroke="#00D4FF" strokeWidth="3.5"/>
          <polygon points="524,146 530,157 536,146" fill="#00D4FF" filter="url(#fGlowSt)"/>
          <text x={500} y={122} fill="#00D4FF" fontSize="10" fontFamily="monospace">PRESS</text>
        </g>
      </g>

      {/* CLICK badge */}
      <g style={{animation:'click_pop 3.2s ease-in-out infinite'}}>
        <rect x={418} y={256} width={96} height={34} rx="17" fill="#00D4FF" filter="url(#fGlowSt)"/>
        <text x={466} y={278} fill="#0A0A0F" fontSize="15" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</text>
      </g>

      <text x={240} y={300} fill="#6B7280" fontSize="10" fontFamily="monospace">Needs MORE force than expected — that is normal</text>
      <text x={240} y={315} fill="#6B7280" fontSize="10" fontFamily="monospace">Card sits LEVEL with zero gap = fully seated</text>
      <text x={240} y={330} fill="#6B7280" fontSize="10" fontFamily="monospace">Wobbles or sits high on one end → press again</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 4 — Secure bracket with screws
══════════════════════════════════════════════════════════════ */
function S4() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">PC CASE REAR — BRACKET SCREW INSTALLATION</text>

      {/* LEFT: Case rear panel view */}
      <rect x={10} y={26} width={320} height={300} rx="5" fill="url(#gCase)" stroke="#333" strokeWidth="2" filter="url(#fShadow)"/>
      {/* Case surface ribbing */}
      {Array.from({length:14}).map((_,i)=>(<rect key={i} x={12} y={28+i*21} width={316} height={1.5} fill="#252525"/>))}
      {/* Case label */}
      <text x={180} y={320} fill="#333" fontSize="8" fontFamily="monospace" textAnchor="middle">REAR EXPANSION AREA</text>

      {/* Slot openings */}
      {[1,2,3,4,5].map(i=>(
        <rect key={i} x={48} y={26+i*45} width={46} height={42} rx="2" fill="#0e0e0e" stroke="#3a3a3a" strokeWidth="1"/>
      ))}

      {/* GPU BRACKET — slot 0 */}
      <rect x={48} y={36} width={46} height={272} rx="2" fill="url(#gBracket)" stroke="#888" strokeWidth="1.5"/>
      {/* Display ports on bracket */}
      {[{y:55,h:10,t:'DP'},{y:68,h:10,t:'DP'},{y:81,h:16,t:'HDMI'},{y:100,h:10,t:'DP'}].map(({y,h,t},i)=>(
        <g key={i}>
          <rect x={52} y={y} width={38} height={h} rx="1" fill="#0d0d0d" stroke="#3a3a3a"/>
          <text x={54} y={y+h-2} fill="#555" fontSize="6" fontFamily="monospace">{t}</text>
        </g>
      ))}
      {/* GPU body behind bracket */}
      <rect x={94} y={44} width={225} height={130} rx="2" fill="#141414" stroke="#222"/>
      <Fan cx={180} cy={109} r={52} id="c1" rpm={1.1}/>

      {/* TOP bracket screw */}
      <circle cx={71} cy={44} r={9} fill="#0d0d0d" stroke="#777" strokeWidth="1.8"/>
      <g style={{animation:'screw_r 2s linear infinite', transformOrigin:'71px 44px'}}>
        <rect x={63} y={42} width={16} height={4} rx="1.5" fill="#ccc"/>
        <rect x={69} y={36} width={4} height={16} rx="1.5" fill="#ccc"/>
        <line x1={65} y1={38} x2={77} y2={50} stroke="#999" strokeWidth="1.2"/>
        <line x1={77} y1={38} x2={65} y2={50} stroke="#999" strokeWidth="1.2"/>
      </g>
      <text x={22} y={48} fill="#00D4FF" fontSize="11" fontFamily="monospace">①</text>

      {/* BOTTOM bracket screw */}
      <circle cx={71} cy={272} r={9} fill="#0d0d0d" stroke="#777" strokeWidth="1.8"/>
      <g style={{animation:'screw_r 2s linear infinite 0.5s', transformOrigin:'71px 272px'}}>
        <rect x={63} y={270} width={16} height={4} rx="1.5" fill="#ccc"/>
        <rect x={69} y={264} width={4} height={16} rx="1.5" fill="#ccc"/>
        <line x1={65} y1={266} x2={77} y2={278} stroke="#999" strokeWidth="1.2"/>
        <line x1={77} y1={266} x2={65} y2={278} stroke="#999" strokeWidth="1.2"/>
      </g>
      <text x={22} y={276} fill="#00D4FF" fontSize="11" fontFamily="monospace">②</text>

      <line x1={340} y1={10} x2={340} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* RIGHT: Close-up screw detail */}
      <text x={350} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">DETAIL — SCREW + DRIVER</text>

      {/* Case wall section */}
      <rect x={350} y={55} width={24} height={220} rx="2" fill="url(#gCase)" stroke="#444"/>
      {/* Bracket section */}
      <rect x={374} y={55} width={34} height={220} rx="2" fill="url(#gBracket)" stroke="#888" strokeWidth="1.5"/>
      {/* Screw hole */}
      <circle cx={391} cy={120} r={12} fill="#111" stroke="#888" strokeWidth="2"/>
      <circle cx={391} cy={120} r={7} fill="#0a0a0a" stroke="#aaa" strokeWidth="1"/>
      {/* Phillips screw animated */}
      <g style={{animation:'screw_r 2s linear infinite', transformOrigin:'391px 120px'}}>
        <rect x={383} y={118} width={16} height={4} rx="1.5" fill="#ccc"/>
        <rect x={389} y={112} width={4} height={16} rx="1.5" fill="#ccc"/>
        <line x1={385} y1={114} x2={397} y2={126} stroke="#999" strokeWidth="1.2"/>
        <line x1={397} y1={114} x2={385} y2={126} stroke="#999" strokeWidth="1.2"/>
      </g>

      {/* Screwdriver */}
      <g style={{animation:'press_dn 2.8s ease-in-out infinite'}}>
        {/* Handle */}
        <rect x={428} y={40} width={34} height={58} rx="10" fill="#e0e0e0" stroke="#bbb" strokeWidth="1.2"/>
        <rect x={433} y={43} width={24} height={52} rx="8" fill="#d8d8d8"/>
        {[0,1,2,3,4].map(i=>(<rect key={i} x={428} y={48+i*9} width={34} height={5} rx="2.5" fill="#ccc" opacity=".65"/>))}
        {/* Shaft */}
        <rect x={439} y={97} width={8} height={36} rx="1" fill="#999" stroke="#777" strokeWidth=".8"/>
        {/* Tip */}
        <path d="M 439 133 L 443 142 L 447 133 Z" fill="#666"/>
        <rect x={441} y={134} width={4} height={5} rx=".5" fill="#555"/>
        <line x1={441} y1={136} x2={445} y2={136} stroke="#444" strokeWidth="2"/>
        <line x1={443} y1={134} x2={443} y2={140} stroke="#444" strokeWidth="2"/>
      </g>

      {/* Fit indicator */}
      <line x1={410} y1={55} x2={410} y2={275} stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,3" opacity=".4"/>
      <text x={415} y={68} fill="#00D4FF" fontSize="10" fontFamily="monospace">FLUSH ←</text>
      <text x={415} y={82} fill="#6B7280" fontSize="9" fontFamily="monospace">bracket must</text>
      <text x={415} y={94} fill="#6B7280" fontSize="9" fontFamily="monospace">touch case wall</text>

      {/* Steps */}
      <rect x={418} y={175} width={288} height={110} rx="6" fill="#0d0d0d" stroke="#1E1E2E"/>
      {['① Align bracket in slot opening','② Finger-tighten both screws','③ Check FLUSH fit — no gap','④ Snug with screwdriver (1/4 turn)'].map((t,i)=>(
        <text key={i} x={430} y={196+i*20} fill="#9CA3AF" fontSize="11" fontFamily="monospace">{t}</text>
      ))}

      <text x={350} y={305} fill="#6B7280" fontSize="10" fontFamily="monospace">Gap between bracket and case = GPU not seated properly</text>
      <text x={350} y={320} fill="#6B7280" fontSize="10" fontFamily="monospace">Never overtighten — bracket steel is thin</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 5 — Connect power cables
══════════════════════════════════════════════════════════════ */
function S5() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">GPU FRONT FACE — POWER CONNECTOR PORTS ON TOP EDGE</text>

      {/* GPU front face (fans visible) */}
      <rect x={10} y={26} width={480} height={200} rx="6" fill="url(#gShroud)" stroke="#2a2a2a" strokeWidth="2" filter="url(#fShadow)"/>
      {/* RGB top strip */}
      <rect x={14} y={29} width={472} height={5} rx="2.5" fill="url(#gRgb)" style={{animation:'rgb_anim 2s ease-in-out infinite'}} filter="url(#fGlow)"/>
      <rect x={14} y={36} width={472} height={2.5} fill="#1e1e1e"/>

      {/* THREE FANS */}
      {[110,255,400].map((cx,i)=>(
        <g key={i}>
          <circle cx={cx} cy={140} r={66} fill="url(#gFanRing)" stroke="#1a1a1a" strokeWidth="2.5"/>
          <circle cx={cx} cy={140} r={63} fill="#0c0c0c"/>
          <Fan cx={cx} cy={140} r={60} id={`ff${i}`} rpm={.75}/>
        </g>
      ))}

      {/* GPU model text */}
      <text x={10} y={46} fill="#282828" fontSize="0"/>

      {/* Power port sockets — ON TOP EDGE */}
      {/* 8-pin socket 1 */}
      <rect x={28} y={18} width={56} height={34} rx="3" fill="#111" stroke="#555" strokeWidth="1.8"/>
      <rect x={31} y={20} width={50} height={30} rx="2" fill="#0a0a0a"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={37+(i%4)*12} cy={i<4?27:36} r={4} fill="#1e1e1e" stroke="#3c3c3c" strokeWidth=".8"/>
      ))}
      <text x={26} y={14} fill="#888" fontSize="8" fontFamily="monospace">8-pin ①</text>

      {/* 8-pin socket 2 */}
      <rect x={92} y={18} width={56} height={34} rx="3" fill="#111" stroke="#555" strokeWidth="1.8"/>
      <rect x={95} y={20} width={50} height={30} rx="2" fill="#0a0a0a"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={101+(i%4)*12} cy={i<4?27:36} r={4} fill="#1e1e1e" stroke="#3c3c3c" strokeWidth=".8"/>
      ))}
      <text x={90} y={14} fill="#888" fontSize="8" fontFamily="monospace">8-pin ②</text>

      <line x1={505} y1={10} x2={505} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>

      {/* RIGHT: Cable connector detail */}
      <text x={515} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">8-PIN CABLE</text>

      {/* Cable dropping in */}
      <g style={{animation:'plug_in 3s ease-in-out infinite'}}>
        {/* Connector shell */}
        <rect x={522} y={68} width={68} height={44} rx="3" fill="url(#gCableR)" stroke="#a02020" strokeWidth="1.8"/>
        <rect x={525} y={71} width={62} height={38} rx="2" fill="#cc3030"/>
        {/* 8 pins in 2 rows */}
        {Array.from({length:8}).map((_,i)=>(
          <g key={i}>
            <circle cx={532+(i%4)*14} cy={i<4?79:90} r={5} fill="#ffbbbb" stroke="#ff5555" strokeWidth=".8"/>
            <circle cx={532+(i%4)*14} cy={i<4?79:90} r={2.5} fill="#ff8888"/>
          </g>
        ))}
        {/* Clip latch */}
        <rect x={534} y={110} width={24} height={8} rx="2.5" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
        <rect x={537} y={112} width={18} height={4} rx="1" fill="#3e3e3e"/>
        {/* Wires going up */}
        {Array.from({length:8}).map((_,i)=>(
          <line key={i} x1={532+(i%4)*14} y1={68}
            x2={530+(i%4)*14} y2={40}
            stroke={i<4?'#cc2a2a':'#111'} strokeWidth="4" strokeLinecap="round"/>
        ))}
        {/* Wire bundle */}
        <rect x={526} y={30} width={56} height={12} rx="3" fill="#1a1a1a" stroke="#333"/>
        <text x={522} y={26} fill="#cc3030" fontSize="10" fontFamily="monospace">8-pin PCIe</text>
      </g>

      {/* Static GPU port */}
      <rect x={522} y={168} width={68} height={44} rx="3" fill="#111" stroke="#555" strokeWidth="1.8"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={529+(i%4)*14} cy={i<4?176:187} r={5} fill="#0e0e0e" stroke="#2e2e2e"/>
      ))}
      <text x={518} y={163} fill="#555" fontSize="8" fontFamily="monospace">GPU socket</text>

      {/* Down arrow */}
      <g style={{animation:'d_arr 1.5s ease-in-out infinite'}}>
        <line x1={556} y1={152} x2={556} y2={168} stroke="#00D4FF" strokeWidth="2.5"/>
        <polygon points="550,166 556,174 562,166" fill="#00D4FF" filter="url(#fGlow)"/>
      </g>

      <text x={510} y={232} fill="#9CA3AF" fontSize="10" fontFamily="monospace">Press until clip CLICKS</text>
      <text x={510} y={246} fill="#9CA3AF" fontSize="10" fontFamily="monospace">Red wires face outward</text>
      <text x={510} y={280} fill="#6B7280" fontSize="10" fontFamily="monospace">Modern GPUs: 16-pin</text>
      <text x={510} y={294} fill="#6B7280" fontSize="10" fontFamily="monospace">adapter (check manual)</text>
      <text x={10} y={246} fill="#6B7280" fontSize="10" fontFamily="monospace">GPU needs DEDICATED power — cannot run from motherboard slot alone</text>
      <text x={10} y={260} fill="#6B7280" fontSize="10" fontFamily="monospace">Route cables toward top of case — keeps airflow clean</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP 6 — Verify and done
══════════════════════════════════════════════════════════════ */
function S6() {
  return (
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'700px',display:'block'}}>
      <Defs/>
      <text x={10} y={18} fill="#00D4FF" fontSize="12" fontFamily="monospace" letterSpacing=".8">✓ INSTALLATION COMPLETE — VERIFY BEFORE BOOT</text>

      {/* Full motherboard */}
      <Mobo x={10} y={26} w={430} h={290}/>

      {/* GPU installed on mobo — sits in PCIe slot area */}
      <g filter="url(#fShadow)">
        <GpuSide x={10} y={90}/>
      </g>

      {/* Latch CLOSED + glowing */}
      <rect x={420} y={208} width={18} height={12} rx="2.5" fill="#00D4FF" stroke="#00D4FF" filter="url(#fGlowSt)"/>

      {/* Power cables connected */}
      {[22,50].map((px,i)=>(
        <g key={i}>
          <rect x={px} y={80} width={20} height={18} rx="2" fill="#c03030" stroke="#a02020"/>
          <line x1={px+10} y1={80} x2={px+8}  y2={52} stroke="#c03030" strokeWidth="4.5"/>
          <line x1={px+15} y1={80} x2={px+14} y2={52} stroke="#111" strokeWidth="4.5"/>
        </g>
      ))}

      {/* Bracket screws visible */}
      <circle cx={18} cy={107} r={5} fill="#111" stroke="#aaa" strokeWidth="1.5"/>
      <line x1={13} y1={107} x2={23} y2={107} stroke="#ccc" strokeWidth="2"/>
      <line x1={18} y1={102} x2={18} y2={112} stroke="#ccc" strokeWidth="2"/>
      <circle cx={18} cy={198} r={5} fill="#111" stroke="#aaa" strokeWidth="1.5"/>
      <line x1={13} y1={198} x2={23} y2={198} stroke="#ccc" strokeWidth="2"/>
      <line x1={18} y1={193} x2={18} y2={203} stroke="#ccc" strokeWidth="2"/>

      {/* RGB glow */}
      <rect x={24} y={108} width={406} height={5} rx="2.5" fill="url(#gRgb)"
        style={{animation:'rgb_anim 2s ease-in-out infinite'}} filter="url(#fGlow)"/>

      {/* RIGHT: Checklist */}
      <line x1={455} y1={10} x2={455} y2={340} stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,3"/>
      <text x={465} y={18} fill="#6B7280" fontSize="11" fontFamily="monospace" letterSpacing=".8">CHECKLIST</text>

      {[
        {l:'PCIe latch CLOSED',   s:'flush with slot — no tab sticking out',d:'0s'},
        {l:'Bracket SCREWED IN',  s:'no gap between bracket and case wall', d:'.4s'},
        {l:'Power cables CLICKED',s:'both connectors locked — clip engaged', d:'.8s'},
        {l:'Card sits LEVEL',     s:'no wobble, no angle from either end',   d:'1.2s'},
        {l:'Drivers after boot',  s:'nvidia.com or amd.com — latest version',d:'1.6s'},
      ].map((item,i)=>(
        <g key={i} style={{animation:'wipe_in .4s ease forwards', animationDelay:item.d}}>
          <circle cx={476} cy={62+i*50} r={14} fill="#0a1a0a" stroke="#00D4FF" strokeWidth="1.5"/>
          <polyline
            points={`468,${62+i*50} 475,${70+i*50} 486,${52+i*50}`}
            fill="none" stroke="#00D4FF" strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="55"
            style={{animation:'chk_draw 1.5s ease forwards', animationDelay:item.d}}/>
          <text x={496} y={58+i*50} fill="#F0F4FF" fontSize="11" fontFamily="monospace" fontWeight="500">{item.l}</text>
          <text x={496} y={71+i*50} fill="#6B7280" fontSize="9"  fontFamily="monospace">{item.s}</text>
        </g>
      ))}

      {/* Troubleshoot box */}
      <rect x={462} y={302} width={244} height={40} rx="4" fill="#1a0a0a" stroke="#c03030" strokeWidth="1" opacity=".85"/>
      <text x={472} y={316} fill="#c03030" fontSize="9" fontFamily="monospace">No display? → press GPU down again</text>
      <text x={472} y={330} fill="#888"    fontSize="9" fontFamily="monospace">then check power connectors are clicked</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEPS ARRAY + EXPORT
══════════════════════════════════════════════════════════════ */
const steps = [
  {
    title: 'Open the PCIe latch',
    desc: 'Find the PCIe x16 slot on your motherboard — the longest horizontal slot, usually the topmost one. At the far right end of the slot sits a small plastic latch tab. Push it outward away from the slot until you feel and hear a soft click. This unlocks the slot so the GPU can fully seat and lock in.',
    tip: 'The latch is easy to miss — look at the right end of the slot. It sticks out slightly and pivots outward.',
    animated: <S1/>,
  },
  {
    title: 'Align GPU above the PCIe slot',
    desc: 'Hold the GPU with both hands, one near each end of the card. Position it directly above the slot with the gold contacts facing downward toward the motherboard. The metal bracket on the left side must align with the case expansion slot opening. Keep the card perfectly horizontal — no tilting.',
    tip: 'If gold contacts do not line up, rotate the GPU 180°. The card only fits in one orientation.',
    animated: <S2/>,
  },
  {
    title: 'Press down until the latch clicks',
    desc: 'Apply firm, even downward pressure along the full length of the card — press both ends simultaneously. You will hear and feel a clear click when the PCIe latch engages. The card must sit perfectly level with no visible gap anywhere between the card and the slot.',
    tip: 'It needs significantly more force than most people expect the first time. If the card wobbles, press again.',
    animated: <S3/>,
  },
  {
    title: 'Secure the bracket with screws',
    desc: 'The metal bracket at the left end of the GPU slides into the PC case expansion slot opening. It needs two screws — one at the top and one at the bottom. Use the thumbscrews or screws that came with your case. The bracket must sit completely flush against the case wall with no gap.',
    tip: 'Start finger-tight first to confirm flush fit, then a quarter turn with a screwdriver. Never overtighten — bracket steel is thin.',
    animated: <S4/>,
  },
  {
    title: 'Connect the power cables',
    desc: 'Look at the top edge of the GPU for power connector sockets — two 8-pin ports (or sometimes one 16-pin on newer cards). Plug the matching PCIe power cables from your PSU into these ports. Each connector has a plastic clip that audibly clicks when fully inserted and locked.',
    tip: 'If your PSU cable is a 6+2 split, combine both halves for the 8-pin port — they are designed for this. Route cables toward the top of the case.',
    animated: <S5/>,
  },
  {
    title: 'Verify everything and power on',
    desc: 'Before closing the case, confirm: PCIe latch is closed flush, bracket has both screws, all power cables are clicked and locked, and the card sits perfectly level. Power on — if you get display output the GPU is installed. Then download and install the latest drivers from NVIDIA or AMD.',
    tip: 'No display? 90% of GPU installation problems are an unseated card (press again) or an unclicked power connector.',
    animated: <S6/>,
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
