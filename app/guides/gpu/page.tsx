import GuideLayout from '@/components/GuideLayout';

/* ─── Shared drawing helpers ─── */

// Motherboard PCB base (top-down)
function MoboBase({ x=0, y=0, w=280, h=200 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#0d1a0d" stroke="#1d3d1d" strokeWidth="1.5"/>
      {/* PCB trace lines */}
      {[20,40,60,80,100,120,140,160,180].map(oy=>(
        <line key={oy} x1={x+5} y1={y+oy} x2={x+w-5} y2={y+oy} stroke="#142014" strokeWidth="0.5"/>
      ))}
      {/* CPU socket area */}
      <rect x={x+20} y={y+20} width={60} height={60} rx="2" fill="#1a1a1a" stroke="#555" strokeWidth="1"/>
      <rect x={x+28} y={y+28} width={44} height={44} rx="1" fill="#2a2a1a" stroke="#888" strokeWidth="0.5"/>
      <text x={x+50} y={y+54} fill="#666" fontSize="9" textAnchor="middle" fontFamily="monospace">CPU</text>
      {/* RAM slots */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={x+100+i*18} y={y+20} width="10" height="55" rx="1" fill="#111" stroke="#333" strokeWidth="1"/>
      ))}
      {/* PCIe slots */}
      <rect x={x+10} y={y+100} width={w-20} height="12" rx="1" fill="#0a0a0a" stroke="#00D4FF" strokeWidth="1.2"/>
      <rect x={x+10} y={y+120} width={w-20} height="8" rx="1" fill="#0a0a0a" stroke="#333" strokeWidth="0.8"/>
      <rect x={x+10} y={y+136} width={w-20} height="8" rx="1" fill="#0a0a0a" stroke="#333" strokeWidth="0.8"/>
      {/* Slot contacts */}
      {Array.from({length:22}).map((_,i)=>(
        <rect key={i} x={x+12+i*11} y={y+102} width="5" height="8" rx="0.5" fill="#b8860b" opacity="0.8"/>
      ))}
    </g>
  );
}

// Realistic GPU (side view, horizontal)
function GpuSide({ x=0, y=0, w=320, h=90, glowColor="#00D4FF" }) {
  const fanR = 34;
  const fan1cx = x + 90;
  const fan2cx = x + 220;
  const fcy = y + 45;
  return (
    <g>
      {/* Heatsink body */}
      <rect x={x} y={y} width={w} height={h-20} rx="3" fill="#1c1c1c" stroke="#333" strokeWidth="1.5"/>
      {/* Heatsink fins */}
      {Array.from({length:18}).map((_,i)=>(
        <rect key={i} x={x+20+i*15} y={y+2} width="8" height={h-24} rx="0.5" fill="#2a2a2a" stroke="#222" strokeWidth="0.5"/>
      ))}
      {/* Fan shroud */}
      <rect x={x+5} y={y+5} width={w-10} height={h-30} rx="3" fill="#111111" stroke="#222" strokeWidth="1"/>
      {/* Fan 1 */}
      <circle cx={fan1cx} cy={fcy} r={fanR} fill="#0d0d0d" stroke="#222" strokeWidth="1.5"/>
      <circle cx={fan1cx} cy={fcy} r={fanR-4} fill="#111"/>
      {[0,51,102,153,204,255,306].map((a,i)=>{
        const rad = a*Math.PI/180;
        const rad2 = (a+40)*Math.PI/180;
        return <path key={i}
          d={`M ${fan1cx} ${fcy} L ${fan1cx+fanR*0.85*Math.cos(rad)} ${fcy+fanR*0.85*Math.sin(rad)} A ${fanR*0.85} ${fanR*0.85} 0 0 1 ${fan1cx+fanR*0.85*Math.cos(rad2)} ${fcy+fanR*0.85*Math.sin(rad2)} Z`}
          fill="#1d1d1d" stroke="#333" strokeWidth="0.5"/>
      })}
      <circle cx={fan1cx} cy={fcy} r="8" fill="#0a0a0a" stroke="#333"/>
      {/* Fan 2 */}
      <circle cx={fan2cx} cy={fcy} r={fanR} fill="#0d0d0d" stroke="#222" strokeWidth="1.5"/>
      <circle cx={fan2cx} cy={fcy} r={fanR-4} fill="#111"/>
      {[0,51,102,153,204,255,306].map((a,i)=>{
        const rad = a*Math.PI/180;
        const rad2 = (a+40)*Math.PI/180;
        return <path key={i}
          d={`M ${fan2cx} ${fcy} L ${fan2cx+fanR*0.85*Math.cos(rad)} ${fcy+fanR*0.85*Math.sin(rad)} A ${fanR*0.85} ${fanR*0.85} 0 0 1 ${fan2cx+fanR*0.85*Math.cos(rad2)} ${fcy+fanR*0.85*Math.sin(rad2)} Z`}
          fill="#1d1d1d" stroke="#333" strokeWidth="0.5"/>
      })}
      <circle cx={fan2cx} cy={fcy} r="8" fill="#0a0a0a" stroke="#333"/>
      {/* PCB bottom strip with contacts */}
      <rect x={x} y={y+h-22} width={w-50} height="22" rx="0" fill="#162316" stroke="#1d3d1d" strokeWidth="1"/>
      {Array.from({length:30}).map((_,i)=>(
        <rect key={i} x={x+5+i*10} y={y+h-16} width="5" height="14" rx="0.5" fill="#c8a000"/>
      ))}
      {/* Bracket on left */}
      <rect x={x} y={y} width="14" height={h+8} rx="1" fill="#2a2a3a" stroke="#555" strokeWidth="1"/>
      <circle cx={x+7} cy={y+15} r="4" fill="#111" stroke="#666"/>
      <circle cx={x+7} cy={y+h-10} r="4" fill="#111" stroke="#666"/>
      {/* Power connectors on top-right */}
      <rect x={x+w-48} y={y-12} width="20" height="14" rx="1" fill="#222" stroke="#555"/>
      <rect x={x+w-24} y={y-12} width="20" height="14" rx="1" fill="#222" stroke="#555"/>
      {/* Glow under GPU */}
      <rect x={x+14} y={y+h+2} width={w-64} height="3" rx="1.5" fill={glowColor} opacity="0.4"/>
    </g>
  );
}

/* ─── Step animations ─── */

function Step1() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes latch_swing {
            0%,30%{transform:rotate(0deg);}
            65%,100%{transform:rotate(-50deg);}
          }
          @keyframes arrow_bounce {
            0%,100%{transform:translateX(0);opacity:0.5;}
            50%{transform:translateX(8px);opacity:1;}
          }
          @keyframes slot_pulse {
            0%,100%{stroke-opacity:0.5;}
            50%{stroke-opacity:1;}
          }
          .latch-anim{animation:latch_swing 2.8s ease-in-out infinite;transform-origin:594px 180px;}
          .push-arrow{animation:arrow_bounce 1.4s ease-in-out infinite;}
          .slot-glow{animation:slot_pulse 2s ease-in-out infinite;}
        `}</style>
      </defs>

      {/* LEFT PANEL — full motherboard overview */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">MOTHERBOARD OVERVIEW</text>
      <MoboBase x={10} y={30} w={270} h={260}/>
      {/* Highlight PCIe slot on overview */}
      <rect x="20" y="130" width="250" height="12" rx="1" fill="none" stroke="#00D4FF" strokeWidth="2" opacity="0.8" className="slot-glow"/>
      <text x="20" y="158" fill="#00D4FF" fontSize="10" fontFamily="monospace">← PCIe x16 (top slot)</text>
      {/* Arrow pointing to detail panel */}
      <polygon points="285,145 300,148 285,151" fill="#00D4FF" opacity="0.7"/>

      {/* DIVIDER */}
      <line x1="305" y1="20" x2="305" y2="300" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,4"/>

      {/* RIGHT PANEL — close-up of latch */}
      <text x="315" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">LATCH CLOSE-UP</text>
      {/* Slot body */}
      <rect x="315" y="140" width="280" height="32" rx="3" fill="#0a0a14" stroke="#00D4FF" strokeWidth="1.5"/>
      {/* Slot contacts detail */}
      {Array.from({length:18}).map((_,i)=>(
        <rect key={i} x={320+i*12} y={144} width="7" height="24" rx="1" fill="#c8a000" opacity="0.8"/>
      ))}
      {/* Latch body */}
      <rect x="570" y="148" width="28" height="18" rx="3" fill="#2a2a4a" stroke="#555" strokeWidth="1"/>
      {/* Latch tab — ANIMATES */}
      <g className="latch-anim">
        <rect x="574" y="168" width="20" height="10" rx="2" fill="#4a4a8a" stroke="#00D4FF" strokeWidth="1.2"/>
        <rect x="576" y="170" width="16" height="6" rx="1" fill="#00D4FF" opacity="0.5"/>
      </g>
      {/* Push arrow */}
      <g className="push-arrow">
        <line x1="548" y1="190" x2="566" y2="190" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points="563,187 570,190 563,193" fill="#00D4FF"/>
        <text x="510" y="208" fill="#00D4FF" fontSize="11" fontFamily="monospace">push outward →</text>
      </g>
      {/* Labels */}
      <line x1="584" y1="135" x2="584" y2="148" stroke="#666" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="560" y="130" fill="#9CA3AF" fontSize="10" fontFamily="monospace">latch tab</text>
      <text x="315" y="210" fill="#6B7280" fontSize="11" fontFamily="monospace">Slot end — push tab outward to unlock</text>
      <text x="315" y="225" fill="#6B7280" fontSize="11" fontFamily="monospace">You will feel/hear a soft click</text>
    </svg>
  );
}

function Step2() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes gpu_lower {
            0%,15%{transform:translateY(-55px);}
            55%,100%{transform:translateY(0);}
          }
          @keyframes guide_blink {
            0%,100%{opacity:0.3;}50%{opacity:0.9;}
          }
          @keyframes fan_spin {
            from{transform:rotate(0deg);}to{transform:rotate(360deg);}
          }
          .gpu-lowering{animation:gpu_lower 3s ease-in-out infinite;}
          .guide-dash{animation:guide_blink 1.8s ease-in-out infinite;}
          .fspin1{animation:fan_spin 1.5s linear infinite;transform-origin:150px 52px;}
          .fspin2{animation:fan_spin 1.5s linear infinite;transform-origin:265px 52px;}
        `}</style>
      </defs>

      {/* LEFT — context mobo */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">OVERVIEW</text>
      <MoboBase x={10} y={30} w={200} h={200}/>
      <text x="20" y="250" fill="#00D4FF" fontSize="10" fontFamily="monospace">↑ GPU goes here</text>
      <polygon points="95,232 98,240 92,240" fill="#00D4FF"/>

      {/* DIVIDER */}
      <line x1="220" y1="20" x2="220" y2="300" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,4"/>

      {/* RIGHT — main GPU lowering view */}
      <text x="230" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">ALIGNMENT VIEW — SIDE PROFILE</text>

      {/* Motherboard edge */}
      <rect x="230" y="230" width="380" height="14" rx="2" fill="#0d1a0d" stroke="#1d3d1d" strokeWidth="1.5"/>
      {/* PCIe slot */}
      <rect x="240" y="210" width="340" height="22" rx="2" fill="#0a0a14" stroke="#00D4FF" strokeWidth="1.5"/>
      {Array.from({length:22}).map((_,i)=>(
        <rect key={i} x={244+i*12} y={213} width="7" height="16" rx="0.5" fill="#c8a000" opacity="0.8"/>
      ))}
      {/* Latch (open) */}
      <rect x="563" y="208" width="14" height="16" rx="2" fill="#4a4a8a" stroke="#00D4FF"/>

      {/* GPU coming down */}
      <g className="gpu-lowering">
        {/* GPU PCB */}
        <rect x="240" y="120" width="300" height="80" rx="3" fill="#162316" stroke="#2d5d2d" strokeWidth="1.5"/>
        {/* Fans */}
        <g>
          <circle cx="330" cy="160" r="32" fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
          <circle cx="330" cy="160" r="26" fill="#111"/>
          {[0,51,102,153,204,255,306].map((a,i)=>{
            const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
            return <path key={i} d={`M 330 160 L ${330+22*Math.cos(r)} ${160+22*Math.sin(r)} A 22 22 0 0 1 ${330+22*Math.cos(r2)} ${160+22*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
          })}
          <circle cx="330" cy="160" r="7" fill="#0a0a0a" stroke="#2a2a2a"/>
        </g>
        <g>
          <circle cx="450" cy="160" r="32" fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
          <circle cx="450" cy="160" r="26" fill="#111"/>
          {[0,51,102,153,204,255,306].map((a,i)=>{
            const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
            return <path key={i} d={`M 450 160 L ${450+22*Math.cos(r)} ${160+22*Math.sin(r)} A 22 22 0 0 1 ${450+22*Math.cos(r2)} ${160+22*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
          })}
          <circle cx="450" cy="160" r="7" fill="#0a0a0a" stroke="#2a2a2a"/>
        </g>
        {/* Bracket on left */}
        <rect x="240" y="120" width="12" height="92" rx="1" fill="#2a2a3a" stroke="#555"/>
        {/* Gold contacts on bottom */}
        {Array.from({length:22}).map((_,i)=>(
          <rect key={i} x={254+i*12} y={192} width="7" height="12" rx="0.5" fill="#c8a000"/>
        ))}
        {/* Power connectors on top */}
        <rect x="510" y="122" width="16" height="20" rx="1" fill="#222" stroke="#555"/>
        <rect x="530" y="122" width="16" height="20" rx="1" fill="#222" stroke="#555"/>
      </g>

      {/* Guide lines */}
      <line className="guide-dash" x1="252" y1="120" x2="252" y2="210" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,3"/>
      <line className="guide-dash" x1="540" y1="120" x2="540" y2="210" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Labels */}
      <text x="230" y="280" fill="#6B7280" fontSize="11" fontFamily="monospace">Contacts face DOWN  ·  Bracket aligns LEFT  ·  Lower straight in</text>
    </svg>
  );
}

function Step3() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes gpu_press {
            0%,15%{transform:translateY(-16px);}
            50%,60%{transform:translateY(2px);}
            65%,100%{transform:translateY(0);}
          }
          @keyframes latch_snap {
            0%,40%{transform:rotate(-45deg);}
            70%,100%{transform:rotate(0deg);}
          }
          @keyframes click_pop {
            0%,55%{opacity:0;transform:scale(0.4);}
            70%{opacity:1;transform:scale(1.15);}
            85%,100%{opacity:0;transform:scale(1);}
          }
          @keyframes press_arrows {
            0%,100%{opacity:0.3;transform:translateY(-3px);}
            50%{opacity:1;transform:translateY(0);}
          }
          .gpu-press{animation:gpu_press 3s ease-in-out infinite;}
          .latch-snapping{animation:latch_snap 3s ease-in-out infinite;transform-origin:568px 195px;}
          .click-pop{animation:click_pop 3s ease-in-out infinite;}
          .press-arr{animation:press_arrows 1.5s ease-in-out infinite;}
        `}</style>
      </defs>

      {/* LEFT context */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">OVERVIEW</text>
      <MoboBase x={10} y={30} w={200} h={200}/>
      <text x="14" y="250" fill="#9CA3AF" fontSize="10" fontFamily="monospace">Press evenly — both ends</text>

      {/* DIVIDER */}
      <line x1="220" y1="20" x2="220" y2="300" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,4"/>

      {/* RIGHT — pressing view */}
      <text x="230" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">INSERTION — FRONT VIEW</text>

      {/* Slot */}
      <rect x="240" y="200" width="340" height="22" rx="2" fill="#0a0a14" stroke="#00D4FF" strokeWidth="1.5"/>
      {Array.from({length:22}).map((_,i)=>(
        <rect key={i} x={244+i*12} y={203} width="7" height="16" rx="0.5" fill="#c8a000" opacity="0.8"/>
      ))}
      {/* Mobo PCB */}
      <rect x="230" y="220" width="380" height="12" rx="2" fill="#0d1a0d" stroke="#1d3d1d"/>
      {/* Latch snapping shut */}
      <g className="latch-snapping">
        <rect x="560" y="202" width="16" height="14" rx="2" fill="#00D4FF" opacity="0.85" stroke="#00D4FF"/>
      </g>

      {/* GPU pressing down */}
      <g className="gpu-press">
        {/* PCB */}
        <rect x="240" y="115" width="300" height="80" rx="3" fill="#162316" stroke="#2d5d2d" strokeWidth="1.5"/>
        {/* Fan 1 */}
        <circle cx="330" cy="155" r="32" fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
        <circle cx="330" cy="155" r="25" fill="#111"/>
        {[0,51,102,153,204,255,306].map((a,i)=>{
          const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
          return <path key={i} d={`M 330 155 L ${330+21*Math.cos(r)} ${155+21*Math.sin(r)} A 21 21 0 0 1 ${330+21*Math.cos(r2)} ${155+21*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
        })}
        <circle cx="330" cy="155" r="6" fill="#0a0a0a"/>
        {/* Fan 2 */}
        <circle cx="450" cy="155" r="32" fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
        <circle cx="450" cy="155" r="25" fill="#111"/>
        {[0,51,102,153,204,255,306].map((a,i)=>{
          const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
          return <path key={i} d={`M 450 155 L ${450+21*Math.cos(r)} ${155+21*Math.sin(r)} A 21 21 0 0 1 ${450+21*Math.cos(r2)} ${155+21*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
        })}
        <circle cx="450" cy="155" r="6" fill="#0a0a0a"/>
        {/* Bracket */}
        <rect x="240" y="115" width="12" height="90" rx="1" fill="#2a2a3a" stroke="#555"/>
        {/* Contacts */}
        {Array.from({length:22}).map((_,i)=>(
          <rect key={i} x={254+i*12} y={187} width="7" height="12" rx="0.5" fill="#c8a000"/>
        ))}
        {/* Press arrows */}
        <g className="press-arr">
          <line x1="330" y1="95" x2="330" y2="112" stroke="#00D4FF" strokeWidth="2.5"/>
          <polygon points="324,110 330,120 336,110" fill="#00D4FF"/>
          <line x1="450" y1="95" x2="450" y2="112" stroke="#00D4FF" strokeWidth="2.5"/>
          <polygon points="444,110 450,120 456,110" fill="#00D4FF"/>
        </g>
      </g>

      {/* CLICK badge */}
      <g className="click-pop">
        <rect x="350" y="215" width="70" height="28" rx="14" fill="#00D4FF"/>
        <text x="385" y="234" fill="#0A0A0F" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">CLICK ✓</text>
      </g>

      <text x="230" y="270" fill="#6B7280" fontSize="11" fontFamily="monospace">Press both ends evenly — listen for the latch click</text>
      <text x="230" y="285" fill="#6B7280" fontSize="11" fontFamily="monospace">Card should sit perfectly level with zero wobble</text>
    </svg>
  );
}

function Step4() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes screw_rotate {
            0%{transform:rotate(0deg);}100%{transform:rotate(720deg);}
          }
          @keyframes driver_push {
            0%,20%{transform:translate(0,0);}
            40%,70%{transform:translate(4px,4px);}
            90%,100%{transform:translate(0,0);}
          }
          .s1{animation:screw_rotate 2.5s linear infinite;transform-origin:72px 128px;}
          .s2{animation:screw_rotate 2.5s linear infinite 0.5s;transform-origin:72px 218px;}
          .screwdriver{animation:driver_push 2.5s ease-in-out infinite;}
        `}</style>
      </defs>

      {/* LEFT — case/bracket context */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">PC CASE — BACK PANEL VIEW</text>

      {/* Case back wall */}
      <rect x="20" y="30" width="260" height="260" rx="4" fill="#111" stroke="#333" strokeWidth="2"/>
      {/* Expansion slot openings */}
      <rect x="50" y="90" width="30" height="200" rx="2" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
      {/* Bracket plate (GPU mounted) */}
      <rect x="55" y="95" width="22" height="190" rx="1" fill="#2a2a3a" stroke="#888" strokeWidth="1"/>
      {/* GPU back plate visible */}
      <rect x="78" y="100" width="180" height="80" rx="2" fill="#1a1a1a" stroke="#333"/>
      <text x="90" y="145" fill="#444" fontSize="12" fontFamily="monospace">GPU rear</text>
      {/* Display outputs on bracket */}
      <rect x="57" y="110" width="18" height="8" rx="1" fill="#333" stroke="#555"/>
      <rect x="57" y="122" width="18" height="8" rx="1" fill="#333" stroke="#555"/>
      <rect x="57" y="134" width="18" height="14" rx="1" fill="#333" stroke="#555"/>
      <rect x="57" y="152" width="18" height="8" rx="1" fill="#333" stroke="#555"/>
      {/* Screw hole 1 */}
      <circle cx="72" cy="105" r="7" fill="#0a0a0a" stroke="#666" strokeWidth="1.5"/>
      <g className="s1">
        <line x1="65" y1="105" x2="79" y2="105" stroke="#aaa" strokeWidth="2"/>
        <line x1="72" y1="98" x2="72" y2="112" stroke="#aaa" strokeWidth="2"/>
      </g>
      {/* Screw hole 2 */}
      <circle cx="72" cy="270" r="7" fill="#0a0a0a" stroke="#666" strokeWidth="1.5"/>
      <g className="s2">
        <line x1="65" y1="270" x2="79" y2="270" stroke="#aaa" strokeWidth="2"/>
        <line x1="72" y1="263" x2="72" y2="277" stroke="#aaa" strokeWidth="2"/>
      </g>
      <text x="30" y="295" fill="#9CA3AF" fontSize="10" fontFamily="monospace">2 screws — top and bottom of bracket</text>

      {/* DIVIDER */}
      <line x1="290" y1="20" x2="290" y2="300" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,4"/>

      {/* RIGHT — screwdriver detail */}
      <text x="300" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">DETAIL — SCREW INSTALLATION</text>

      {/* Bracket section */}
      <rect x="310" y="100" width="24" height="160" rx="1" fill="#2a2a3a" stroke="#888" strokeWidth="1.5"/>
      {/* Case wall */}
      <rect x="300" y="100" width="12" height="160" rx="1" fill="#1a1a1a" stroke="#555"/>

      {/* Screw + driver detail */}
      <circle cx="322" cy="145" r="10" fill="#111" stroke="#888" strokeWidth="2"/>
      <circle cx="322" cy="145" r="5" fill="#0a0a0a" stroke="#aaa"/>
      <g className="s1">
        <line x1="314" y1="145" x2="330" y2="145" stroke="#ccc" strokeWidth="2.5"/>
        <line x1="322" y1="137" x2="322" y2="153" stroke="#ccc" strokeWidth="2.5"/>
      </g>

      {/* Screwdriver */}
      <g className="screwdriver">
        <rect x="350" y="80" width="12" height="55" rx="3" fill="#e0e0e0" stroke="#aaa"/>
        <rect x="353" y="135" width="6" height="20" rx="0" fill="#888"/>
        <line x1="354" y1="155" x2="356" y2="155" stroke="#555" strokeWidth="2"/>
        <line x1="356" y1="153" x2="356" y2="157" stroke="#555" strokeWidth="2"/>
      </g>

      {/* Instructions */}
      <text x="300" y="200" fill="#9CA3AF" fontSize="11" fontFamily="monospace">① Finger-tight first</text>
      <text x="300" y="218" fill="#9CA3AF" fontSize="11" fontFamily="monospace">② Then 1/4 turn with screwdriver</text>
      <text x="300" y="236" fill="#9CA3AF" fontSize="11" fontFamily="monospace">③ Do NOT overtighten</text>
      <text x="300" y="270" fill="#6B7280" fontSize="11" fontFamily="monospace">Bracket must sit flush — no gap</text>
      <text x="300" y="286" fill="#6B7280" fontSize="11" fontFamily="monospace">between bracket and case wall</text>
    </svg>
  );
}

function Step5() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes plug_in {
            0%,20%{transform:translateY(-40px);}
            60%,100%{transform:translateY(0);}
          }
          @keyframes clip_flash {
            0%,55%{fill:#333;}
            70%,100%{fill:#00D4FF;}
          }
          .plug8{animation:plug_in 3s ease-in-out infinite;}
          .plug6{animation:plug_in 3s ease-in-out infinite 0.5s;}
          .clip{animation:clip_flash 3s ease-in-out infinite;}
        `}</style>
      </defs>

      {/* LEFT — gpu front view showing connectors */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">GPU — TOP EDGE (where power connects)</text>

      {/* GPU PCB from front/above */}
      <rect x="15" y="60" width="260" height="180" rx="4" fill="#162316" stroke="#2d5d2d" strokeWidth="2"/>
      {/* Fans on front face */}
      <circle cx="90" cy="150" r="55" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="90" cy="150" r="44" fill="#111"/>
      {[0,51,102,153,204,255,306].map((a,i)=>{
        const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
        return <path key={i} d={`M 90 150 L ${90+37*Math.cos(r)} ${150+37*Math.sin(r)} A 37 37 0 0 1 ${90+37*Math.cos(r2)} ${150+37*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
      })}
      <circle cx="90" cy="150" r="10" fill="#0a0a0a"/>
      <circle cx="200" cy="150" r="45" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="200" cy="150" r="35" fill="#111"/>
      {[0,51,102,153,204,255,306].map((a,i)=>{
        const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
        return <path key={i} d={`M 200 150 L ${200+29*Math.cos(r)} ${150+29*Math.sin(r)} A 29 29 0 0 1 ${200+29*Math.cos(r2)} ${150+29*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
      })}
      <circle cx="200" cy="150" r="8" fill="#0a0a0a"/>

      {/* Power port receptacles on TOP of GPU */}
      {/* 8-pin port */}
      <rect x="30" y="40" width="44" height="22" rx="2" fill="#111" stroke="#555" strokeWidth="1.5"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={36+(i%4)*10} cy={Math.floor(i/4)===0?47:56} r="3" fill="#0a0a0a" stroke="#444"/>
      ))}
      <text x="37" y="34" fill="#9CA3AF" fontSize="9" fontFamily="monospace">8-pin</text>

      {/* 6-pin port */}
      <rect x="82" y="40" width="34" height="22" rx="2" fill="#111" stroke="#555" strokeWidth="1.5"/>
      {Array.from({length:6}).map((_,i)=>(
        <circle key={i} cx={88+(i%3)*10} cy={Math.floor(i/3)===0?47:56} r="3" fill="#0a0a0a" stroke="#444"/>
      ))}
      <text x="86" y="34" fill="#9CA3AF" fontSize="9" fontFamily="monospace">6-pin</text>

      {/* DIVIDER */}
      <line x1="285" y1="20" x2="285" y2="300" stroke="#1E1E2E" strokeWidth="1" strokeDasharray="4,4"/>

      {/* RIGHT — cable detail */}
      <text x="295" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">CABLE — WHAT IT LOOKS LIKE</text>

      {/* 8-pin connector */}
      <g className="plug8">
        {/* Connector body */}
        <rect x="310" y="80" width="50" height="28" rx="2" fill="#e53e3e" stroke="#c53030" strokeWidth="1.5"/>
        {/* Pins inside */}
        {Array.from({length:8}).map((_,i)=>(
          <circle key={i} cx={317+(i%4)*11} cy={Math.floor(i/4)===0?88:96} r="3.5" fill="#fed7d7" stroke="#c53030"/>
        ))}
        {/* Clip */}
        <rect className="clip" x="330" y="106" width="10" height="6" rx="1"/>
        {/* Cable wires */}
        {Array.from({length:8}).map((_,i)=>(
          <line key={i} x1={317+(i%4)*11} y1="80" x2={315+(i%4)*11} y2="50"
            stroke={i<4?'#e53e3e':'#1a1a1a'} strokeWidth="3"/>
        ))}
        <text x="310" y="46" fill="#e53e3e" fontSize="11" fontFamily="monospace">8-pin cable</text>
      </g>

      {/* 6-pin connector */}
      <g className="plug6">
        <rect x="380" y="80" width="40" height="28" rx="2" fill="#e53e3e" stroke="#c53030" strokeWidth="1.5"/>
        {Array.from({length:6}).map((_,i)=>(
          <circle key={i} cx={387+(i%3)*11} cy={Math.floor(i/3)===0?88:96} r="3.5" fill="#fed7d7" stroke="#c53030"/>
        ))}
        <rect className="clip" x="396" y="106" width="8" height="6" rx="1"/>
        {Array.from({length:6}).map((_,i)=>(
          <line key={i} x1={387+(i%3)*11} y1="80" x2={386+(i%3)*11} y2="50"
            stroke={i<3?'#e53e3e':'#1a1a1a'} strokeWidth="3"/>
        ))}
        <text x="375" y="46" fill="#e53e3e" fontSize="11" fontFamily="monospace">6-pin</text>
      </g>

      {/* GPU port on right */}
      <rect x="310" y="170" width="50" height="28" rx="2" fill="#111" stroke="#555" strokeWidth="1.5"/>
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={317+(i%4)*11} cy={Math.floor(i/4)===0?178:186} r="3.5" fill="#0a0a0a" stroke="#444"/>
      ))}
      <rect x="380" y="170" width="40" height="28" rx="2" fill="#111" stroke="#555" strokeWidth="1.5"/>
      {Array.from({length:6}).map((_,i)=>(
        <circle key={i} cx={387+(i%3)*11} cy={Math.floor(i/3)===0?178:186} r="3.5" fill="#0a0a0a" stroke="#444"/>
      ))}
      <text x="305" y="220" fill="#9CA3AF" fontSize="11" fontFamily="monospace">GPU ports ↑  ·  press until clip clicks</text>
      <text x="295" y="270" fill="#6B7280" fontSize="11" fontFamily="monospace">Modern GPUs may use a single 16-pin connector</text>
      <text x="295" y="285" fill="#6B7280" fontSize="11" fontFamily="monospace">Refer to your GPU manual for exact connector type</text>
    </svg>
  );
}

function Step6() {
  return (
    <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'600px',display:'block'}}>
      <defs>
        <style>{`
          @keyframes check_stroke {
            0%{stroke-dashoffset:80;}60%,100%{stroke-dashoffset:0;}
          }
          @keyframes item_appear {
            0%,var(--d){opacity:0;transform:translateX(-8px);}
            calc(var(--d) + 20%),100%{opacity:1;transform:translateX(0);}
          }
          @keyframes glow_breathe {
            0%,100%{opacity:0.2;}50%{opacity:0.7;}
          }
          .chk{stroke-dasharray:80;animation:check_stroke 2s ease 0.5s forwards infinite;}
          .glow-bar{animation:glow_breathe 2s ease-in-out infinite;}
        `}</style>
      </defs>

      {/* Full GPU-in-motherboard view */}
      <text x="10" y="20" fill="#6B7280" fontSize="11" fontFamily="monospace">COMPLETED INSTALLATION</text>

      {/* Motherboard */}
      <rect x="10" y="35" width="600" height="200" rx="4" fill="#0d1a0d" stroke="#1d3d1d" strokeWidth="1.5"/>
      {/* CPU */}
      <rect x="30" y="50" width="70" height="70" rx="2" fill="#1a1a1a" stroke="#555"/>
      <rect x="40" y="60" width="50" height="50" rx="1" fill="#2a2a1a" stroke="#888" strokeWidth="0.5"/>
      <text x="65" y="89" fill="#666" fontSize="9" textAnchor="middle" fontFamily="monospace">CPU</text>
      {/* RAM */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={125+i*20} y={50} width="12" height="70" rx="1" fill="#111" stroke="#333"/>
      ))}
      {/* PCIe slot (occupied) */}
      <rect x="10" y="145" width="600" height="18" rx="2" fill="#0a0a14" stroke="#00D4FF" strokeWidth="1.5"/>
      {/* Latch CLOSED highlighted */}
      <rect x="590" y="148" width="14" height="12" rx="2" fill="#00D4FF"/>

      {/* GPU sitting in slot */}
      <rect x="20" y="65" width="570" height="80" rx="3" fill="#162316" stroke="#2d5d2d" strokeWidth="1.5"/>
      {/* Fans */}
      {[130,280,420].map(cx=>(
        <g key={cx}>
          <circle cx={cx} cy={105} r={32} fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
          <circle cx={cx} cy={105} r={25} fill="#111"/>
          {[0,51,102,153,204,255,306].map((a,i)=>{
            const r=a*Math.PI/180; const r2=(a+40)*Math.PI/180;
            return <path key={i} d={`M ${cx} 105 L ${cx+21*Math.cos(r)} ${105+21*Math.sin(r)} A 21 21 0 0 1 ${cx+21*Math.cos(r2)} ${105+21*Math.sin(r2)} Z`} fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="0.5"/>;
          })}
          <circle cx={cx} cy={105} r={6} fill="#0a0a0a"/>
        </g>
      ))}
      {/* Bracket */}
      <rect x="20" y="65" width="14" height="100" rx="1" fill="#2a2a3a" stroke="#888"/>
      <circle cx="27" cy="80" r="4" fill="#111" stroke="#aaa"/>
      <circle cx="27" cy="155" r="4" fill="#111" stroke="#aaa"/>
      {/* Power cables */}
      <rect x="540" y="55" width="20" height="18" rx="1" fill="#e53e3e" stroke="#c53030"/>
      <rect x="565" y="55" width="18" height="18" rx="1" fill="#e53e3e" stroke="#c53030"/>

      {/* Glow line */}
      <rect className="glow-bar" x="36" y="143" width="548" height="4" rx="2" fill="#00D4FF"/>

      {/* Checklist */}
      <rect x="10" y="250" width="600" height="60" rx="4" fill="#0D1F2D" stroke="#00D4FF" strokeWidth="0.5" opacity="0.8"/>
      {[
        {x:30, label:'Latch CLOSED'},
        {x:190, label:'Bracket screwed'},
        {x:360, label:'Power connected'},
        {x:510, label:'Card level'},
      ].map((item,i)=>(
        <g key={i}>
          <circle cx={item.x+10} cy={280} r="10" fill="#0a1a0a" stroke="#00D4FF" strokeWidth="1.5"/>
          <polyline className="chk" points={`${item.x+4},280 ${item.x+9},286 ${item.x+18},272`}
            fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <text x={item.x+26} y={284} fill="#9CA3AF" fontSize="11" fontFamily="monospace">{item.label}</text>
        </g>
      ))}
    </svg>
  );
}

const steps = [
  {
    title: 'Open the PCIe latch',
    desc: 'Locate the PCIe x16 slot on your motherboard — the longest horizontal slot, usually the topmost one. At the right end sits a small plastic latch tab. Push it outward (away from the slot body) until it clicks open. This lets the GPU seat and lock properly.',
    tip: 'The latch is small and easy to miss. Look at the right end of the slot — it sticks out slightly. A soft click tells you it is open.',
    animated: <Step1/>,
  },
  {
    title: 'Align GPU above the PCIe slot',
    desc: 'Hold the GPU with both hands, one on each end. Position it directly above the slot with gold contacts facing down toward the motherboard. The metal bracket plate on the left side should align with the case expansion slot opening. Do not tilt — keep it perfectly horizontal.',
    tip: 'If the contacts do not line up with the slot, rotate the GPU 180°. It only fits one orientation.',
    animated: <Step2/>,
  },
  {
    title: 'Press down firmly until the latch clicks',
    desc: 'Apply firm, even downward pressure along the full length of the card — press both the left and right ends simultaneously. You will hear and feel a definitive click when the PCIe latch engages and locks. The card should now sit perfectly level with no visible gap or wobble.',
    tip: 'It requires more force than most people expect for the first time. If the card wobbles or sits high on one end, it is not fully seated — press again.',
    animated: <Step3/>,
  },
  {
    title: 'Secure the bracket with screws',
    desc: 'The metal bracket at the left end of the GPU slides into your PC case expansion slot opening and must be screwed to the case. Most GPUs need 2 screws — one at the top and one at the bottom of the bracket. Use the thumbscrews or screws that came with your case.',
    tip: 'Start finger-tight to make sure the bracket sits flush with no gap against the case wall, then snug down with a screwdriver. Never overtighten — the bracket is thin metal.',
    animated: <Step4/>,
  },
  {
    title: 'Connect PCIe power cables',
    desc: 'Look at the top edge of the GPU for power connector ports — they will be 6-pin or 8-pin sockets (or a modern 16-pin on newer GPUs). Plug the matching connectors from your PSU into these ports. Each connector has a plastic clip that audibly clicks when fully inserted.',
    tip: 'If your GPU has an 8-pin port and your PSU cable is a 6+2 split, combine both halves — they are designed to work together. Red wires go in, cable runs toward the top of the case.',
    animated: <Step5/>,
  },
  {
    title: 'Verify and power on',
    desc: 'Before closing the case, check all four things: PCIe latch is closed flush, bracket is screwed to the case with no gap, all power cables are clicked in, and the card sits level. Power on — if you get display output, the GPU is installed. Then download and install the latest drivers from NVIDIA or AMD.',
    tip: 'No display after boot? Check the latch first (press GPU down again), then check power connectors. 90% of GPU installation problems are one of those two.',
    animated: <Step6/>,
  },
];

export default function GpuGuidePage() {
  return (
    <GuideLayout
      title="GPU Installation"
      category="Assembly Guides"
      categoryHref="/#assembly"
      steps={steps}
    />
  );
}
