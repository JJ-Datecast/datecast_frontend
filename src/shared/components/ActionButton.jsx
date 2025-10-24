import "../css/ActionButton.css";

const ActionButton = ({onClick, children,type}) => {
    return (
        <button 
            className={`ActionButton ActionButton_${type}`}
            onClick={onClick}
        > {children}

        </button>
    )
}

export default ActionButton;