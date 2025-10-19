import { useState, useEffect } from "react";
import "../css/PromoBannerList.css";
import promo from "../../util/get-promoBanner";
import PromoBanner from "./PromoBanner";

const PromoBannerList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const intervalTime = 4000; // 4초마다 자동 이동
  const maxIndex = Math.max(0, promo.length - itemsPerPage);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage > maxIndex ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? maxIndex : prevIndex - itemsPerPage
    );
  };

  // 자동 슬라이드
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, intervalTime);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="PromoBannerList">
      <button className="nav-btn prev" onClick={prevSlide}>◀</button>

      <div className="PromoBanner_container">
        <div
          className="PromoBanner_track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {promo.map((item) => (
            <PromoBanner key={item.id} {...item} />
          ))}
        </div>
      </div>

      <button className="nav-btn next" onClick={nextSlide}>▶</button>
    </div>
  );
};

export default PromoBannerList;
