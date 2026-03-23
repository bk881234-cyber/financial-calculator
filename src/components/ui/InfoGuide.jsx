import { IconBook } from '../Icons';

export default function InfoGuide({ children }) {
  return (
    <div style={{
      position: 'sticky',
      top: '68px',
      zIndex: 99,
      margin: '0 0 18px',
      padding: '14px 18px 16px',
      background: 'rgba(248,250,252,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1.5px solid var(--border-card)',
      boxShadow: '0 3px 14px rgba(59,130,246,0.06)',
    }}>
      {children}
    </div>
  );
}
