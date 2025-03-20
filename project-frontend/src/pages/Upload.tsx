import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import BounceLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import { ImageUploadForm } from "../components/ImageUploadForm";
import './styles/Pages.css'

interface UploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    itemName: string;
    authToken: string;
}

function Upload(props : UploadProps) {
    const [image, setImage] = useState<string | null>(null);
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]; 
            if (file) {
                setImage(URL.createObjectURL(file)); 
            }
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
            <Header></Header>
            <ToastContainer />

            {/* favorites button */}
            <button className="heart-button" onClick={handleHeartClick}>
                {isFavorite ? <IoHeart className="heart" style={{ color: 'pink' }} /> : <IoHeart className="heart"/>}
            </button>

            <h3><ImageUploadForm authToken={props.authToken} category={category} color={color} /></h3>


            {/* name input */}
            {/* <label className="item-name-input">
                Name Item
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
            </label> */}
            
            {/* image uploading box */}
            {/* <input className="uploading-input" type="file" accept="image/*" onChange={handleImageUpload} />
            
            <div className="image-container">
                {!image && <BounceLoader
                    color='var(--color-link)'
                    loading={!image}
                    cssOverride={{flexShrink: 0, position: 'relative', top: '40%'}}
                    size={50}
                    aria-label="Loading Spinner"
                />}
                {image && <UploadedImage src={image} />}
            </div> */}

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