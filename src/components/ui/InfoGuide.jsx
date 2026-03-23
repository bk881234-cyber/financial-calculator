import { IconBook } from '../Icons';

export default function InfoGuide({ children }) {
  return (
    <div style={{
      margin: '0 0 20px',
      padding: '14px 18px 16px',
      background: 'rgba(248,250,252,0.97)',
      borderRadius: '14px',
      border: '1px solid var(--border-card)',
      fontSize: '14px',
      lineHeight: '1.65',
      color: 'var(--text-secondary)',
    }}>
      <style>{`
        .info-guide-inner h4 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
        }
        .info-guide-inner h4:not(:first-child) {
          margin-top: 14px;
        }
        .info-guide-inner p {
          font-size: 16px;
          margin: 0;
          color: var(--text-secondary);
        }
      `}</style>
      <div className="info-guide-inner">
        {children}
      </div>
    </div>
  );
}

