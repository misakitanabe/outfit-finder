import Header from "../components/Header"
import ImageDisplayTabs from "../components/ImageDisplayTabs";
import 'react-tabs/style/react-tabs.css';
import './styles/Pages.css'

function Clothes() {
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
                <ImageDisplayTabs filters={categories} />
            </main>
        </div>
    );
}

export default Clothes;