'use client';

import CategoryCard from '@/components/CategoryCard';
import { useMode } from '@/context/ModeContext';

const assembly = [
  { icon: '🖥️', title: 'Full PC Build', desc: 'Complete assembly from scratch, every step', count: 12, color: '#00D4FF', href: '/guides/full-build' },
  { icon: '🎮', title: 'GPU', desc: 'Install, remove, disassemble for thermal pads', count: 8, color: '#00D4FF', href: '/guides/gpu' },
  { icon: '⚙️', title: 'CPU', desc: 'Socket types, coolers, thermal paste', count: 6, color: '#8B5CF6', href: '/guides/cpu' },
  { icon: '❄️', title: 'CPU Cooler', desc: 'Air coolers, AIO, fan orientation', count: 5, color: '#00D4FF', href: '/guides/cpu-cooler' },
  { icon: '💾', title: 'RAM', desc: 'Slots, orientation, XMP profile setup', count: 4, color: '#8B5CF6', href: '/guides/ram' },
  { icon: '🔲', title: 'Motherboard', desc: 'Install into case, standoffs, I/O shield', count: 7, color: '#00D4FF', href: '/guides/motherboard' },
  { icon: '⚡', title: 'PSU', desc: 'Cabling, modular vs fixed, routing', count: 4, color: '#8B5CF6', href: '/guides/psu' },
  { icon: '💿', title: 'Storage', desc: 'M.2 NVMe, SATA SSD, HDD installation', count: 5, color: '#00D4FF', href: '/guides/storage' },
  { icon: '🌀', title: 'Case Fans', desc: 'Airflow direction, intake vs exhaust setup', count: 5, color: '#8B5CF6', href: '/guides/case-fans' },
  { icon: '🔌', title: 'Front Panel', desc: 'Power button, USB, audio connectors', count: 3, color: '#00D4FF', href: '/guides/front-panel' },
  { icon: '🗂️', title: 'Cable Management', desc: 'Routes, zip ties, clean build techniques', count: 4, color: '#8B5CF6', href: '/guides/cable-management' },
];

const maintenance = [
  { icon: '🌡️', title: 'CPU Thermal Paste', desc: 'Application patterns, removal, brand comparison', count: 3, color: '#00D4FF', href: '/guides/thermal-paste-cpu' },
  { icon: '🌡️', title: 'GPU Thermal Paste', desc: 'Disassemble GPU, replace paste and pads', count: 4, color: '#8B5CF6', href: '/guides/thermal-paste-gpu' },
  { icon: '🧊', title: 'Thermal Pads', desc: 'VRAM, VRMs, thickness guide per GPU model', count: 3, color: '#00D4FF', href: '/guides/thermal-pads' },
  { icon: '💨', title: 'Dust Cleaning', desc: 'Filters, fans, compressed air, safe methods', count: 2, color: '#8B5CF6', href: '/guides/dust-cleaning' },
];

const peripherals = [
  { icon: '⌨️', title: 'Keyboards & Switches', desc: 'Switch types, removal, lubing, software links', count: 8, color: '#00D4FF', href: '/guides/keyboards' },
  { icon: '🖱️', title: 'Mice', desc: 'Mouse feet, button switches, sensors, software', count: 5, color: '#8B5CF6', href: '/guides/mice' },
  { icon: '🎧', title: 'Headsets', desc: 'Ear pad types, driver replacement, software links', count: 4, color: '#00D4FF', href: '/guides/headsets' },
];

const os = [
  { icon: '🪟', title: 'Windows 11', desc: 'Clean install, activation, initial setup', count: 3, color: '#00D4FF', href: '/guides/windows' },
  { icon: '🐧', title: 'Linux', desc: 'Ubuntu, Mint, Pop!_OS installation', count: 4, color: '#8B5CF6', href: '/guides/linux' },
  { icon: '🔀', title: 'Dual Boot', desc: 'Windows + Linux on the same drive', count: 2, color: '#00D4FF', href: '/guides/dual-boot' },
  { icon: '📥', title: 'Driver Downloads', desc: 'NVIDIA, AMD, Intel + every brand listed', count: 10, color: '#8B5CF6', href: '/guides/drivers' },
];

function SectionHeader({ id, label, desc }: { id: string; label: string; desc: string }) {
  return (
    <div id={id} style={{ marginBottom: '20px', scrollMarginTop: '80px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#F0F4FF', marginBottom: '6px' }}>{label}</h2>
      <p style={{ fontSize: '13px', color: '#6B7280' }}>{desc}</p>
    </div>
  );
}

function Grid({ items }: { items: typeof assembly }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
      gap: '10px',
      marginBottom: '52px',
    }}>
      {items.map(item => (
        <CategoryCard key={item.href} {...item} />
      ))}
    </div>
  );
}

function ModeBanner() {
  const { mode } = useMode();
  return (
    <div style={{
      background: mode === 'animated' ? '#0D1F2D' : '#150D1F',
      border: `0.5px solid ${mode === 'animated' ? '#00D4FF33' : '#8B5CF633'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '44px',
      fontSize: '13px',
      color: '#6B7280',
    }}>
      <span style={{ fontSize: '16px' }}>{mode === 'animated' ? '▶' : '📷'}</span>
      {mode === 'animated'
        ? <span>Viewing in <strong style={{ color: '#00D4FF', fontWeight: 500 }}>Animated mode</strong> — showing angles and details cameras cannot capture</span>
        : <span>Viewing in <strong style={{ color: '#8B5CF6', fontWeight: 500 }}>Real mode</strong> — actual photos and video footage</span>
      }
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ textAlign: 'center', padding: '64px 0 44px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#00D4FF', textTransform: 'uppercase', marginBottom: '16px' }}>
          The complete PC guide
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: 600, color: '#F0F4FF', margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
          Every part. Every step.<br />Actually explained.
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
          Animated guides show what photos cannot — airflow paths, cable angles, tolerances. Switch to real footage anytime.
        </p>
      </div>

      <ModeBanner />

      <SectionHeader id="assembly" label="Assembly Guides" desc="Install and remove every component, with animated close-ups showing what cameras cannot" />
      <Grid items={assembly} />

      <SectionHeader id="maintenance" label="Maintenance" desc="Keep your build running cool and clean" />
      <Grid items={maintenance} />

      <SectionHeader id="peripherals" label="Peripherals" desc="Keyboards, mice, headsets — tear down, mod, maintain, and find every software link" />
      <Grid items={peripherals} />

      <SectionHeader id="os" label="OS & Drivers" desc="Install Windows or Linux, then get every driver you need" />
      <Grid items={os} />
    </main>
  );
}
