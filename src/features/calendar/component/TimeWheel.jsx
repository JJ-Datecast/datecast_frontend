import { useEffect, useMemo, useRef } from "react";
import "./TimeWheel.css";

export default function TimeWheel({
  value,
  onChange,
  stepMinutes = 30,
  start = "00:00",
  end = "23:59",
  ariaLabel = "시간 선택",
}) {
  const options = useMemo(() => {
    const list = [];
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    for (let m = startMin; m <= endMin; m += stepMinutes) {
      const h = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      list.push(`${h}:${mm}`);
    }
    return list;
  }, [stepMinutes, start, end]);

  const ITEM_H = 36; // 항목 높이(px)
  const BOX_H = ITEM_H * 6; // 보이는 높이(6줄)
  const ref = useRef(null);
  let timer;

  useEffect(() => {
    if (!ref.current) return;
    const idx = options.findIndex((t) => t === value);
    if (idx < 0) return;
    const top = idx * ITEM_H - (BOX_H - ITEM_H) / 2;
    ref.current.scrollTo({ top, behavior: "auto" });
  }, [value, options]);

  const snap = () => {
    const el = ref.current;
    if (!el) return;
    const near = Math.round((el.scrollTop + (BOX_H - ITEM_H) / 2) / ITEM_H);
    const idx = Math.max(0, Math.min(near, options.length - 1));
    const v = options[idx];
    if (v !== value) onChange?.(v);
    el.scrollTo({
      top: idx * ITEM_H - (BOX_H - ITEM_H) / 2,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(snap, 80);
  };

  return (
    <div className="timewheel" style={{ height: BOX_H }}>
      <div className="timewheel__mask top" />
      <div
        ref={ref}
        className="timewheel__list"
        onScroll={onScroll}
        role="listbox"
        aria-label={ariaLabel}
        aria-activedescendant={value}
        tabIndex={0}
      >
        {options.map((t) => (
          <div
            id={t}
            key={t}
            role="option"
            aria-selected={t === value}
            className={`timewheel__item ${t === value ? "selected" : ""}`}
            onClick={() => onChange?.(t)}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="timewheel__mask bottom" />
      <div className="timewheel__centerline" />
    </div>
  );
}
