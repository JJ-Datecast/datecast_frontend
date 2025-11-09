import React from "react";
import "../css/BigActionButton.css";

const BigActionButton = ({ children, onClick }) => {
  return (
    <button className="big-action-button" onClick={onClick}>
      {children}
    </button>
  );
};
export default BigActionButton;
