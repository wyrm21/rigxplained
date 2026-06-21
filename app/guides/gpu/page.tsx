import GuideLayout from '@/components/GuideLayout';

const s = (id: string) => `
  <style>
    @keyframes ${id}_anim {
      0%,100%{opacity:1}
    }
  </style>
`;

function Step1Anim() {
  return (
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes latch_open {
            0%,30%{transform:rotate(0deg);transform-origin:490px 160px;}
            60%,100%{transform:rotate(-45deg);transform-origin:490px 160px;}
          }
          @keyframes arrow_pulse {
            0%,100%{opacity:0.3;transform:translateX(0)}
            50%{opacity:1;transform:translateX(6px)}
          }
          .latch-tab{animation:latch_open 2.5s ease-in-out infinite;}
          .arrow-hint{animation:arrow_pulse 1.5s ease-in-out infinite;}
        `}</style>
      </defs>
      {/* Motherboard surface */}
      <rect x="60" y="80" width="400" height="140" rx="4" fill="#1a1a2e" stroke="#2d2d4e" strokeWidth="1.5"/>
      {/* PCB texture lines */}
      <line x1="60" y1="100" x2="460" y2="100" stroke="#2d2d4e" strokeWidth="0.5"/>
      <line x1="60" y1="200" x2="460" y2="200" stroke="#2d2d4e" strokeWidth="0.5"/>
      {/* PCIe slot body */}
      <rect x="80" y="140" width="400" height="20" rx="2" fill="#0a0a1a" stroke="#00D4FF" strokeWidth="1" opacity="0.8"/>
      {/* Slot contacts */}
      {Array.from({length:28}).map((_,i)=>(
        <rect key={i} x={85+i*11} y={143} width="5" height="14" rx="1" fill="#b8860b" opacity="0.7"/>
      ))}
      {/* Latch tab - animates open */}
      <g className="latch-tab">
        <rect x="462" y="145" width="16" height="12" rx="2" fill="#4a4a6a" stroke="#00D4FF" strokeWidth="1"/>
        <rect x="464" y="148" width="12" height="6" rx="1" fill="#2a2a4a"/>
      </g>
      {/* Arrow showing direction to push latch */}
      <g className="arrow-hint">
        <line x1="445" y1="195" x2="465" y2="195" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4,3"/>
        <polygon points="465,192 472,195 465,198" fill="#00D4FF"/>
        <text x="400" y="220" fill="#00D4FF" fontSize="11" fontFamily="sans-serif">Push latch →</text>
      </g>
      {/* Label */}
      <text x="80" y="260" fill="#6B7280" fontSize="12" fontFamily="sans-serif">PCIe x16 slot — Latch at right end</text>
      <text x="80" y="75" fill="#9CA3AF" fontSize="13" fontFamily="sans-serif" fontWeight="500">Motherboard PCIe Slot</text>
    </svg>
  );
}

function Step2Anim() {
  return (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes gpu_descend {
            0%,15%{transform:translateY(-60px);}
            55%,100%{transform:translateY(0px);}
          }
          @keyframes guide_fade {
            0%,100%{opacity:0.4;}50%{opacity:1;}
          }
          .gpu-body{animation:gpu_descend 3s ease-in-out infinite;}
          .guide-line{animation:guide_fade 2s ease-in-out infinite;}
        `}</style>
      </defs>
      {/* Slot on mobo */}
      <rect x="60" y="200" width="420" height="20" rx="2" fill="#0a0a1a" stroke="#00D4FF" strokeWidth="1" opacity="0.8"/>
      {Array.from({length:28}).map((_,i)=>(
        <rect key={i} x={65+i*11} y={203} width="5" height="14" rx="1" fill="#b8860b" opacity="0.7"/>
      ))}
      {/* GPU descending */}
      <g className="gpu-body">
        {/* GPU PCB */}
        <rect x="70" y="100" width="350" height="80" rx="4" fill="#1a2a1a" stroke="#2d4d2d" strokeWidth="1.5"/>
        {/* GPU chip */}
        <rect x="180" y="115" width="80" height="50" rx="3" fill="#0d0d0d" stroke="#444" strokeWidth="1"/>
        <rect x="195" y="128" width="50" height="26" rx="2" fill="#1a1a1a"/>
        {/* Fans */}
        <circle cx="150" cy="140" r="28" fill="#111" stroke="#333" strokeWidth="1.5"/>
        <circle cx="150" cy="140" r="20" fill="#0d0d0d"/>
        {[0,60,120,180,240,300].map((a,i)=>(
          <line key={i} x1="150" y1="140"
            x2={150+18*Math.cos(a*Math.PI/180)}
            y2={140+18*Math.sin(a*Math.PI/180)}
            stroke="#2d2d2d" strokeWidth="6" strokeLinecap="round"/>
        ))}
        <circle cx="350" cy="140" r="28" fill="#111" stroke="#333" strokeWidth="1.5"/>
        <circle cx="350" cy="140" r="20" fill="#0d0d0d"/>
        {[0,60,120,180,240,300].map((a,i)=>(
          <line key={i} x1="350" y1="140"
            x2={350+18*Math.cos(a*Math.PI/180)}
            y2={140+18*Math.sin(a*Math.PI/180)}
            stroke="#2d2d2d" strokeWidth="6" strokeLinecap="round"/>
        ))}
        {/* Gold contacts */}
        {Array.from({length:28}).map((_,i)=>(
          <rect key={i} x={65+i*11} y={176} width="5" height="14" rx="1" fill="#b8860b"/>
        ))}
        {/* Power connectors on top */}
        <rect x="380" y="105" width="20" height="30" rx="2" fill="#2a2a2a" stroke="#444"/>
        <rect x="405" y="105" width="20" height="30" rx="2" fill="#2a2a2a" stroke="#444"/>
      </g>
      {/* Alignment guide lines */}
      <line className="guide-line" x1="65" y1="150" x2="65" y2="200" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,3"/>
      <line className="guide-line" x1="420" y1="150" x2="420" y2="200" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="140" y="285" fill="#6B7280" fontSize="12" fontFamily="sans-serif">Gold contacts must align with slot</text>
      <text x="140" y="55" fill="#9CA3AF" fontSize="13" fontFamily="sans-serif" fontWeight="500">Align GPU above slot — contacts facing down</text>
    </svg>
  );
}

function Step3Anim() {
  return (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes press_in {
            0%,10%{transform:translateY(-20px);}
            40%,60%{transform:translateY(2px);}
            65%,100%{transform:translateY(0px);}
          }
          @keyframes latch_close {
            0%,40%{transform:rotate(-40deg);transform-origin:483px 195px;}
            70%,100%{transform:rotate(0deg);transform-origin:483px 195px;}
          }
          @keyframes click_appear {
            0%,50%{opacity:0;transform:scale(0.5);}
            65%{opacity:1;transform:scale(1.2);}
            80%,100%{opacity:0;transform:scale(1);}
          }
          .gpu-pressing{animation:press_in 3s ease-in-out infinite;}
          .latch-closing{animation:latch_close 3s ease-in-out infinite;}
          .click-badge{animation:click_appear 3s ease-in-out infinite;}
        `}</style>
      </defs>
      {/* Mobo */}
      <rect x="50" y="195" width="430" height="20" rx="2" fill="#0a0a1a" stroke="#00D4FF" strokeWidth="1"/>
      {Array.from({length:28}).map((_,i)=>(
        <rect key={i} x={55+i*11} y={198} width="5" height="14" rx="1" fill="#b8860b" opacity="0.7"/>
      ))}
      {/* Latch closing */}
      <g className="latch-closing">
        <rect x="472" y="188" width="16" height="12" rx="2" fill="#4a4a6a" stroke="#00D4FF" strokeWidth="1"/>
      </g>
      {/* GPU pressing down */}
      <g className="gpu-pressing">
        <rect x="60" y="120" width="360" height="75" rx="4" fill="#1a2a1a" stroke="#2d4d2d" strokeWidth="1.5"/>
        <circle cx="150" cy="158" r="25" fill="#111" stroke="#333" strokeWidth="1.5"/>
        <circle cx="150" cy="158" r="17" fill="#0d0d0d"/>
        {[0,60,120,180,240,300].map((a,i)=>(
          <line key={i} x1="150" y1="158"
            x2={150+15*Math.cos(a*Math.PI/180)}
            y2={158+15*Math.sin(a*Math.PI/180)}
            stroke="#2d2d2d" strokeWidth="5" strokeLinecap="round"/>
        ))}
        <circle cx="330" cy="158" r="25" fill="#111" stroke="#333" strokeWidth="1.5"/>
        <circle cx="330" cy="158" r="17" fill="#0d0d0d"/>
        {[0,60,120,180,240,300].map((a,i)=>(
          <line key={i} x1="330" y1="158"
            x2={330+15*Math.cos(a*Math.PI/180)}
            y2={158+15*Math.sin(a*Math.PI/180)}
            stroke="#2d2d2d" strokeWidth="5" strokeLinecap="round"/>
        ))}
        {Array.from({length:28}).map((_,i)=>(
          <rect key={i} x={55+i*11} y={191} width="5" height="8" rx="1" fill="#b8860b"/>
        ))}
        {/* Downward arrows */}
        <line x1="240" y1="100" x2="240" y2="120" stroke="#00D4FF" strokeWidth="2"/>
        <polygon points="235,118 240,128 245,118" fill="#00D4FF"/>
      </g>
      {/* CLICK badge */}
      <g className="click-badge">
        <rect x="195" y="215" width="60" height="26" rx="13" fill="#00D4FF"/>
        <text x="225" y="232" fill="#0A0A0F" fontSize="12" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">CLICK ✓</text>
      </g>
      <text x="120" y="50" fill="#9CA3AF" fontSize="13" fontFamily="sans-serif" fontWeight="500">Press firmly until you hear the latch click</text>
      <text x="120" y="285" fill="#6B7280" fontSize="12" fontFamily="sans-serif">Even pressure across the full length of the card</text>
    </svg>
  );
}

function Step4Anim() {
  return (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes screw_turn {
            0%{transform:rotate(0deg);transform-origin:100px 160px;}
            100%{transform:rotate(720deg);transform-origin:100px 160px;}
          }
          @keyframes screwdriver_move {
            0%,20%{transform:translate(0,0);}
            40%{transform:translate(30px,30px);}
            60%,80%{transform:translate(30px,30px) rotate(360deg);}
            100%{transform:translate(0,0);}
          }
          .screw1{animation:screw_turn 3s linear infinite;}
          .screw2{animation:screw_turn 3s linear infinite 0.5s;}
        `}</style>
      </defs>
      {/* Case bracket area */}
      <rect x="60" y="80" width="30" height="180" rx="2" fill="#2a2a3a" stroke="#444" strokeWidth="1.5"/>
      {/* GPU body */}
      <rect x="90" y="100" width="350" height="80" rx="4" fill="#1a2a1a" stroke="#2d4d2d" strokeWidth="1.5"/>
      <circle cx="190" cy="140" r="25" fill="#111" stroke="#333" strokeWidth="1.5"/>
      <circle cx="310" cy="140" r="25" fill="#111" stroke="#333" strokeWidth="1.5"/>
      {/* Bracket plate */}
      <rect x="60" y="95" width="32" height="120" rx="2" fill="#3a3a4a" stroke="#555" strokeWidth="1"/>
      {/* Screw holes */}
      <circle cx="76" cy="120" r="8" fill="#1a1a2a" stroke="#555" strokeWidth="1"/>
      <line className="screw1" x1="68" y1="120" x2="84" y2="120" stroke="#888" strokeWidth="2"/>
      <line className="screw1" x1="76" y1="112" x2="76" y2="128" stroke="#888" strokeWidth="2"/>

      <circle cx="76" cy="195" r="8" fill="#1a1a2a" stroke="#555" strokeWidth="1"/>
      <line className="screw2" x1="68" y1="195" x2="84" y2="195" stroke="#888" strokeWidth="2"/>
      <line className="screw2" x1="76" y1="187" x2="76" y2="203" stroke="#888" strokeWidth="2"/>

      {/* Power connectors */}
      <rect x="385" y="100" width="22" height="30" rx="2" fill="#2a2a2a" stroke="#555"/>
      <rect x="410" y="100" width="22" height="30" rx="2" fill="#2a2a2a" stroke="#555"/>

      <text x="110" y="55" fill="#9CA3AF" fontSize="13" fontFamily="sans-serif" fontWeight="500">Secure GPU bracket with 2 screws</text>
      <text x="90" y="260" fill="#6B7280" fontSize="12" fontFamily="sans-serif">Finger-tight first, then snug — do not overtighten</text>
    </svg>
  );
}

function Step5Anim() {
  return (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes connector_plug {
            0%,20%{transform:translateY(-40px);}
            60%,100%{transform:translateY(0);}
          }
          @keyframes cable_sway {
            0%,100%{d:path("M 420 80 C 420 30 460 10 480 60");}
            50%{d:path("M 420 80 C 430 30 470 20 480 60");}
          }
          .connector8{animation:connector_plug 2.5s ease-in-out infinite;}
          .connector6{animation:connector_plug 2.5s ease-in-out infinite 0.4s;}
        `}</style>
      </defs>
      {/* GPU body top-down ish */}
      <rect x="80" y="160" width="360" height="80" rx="4" fill="#1a2a1a" stroke="#2d4d2d" strokeWidth="1.5"/>
      <circle cx="180" cy="200" r="30" fill="#111" stroke="#333" strokeWidth="1.5"/>
      <circle cx="320" cy="200" r="30" fill="#111" stroke="#333" strokeWidth="1.5"/>

      {/* 8-pin receptacle on GPU */}
      <rect x="370" y="163" width="32" height="24" rx="2" fill="#111" stroke="#555" strokeWidth="1"/>
      {Array.from({length:8}).map((_,i)=>(
        <rect key={i} x={372+(i%4)*7} y={Math.floor(i/4)===0?166:174} width="5" height="6" rx="1" fill="#222"/>
      ))}

      {/* 6-pin receptacle */}
      <rect x="408" y="163" width="26" height="24" rx="2" fill="#111" stroke="#555" strokeWidth="1"/>
      {Array.from({length:6}).map((_,i)=>(
        <rect key={i} x={410+(i%3)*7} y={Math.floor(i/3)===0?166:174} width="5" height="6" rx="1" fill="#222"/>
      ))}

      {/* 8-pin connector coming down */}
      <g className="connector8">
        <rect x="370" y="110" width="32" height="20" rx="2" fill="#e53e3e" stroke="#c53030" strokeWidth="1"/>
        {Array.from({length:8}).map((_,i)=>(
          <rect key={i} x={372+(i%4)*7} y={Math.floor(i/4)===0?113:119} width="5" height="5" rx="1" fill="#fed7d7"/>
        ))}
        {/* Cables going up */}
        {[374,381,388,395].map((x,i)=>(
          <line key={i} x1={x} y1="110" x2={x-10+i*6} y2="70" stroke={['#e53e3e','#e53e3e','#e53e3e','#333'][i]} strokeWidth="2.5"/>
        ))}
        <line x1="375" y1="110" x2="380" y2="70" stroke="#e53e3e" strokeWidth="2.5"/>
        <text x="358" y="105" fill="#e53e3e" fontSize="10" fontFamily="sans-serif">8-pin</text>
      </g>

      {/* 6-pin connector */}
      <g className="connector6">
        <rect x="408" y="110" width="26" height="20" rx="2" fill="#e53e3e" stroke="#c53030" strokeWidth="1"/>
        {Array.from({length:6}).map((_,i)=>(
          <rect key={i} x={410+(i%3)*7} y={Math.floor(i/3)===0?113:119} width="5" height="5" rx="1" fill="#fed7d7"/>
        ))}
        <text x="408" y="105" fill="#e53e3e" fontSize="10" fontFamily="sans-serif">6-pin</text>
      </g>

      <text x="80" y="50" fill="#9CA3AF" fontSize="13" fontFamily="sans-serif" fontWeight="500">Connect PCIe power cables — clip clicks into place</text>
      <text x="80" y="270" fill="#6B7280" fontSize="12" fontFamily="sans-serif">Match 8-pin to 8-pin slot, 6-pin to 6-pin (or use 16-pin for modern GPUs)</text>
    </svg>
  );
}

function Step6Anim() {
  return (
    <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',maxWidth:'480px'}}>
      <defs>
        <style>{`
          @keyframes check_draw {
            0%{stroke-dashoffset:100;}
            60%,100%{stroke-dashoffset:0;}
          }
          @keyframes glow_pulse {
            0%,100%{opacity:0.3;}50%{opacity:0.8;}
          }
          .check-mark{stroke-dasharray:100;animation:check_draw 2s ease forwards infinite;}
          .glow{animation:glow_pulse 2s ease-in-out infinite;}
        `}</style>
      </defs>
      {/* Full GPU in slot - completed view */}
      <rect x="50" y="180" width="430" height="16" rx="2" fill="#0a0a1a" stroke="#00D4FF" strokeWidth="1"/>
      {/* Latch closed */}
      <rect x="462" y="183" width="14" height="10" rx="2" fill="#00D4FF" opacity="0.8"/>

      <rect x="60" y="108" width="360" height="72" rx="4" fill="#1a2a1a" stroke="#00D4FF" strokeWidth="1.5"/>
      <circle cx="175" cy="144" r="26" fill="#111" stroke="#333" strokeWidth="1.5"/>
      <circle cx="310" cy="144" r="26" fill="#111" stroke="#333" strokeWidth="1.5"/>

      {/* Bracket screws visible */}
      <rect x="40" y="103" width="22" height="110" rx="2" fill="#3a3a4a" stroke="#555"/>
      <circle cx="51" cy="120" r="6" fill="#1a1a2a" stroke="#888"/>
      <circle cx="51" cy="195" r="6" fill="#1a1a2a" stroke="#888"/>

      {/* Power cables connected */}
      <rect x="380" y="112" width="30" height="20" rx="2" fill="#e53e3e" stroke="#c53030"/>
      <rect x="414" y="112" width="24" height="20" rx="2" fill="#e53e3e" stroke="#c53030"/>

      {/* Glow under GPU */}
      <rect className="glow" x="60" y="175" width="360" height="8" rx="2" fill="#00D4FF"/>

      {/* Big checkmark */}
      <circle cx="420" cy="80" r="36" fill="#0D1F2D" stroke="#00D4FF" strokeWidth="2"/>
      <polyline className="check-mark" points="403,80 416,93 437,67" fill="none" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Checklist */}
      <text x="60" y="55" fill="#00D4FF" fontSize="12" fontFamily="sans-serif">✓ Latch closed</text>
      <text x="160" y="55" fill="#00D4FF" fontSize="12" fontFamily="sans-serif">✓ Bracket screwed</text>
      <text x="290" y="55" fill="#00D4FF" fontSize="12" fontFamily="sans-serif">✓ Power connected</text>

      <text x="60" y="285" fill="#6B7280" fontSize="12" fontFamily="sans-serif">GPU is fully installed — boot your PC and install drivers</text>
    </svg>
  );
}

const steps = [
  {
    title: 'Open the PCIe latch',
    desc: 'Find the PCIe x16 slot on your motherboard — the longest slot, usually the top one. At the right end there is a small plastic latch. Push it outward (away from the slot) to unlock it. This lets the GPU click in properly.',
    tip: 'The latch is small and easy to miss. It sits at the far right end of the slot and usually snaps with a soft click when opened.',
    animated: <Step1Anim />,
  },
  {
    title: 'Align the GPU above the slot',
    desc: 'Hold the GPU with both hands — one on each end. Position it directly above the PCIe slot with the gold contacts facing down. The bracket plate should align with the case slot opening on the left. Do not insert at an angle.',
    tip: 'The GPU only fits one way. If the contacts do not line up, rotate 180 degrees.',
    animated: <Step2Anim />,
  },
  {
    title: 'Press down until the latch clicks',
    desc: 'Apply firm, even pressure along the full length of the card. Push straight down — not at an angle. You will hear and feel a definitive click when the latch engages. The GPU should now be level with no visible gap between card and slot.',
    tip: 'It needs more pressure than most people expect. If the card feels wobbly, it is not fully seated — press again.',
    animated: <Step3Anim />,
  },
  {
    title: 'Secure the bracket with screws',
    desc: 'The metal bracket at the left end of the GPU slots into your PC case and needs to be screwed in. Use the thumbscrews or standard screws that came with your case. Most GPUs need 2 screws.',
    tip: 'Finger-tight first to make sure the bracket sits flush, then snug with a screwdriver. Do not overtighten — the bracket is thin metal.',
    animated: <Step4Anim />,
  },
  {
    title: 'Connect the power cables',
    desc: 'Modern GPUs require direct power from the PSU. Look at the top edge of the GPU for 6-pin or 8-pin connectors (or the newer 16-pin). Plug in the matching cables from your PSU. The connector has a clip that clicks when fully inserted.',
    tip: 'If your GPU needs an 8-pin and your cable is two 6+2-pin connectors, combine them — they are designed for this.',
    animated: <Step5Anim />,
  },
  {
    title: 'Verify and you are done',
    desc: 'Check three things: the PCIe latch is closed (flush with the slot), the bracket is screwed in, and all power cables are connected and clicked. Boot your PC — if you get a display signal, the GPU is seated correctly. Then install drivers.',
    tip: 'No display after booting? First check the latch, then check power connectors. These are the two most common causes of no video.',
    animated: <Step6Anim />,
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
