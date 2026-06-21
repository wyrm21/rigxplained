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
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7280', marginBottom: '28px' }}>
        <Link href="/" style={{ color: '#6B7280' }}>Home</Link>
        <span>›</span>
        <Link href={categoryHref} style={{ color: '#6B7280' }}>{category}</Link>
        <span>›</span>
        <span style={{ color: '#F0F4FF' }}>{title}</span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#F0F4FF', marginBottom: '8px', letterSpacing: '-0.3px' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>{steps.length} steps</span>
        <span style={{ fontSize: '13px', color: mode === 'animated' ? '#00D4FF' : '#8B5CF6' }}>
          {mode === 'animated' ? '▶ Animated mode' : '📷 Real mode'}
        </span>
      </div>

      {/* Step progress */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              flex: 1,
              height: '4px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              background: i === current ? (mode === 'animated' ? '#00D4FF' : '#8B5CF6')
                : i < current ? '#2D3748' : '#1C1C2E',
              transition: 'background 0.2s',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{
        background: '#13131F',
        border: '0.5px solid #1E1E2E',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '24px',
      }}>
        {/* Visual area */}
        <div style={{
          background: '#0D0D18',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '0.5px solid #1E1E2E',
          position: 'relative',
        }}>
          <div style={{ width: '100%', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mode === 'animated' ? step.animated : (step.real || (
              <div style={{ textAlign: 'center', color: '#6B7280' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📷</div>
                <div style={{ fontSize: '14px' }}>Real photo/video coming soon</div>
              </div>
            ))}
          </div>
          {/* Step counter badge */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: mode === 'animated' ? '#00D4FF22' : '#8B5CF622',
            border: `0.5px solid ${mode === 'animated' ? '#00D4FF44' : '#8B5CF644'}`,
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '12px',
            color: mode === 'animated' ? '#00D4FF' : '#8B5CF6',
          }}>
            Step {current + 1} of {steps.length}
          </div>
        </div>

        {/* Step info */}
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#F0F4FF', marginBottom: '8px' }}>{step.title}</h2>
          <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: 1.65, marginBottom: step.tip ? '16px' : 0 }}>{step.desc}</p>
          {step.tip && (
            <div style={{
              background: '#0D1F2D',
              border: '0.5px solid #00D4FF22',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              color: '#6B7280',
            }}>
              <strong style={{ color: '#00D4FF', fontWeight: 500 }}>Tip: </strong>{step.tip}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          style={{
            background: current === 0 ? '#1C1C2E' : '#13131F',
            border: '0.5px solid #1E1E2E',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            color: current === 0 ? '#374151' : '#F0F4FF',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </button>

        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          {step.title}
        </span>

        {current < steps.length - 1 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            style={{
              background: mode === 'animated' ? '#00D4FF' : '#8B5CF6',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              color: mode === 'animated' ? '#0A0A0F' : '#fff',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Next →
          </button>
        ) : (
          <Link
            href="/"
            style={{
              background: '#13131F',
              border: '0.5px solid #1E1E2E',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              color: '#F0F4FF',
            }}
          >
            ✓ Done — Back to guides
          </Link>
        )}
      </div>
    </main>
  );
}
