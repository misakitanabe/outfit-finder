import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import CategorySquare from "../components/CategorySquare"
import './styles/Pages.css'

function Build(props) {
    const [isFavorite, setIsFavorite] = useState(false);

    const occasions = [
        { value: "default", label: "Default" },
        { value: "casual", label: "Casual" },
        { value: "going out", label: "Going Out" },
        { value: "athletic", label: "Athletic" },
        { value: "work", label: "Work" },
        { value: "formal", label: "Formal" },
    ];

    const handleHeartClick = () => {
        setIsFavorite(!isFavorite);

        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites", {
            position: "top-right",
            autoClose: 1000, 
            hideProgressBar: true,
        });
    }

    const handleSaveClick = () => {
        toast.success("Succesfully saved", {
            position: "top-right",
            autoClose: 1000, 
            hideProgressBar: true,
        });
    }

    return (
        <div className="upload-page">
            <Header title="Build Outfit"></Header>
            <ToastContainer />

            {/* favorites button */}
            <button className="heart-button" onClick={handleHeartClick}>
                {isFavorite ? <IoHeart className="heart" style={{ color: 'pink' }} /> : <IoHeart className="heart"/>}
            </button>

            {/* top row containing name input and category dropdown */}
            <div className="row-container">
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Outfit" className="outfit-name-input"/>
                <div className="category-container-build">
                    <Dropdown label='Occasions' options={occasions} />
                </div>
            </div>

            {/* outfit building box */}
            <div className="image-container">
                <UploadedImage src="../../images/green-top.jpg" />
            </div>
            
            {/* clothing categories */}
            <p className="choose-text">Choose from your:</p>
            <section className="category-squares-grid">
                    <CategorySquare style={{ gridRow: 1, gridCol: 1 }} label="Tops" path="../../images/green-top.jpg" />
                    <CategorySquare style={{ gridRow: 1, gridCol: 2 }} label="Pants" path="../../images/jeans.png"/>
                    <CategorySquare style={{ gridRow: 1, gridCol: 3 }} label="Skirts" path="../../images/pink-skirt.webp"/>
                    <CategorySquare style={{ gridRow: 2, gridCol: 1 }} label="Shoes" path="../../images/shoe.jpg"/>
                    <CategorySquare style={{ gridRow: 2, gridCol: 2 }} label="Jackets" path="../../images/jacket.png"/>
                    <CategorySquare style={{ gridRow: 2, gridCol: 3 }} label="Accessories" path="../../images/necklace.jpg" />   
                
            </section>

            {/* save button */}
            <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
    );
}

export default Build;