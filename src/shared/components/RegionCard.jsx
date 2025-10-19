import "../css/RegionCard.css";
const RegionCard = ({onClick, name, img, type}) => {
    return(
        <div className={`RegionCard RegionCard_${type}`} onClick={onClick}>
            <div className="RegionCard_img">
                <img src={img}/>
            </div>
            <div className="RegionCard_name">
                <h4>{name}</h4>
            </div>
        </div>
        
    )
}

export default RegionCard;