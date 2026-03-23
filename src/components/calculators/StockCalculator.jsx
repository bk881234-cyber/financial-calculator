import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconDollarSign, IconPackage, IconBarChart, IconTrendUp, IconCoin } from '../Icons';

function getGaugeColor(pct) {
  if (pct <= 5)  return { from: '#14B8A6', to: '#2DD4BF', text: '#0D9488' };
  if (pct <= 15) return { from: '#F59E0B', to: '#FBBF24', text: '#D97706' };
  if (pct <= 30) return { from: '#F97316', to: '#FB923C', text: '#EA580C' };
  return { from: '#EF4444', to: '#F87171', text: '#DC2626' };
}

/* 삭제 아이콘 (X) */
function IconX({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* 플러스 아이콘 */
function IconPlus({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function StockCalculator() {
  const { stock, setStockEntry, addStockEntry, removeStockEntry, calcStockResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const result = stock.result;
  const dropPct = result?.priceDropPercent ?? 0;
  const gaugeColor = getGaugeColor(dropPct);

  const totalPreview = stock.entries.reduce(
    (sum, e) => (e.price > 0 && e.quantity > 0 ? sum + e.price * e.quantity : sum), 0
  );

  return (
    <div>
      {/* 안내 배너 */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239,246,255,0.92), rgba(240,253,250,0.92))',
        border: '1.5px solid var(--border-blue)',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 18,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 12,
          background: 'var(--grad-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--glow-sm)',
          flexShrink: 0,
        }}>
          <IconTrendUp size={18} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-blue)', marginBottom: 3 }}>
            주식 평균단가 계산기
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            매수 회차를 추가하여 물타기 후 <strong>평균단가를 계산</strong>하세요.
          </div>
        </div>
      </div>

      <div className="glass-card input-section">
        {stock.entries.map((entry, i) => (
          <div key={i}>
            {i > 0 && (
              <div className="flow-arrow">
                <div className="flow-arrow-icon" style={{ color: 'var(--teal-600)', borderColor: 'var(--border-teal)', background: 'var(--teal-50)' }}>
                  <IconPlus size={14} color="var(--teal-600)" />
                </div>
              </div>
            )}

            <div style={{ marginBottom: 4 }}>
              {/* 회차 헤더 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: i === 0 ? 'var(--grad-primary)' : 'var(--grad-teal)',
                    color: 'white', fontSize: 14, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--glow-sm)',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-secondary)' }}>
                    {i === 0 ? '최초 매수' : `${i}차 추가 매수`}
                  </span>
                </div>
                {stock.entries.length > 2 && i > 0 && (
                  <button
                    onClick={() => removeStockEntry(i)}
                    style={{
                      width: 30, height: 30, borderRadius: '50%',
                      border: 'none', background: '#FEE2E2',
                      color: '#DC2626', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    <IconX size={13} />
                  </button>
                )}
              </div>

              {/* 단가 / 수량 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="input-label" style={{ marginBottom: 8, fontSize: 13 }}>
                    <span className="input-icon"><IconDollarSign size={14} /></span>
                    매수 단가
                    <Tooltip text="주식을 구매한 1주당 단가(체결가)입니다. (예: 삼성전자 80,000원)" />
                  </label>
                  <div className="input-wrap">
                    <NumberInput className="input-field"
                      value={entry.price || ''} placeholder="0"
                      style={{ paddingRight: 16, fontSize: 16 }}
                      onChange={(e) => setStockEntry(i, 'price', Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label className="input-label" style={{ marginBottom: 8, fontSize: 13 }}>
                    <span className="input-icon"><IconPackage size={14} /></span>
                    수량 (주)
                  </label>
                  <div className="input-wrap">
                    <NumberInput className="input-field"
                      value={entry.quantity || ''} placeholder="0"
                      style={{ paddingRight: 16, fontSize: 16 }}
                      onChange={(e) => setStockEntry(i, 'quantity', Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* 소계 */}
              {entry.price > 0 && entry.quantity > 0 && (
                <div style={{
                  marginTop: 10, padding: '9px 14px',
                  background: 'var(--bg-muted)', borderRadius: 12,
                  border: '1px solid var(--border-card)',
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 14,
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>소계</span>
                  <span style={{ fontWeight: 900, color: 'var(--text-primary)' }}>
                    {formatKRW(entry.price * entry.quantity)}원
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 추가 버튼 */}
        <button
          onClick={addStockEntry}
          style={{
            width: '100%', marginTop: 18,
            padding: '14px',
            border: '2px dashed var(--border-blue)',
            borderRadius: 300,
            background: 'transparent',
            color: 'var(--text-blue)',
            fontSize: 15, fontWeight: 800,
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--blue-50)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <IconPlus size={16} color="var(--blue-500)" />
          매수 회차 추가
        </button>

        {/* 총 투자금 미리보기 */}
        {totalPreview > 0 && (
          <div style={{
            marginTop: 14, padding: '12px 18px',
            background: 'var(--grad-primary)',
            borderRadius: 12,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: 'var(--glow-sm)',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 700 }}>
              총 투자 예정금
            </span>
            <span style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>
              {formatKRWShort(totalPreview)}
            </span>
          </div>
        )}
      </div>

      <button className="calc-btn" onClick={calcStockResult}>평균단가 계산하기</button>

      {result && (
        <div className="result-section" ref={resultRef}>

          <div className="result-hero">
            <div className="result-hero-badge" style={{ background: 'rgba(255,255,255,0.14)' }}>
              물타기 후 평균 단가
            </div>
            <div className="result-hero-value">
              {formatKRW(result.avgPrice)}<sup>원</sup>
            </div>
            <div className="result-hero-sub">
              총 {result.totalQty.toLocaleString()}주 보유 · 총 투자금 {formatKRWShort(result.totalCost)}
            </div>
          </div>

          {/* 평단가 하락폭 게이지 */}
          <div className="glass-card-glow" style={{ padding: '22px 20px', marginBottom: 14 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 14, fontSize: 14, fontWeight: 700,
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>최초 단가 </span>
                <span style={{ fontSize: 16, fontWeight: 900 }}>{formatKRW(result.originalPrice)}원</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>평균 단가 </span>
                <span style={{ fontSize: 16, fontWeight: 900, color: gaugeColor.text }}>
                  {formatKRW(result.avgPrice)}원
                </span>
              </div>
            </div>

            <div className="gauge-track">
              <div className="gauge-fill" style={{
                width: `${Math.min(99, dropPct * 2.5)}%`,
                background: `linear-gradient(90deg, ${gaugeColor.from}, ${gaugeColor.to})`,
                boxShadow: `0 0 10px ${gaugeColor.from}55`,
              }} />
            </div>

            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px',
                borderRadius: 12,
                background: `${gaugeColor.from}18`,
                color: gaugeColor.text,
                fontSize: 20, fontWeight: 900,
                border: `1.5px solid ${gaugeColor.from}40`,
              }}>
                ▼ {dropPct}% 평단가 하락
              </span>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">평균 단가</div>
              <div className="result-card-value c-blue">{formatKRW(result.avgPrice)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconPackage size={20} /></div>
              <div className="result-card-label">총 보유 수량</div>
              <div className="result-card-value">{result.totalQty.toLocaleString()}주</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">총 투자금</div>
              <div className="result-card-value c-teal">{formatKRWShort(result.totalCost)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">단가 하락폭</div>
              <div className="result-card-value" style={{ color: gaugeColor.text }}>
                -{dropPct}%
              </div>
            </div>
          </div>

          {/* 매수 내역 분석 테이블 */}
          <div className="chart-wrap">
            <div className="chart-title">매수 내역 분석</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>회차</th><th>매수 단가</th><th>수량</th><th>투자금액</th><th>비중</th>
                  </tr>
                </thead>
                <tbody>
                  {result.entries.map((e) => (
                    <tr key={e.index}>
                      <td>
                        <div style={{
                          width: 26, height: 26, borderRadius: '50%',
                          background: e.index === 1 ? 'var(--grad-primary)' : 'var(--grad-teal)',
                          color: 'white', fontSize: 12, fontWeight: 900,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        }}>{e.index}</div>
                      </td>
                      <td style={{ fontWeight: 800 }}>{formatKRW(e.price)}원</td>
                      <td>{e.quantity.toLocaleString()}주</td>
                      <td style={{ fontSize: 13 }}>{formatKRW(e.amount)}원</td>
                      <td><span className="badge badge-blue">{e.weight}%</span></td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '2px solid var(--border-card)' }}>
                    <td colSpan={2} style={{ fontWeight: 900, paddingTop: 14, fontSize: 15 }}>합계</td>
                    <td style={{ fontWeight: 900, paddingTop: 14 }}>{result.totalQty.toLocaleString()}주</td>
                    <td style={{ fontWeight: 900, color: 'var(--blue-600)', paddingTop: 14, fontSize: 15 }}>
                      {formatKRWShort(result.totalCost)}
                    </td>
                    <td style={{ paddingTop: 14 }}><span className="badge badge-teal">100%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="주식물타기계산결과" />

          <InfoGuide title="💡 주식 물타기(평균단가) 계산기 100% 활용 가이드">
            <h4>1. 물타기 후 내 평단가, 쉽고 빠르게 계산해 보세요</h4>
            <p>주식 평균단가 계산기로 파란불이 뜬 주식을 추가 매수했을 때 평단가가 얼마나 낮아질지 쉽고 빠르게 계산해 보세요. 매입 단가와 덧붙일 수량의 가중 평균 수학 공식 기준에 따라, 코인이나 해외주식의 추가 매수 시뮬레이션을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
            <h4>2. 목표 평단가에 맞춘 투자 플랜 세우기</h4>
            <p>현재 계좌에 물려있는 주식의 기존 단가/수량과 앞으로 쪼개서 들어갈 1차 매수 금액, 2차 매수 금액을 자유롭게 변경해가며 테스트해 보세요. 보유 비중이 과도하게 커지는 것은 아닌지 총매입금액을 확인하며 리스크를 관리하는 것이 핵심입니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
