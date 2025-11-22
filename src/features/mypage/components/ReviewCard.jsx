import React from "react";
import "../css/ReviewCard.css";

const ReviewCard = ({ image, title, location, onClick }) => {
  return (
    <div className="review-card" onClick={onClick}>
      <img src={image} className="review-img" />

      <div className="review-info">
        <p className="review-location">{location}</p>
        <p className="review-title">{title}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
