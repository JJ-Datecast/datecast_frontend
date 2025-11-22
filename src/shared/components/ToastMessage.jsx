import React, { useEffect } from "react";
import "../../shared/css/ToastMessage.css";

const ToastMessage = ({ message, icon, onClose, duration = 1000 }) => {
  // 자동닫기
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="modalTopContainer">
      <div className="modalTopContent">
        <span className="checkIcon">✔️</span>
        <span className="message">{message}</span>
        <span className="emoji">{icon}</span>
      </div>
    </div>
  );
};

export default ToastMessage;
