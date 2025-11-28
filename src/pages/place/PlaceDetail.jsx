import { useParams } from "react-router-dom";
import { usePlaceDetailQuery } from "../../networks/hooks/usePlace";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import { useNavigate } from "react-router-dom";
import "./PlaceDetail.css";

const PlaceDetail = () => {
  const { placeId } = useParams();
  const { data, isLoading, isError } = usePlaceDetailQuery(placeId);
  const nav = useNavigate();

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <HeaderLayout>
      <button className="placeDetailPrev_button" onClick={() => nav(-1)}>
        이전으로
      </button>
      <div style={{ padding: "20px" }}>
        <h1>{data.name}</h1>
        <p>카테고리: {data.category}</p>
        <p>주소: {data.address}</p>
        <p>조회수: {data.viewCount}</p>
      </div>
    </HeaderLayout>
  );
};

export default PlaceDetail;
