import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import './styles/Pages.css'

function Upload(props) {
    const [image, setImage] = useState("../../images/green-top.jpg");

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setImage(URL.createObjectURL(file)); 
        }
    };

    return (
        <div className="upload-page">
            <Header title="Upload Item"></Header>
            <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
            <IoHeart className="heart" />

            {/* image uploading box */}
            <input className="uploading-input" type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="image-container">
                {image && <UploadedImage src={image} />}
            </div>

            {/* dropdown options */}
            <div className="row-container">
                <Dropdown label='Category' options={categories} />
                <Dropdown label='Color' options={colors} />
            </div>
            <button className="save-button">Save</button>
                
        </div>
    );
}

export default Upload;