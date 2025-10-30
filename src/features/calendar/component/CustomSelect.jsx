import { useEffect, useRef, useState } from "react";
import "./CustomSelect.css";

const CustomSelect = ({ value, onChange, options, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  // 현재 선택된 옵션 스크롤 중앙으로
  useEffect(() => {
    if (!open || !listRef.current) return;
    const idx = options.findIndex((opt) => opt.value === value);
    if (idx >= 0) {
      const li = listRef.current.querySelectorAll("li")[idx];
      li?.scrollIntoView({ block: "center" });
    }
  }, [open, value, options]);

  return (
    <div className="custom-select">
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setOpen(!open)}
      >
        {options.find((opt) => opt.value === value)?.label || value}
      </button>

      {open && (
        <ul className="custom-select-list" ref={listRef}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${opt.value === value ? "selected" : ""} ${
                opt.value === defaultValue ? "default-highlight" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
