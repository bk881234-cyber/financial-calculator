import { useState } from 'react';

export default function ShareButton({ targetRef, filename = '계산결과' }) {
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared]   = useState(false);

  const handleSave = async () => {
    if (!targetRef?.current) return;
    setSaving(true);

    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#EFF6FF',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const ctx = canvas.getContext('2d');
      ctx.font = 'bold 22px Pretendard, sans-serif';
      ctx.fillStyle = 'rgba(59,130,246,0.25)';
      ctx.textAlign = 'right';
      ctx.fillText('💰 생활 금융 계산기', canvas.width - 20, canvas.height - 20);

      const link = document.createElement('a');
      link.download = `${filename}_${new Date().toLocaleDateString('ko-KR').replace(/\. /g, '').replace('.', '')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    setSharing(true);
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: '생활 금융 계산기', url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch {
      // 사용자가 공유 취소한 경우 무시
    } finally {
      setSharing(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
      {/* 이미지로 저장하기 */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`share-btn ${saved ? 'done' : ''}`}
        style={{ flex: 1 }}
      >
        {saving ? '⏳ 생성 중...' : saved ? '✅ 저장 완료!' : '🖼️ 이미지로 저장하기'}
      </button>

      {/* 링크 공유하기 */}
      <button
        onClick={handleShare}
        disabled={sharing}
        className={`share-btn ${shared ? 'done' : ''}`}
        style={{ flex: 1 }}
      >
        {sharing ? '⏳ 공유 중...' : shared ? '✅ 링크 복사됨!' : '🔗 링크 공유하기'}
      </button>
    </div>
  );
}
