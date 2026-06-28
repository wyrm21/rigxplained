'use client';
import GuideLayout from '@/components/GuideLayout';

/* ─── ISO PROJECTION ──────────────────────────────────────────────────── */
function mkIso(ox:number,oy:number,s:number,mirror=false){
  const px=(x:number,y:number)=>mirror?ox+(y-x)*0.866*s:ox+(x-y)*0.866*s;
  const py=(x:number,y:number,z:number)=>oy+(x+y)*0.5*s-z*s;
  const p=(x:number,y:number,z:number)=>`${px(x,y).toFixed(1)},${py(x,y,z).toFixed(1)}`;
  const pl=(pts:[number,number,number][])=>pts.map(([x,y,z])=>p(x,y,z)).join(' ');
  const pt=(x:number,y:number,z:number)=>({x:px(x,y),y:py(x,y,z)});
  return{p,pl,pt};
}

/* ─── COLORS ──────────────────────────────────────────────────────────── */
const K={
  bg:'#0A0A0F',
  mobo:'#070e07',moboB:'#162816',moboE:'#040904',
  pcie:'#07071a',gold:'#b8860b',pcb:'#0a180a',
  chip:'#0c0c10',cpu:'#101010',dark:'#080810',
  shroud:'#131320',sAcc:'#191930',sPanel:'#111124',
  fanBlade:'#242438',fanEdge:'#363654',fanHub:'#0f0f20',
  caseBody:'#0e0e18',caseMid:'#131328',
  brk:'#101024',brkAcc:'#181838',
  cyan:'#00D4FF',purple:'#8B5CF6',
  rog:'#cc1818',red:'#cc2a2a',
  silver:'#505070',silverHi:'#686888',
};

/* ─── ANIMATIONS ──────────────────────────────────────────────────────── */
const A=`
@keyframes gpu_dn{0%,15%{transform:translateY(-50px);opacity:.4;}65%,100%{transform:translateY(0);opacity:1;}}
@keyframes latch_o{0%,30%{transform:rotate(0deg);}70%,100%{transform:rotate(-52deg);}}
@keyframes latch_c{0%,42%{transform:rotate(-52deg);}74%,100%{transform:rotate(0deg);}}
@keyframes pls{0%,100%{opacity:.2;}50%{opacity:1;}}
@keyframes dn_arr{0%,100%{transform:translateY(-7px);opacity:.2;}50%{transform:translateY(0);opacity:1;}}
@keyframes click_pop{0%,55%{transform:scale(0) translateX(-50%);opacity:0;}70%{transform:scale(1.1) translateX(-50%);opacity:1;}88%,100%{transform:scale(.88) translateX(-50%);opacity:0;}}
@keyframes screw_r{to{transform:rotate(360deg);}}
@keyframes plug_dn{0%,15%{transform:translateY(-44px);}62%,100%{transform:translateY(0);}}
@keyframes rgb{0%,100%{opacity:.25;}50%{opacity:.88;}}
@keyframes chk{from{stroke-dashoffset:44;}to{stroke-dashoffset:0;}}
@keyframes slide{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
`;

/* ─── SVG WRAPPERS ────────────────────────────────────────────────────── */
/* Tailwind sets fill:currentColor globally on SVGs, turning everything white.
   Inline style beats any stylesheet rule, so wrappers move fill/stroke there. */
const Poly=({fill,stroke,strokeWidth,opacity,style,...r}:any)=>(
  <polygon style={{fill,stroke,strokeWidth,opacity,...style}} {...r}/>);
const Rect=({fill,stroke,strokeWidth,opacity,rx,ry,style,...r}:any)=>(
  <rect rx={rx} ry={ry} style={{fill,stroke,strokeWidth,opacity,...style}} {...r}/>);
const Circ=({fill,stroke,strokeWidth,opacity,style,...r}:any)=>(
  <circle style={{fill,stroke,strokeWidth,opacity,...style}} {...r}/>);
const Ell=({fill,stroke,strokeWidth,opacity,style,...r}:any)=>(
  <ellipse style={{fill,stroke,strokeWidth,opacity,...style}} {...r}/>);
const Ln=({stroke,strokeWidth,strokeDasharray,opacity,style,...r}:any)=>(
  <line style={{stroke,strokeWidth,strokeDasharray,opacity,...style}} {...r}/>);
const Txt=({fill,fontSize,style,...r}:any)=>(
  <text style={{fill,fontSize,...style}} {...r}/>);
const Pth=({fill,stroke,strokeWidth,style,...r}:any)=>(
  <path style={{fill,stroke,strokeWidth,...style}} {...r}/>);

/* ─── DEFS ────────────────────────────────────────────────────────────── */
function Defs(){
  return(
    <defs>
      <style>{A}</style>
      <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glowSm" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0"/>
        <stop offset="35%"  stopColor="#00D4FF"/>
        <stop offset="65%"  stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
      </linearGradient>
    </defs>
  );
}

/* ─── FAN BLADES ──────────────────────────────────────────────────────── */
function FanBlades({cx,cy,rx,ry}:{cx:number;cy:number;rx:number;ry:number}){
  return(
    <g style={{animation:'spin 1.6s linear infinite',transformOrigin:`${cx}px ${cy}px`}}>
      {Array.from({length:7}).map((_,i)=>{
        const a1=(i*(360/7))*Math.PI/180;
        const a2=(i*(360/7)+36)*Math.PI/180;
        const ri=0.20;
        return(<Poly key={i} points={[
          `${(cx+rx*ri*Math.cos(a1)).toFixed(1)},${(cy+ry*ri*Math.sin(a1)).toFixed(1)}`,
          `${(cx+rx*Math.cos(a1)).toFixed(1)},${(cy+ry*Math.sin(a1)).toFixed(1)}`,
          `${(cx+rx*Math.cos(a2)).toFixed(1)},${(cy+ry*Math.sin(a2)).toFixed(1)}`,
          `${(cx+rx*ri*Math.cos(a2)).toFixed(1)},${(cy+ry*ri*Math.sin(a2)).toFixed(1)}`,
        ].join(' ')} fill={K.fanBlade} stroke={K.fanEdge} strokeWidth="0.6"/>);
      })}
    </g>
  );
}

/* ─── ISO MOTHERBOARD ─────────────────────────────────────────────────── */
function Mobo({iso,hi=false}:{iso:ReturnType<typeof mkIso>;hi?:boolean}){
  const{pl}=iso;
  return(<g>
    <Poly points={pl([[0,0,5],[200,0,5],[200,165,5],[0,165,5]])} fill={K.mobo} stroke={K.moboB}/>
    <Poly points={pl([[0,165,5],[200,165,5],[200,165,0],[0,165,0]])} fill={K.moboE} stroke={K.moboB}/>
    <Poly points={pl([[200,0,5],[200,165,5],[200,165,0],[200,0,0]])} fill="#030903" stroke={K.moboB}/>
    <Poly points={pl([[0,0,5],[90,0,5],[90,28,5],[0,28,5]])} fill="#0e0e12" stroke="#181818"/>
    {/* CPU socket */}
    <Poly points={pl([[18,35,5],[68,35,5],[68,82,5],[18,82,5]])} fill={K.dark} stroke="#1e1e1e"/>
    <Poly points={pl([[23,40,5],[63,40,5],[63,77,5],[23,77,5]])} fill={K.cpu} stroke="#333"/>
    <Poly points={pl([[23,40,26],[63,40,26],[63,77,26],[23,77,26]])} fill="#181810" stroke="#333"/>
    <Poly points={pl([[23,40,5],[23,77,5],[23,77,26],[23,40,26]])} fill="#121210" stroke="#252520"/>
    <Poly points={pl([[63,40,5],[63,77,5],[63,77,26],[63,40,26]])} fill="#141412" stroke="#252520"/>
    {/* VRM heatsink */}
    <Poly points={pl([[70,35,5],[92,35,5],[92,82,5],[70,82,5]])} fill={K.chip} stroke="#181818"/>
    {[35,42,49,56,63,70,77].map(yr=>(
      <Poly key={yr} points={pl([[70,yr,5],[92,yr,5],[92,yr,16],[70,yr,16]])} fill="#111115" stroke="#181818" strokeWidth=".5"/>
    ))}
    {/* RAM ×4 */}
    {[0,1,2,3].map(i=>(<g key={i}>
      <Poly points={pl([[100+i*20,10,5],[114+i*20,10,5],[114+i*20,84,5],[100+i*20,84,5]])} fill={K.dark} stroke="#181818"/>
      <Poly points={pl([[100+i*20,10,5],[114+i*20,10,5],[114+i*20,10,40],[100+i*20,10,40]])} fill="#090914" stroke="#151528"/>
      <Poly points={pl([[114+i*20,10,5],[114+i*20,84,5],[114+i*20,84,40],[114+i*20,10,40]])} fill="#07070f" stroke="#151528"/>
      <Poly points={pl([[100+i*20,10,40],[114+i*20,10,40],[114+i*20,84,40],[100+i*20,84,40]])} fill="#0d0d1c" stroke="#1e1e30"/>
    </g>))}
    {/* PCIe x16 — glows when hi */}
    <Poly points={pl([[5,98,5],[195,98,5],[195,114,5],[5,114,5]])}
      fill={hi?'#07072a':K.pcie} stroke={hi?K.cyan:'#202040'}
      strokeWidth={hi?'2':'1.5'} filter={hi?'url(#glowSm)':''}
      style={hi?{animation:'pls 2s ease-in-out infinite'}:{}}/>
    {Array.from({length:16}).map((_,i)=>(
      <Poly key={i} points={pl([[8+i*11,99,5],[16+i*11,99,5],[16+i*11,113,5],[8+i*11,113,5]])} fill={K.gold} opacity=".9"/>
    ))}
    <Poly points={pl([[188,110,5],[198,110,5],[198,110,14],[188,110,14]])} fill="#18183a" stroke={K.cyan} strokeWidth="1.5" filter="url(#glowSm)"/>
    {/* Smaller connectors + chipset */}
    <Poly points={pl([[5,120,5],[195,120,5],[195,126,5],[5,126,5]])} fill={K.dark} stroke="#141414"/>
    <Poly points={pl([[5,132,5],[195,132,5],[195,138,5],[5,132,5]])} fill={K.dark} stroke="#141414"/>
    <Poly points={pl([[120,120,5],[165,120,5],[165,158,5],[120,158,5]])} fill={K.chip} stroke="#181818"/>
    {[120,127,134,141,148,155].map(yr=>(
      <Poly key={yr} points={pl([[120,yr,5],[165,yr,5],[165,yr,8],[120,yr,8]])} fill="#101014" stroke="#181818" strokeWidth=".5"/>
    ))}
    {[18,36,54].map(x=>(<Poly key={x} points={pl([[x,150,5],[x+15,150,5],[x+15,158,5],[x,158,5]])} fill={K.dark} stroke="#141414"/>))}
    {[0,1,2].map(i=>(<Poly key={i} points={pl([[170,122+i*14,5],[190,122+i*14,5],[190,132+i*14,5],[170,132+i*14,5]])} fill={K.dark} stroke="#141414"/>))}
    <Poly points={pl([[180,12,5],[198,12,5],[198,65,5],[180,65,5]])} fill={K.dark} stroke="#1e1e1e"/>
    <Poly points={pl([[180,12,5],[198,12,5],[198,12,22],[180,12,22]])} fill="#090914" stroke="#151528"/>
    <Poly points={pl([[198,12,5],[198,65,5],[198,65,22],[198,12,22]])} fill="#07070f" stroke="#151528"/>
  </g>);
}

/* ─── ISO GPU — ROG STRIX INSPIRED ───────────────────────────────────── */
function Gpu({iso,mirror=false}:{iso:ReturnType<typeof mkIso>;mirror?:boolean}){
  const{pl,pt}=iso;
  const z0=88,z1=190,fanXs=[32,100,168];
  return(<g>
    {/* PCB */}
    <Poly points={pl([[5,95,z0],[195,95,z0],[195,119,z0],[5,119,z0]])} fill={K.pcb} stroke={K.moboB}/>
    <Poly points={pl([[5,95,z0],[5,119,z0],[5,119,z0+8],[5,95,z0+8]])} fill="#080f08" stroke={K.moboB}/>
    <Poly points={pl([[195,95,z0],[195,119,z0],[195,119,z0+8],[195,95,z0+8]])} fill="#060d06"/>
    {Array.from({length:16}).map((_,i)=>(
      <Poly key={i} points={pl([[8+i*11,96,z0],[16+i*11,96,z0],[16+i*11,118,z0],[8+i*11,118,z0]])} fill={K.gold}/>
    ))}
    {/* Heatsink */}
    <Poly points={pl([[5,95,z0+8],[195,95,z0+8],[195,119,z0+8],[5,119,z0+8]])} fill="#0e0e18" stroke="#181828"/>
    {Array.from({length:9}).map((_,i)=>(
      <Poly key={i} points={pl([[14+i*19,95,z0+8],[28+i*19,95,z0+8],[28+i*19,96,z0+55],[14+i*19,96,z0+55]])} fill="#121218" stroke="#0e0e14" strokeWidth=".5"/>
    ))}
    {/* Shroud faces */}
    <Poly points={pl([[5,95,z0+8],[195,95,z0+8],[195,95,z1],[5,95,z1]])} fill={K.shroud} stroke="#1a1a26"/>
    <Poly points={pl([[5,119,z0],[195,119,z0],[195,119,z1],[5,119,z1]])} fill={K.shroud} stroke="#181820"/>
    <Poly points={pl([[5,119,z0+64],[195,119,z0+64],[195,119,z0+67],[5,119,z0+67]])} fill={K.rog} opacity=".75" filter="url(#glowSm)"/>
    <Poly points={pl([[5,119,z0+28],[195,119,z0+28],[195,119,z0+29],[5,119,z0+29]])} fill={K.silver} opacity=".5"/>
    <Poly points={pl([[5,119,z1-20],[195,119,z1-20],[195,119,z1-19],[5,119,z1-19]])} fill={K.silver} opacity=".5"/>
    <Poly points={pl([[195,95,z0+8],[195,119,z0+8],[195,119,z1],[195,95,z1]])} fill="#0f0f1c" stroke="#141420"/>
    {/* Shroud top */}
    <Poly points={pl([[5,95,z1],[195,95,z1],[195,119,z1],[5,119,z1]])} fill={K.shroud} stroke="#181824"/>
    <Poly points={pl([[5,95,z1],[26,95,z1],[26,119,z1],[5,119,z1]])} fill={K.sPanel} stroke={K.silver} strokeWidth=".7"/>
    <Poly points={pl([[170,95,z1],[195,95,z1],[195,119,z1],[170,119,z1]])} fill={K.sPanel} stroke={K.silver} strokeWidth=".7"/>
    <Poly points={pl([[5,95,z1],[15,95,z1],[15,99,z1],[5,99,z1]])} fill={K.silverHi} opacity=".8"/>
    <Poly points={pl([[185,95,z1],[195,95,z1],[195,99,z1],[185,99,z1]])} fill={K.silverHi} opacity=".8"/>
    {/* ROG eye */}
    {(()=>{const c=pt(100,107,z1);return(<g>
      <Poly points={`${c.x-9},${c.y} ${c.x},${c.y-4.5} ${c.x+9},${c.y} ${c.x},${c.y+4.5}`}
        fill="none" stroke={K.rog} strokeWidth="1.2" opacity=".9" filter="url(#glowSm)"/>
      <Poly points={`${c.x-4},${c.y} ${c.x},${c.y-2} ${c.x+4},${c.y} ${c.x},${c.y+2}`} fill={K.rog} opacity=".6"/>
    </g>);})()}
    {/* 3 fans */}
    {fanXs.map(fx=>{const c=pt(fx,107,z1);const rx=18,ry=10;return(<g key={fx}>
      <Ell cx={c.x} cy={c.y} rx={rx+2.8} ry={ry+1.6} fill="#060610" stroke="#1a1a2c" strokeWidth="1.5"/>
      <Ell cx={c.x} cy={c.y} rx={rx} ry={ry} fill="#07070e"/>
      <FanBlades cx={c.x} cy={c.y} rx={rx*0.84} ry={ry*0.84}/>
      <Ell cx={c.x} cy={c.y} rx={5} ry={2.8} fill={K.fanHub} stroke="#202040" strokeWidth="1"/>
      <Ell cx={c.x} cy={c.y} rx={2} ry={1.1} fill="#0c0c1a"/>
    </g>);})}
    {/* ARGB */}
    <Poly points={pl([[5,119,z1-5],[195,119,z1-5],[195,119,z1],[5,119,z1]])} fill={K.cyan} opacity=".5" filter="url(#glowSm)" style={{animation:'rgb 2.4s ease-in-out infinite'}}/>
    <Poly points={pl([[5,95,z1-4],[195,95,z1-4],[195,95,z1],[5,95,z1]])} fill={K.purple} opacity=".28" style={{animation:'rgb 2.4s ease-in-out infinite 1.2s'}}/>
    {/* Bracket */}
    <Poly points={pl([[0,95,z0],[5,95,z0],[5,119,z0],[0,119,z0]])} fill={K.brk} stroke={K.silver} strokeWidth=".5"/>
    <Poly points={pl([[0,95,z0],[0,119,z0],[0,119,z1],[0,95,z1]])} fill={K.brk} stroke="#141428"/>
    <Poly points={pl([[0,95,z1],[5,95,z1],[5,119,z1],[0,119,z1]])} fill={K.brkAcc} stroke={K.silver} strokeWidth=".5"/>
    {[z0+12,z0+28,z0+44,z0+58].map((z,i)=>(
      <Poly key={i} points={pl([[0,97,z],[0,117,z],[0,117,z+12],[0,97,z+12]])} fill="#060608" stroke="#0e0e1a" strokeWidth=".4"/>
    ))}
    {/* Power connectors bump */}
    <Poly points={pl([[150,95,z1],[168,95,z1],[168,95,z1+22],[150,95,z1+22]])} fill="#0e0e18" stroke="#1e1e2e"/>
    <Poly points={pl([[173,95,z1],[191,95,z1],[191,95,z1+22],[173,95,z1+22]])} fill="#0e0e18" stroke="#1e1e2e"/>
  </g>);
}

/* ─── STEP 1 — Open PCIe latch ────────────────────────────────────────── */
function S1(){
  const iso=mkIso(330,110,0.76);
  const{pt}=iso;
  const slotC=pt(100,106,5);
  const latchPt=pt(193,111,9);
  return(
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <Defs/>
      <Txt x="14" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">FULL MOTHERBOARD VIEW</Txt>
      <Mobo iso={iso} hi/>
      <Ln x1={slotC.x} y1={slotC.y-6} x2={slotC.x-22} y2={slotC.y-44} stroke={K.cyan} strokeWidth="1" strokeDasharray="3,2"/>
      <Txt x={slotC.x-74} y={slotC.y-50} fill={K.cyan} fontSize="11" fontFamily="monospace">PCIe x16 ← GPU slot</Txt>
      <Ln x1={latchPt.x} y1={latchPt.y} x2={latchPt.x+32} y2={latchPt.y-32} stroke={K.cyan} strokeWidth="1" strokeDasharray="2,2"/>
      <Txt x={latchPt.x+34} y={latchPt.y-34} fill={K.cyan} fontSize="10" fontFamily="monospace">latch →</Txt>
      <Ln x1="380" y1="12" x2="380" y2="468" stroke="#14142a" strokeWidth="1" strokeDasharray="4,3"/>
      <Txt x="392" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">LATCH — CLOSE-UP</Txt>
      <Rect x="394" y="110" width="290" height="58" rx="4" fill={K.pcie} stroke="#2a2a60" strokeWidth="2" filter="url(#glowSm)"/>
      {Array.from({length:18}).map((_,i)=>(<g key={i}>
        <Rect x={400+i*14} y={114} width="9" height="50" rx="1" fill={K.gold} opacity=".88"/>
        <Ln x1={404+i*14} y1={114} x2={404+i*14} y2={164} stroke="#8a6000" strokeWidth=".5" opacity=".4"/>
      </g>))}
      <Rect x="514" y="114" width="16" height="50" fill="#08080e" stroke="#0e0e18"/>
      <Txt x="510" y="105" fill={K.silver} fontSize="8" fontFamily="monospace">key notch</Txt>
      <Rect x="394" y="104" width="290" height="8" rx="2" fill="#14142a"/>
      <Rect x="394" y="168" width="290" height="8" rx="2" fill="#14142a"/>
      <Rect x="658" y="106" width="30" height="56" rx="4" fill="#141430" stroke="#282860" strokeWidth="1.5"/>
      <Rect x="661" y="109" width="24" height="50" rx="2" fill="#101026"/>
      {[0,1,2,3,4].map(i=>(<Ln key={i} x1="664" y1={116+i*5} x2="680" y2={116+i*5} stroke="#1c1c30" strokeWidth="1.2"/>))}
      <g style={{animation:'latch_o 2.8s ease-in-out infinite',transformOrigin:'660px 162px'}}>
        <Rect x="648" y="152" width="26" height="17" rx="3" fill="#22226a" stroke={K.cyan} strokeWidth="2" filter="url(#glowSm)"/>
        <Rect x="651" y="155" width="20" height="11" rx="2" fill={K.cyan} opacity=".4"/>
        {[0,1,2].map(r=>(<Ln key={r} x1="654" y1={156+r*2.5} x2="666" y2={156+r*2.5} stroke="#7070cc" strokeWidth=".8"/>))}
      </g>
      <g style={{animation:'pls 1.5s ease-in-out infinite'}}>
        <Ln x1="626" y1="160" x2="645" y2="160" stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
        <Poly points="643,156 652,160 643,164" fill={K.cyan} filter="url(#glowSm)"/>
        <Txt x="565" y="155" fill={K.cyan} fontSize="12" fontFamily="monospace">push →</Txt>
      </g>
      <Ln x1="674" y1="172" x2="674" y2="214" stroke="#242444" strokeWidth="1" strokeDasharray="2,2"/>
      <Txt x="640" y="228" fill="#8080a0" fontSize="11" fontFamily="monospace">latch tab</Txt>
      <Txt x="640" y="242" fill={K.silver} fontSize="10" fontFamily="monospace">clicks open</Txt>
      <Ln x1="394" y1="184" x2="658" y2="184" stroke="#1e1e30" strokeWidth=".8"/>
      <Ln x1="394" y1="181" x2="394" y2="187" stroke="#2a2a40"/>
      <Ln x1="658" y1="181" x2="658" y2="187" stroke="#2a2a40"/>
      <Txt x="512" y="197" fill={K.silver} fontSize="9" fontFamily="monospace" textAnchor="middle">89mm — PCIe x16 slot</Txt>
      <Txt x="392" y="304" fill={K.silver} fontSize="11" fontFamily="monospace">① Find the LONGEST slot — usually topmost</Txt>
      <Txt x="392" y="322" fill={K.silver} fontSize="11" fontFamily="monospace">② Latch at FAR RIGHT end of the slot</Txt>
      <Txt x="392" y="340" fill={K.silver} fontSize="11" fontFamily="monospace">③ Push tab outward — click = open</Txt>
    </svg>
  );
}

/* ─── STEP 2 — Dual isometric GPU installation ────────────────────────── */
function S2(){
  const isoR=mkIso(195,140,0.72,false);
  const isoL=mkIso(505,140,0.72,true);
  return(
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <Defs/>
      <Txt x="10" y="20" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">VIEW 1 — UPPER-RIGHT ANGLE</Txt>
      <Txt x="362" y="20" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">VIEW 2 — UPPER-LEFT ANGLE</Txt>
      <Ln x1="350" y1="10" x2="350" y2="470" stroke="#14142a" strokeWidth="1" strokeDasharray="4,3"/>
      <Mobo iso={isoR} hi/>
      <g style={{animation:'gpu_dn 3.5s ease-in-out infinite'}}>
        <Gpu iso={isoR}/>
        <g style={{animation:'dn_arr 1.4s ease-in-out infinite'}}>
          {[32,100,168].map(fx=>{const{pt}=isoR;const c=pt(fx,85,184);return(<g key={fx}>
            <Ln x1={c.x} y1={c.y-26} x2={c.x} y2={c.y-6} stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
            <Poly points={`${c.x-5},${c.y-8} ${c.x},${c.y+2} ${c.x+5},${c.y-8}`} fill={K.cyan} filter="url(#glowSm)"/>
          </g>);})}
        </g>
      </g>
      <g style={{animation:'click_pop 3.5s ease-in-out infinite'}}>
        {(()=>{const{pt}=isoR;const c=pt(100,106,5);return(<g>
          <Rect x={c.x-44} y={c.y+10} width={88} height={30} rx={15} fill={K.cyan} filter="url(#glow)"/>
          <Txt x={c.x} y={c.y+30} fill="#0A0A0F" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</Txt>
        </g>);})()}
      </g>
      {(()=>{const{pt}=isoR;const lp=pt(193,111,9);return(
        <g style={{animation:'latch_c 3.5s ease-in-out infinite',transformOrigin:`${lp.x}px ${lp.y}px`}}>
          <Circ cx={lp.x} cy={lp.y} r={7} fill={K.cyan} opacity=".8" filter="url(#glowSm)"/>
        </g>
      );})()}
      <Mobo iso={isoL} hi/>
      <g style={{animation:'gpu_dn 3.5s ease-in-out infinite'}}>
        <Gpu iso={isoL} mirror/>
        <g style={{animation:'dn_arr 1.4s ease-in-out infinite'}}>
          {[32,100,168].map(fx=>{const{pt}=isoL;const c=pt(fx,85,184);return(<g key={fx}>
            <Ln x1={c.x} y1={c.y-26} x2={c.x} y2={c.y-6} stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
            <Poly points={`${c.x-5},${c.y-8} ${c.x},${c.y+2} ${c.x+5},${c.y-8}`} fill={K.cyan} filter="url(#glowSm)"/>
          </g>);})}
        </g>
      </g>
      <g style={{animation:'click_pop 3.5s ease-in-out infinite 0.3s'}}>
        {(()=>{const{pt}=isoL;const c=pt(100,106,5);return(<g>
          <Rect x={c.x-44} y={c.y+10} width={88} height={30} rx={15} fill={K.cyan} filter="url(#glow)"/>
          <Txt x={c.x} y={c.y+30} fill="#0A0A0F" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</Txt>
        </g>);})()}
      </g>
      <Txt x="10" y="460" fill={K.silver} fontSize="10" fontFamily="monospace">Press both ends evenly · latch snaps shut automatically · card sits level = fully seated</Txt>
    </svg>
  );
}

/* ─── STEP 3 — Secure bracket screws ─────────────────────────────────── */
function S3(){
  return(
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <Defs/>
      <Txt x="14" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">PC CASE — REAR EXPANSION AREA</Txt>
      <Txt x="400" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">SCREW — DETAIL</Txt>
      <Ln x1="385" y1="10" x2="385" y2="470" stroke="#14142a" strokeWidth="1" strokeDasharray="4,3"/>
      {/* Case body */}
      <Rect x="14" y="32" width="364" height="420" rx="5" fill={K.caseBody} stroke="#1e1e2c" strokeWidth="2"/>
      {Array.from({length:18}).map((_,i)=>(<Rect key={i} x="16" y={34+i*23} width="360" height="1" fill="#111122" opacity=".6"/>))}
      <Rect x="14" y="32" width="364" height="5" rx="2" fill={K.caseMid} stroke="#20203a"/>
      <Rect x="14" y="447" width="364" height="5" rx="2" fill={K.caseMid} stroke="#20203a"/>
      {/* Empty expansion slots */}
      {[1,2,3,4,5,6].map(i=>(<Rect key={i} x="52" y={36+i*56} width="46" height="52" rx="2" fill="#08080e" stroke="#181828"/>))}
      {/* GPU bracket */}
      <Rect x="52" y="36" width="46" height="390" rx="2" fill={K.brk} stroke={K.silver} strokeWidth="1.5"/>
      {Array.from({length:12}).map((_,i)=>(<Rect key={i} x="54" y={38+i*32} width="42" height="1" fill="#1a1a34" opacity=".7"/>))}
      {/* Display ports */}
      {[{y:55,h:12,t:'DP'},{y:71,h:12,t:'DP'},{y:87,h:18,t:'HDMI'},{y:109,h:12,t:'DP'}].map(({y,h,t},i)=>(<g key={i}>
        <Rect x="56" y={y} width="38" height={h} rx="1" fill="#08080e" stroke="#202030"/>
        <Txt x="58" y={y+h-2} fill={K.silver} fontSize="6.5" fontFamily="monospace">{t}</Txt>
      </g>))}
      {/* GPU card visible */}
      <Rect x="98" y="44" width="268" height="170" rx="2" fill={K.shroud} stroke="#1a1a28"/>
      <Rect x="98" y="44" width="268" height="8" rx="2" fill={K.sPanel}/>
      {[60,150,240].map(cx=>(<g key={cx}>
        <Circ cx={cx+98} cy={130} r={58} fill="#07070e" stroke="#181826" strokeWidth="1.5"/>
        <FanBlades cx={cx+98} cy={130} rx={52} ry={52}/>
        <Circ cx={cx+98} cy={130} r={12} fill={K.fanHub} stroke="#202038" strokeWidth="1.2"/>
        <Circ cx={cx+98} cy={130} r={4.5} fill="#0c0c1a"/>
      </g>))}
      <Rect x="98" y="208" width="268" height="5" rx="2" fill="url(#rg)" style={{animation:'rgb 2.4s ease-in-out infinite'}}/>
      <Rect x="98" y="185" width="268" height="2" fill={K.rog} opacity=".6" filter="url(#glowSm)"/>
      {/* Top screw */}
      <Circ cx="75" cy="44" r="11" fill="#0a0a18" stroke={K.cyan} strokeWidth="2" filter="url(#glowSm)" style={{animation:'pls 2s ease-in-out infinite'}}/>
      <g style={{animation:'screw_r 2s linear infinite',transformOrigin:'75px 44px'}}>
        <Rect x="67" y="42" width="16" height="4" rx="1.5" fill="#40405c"/>
        <Rect x="73" y="36" width="4" height="16" rx="1.5" fill="#40405c"/>
        <Ln x1="69" y1="38" x2="81" y2="50" stroke="#50506c" strokeWidth="1.2"/>
        <Ln x1="81" y1="38" x2="69" y2="50" stroke="#50506c" strokeWidth="1.2"/>
      </g>
      <Txt x="22" y="48" fill={K.cyan} fontSize="12" fontFamily="monospace" filter="url(#glowSm)">①</Txt>
      {/* Bottom screw */}
      <Circ cx="75" cy="390" r="11" fill="#0a0a18" stroke={K.cyan} strokeWidth="2" filter="url(#glowSm)" style={{animation:'pls 2s ease-in-out infinite 0.5s'}}/>
      <g style={{animation:'screw_r 2s linear infinite 0.5s',transformOrigin:'75px 390px'}}>
        <Rect x="67" y="388" width="16" height="4" rx="1.5" fill="#40405c"/>
        <Rect x="73" y="382" width="4" height="16" rx="1.5" fill="#40405c"/>
        <Ln x1="69" y1="384" x2="81" y2="396" stroke="#50506c" strokeWidth="1.2"/>
        <Ln x1="81" y1="384" x2="69" y2="396" stroke="#50506c" strokeWidth="1.2"/>
      </g>
      <Txt x="22" y="394" fill={K.cyan} fontSize="12" fontFamily="monospace" filter="url(#glowSm)">②</Txt>
      <Ln x1="50" y1="36" x2="50" y2="424" stroke={K.cyan} strokeWidth="1" strokeDasharray="4,3" opacity=".5" filter="url(#glowSm)"/>
      <Txt x="16" y="240" fill={K.cyan} fontSize="9" fontFamily="monospace" transform="rotate(-90,20,240)">BRACKET MUST SIT FLUSH HERE</Txt>
      {/* Right: screw detail */}
      <Rect x="396" y="50" width="24" height="220" rx="2" fill="#111118" stroke="#1c1c2a"/>
      <Rect x="420" y="50" width="36" height="220" rx="2" fill={K.brk} stroke={K.silver} strokeWidth="1.5"/>
      <Rect x="456" y="62" width="218" height="72" rx="2" fill={K.shroud} stroke="#141420"/>
      <Circ cx="528" cy="98" r="29" fill="#07070e" stroke="#181826" strokeWidth="1.2"/>
      <FanBlades cx={528} cy={98} rx={24} ry={24}/>
      <Circ cx="528" cy="98" r={8} fill={K.fanHub} stroke="#202038" strokeWidth="1"/>
      <Circ cx="438" cy="130" r="15" fill="#0a0a18" stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)" style={{animation:'pls 2s ease-in-out infinite'}}/>
      <Circ cx="438" cy="130" r="8" fill="#08080e" stroke="#282840" strokeWidth="1.2"/>
      <g style={{animation:'screw_r 2s linear infinite',transformOrigin:'438px 130px'}}>
        <Rect x="430" y="128" width="16" height="4" rx="1.5" fill="#484862"/>
        <Rect x="436" y="122" width="4" height="16" rx="1.5" fill="#484862"/>
        <Ln x1="432" y1="124" x2="444" y2="136" stroke="#585878" strokeWidth="1.2"/>
        <Ln x1="444" y1="124" x2="432" y2="136" stroke="#585878" strokeWidth="1.2"/>
      </g>
      {/* Screwdriver — dark steel */}
      <g style={{animation:'dn_arr 2s ease-in-out infinite'}}>
        <Rect x="468" y="62" width="34" height="56" rx="10" fill="#161626" stroke="#20203a"/>
        {[0,1,2,3,4].map(i=>(<Rect key={i} x="468" y={68+i*9} width="34" height="6" rx="3" fill="#1a1a2e" opacity=".8"/>))}
        <Rect x="476" y="84" width="18" height="4" rx="1.5" fill="#22223c"/>
        <Rect x="479" y="117" width="10" height="34" rx="1.5" fill="#2a2a40" stroke="#38385a"/>
        <Pth d="M 479 151 L 484 164 L 489 151 Z" fill="#383858"/>
        <Ln x1="481" y1="152" x2="487" y2="152" stroke="#4a4a68" strokeWidth="1.8"/>
        <Ln x1="484" y1="149" x2="484" y2="157" stroke="#4a4a68" strokeWidth="1.8"/>
      </g>
      <Rect x="398" y="292" width="284" height="128" rx="6" fill="#09090f" stroke="#181828"/>
      {['① Align bracket in slot opening','② Finger-tighten top + bottom screw','③ Check bracket sits FLUSH — no gap','④ Quarter-turn snug with screwdriver'].map((t,i)=>(
        <Txt key={i} x="412" y={314+i*26} fill="#7070a0" fontSize="11" fontFamily="monospace">{t}</Txt>
      ))}
      <Txt x="396" y="434" fill={K.red} fontSize="10" fontFamily="monospace" filter="url(#glowSm)">Gap between bracket + case wall = GPU not fully seated</Txt>
      <Txt x="396" y="450" fill={K.silver} fontSize="10" fontFamily="monospace">Never overtighten — bracket steel is thin</Txt>
    </svg>
  );
}

/* ─── STEP 4 — Power cables (GPU side view, matches your photos 1+2) ──── */
function S4(){
  /* GPU drawn as a flat side-elevation matching how it looks installed in case:
     backplate on top, heatsink fins in middle, red shroud at bottom,
     PCIe contacts on the very bottom edge, bracket on left side.
     Power connectors stand up from the backplate with cables dropping from PSU. */
  const cx0=48, cy0=192, cw=304, ch=112;
  return(
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <Defs/>
      <Txt x="14" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">GPU — SIDE VIEW  (looking from inside case, top edge up)</Txt>
      <Txt x="418" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">CONNECTOR DETAIL</Txt>
      <Ln x1="402" y1="10" x2="402" y2="470" stroke="#14142a" strokeWidth="1" strokeDasharray="4,3"/>

      {/* ── BACKPLATE (top strip — faces case interior) ── */}
      <Rect x={cx0} y={cy0} width={cw} height={20} rx="2" fill="#0e0e1a" stroke={K.silverHi} strokeWidth="1.5"/>
      {/* ARGB glow strip on backplate */}
      <Rect x={cx0+2} y={cy0+2} width={cw-4} height={9} rx="1" fill="url(#rg)" style={{animation:'rgb 2.4s ease-in-out infinite'}}/>
      <Txt x={cx0+cw/2} y={cy0+16} fill="#1c1c2c" fontSize="9" fontFamily="monospace" fontWeight="700" textAnchor="middle" letterSpacing="4">BATTLE-X</Txt>

      {/* ── HEATSINK FINS AREA ── */}
      <Rect x={cx0} y={cy0+20} width={cw} height={62} fill="#0d0d14" stroke="#141422"/>
      {/* Fin slices — vertical dark lines */}
      {Array.from({length:25}).map((_,i)=>(
        <Ln key={i} x1={cx0+4+i*12} y1={cy0+22} x2={cx0+4+i*12} y2={cy0+80} stroke="#181828" strokeWidth="1.8"/>
      ))}
      {/* Fin top-edge depth hint */}
      {Array.from({length:25}).map((_,i)=>(
        <Rect key={i} x={cx0+4+i*12} y={cy0+20} width="9" height="4" fill="#1e1e2e"/>
      ))}

      {/* ── ROG RED ACCENT LINE ── */}
      <Rect x={cx0} y={cy0+80} width={cw} height={4} fill={K.rog} opacity=".75" filter="url(#glowSm)"/>

      {/* ── RED SHROUD (bottom of card) ── */}
      <Rect x={cx0} y={cy0+82} width={cw} height={30} rx="1" fill="#180808" stroke="#280808"/>
      <Rect x={cx0} y={cy0+82} width={cw} height={10} fill="#cc1010" opacity=".32"/>
      <Txt x={cx0+12} y={cy0+102} fill="#aa1010" fontSize="11" fontFamily="monospace" fontWeight="700">GEFORCE RTX™</Txt>
      <Txt x={cx0+200} y={cy0+102} fill="#661010" fontSize="9" fontFamily="monospace" letterSpacing="2">COLORFUL</Txt>

      {/* ── PCIe GOLD CONTACTS (bottom edge) ── */}
      <Rect x={cx0} y={cy0+ch-6} width={cw} height={12} fill="#111116" stroke="#1a1a1e"/>
      {Array.from({length:20}).map((_,i)=>(
        <Rect key={i} x={cx0+8+i*14} y={cy0+ch-5} width="9" height="8" fill={K.gold}/>
      ))}

      {/* ── BRACKET (left side of card) ── */}
      <Rect x={cx0-22} y={cy0-4} width={22} height={ch+8} rx="2" fill={K.brk} stroke={K.silver} strokeWidth="1.2"/>
      {[{y:8,h:11,t:'DP'},{y:22,h:11,t:'DP'},{y:36,h:17,t:'HDMI'},{y:56,h:11,t:'DP'}].map(({y,h,t},i)=>(<g key={i}>
        <Rect x={cx0-20} y={cy0+y} width="17" height={h} rx="1" fill="#08080e" stroke="#1a1a28"/>
        <Txt x={cx0-19} y={cy0+y+h-1} fill="#404050" fontSize="5.5" fontFamily="monospace">{t}</Txt>
      </g>))}

      {/* ── POWER CONNECTORS (stand up from backplate) ── */}
      {/* Connector 1 */}
      <Rect x={cx0+58} y={cy0-52} width={62} height={54} rx="3" fill="#0c0c1a" stroke={K.cyan} strokeWidth="2" filter="url(#glow)" style={{animation:'pls 1.6s ease-in-out infinite'}}/>
      {Array.from({length:8}).map((_,i)=>(
        <Circ key={i} cx={cx0+66+(i%4)*13} cy={cy0-40+(Math.floor(i/4)*18)} r={4.2} fill="#141430" stroke="#252550" strokeWidth=".8"/>
      ))}
      {/* Retention clip */}
      <Rect x={cx0+62} y={cy0-8} width={24} height={10} rx="2.5" fill="#181828" stroke={K.purple} strokeWidth="1.5" filter="url(#glowSm)"/>
      <Txt x={cx0+74} y={cy0-0} fill={K.purple} fontSize="7" fontFamily="monospace" textAnchor="middle">CLIP</Txt>
      <Txt x={cx0+58} y={cy0-58} fill={K.silver} fontSize="9" fontFamily="monospace">8-pin ①</Txt>

      {/* Connector 2 */}
      <Rect x={cx0+134} y={cy0-52} width={62} height={54} rx="3" fill="#0c0c1a" stroke={K.cyan} strokeWidth="2" filter="url(#glow)" style={{animation:'pls 1.6s ease-in-out infinite 0.4s'}}/>
      {Array.from({length:8}).map((_,i)=>(
        <Circ key={i} cx={cx0+142+(i%4)*13} cy={cy0-40+(Math.floor(i/4)*18)} r={4.2} fill="#141430" stroke="#252550" strokeWidth=".8"/>
      ))}
      <Rect x={cx0+138} y={cy0-8} width={24} height={10} rx="2.5" fill="#181828" stroke={K.purple} strokeWidth="1.5" filter="url(#glowSm)"/>
      <Txt x={cx0+134} y={cy0-58} fill={K.silver} fontSize="9" fontFamily="monospace">8-pin ②</Txt>

      {/* Animated cables dropping into connectors from PSU above */}
      <g style={{animation:'plug_dn 3s ease-in-out infinite'}}>
        {[0,1,2,3,4,5,6,7].map(i=>(
          <Ln key={i} x1={cx0+66+(i%4)*13} y1={cy0-52} x2={cx0+65+(i%4)*13} y2={cy0-130}
            stroke={i<4?'#880808':'#0a0a18'} strokeWidth="4.5" strokeLinecap="round"/>
        ))}
        <Rect x={cx0+52} y={cy0-143} width={76} height={14} rx="4" fill="#141424" stroke="#1e1e30"/>
        {[0,1,2,3,4,5,6,7].map(i=>(
          <Ln key={i} x1={cx0+142+(i%4)*13} y1={cy0-52} x2={cx0+141+(i%4)*13} y2={cy0-130}
            stroke={i<4?'#880808':'#0a0a18'} strokeWidth="4.5" strokeLinecap="round"/>
        ))}
        <Rect x={cx0+128} y={cy0-143} width={76} height={14} rx="4" fill="#141424" stroke="#1e1e30"/>
      </g>

      {/* Down arrows */}
      <g style={{animation:'dn_arr 1.5s ease-in-out infinite'}}>
        <Ln x1={cx0+89} y1={cy0-157} x2={cx0+89} y2={cy0-145} stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
        <Poly points={`${cx0+84},${cy0-147} ${cx0+89},${cy0-137} ${cx0+94},${cy0-147}`} fill={K.cyan} filter="url(#glowSm)"/>
        <Ln x1={cx0+165} y1={cy0-157} x2={cx0+165} y2={cy0-145} stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
        <Poly points={`${cx0+160},${cy0-147} ${cx0+165},${cy0-137} ${cx0+170},${cy0-147}`} fill={K.cyan} filter="url(#glowSm)"/>
      </g>

      <Txt x={cx0} y={cy0+ch+34} fill={K.silver} fontSize="10" fontFamily="monospace">GPU needs direct PSU power — motherboard slot alone is not enough</Txt>
      <Txt x={cx0} y={cy0+ch+50} fill={K.silver} fontSize="10" fontFamily="monospace">Route cables toward TOP of case for clean airflow</Txt>

      {/* ── RIGHT PANEL: Connector + retention clip detail ── */}
      <g style={{animation:'plug_dn 3s ease-in-out infinite'}}>
        <Txt x="416" y="46" fill={K.red} fontSize="10" fontFamily="monospace">8-pin PCIe cable</Txt>
        <Rect x="420" y="52" width="60" height="10" rx="3" fill="#141424" stroke="#1e1e30"/>
        {Array.from({length:8}).map((_,i)=>(
          <Ln key={i} x1={429+(i%4)*14} y1={95} x2={427+(i%4)*14} y2={62}
            stroke={i<4?'#880808':'#0a0a18'} strokeWidth="4" strokeLinecap="round"/>
        ))}
        <Rect x="420" y="95" width="68" height="46" rx="3" fill="#880808" stroke="#660606" strokeWidth="1.8"/>
        <Rect x="423" y="98" width="62" height="40" rx="2" fill="#9c1010"/>
        {Array.from({length:8}).map((_,i)=>(<g key={i}>
          <Circ cx={429+(i%4)*14} cy={i<4?107:118} r={5.5} fill="#c03030" stroke="#e04040" strokeWidth=".8"/>
          <Circ cx={429+(i%4)*14} cy={i<4?107:118} r={2.5} fill="#cc3838"/>
        </g>))}
        {/* Retention clip — highlighted purple */}
        <Rect x="426" y="138" width="32" height="12" rx="3" fill="#181828" stroke={K.purple} strokeWidth="2" filter="url(#glowSm)"/>
        <Txt x="442" y="147" fill={K.purple} fontSize="8" fontFamily="monospace" textAnchor="middle">CLIP</Txt>
      </g>

      {/* GPU socket */}
      <Txt x="416" y="184" fill={K.silver} fontSize="9" fontFamily="monospace">GPU power socket</Txt>
      <Rect x="420" y="190" width="68" height="48" rx="3" fill="#09091a" stroke="#222240" strokeWidth="1.8"/>
      {Array.from({length:8}).map((_,i)=>(
        <Circ key={i} cx={426+(i%4)*14} cy={i<4?199:211} r={5} fill="#0c0c1c" stroke="#1e1e36"/>
      ))}
      <g style={{animation:'dn_arr 1.5s ease-in-out infinite'}}>
        <Ln x1="454" y1="174" x2="454" y2="190" stroke={K.cyan} strokeWidth="2.5" filter="url(#glowSm)"/>
        <Poly points="448,188 454,198 460,188" fill={K.cyan} filter="url(#glowSm)"/>
      </g>
      <Txt x="414" y="215" fill="#7070a0" fontSize="10" fontFamily="monospace">press until clip</Txt>
      <Txt x="414" y="229" fill="#7070a0" fontSize="10" fontFamily="monospace">audibly CLICKS</Txt>

      {/* Retention clip info box */}
      <Rect x="416" y="252" width="272" height="98" rx="5" fill="#09090f" stroke={K.purple} strokeWidth="1" filter="url(#glowSm)"/>
      <Txt x="426" y="270" fill={K.purple} fontSize="10" fontFamily="monospace" fontWeight="700">↑ RETENTION CLIP</Txt>
      <Txt x="426" y="287" fill={K.silver} fontSize="10" fontFamily="monospace">Black plastic tab on the connector</Txt>
      <Txt x="426" y="302" fill={K.silver} fontSize="10" fontFamily="monospace">Must click — no click = not locked</Txt>
      <Txt x="426" y="317" fill={K.silver} fontSize="10" fontFamily="monospace">To remove: press clip first, then pull</Txt>
      <Txt x="426" y="332" fill={K.silver} fontSize="10" fontFamily="monospace">Same clip as your photos 1+2</Txt>

      <Txt x="408" y="374" fill={K.silver} fontSize="10" fontFamily="monospace">Red wires face OUTWARD</Txt>
      <Txt x="408" y="390" fill={K.silver} fontSize="10" fontFamily="monospace">6+2 split = combine both for 8-pin</Txt>
      <Txt x="408" y="406" fill={K.silver} fontSize="10" fontFamily="monospace">Modern GPU: may use 16-pin instead</Txt>
    </svg>
  );
}

/* ─── STEP 5 — Verify and boot ────────────────────────────────────────── */
function S5(){
  const iso=mkIso(320,110,0.76);
  return(
    <svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:K.bg,display:'block',minHeight:480}}>
      <Defs/>
      <Txt x="14" y="22" fill={K.cyan} fontSize="12" fontFamily="monospace" letterSpacing=".8" filter="url(#glowSm)">✓ INSTALLATION COMPLETE — VERIFY BEFORE BOOT</Txt>
      <Mobo iso={iso}/>
      <Gpu iso={iso}/>
      {(()=>{const{pt}=iso;const l=pt(5,119,190);const r=pt(195,119,190);return(
        <Ln x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke={K.cyan} strokeWidth="5" opacity=".55" filter="url(#glow)" style={{animation:'rgb 2s ease-in-out infinite'}}/>
      );})()}
      {(()=>{const{pt}=iso;const lp=pt(191,111,9);return(
        <Circ cx={lp.x} cy={lp.y} r={8} fill={K.cyan} stroke={K.cyan} strokeWidth="2" filter="url(#glow)" style={{animation:'rgb 1.5s ease-in-out infinite'}}/>
      );})()}
      {(()=>{const{pt}=iso;const pp=pt(160,95,192);return(
        <Circ cx={pp.x} cy={pp.y} r={6} fill={K.rog} filter="url(#glowSm)" opacity=".85"/>
      );})()}
      <Ln x1="420" y1="10" x2="420" y2="470" stroke="#14142a" strokeWidth="1" strokeDasharray="4,3"/>
      <Txt x="432" y="22" fill={K.silver} fontSize="11" fontFamily="monospace" letterSpacing=".8">VERIFY BEFORE BOOT</Txt>
      {[
        {l:'PCIe latch CLOSED',   s:'flush — no tab sticking out', d:'0s'},
        {l:'Bracket SCREWED IN',  s:'no gap against case wall',    d:'.35s'},
        {l:'Power cables CLICKED',s:'clip locked on both connectors',d:'.7s'},
        {l:'Card sits LEVEL',     s:'no wobble from either end',   d:'1.05s'},
        {l:'Install DRIVERS',     s:'nvidia.com or amd.com',       d:'1.4s'},
      ].map((item,i)=>(<g key={i} style={{animation:'slide .4s ease both',animationDelay:item.d}}>
        <Circ cx={446} cy={68+i*52} r={16} fill="#080a18" stroke={K.cyan} strokeWidth="1.5" filter="url(#glowSm)"/>
        <polyline
          points={`437,${68+i*52} 445,${77+i*52} 457,${58+i*52}`}
          style={{fill:'none',stroke:K.cyan,strokeWidth:2.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,strokeDasharray:44,animation:'chk 1.2s ease both',animationDelay:item.d}}
        />
        <Txt x="470" y={63+i*52} fill="#c0c0e0" fontSize="12" fontFamily="monospace" fontWeight="500">{item.l}</Txt>
        <Txt x="470" y={78+i*52} fill={K.silver} fontSize="10" fontFamily="monospace">{item.s}</Txt>
      </g>))}
      <Rect x="430" y="328" width="256" height="54" rx="5" fill="#140808" stroke={K.red} strokeWidth="1" opacity=".9" filter="url(#glowSm)"/>
      <Txt x="442" y="346" fill={K.red} fontSize="10" fontFamily="monospace">No display after boot?</Txt>
      <Txt x="442" y="360" fill={K.silver} fontSize="10" fontFamily="monospace">① Press GPU down again (latch)</Txt>
      <Txt x="442" y="374" fill={K.silver} fontSize="10" fontFamily="monospace">② Re-check power connectors click</Txt>
    </svg>
  );
}

/* ─── STEPS ───────────────────────────────────────────────────────────── */
const steps=[
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
    desc:'Look at the top edge of your GPU (the edge facing up when installed) for power connector ports — your Colorful RTX 3070 uses two 8-pin sockets. Plug the matching cables from your PSU in firmly until the black plastic retention clip clicks into place. Route cables toward the top of the case.',
    tip:'No click on the clip means it is not fully locked. To remove later: press the clip, then pull. Red wires face outward.',
    animated:<S4/>,
  },
  {
    title:'Verify and power on',
    desc:'Before closing the case, confirm: latch is closed flush, bracket has both screws, both power cables are clicked, and the card sits level. Power on — display output confirms success. Then download and install the latest GPU drivers from NVIDIA.',
    tip:'No display? Press GPU down again first, then check power connectors are fully clicked. These cause 90% of installation issues.',
    animated:<S5/>,
  },
];

export default function GpuPage(){
  return(
    <GuideLayout
      title="GPU Installation"
      category="Assembly Guides"
      categoryHref="/#assembly"
      steps={steps}
    />
  );
}
