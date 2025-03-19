import "./styles/Components.css";

interface CategorySquareProps {
    style?: React.CSSProperties; 
    label: string;
    path: string;
}

function CategorySquare(props : CategorySquareProps) {
    return (
        <div style={props.style} className="category-square">
            <div className="category-image-container">
                <img src={props.path} alt="green top" className="category-image"/>
            </div>
            <label>{props.label}</label>
        </div>
    );
}

export default CategorySquare;