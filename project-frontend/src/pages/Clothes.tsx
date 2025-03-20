import Header from "../components/Header"
import ImageDisplayTabs from "../components/ImageDisplayTabs";
import 'react-tabs/style/react-tabs.css';
import './styles/Pages.css'

interface ClothingItem {
    id: string;
    src: string;
    name: string;
    author: string;
    wornFrequency: number;
    category: string;
    color: string;
}

interface ClothesProps {
    isLoading: boolean;
    images: ClothingItem[];
}

function Clothes(props: ClothesProps) {
    const categories = [
        { value: "tops", label: "Tops" },
        { value: "pants", label: "Pants" },
        { value: "skirts", label: "Skirts" },
        { value: "shoes", label: "Shoes" },
        { value: "accessories", label: "Accessories" },
        { value: "jackets", label: "Jackets" },
    ];

    return (
        <div className="clothes-page">
            <Header></Header>
            <main className="clothes-content">
                <h1>My Clothes</h1>
                <ImageDisplayTabs filters={categories} isLoading={props.isLoading} images={props.images} />
            </main>
        </div>
    );
}

export default Clothes;