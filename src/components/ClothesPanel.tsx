import "./styles/Components.css";
import ItemSquare from "./ItemSquare";

interface ClothingItem {
    category: string;
    path: string;
    wornFrequency: number;
}

interface ClothesPanelProps {
    filter?: string; // Optional filter for category
    clothes: ClothingItem[]; // Array of clothing items
    sortValue: string; 
}

function ClothesPanel(props : ClothesPanelProps) {
    return (
        <div className="clothes-panel-container">
            {props.clothes
                .filter(item => !props.filter || item.category === props.filter.toLowerCase()) 
                .sort((a, b) => props.sortValue === "frequency" ? b.wornFrequency - a.wornFrequency : 0) 
                .map((item, index) => (
                    <ItemSquare key={index} category={item.category} path={item.path} />
                ))}
        </div>
    );
}

export default ClothesPanel;
