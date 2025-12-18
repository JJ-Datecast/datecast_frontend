import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DateReviewPage.css";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import { useCreateDateReviewMutation } from "../../networks/hooks/useDateReview";

const EMOTIONS = [
  { key: "HAPPY", label: "행복", emoji: "😊", rating: 5 },
  { key: "EXCITED", label: "설렘", emoji: "💖", rating: 4 },
  { key: "SOSO", label: "보통", emoji: "😐", rating: 3 },
  { key: "BAD", label: "별로", emoji: "😕", rating: 2 },
  { key: "ANGRY", label: "화남", emoji: "😡", rating: 1 },
];

const DateReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [emotion, setEmotion] = useState(null); // ⭐ 변경
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const createDateReviewMutation = useCreateDateReviewMutation();

  // Calendar에서 넘어온 데이터
  const scheduleTitle = state?.scheduleTitle;
  const scheduleId = state?.scheduleId;
  const scheduleDate = state?.date;
  const title = state?.title;
  const place = state?.place;

  const displayDate = scheduleDate
    ? `${scheduleDate.split("-")[1]}월 ${scheduleDate.split("-")[2]}일`
    : "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = () => {
    if (!scheduleId) {
      alert("일정 정보가 없습니다.");
      return;
    }

    if (!emotion) {
      alert("데이트 감정을 선택해 주세요.");
      return;
    }

    if (!content.trim()) {
      alert("후기 내용을 입력해 주세요.");
      return;
    }

    const selectedEmotion = EMOTIONS.find((item) => item.key === emotion);

    if (!selectedEmotion) {
      alert("감정 선택 오류가 발생했습니다.");
      return;
    }

    const dto = {
      rating: selectedEmotion.rating, // ⭐ 여기!!
      content,
      scheduleId,
    };

    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    createDateReviewMutation.mutate(formData, {
      onSuccess: () => {
        alert("데이트 후기가 등록되었습니다 💕");
        navigate(-1);
      },
      onError: (err) => {
        console.error("데이트 후기 등록 실패:", err);
        alert("후기 등록 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <HeaderLayout>
      <div className="date-review-page">
        <div className="date-review-title">
          <p className="date-info-title">❤️ {title}</p>
          <p>{displayDate}</p>
        </div>

        {/* ⭐ 감정 선택 */}
        <div className="date-review-section">
          <label className="section-label">데이트 감정</label>
          <div className="emotion-selector">
            {EMOTIONS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`emotion-btn ${
                  emotion === item.key ? "active" : ""
                }`}
                onClick={() => setEmotion(item.key)}
              >
                <span className="emotion-emoji">{item.emoji}</span>
                <span className="emotion-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 후기 */}
        <div className="date-review-section">
          <label className="section-label">후기 작성</label>
          <textarea
            className="review-textarea"
            placeholder="데이트 후기를 작성해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 이미지 */}
        <div className="date-review-section">
          <label className="section-label">이미지 등록</label>
          <label className="image-upload-box">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span>📷 이미지 선택</span>
          </label>
          <p className="image-file-name">
            {image ? image.name : "선택된 파일 없음"}
          </p>
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={createDateReviewMutation.isLoading}
        >
          후기 작성
        </button>
      </div>
    </HeaderLayout>
  );
};

export default DateReviewPage;
