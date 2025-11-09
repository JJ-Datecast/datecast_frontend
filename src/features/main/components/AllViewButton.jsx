import "../css/AllViewButton.css";

const AllViewButton = ({onClick}) => {
    return(
        <button className="AllViewButton" onClick={onClick}>
            전체보기
        </button>
        
    )
}

export default AllViewButton;