import "../css/MainFooter.css";

const MainFooter = () => {
  return (
    <footer className="mainFooter">
      <div className="mainFooter_inner">
        <div className="mainFooter_top">
          <div className="mainFooter_logo">DateCast</div>
          <div className="mainFooter_family">
            <select>
              <option>패밀리 사이트</option>
              <option>놀유니버스</option>
              <option>놀트립</option>
            </select>
          </div>
        </div>

        <div className="mainFooter_links">
          <a href="#">회사소개</a>
          <a href="#">광고제휴문의</a>
          <a href="#">인재채용</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">청소년보호정책</a>
          <a href="#">서비스 이용약관</a>
          <a href="#">위치정보 이용약관</a>
          <a href="#">사업자 정보확인</a>
          <a href="#">전자금융거래 이용약관</a>
          <a href="#">전자금융거래 이용자 유의사항</a>
          <a href="#">분쟁해결기준</a>
        </div>

        <div className="mainFooter_sns">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-blogger-b"></i>
          </a>
        </div>

        <div className="mainFooter_info">
          <p>
            (주)놀유니버스 | 대표이사: 배보선 | 사업자등록번호: 824-81-02515 |
            통신판매업신고: 2024-성남수정-0912 | 이메일:
            help.nol@nol-universe.com
            <br />
            관광사업자 등록번호: 제2024-000024호 | 주소: 경기도 성남시 수정구
            금토로 70 (금토동, 텐엑스타워) | 호스팅 서비스 제공자:
            (주)놀유니버스
          </p>
          <p>고객센터: 1644-1346 (오전 9시 - 익일 새벽 3시)</p>

          <p>
            (주)놀유니버스는 통신판매 중개자로서 통신판매의 당사자가 아니며
            상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
            있습니다.
          </p>

          <p>
            (주)놀유니버스가 소유/운영/관리하는 웹사이트 및 앱 내의
            상품/판매자/이벤트 정보, 디자인 및 화면의 구성, UI를 포함하여 일체의
            콘텐츠에 대한 무단 복제, 배포, 전송, 방송 또는 스크래핑 등의 행위는
            저작권법 및 콘텐츠산업 진흥법 등 관련 법령에 의하여 엄격히
            금지됩니다.
          </p>

          <a href="#" className="law-link">
            콘텐츠산업 진흥법에 따른 표시
          </a>
        </div>

        <div className="mainFooter_awards">
          <ul>
            <li>2017 하이서울 브랜드 선정</li>
            <li>2017 브랜드스타 숙박업 부문 1위</li>
            <li>2016 모바일어워드코리아 숙박정보 부문 대상</li>
            <li>2015 앱어워드코리아 숙박정보부문 대상</li>
            <li>2015 대한민국 마케팅대상 최우수상</li>
          </ul>
        </div>

        <div className="mainFooter_bottom">
          <p>© Nol Universe Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
