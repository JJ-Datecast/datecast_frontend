import "../css/PlaceCard.css";
const PlaceCard = ({ image, title, url, onClick }) => {
  return (
    <div className="PlaceCard" onClick={onClick}>
      <a href={url}>
        <img src={image} alt={title} className="PlaceCard_image" />
        <div className="PlaceCard_content">
          <p className="PlaceCard_title">{title}</p>
        </div>
      </a>
    </div>
  );
};

export default PlaceCard;
