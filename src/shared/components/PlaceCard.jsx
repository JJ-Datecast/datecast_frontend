import "../css/PlaceCard.css";
const PlaceCard = ({ image, title, price, url }) => {
    return (
        <div className="PlaceCard">
            <a href={url}>
                <img src={image} alt={title} className="PlaceCard_image" />
                <div className="PlaceCard_content">
                    <p className="PlaceCard_title">{title}</p>
                    <h3 className="PlaceCard_price">{price.toLocaleString()}원</h3>
                </div>
            </a>
        </div>
    )
}

export default PlaceCard;