import { useState } from 'react';
import { IconBook } from '../Icons';

export default function InfoGuide({ title = '이 계산과 관련된 필수 금융상식', children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="info-guide-wrap">
      <button className="info-guide-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-600)' }}>
          <IconBook size={20} /> <strong style={{color: 'var(--text-primary)'}}>{title}</strong>
        </span>
        <span className={`info-guide-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {open && (
         <div className="info-guide-content">
           <hr style={{border: 'none', borderTop: '1px solid var(--border-color)', margin: '0 0 16px 0', opacity: 0.5}} />
           {children}
         </div>
      )}
    </div>
  );
}
