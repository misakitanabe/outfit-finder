import Header from "../components/Header"
import ImageDisplayTabs from "../components/ImageDisplayTabs";
import 'react-tabs/style/react-tabs.css';
import './styles/Pages.css'

function Clothes(props) {
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
            <Header title="My Clothes"></Header>
            <main className="clothes-content">
                <ImageDisplayTabs filters={categories} />
            </main>
        </div>
    );
}

export default Clothes;