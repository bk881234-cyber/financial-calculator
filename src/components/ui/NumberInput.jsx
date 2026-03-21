import { useState } from 'react';

/**
 * 포커스 해제 시 천 단위 콤마를 표시하는 숫자 입력 컴포넌트.
 * onChange는 기존 input과 동일하게 { target: { value } } 형태로 호출됩니다.
 */
export default function NumberInput({ value, onChange, placeholder = '0', className, style }) {
  const [focused, setFocused] = useState(false);

  const displayValue = focused
    ? (value || '')
    : (value ? Number(value).toLocaleString('ko-KR') : '');

  return (
    <input
      type="text"
      inputMode="numeric"
      className={className}
      style={style}
      placeholder={placeholder}
      value={displayValue}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e) => {
        const raw = e.target.value.replace(/,/g, '');
        if (raw === '' || /^\d+$/.test(raw)) {
          onChange({ target: { value: raw } });
        }
      }}
    />
  );
}
