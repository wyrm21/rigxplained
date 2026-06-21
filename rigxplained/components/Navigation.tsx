'use client';

import Link from 'next/link';
import { useMode } from '@/context/ModeContext';

export default function Navigation() {
  const { mode, setMode } = useMode();

  return (
    <nav style={{
      padding: '14px 32px',
      borderBottom: '0.5px solid #1E1E2E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      background: '#0A0A0F',
      zIndex: 100,
      flexWrap: 'wrap' as const,
      gap: '12px',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
        <span style={{ fontSize: '17px', fontWeight: 500, color: '#F0F4FF', letterSpacing: '-0.3px' }}>RigXplained</span>
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' as const }}>
        <a href="#assembly" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Assembly</a>
        <a href="#maintenance" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Maintenance</a>
        <a href="#peripherals" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Peripherals</a>
        <a href="#os" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>OS & Drivers</a>

        <div style={{ display: 'flex', background: '#1C1C2E', borderRadius: '20px', padding: '3px', gap: '2px' }}>
          <button
            onClick={() => setMode('animated')}
            style={{
              background: mode === 'animated' ? '#00D4FF' : 'transparent',
              color: mode === 'animated' ? '#0A0A0F' : '#6B7280',
              border: 'none',
              borderRadius: '16px',
              padding: '5px 14px',
              fontSize: '12px',
              fontWeight: mode === 'animated' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Animated
          </button>
          <button
            onClick={() => setMode('real')}
            style={{
              background: mode === 'real' ? '#8B5CF6' : 'transparent',
              color: mode === 'real' ? '#ffffff' : '#6B7280',
              border: 'none',
              borderRadius: '16px',
              padding: '5px 14px',
              fontSize: '12px',
              fontWeight: mode === 'real' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Real
          </button>
        </div>
      </div>
    </nav>
  );
}
