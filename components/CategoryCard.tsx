'use client';

interface CategoryCardProps {
  title: string;
  desc: string;
  count: number;
  color: string;
  href: string;
  icon: string;
}

export default function CategoryCard({ title, desc, count, color, icon }: CategoryCardProps) {
  return (
    <div
      style={{
        background: '#13131F',
        border: '0.5px solid #1E1E2E',
        borderRadius: '12px',
        padding: '18px',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = color + '55')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E1E2E')}
    >
      <div style={{ fontSize: '26px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '14px', fontWeight: 500, color: '#F0F4FF', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{desc}</div>
      <div style={{ marginTop: '12px', fontSize: '12px', color }}>
        {count} guides &rarr;
      </div>
    </div>
  );
}
