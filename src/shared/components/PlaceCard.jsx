import "../css/PlaceCard.css";
import img from "../../assets/ex/exCard.jpg"
const card = [
    {image:img , title: "레티놀시카앰플 대용량", price :"39,900", url:"" }
]

const PlaceCard = ({ image, title, price, url }) => {
    return (
        <div className="PlaceCard">
            <a href={card[0].url}>
                <img src={card[0].image} alt={card[0].title} className="PlaceCard_image" />
                <div className="PlaceCard_content">
                    <p className="PlaceCard_title">{card[0].title}</p>
                    <h3 className="PlaceCard_price">{card[0].price.toLocaleString()}원</h3>
                </div>
            </a>
        </div>
    )
}

export default PlaceCard;