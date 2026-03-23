import { IconBook } from '../Icons';

export default function InfoGuide({ children }) {
  return (
    <div className="info-guide-wrap" style={{ marginBottom: 18 }}>
      <div className="info-guide-content">
        {children}
      </div>
    </div>
  );
}
