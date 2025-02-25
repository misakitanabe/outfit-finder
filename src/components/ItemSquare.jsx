import "./styles/Components.css";

function ItemSquare(props) {
    return (
        <div className="item-image-container">
            <img src={props.path} alt="green top" className="category-image"/>
        </div>
    );
}

export default ItemSquare;