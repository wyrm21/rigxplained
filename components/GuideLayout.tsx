'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useMode } from '@/context/ModeContext';

interface Step {
  title: string;
  desc: string;
  tip?: string;
  animated: React.ReactNode;
  real?: React.ReactNode;
}
interface GuideLayoutProps {
  title: string;
  category: string;
  categoryHref: string;
  steps: Step[];
}

export default function GuideLayout({ title, category, categoryHref, steps }: GuideLayoutProps) {
  const [current, setCurrent] = useState(0);
  const { mode } = useMode();
  const step = steps[current];

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#6B7280', margin:'24px 0 20px' }}>
        <Link href="/" style={{ color:'#6B7280' }}>Home</Link>
        <span>›</span>
        <Link href={categoryHref} style={{ color:'#6B7280' }}>{category}</Link>
        <span>›</span>
        <span style={{ color:'#F0F4FF' }}>{title}</span>
      </div>

      <h1 style={{ fontSize:30, fontWeight:600, color:'#F0F4FF', marginBottom:8, letterSpacing:'-0.3px' }}>{title}</h1>

      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
        <span style={{ fontSize:13, color:'#6B7280' }}>{steps.length} steps</span>
        <span style={{ fontSize:13, color: mode==='animated'?'#00D4FF':'#8B5CF6' }}>
          {mode==='animated' ? '▶ Animated mode' : '📷 Real mode'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ display:'flex', gap:5, marginBottom:20 }}>
        {steps.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            flex:1, height:4, border:'none', borderRadius:2, cursor:'pointer', padding:0,
            background: i===current
              ? (mode==='animated'?'#00D4FF':'#8B5CF6')
              : i<current ? '#2D3748' : '#1C1C2E',
            transition:'background .2s',
          }}/>
        ))}
      </div>

      {/* Main card */}
      <div style={{ background:'#13131F', border:'0.5px solid #1E1E2E', borderRadius:16, overflow:'hidden', marginBottom:20 }}>
        {/* Visual area — BIG */}
        <div style={{
          background:'#0A0A0F',
          minHeight:500,
          display:'flex',
          alignItems:'stretch',
          justifyContent:'stretch',
          borderBottom:'0.5px solid #1E1E2E',
          position:'relative',
          overflow:'hidden',
        }}>
          {/* Step badge */}
          <div style={{
            position:'absolute', top:14, left:14, zIndex:10,
            background: mode==='animated'?'#00D4FF22':'#8B5CF622',
            border:`0.5px solid ${mode==='animated'?'#00D4FF44':'#8B5CF644'}`,
            borderRadius:20, padding:'4px 12px',
            fontSize:12, color: mode==='animated'?'#00D4FF':'#8B5CF6',
          }}>
            Step {current+1} of {steps.length}
          </div>

          <div style={{ width:'100%', display:'flex', alignItems:'stretch' }}>
            {mode==='animated'
              ? step.animated
              : (step.real || (
                <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#6B7280' }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>📷</div>
                  <div style={{ fontSize:14 }}>Real photo/video coming soon</div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Step text */}
        <div style={{ padding:'22px 28px' }}>
          <h2 style={{ fontSize:19, fontWeight:500, color:'#F0F4FF', marginBottom:8 }}>{step.title}</h2>
          <p style={{ fontSize:14, color:'#9CA3AF', lineHeight:1.7, marginBottom: step.tip?16:0 }}>{step.desc}</p>
          {step.tip && (
            <div style={{ background:'#0D1F2D', border:'0.5px solid #00D4FF22', borderRadius:8, padding:'10px 16px', fontSize:13, color:'#6B7280' }}>
              <strong style={{ color:'#00D4FF', fontWeight:500 }}>Tip: </strong>{step.tip}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button onClick={() => setCurrent(Math.max(0, current-1))} disabled={current===0} style={{
          background: current===0?'#1C1C2E':'#13131F',
          border:'0.5px solid #1E1E2E', borderRadius:8,
          padding:'10px 22px', fontSize:13,
          color: current===0?'#374151':'#F0F4FF', cursor: current===0?'not-allowed':'pointer',
        }}>← Previous</button>

        <span style={{ fontSize:13, color:'#6B7280' }}>{step.title}</span>

        {current < steps.length-1
          ? <button onClick={() => setCurrent(current+1)} style={{
              background: mode==='animated'?'#00D4FF':'#8B5CF6',
              border:'none', borderRadius:8, padding:'10px 22px',
              fontSize:13, color: mode==='animated'?'#0A0A0F':'#fff',
              fontWeight:500, cursor:'pointer',
            }}>Next →</button>
          : <Link href="/" style={{
              background:'#13131F', border:'0.5px solid #1E1E2E',
              borderRadius:8, padding:'10px 22px', fontSize:13, color:'#F0F4FF',
            }}>✓ Done</Link>
        }
      </div>
    </main>
  );
}
