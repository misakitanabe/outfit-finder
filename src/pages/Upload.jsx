import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import './styles/Pages.css'

function Upload(props) {
    const [image, setImage] = useState("../../images/green-top.jpg");
    const [category, setCategory] = useState(null);
    const [color, setColor] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const categories = [
        { value: "tops", label: "Tops" },
        { value: "pants", label: "Pants" },
        { value: "skirts", label: "Skirts" },
        { value: "shoes", label: "Shoes" },
        { value: "accessories", label: "Accessories" },
        { value: "jackets", label: "Jackets" },
    ];

    const colors = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "orange", label: "Orange" },
        { value: "purple", label: "Purple" },
        { value: "pink", label: "Pink" },
        { value: "brown", label: "Brown" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "gray", label: "Gray" },
        { value: "teal", label: "Teal" },
        { value: "cyan", label: "Cyan" },
        { value: "magenta", label: "Magenta" },
        { value: "gold", label: "Gold" },
        { value: "silver", label: "Silver" }
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImage(URL.createObjectURL(file)); 
        }
    };

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
            <Header title="Upload Item"></Header>
            <ToastContainer />

            {/* favorites button */}
            <button className="heart-button" onClick={handleHeartClick}>
                {isFavorite ? <IoHeart className="heart" style={{ color: 'pink' }} /> : <IoHeart className="heart"/>}
            </button>

            {/* name input */}
            <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
            
            {/* image uploading box */}
            <input className="uploading-input" type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="image-container">
                {image && <UploadedImage src={image} />}
            </div>

            {/* dropdown options */}
            <div className="row-container">
                <Dropdown label='Category' options={categories} handleDropdownChange={(e) => {setCategory(e.target.value)}} />
                <Dropdown label='Color' options={colors} handleDropdownChange={(e) => {setColor(e.target.value)}}/>
            </div>

            {/* save button */}
            <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
    );
}

export default Upload;