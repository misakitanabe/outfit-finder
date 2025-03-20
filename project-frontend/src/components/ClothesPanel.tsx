import "./styles/Components.css";
import ItemSquare from "./ItemSquare";

interface ClothingItem {
    id: string;
    src: string;
    name: string;
    author: string;
    wornFrequency: number;
    category: string;
    color: string;
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
                    <ItemSquare key={index} category={item.category} path={item.src} />
                ))}
        </div>
    );
}

export default ClothesPanel;
