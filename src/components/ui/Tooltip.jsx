import { useState, useRef, useEffect } from 'react';

export default function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  // Close tooltip if clicked outside (for mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <span 
      ref={wrapperRef}
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
      aria-label="안내사항 툴팁"
    >
      <span className="tooltip-icon">?</span>
      {show && <div className="tooltip-content">{text}</div>}
    </span>
  );
}
