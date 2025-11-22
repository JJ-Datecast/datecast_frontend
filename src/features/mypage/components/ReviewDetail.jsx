import "../css/ReviewDetail.css";

const ReviewDetail = ({ review, onBack }) => {
  return (
    <div className="review-detail">
      <button className="back-btn" onClick={onBack}>
        ←
      </button>

      <div className="detail-img-box">
        <img src={review.image} className="detail-img" alt={review.title} />
      </div>

      <div className="detail-content">
        <h2 className="detail-title">{review.title}</h2>
        <p className="detail-location">{review.location}</p>

        <div className="detail-text">
          여기에 후기 내용을 넣으세요! 리뷰 설명, 방문 후기 등 텍스트가 들어갈
          영역입니다.
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
