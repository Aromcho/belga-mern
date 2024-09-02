import React, { useCallback, useEffect, useState, useRef } from "react";
import './MultiRange.css';

export const MultiRange = ({
  className,
  customWidth = 300,
  min,
  max,
  withValues,
  onChange,
  step
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const rangeHide = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - (min ?? 0)) / ((max ?? 0) - (min ?? 0))) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const maxPercent = getPercent(maxVal);
    if (range.current) { range.current.style.width = `${maxPercent}%`; }
  }, [maxVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    if (rangeHide.current) { rangeHide.current.style.width = `${minPercent}%`; }
  }, [minVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    if (onChange) onChange({ minVal: minVal, maxVal: maxVal });
  }, [minVal, maxVal]);

  return (
    <div style={{ width: `${customWidth}px` }} className={`container ${className}`}>
      <input
        className="thumb thumb--left"
        style={{ width: `${customWidth}px` }}
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal ?? 0 - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        step={step}
      />
      <input
        className="thumb thumb--right"
        style={{ width: `${customWidth}px` }}
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal ?? 0 + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        step={step}
      />

      <div className="slider" style={{ width: `${customWidth}px` }}>
        <div className="slider-track" />
        <div className="slider-range" ref={range} />
        <div className="slider-range-hide" ref={rangeHide} />

        {withValues && (
          <div className="values-wrapper">
            <div className="left-value">{minVal}</div>
            <div className="right-value">{maxVal}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiRange;
