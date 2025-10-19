import "../css/PromoBanner.css";

const PromoBanner = ({img, url}) => {
    return (
        <div className="PromoBanner">
            <div className="PromoBanner_img">
                <a href={url}>
                    <img src={img} href={url}/>
                </a>
            </div>
        </div>
    )
}
export default PromoBanner;