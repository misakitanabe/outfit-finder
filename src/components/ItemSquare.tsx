import "./styles/Components.css";

interface ItemSquareProps {
    category: string;
    path: string;
}

function ItemSquare(props : ItemSquareProps) {
    return (
        <div className="item-image-container">
            <img src={props.path} alt="green top" className="category-image"/>
        </div>
    );
}

export default ItemSquare;