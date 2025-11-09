import "../css/CategoryButton.css";

const CategoryButton = ({isClicked,name,onClick}) => {
    return(
            <button 
                className={`CategoryButton ${isClicked ? "active" : ""}`}
                onClick={onClick}
            >
                {name}
            </button>
    )
}

export default CategoryButton;