import "../css/IntialButton.css";

const InitialButton = ({childern,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="InitailButton"
            
        >
            {childern}
        </button>
    )
}
export default InitialButton