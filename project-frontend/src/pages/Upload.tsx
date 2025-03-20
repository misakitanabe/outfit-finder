import { useState, useActionState } from "react";
import { IoHeart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import BounceLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import './styles/Pages.css'

interface UploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    itemName: string;
    authToken: string;
}

function Upload(props : UploadProps) {
    const [category, setCategory] = useState("tops");
    const [color, setColor] = useState("red");
    const [isFavorite, setIsFavorite] = useState(false);
    const [dataUrl, setDataUrl] = useState("");
    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: FormData) => {
            const image = formData.get("image");
            const name = formData.get("name");
            if (!name || !image) {
                return {
                    type: "error",
                    message: `Please input both name and image`,
                };
            }
            formData.append("category", category); 
            formData.append("color", color);

            try {
                const response = await fetch("/api/images", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${props.authToken}`,
                    }
                });
                if (!response.ok) {
                    // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
                    return {
                        type: "error",
                        message: `Client error`,
                    };
                }
                return {
                    type: "success",
                    message: `Successfully uploaded image!`,
                };
            } catch (error) { // Network error
                console.error(error);
                return {
                    type: "error",
                    message: `Something went wrong`,
                };
            }
        },
        null
    );

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

    const handleHeartClick = () => {
        setIsFavorite(!isFavorite);

        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites", {
            position: "top-right",
            autoClose: 1000, 
            hideProgressBar: true,
        });
    }

    // const handleSaveClick = async () => {
    //     while (!result) {
    //         await new Promise(resolve => setTimeout(resolve, 100));
    //     }
    //     if (result.type === "success") {
    //         toast.success(result.message, {
    //             position: "top-right",
    //             autoClose: 1000, 
    //             hideProgressBar: true,
    //         }) 
    //     } else {
    //         toast.error(result.message, {
    //             position: "top-right",
    //             autoClose: 1000, 
    //             hideProgressBar: true,
    //         }) 
    //     }
    // }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const fileObj = e.target.files[0];
            try {
                const url = await readAsDataURL(fileObj);
                if (typeof url === "string") {
                    setDataUrl(url);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    function readAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
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

            <form action={submitAction} className="uploading-form">
                <div className="uploading-input">
                    <label>
                        Choose Item: 
                        <input
                            name="image"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
                
                <div className="name-input-container">
                    <label>
                        <span>Image title: </span>
                        <input name="name" className="item-name-input" />
                    </label>
                </div>

                <div className="preview-image"> {/* Preview img element */}
                    {isPending && <BounceLoader
                        color='var(--color-link)'
                        loading={isPending}
                        cssOverride={{flexShrink: 0, position: 'relative', top: '40%'}}
                        size={50}
                        aria-label="Loading Spinner"
                    />}
                    <img style={{maxWidth: "20em", position: "relative", top: "3em", left: "5em"}} src={dataUrl} alt="" />
                </div>

                {/* dropdown options */}
                <div className="row-container">
                    <Dropdown label='Category' options={categories} handleDropdownChange={(e) => {setCategory(e.target.value)}} />
                    <Dropdown label='Color' options={colors} handleDropdownChange={(e) => {setColor(e.target.value)}}/>
                </div>

                {result && (
                    result.type=== "success" 
                    ?
                    toast.success("Succesfully saved", {
                        position: "top-right",
                        autoClose: 1000, 
                        hideProgressBar: true,
                    }) 
                    :
                    toast.error(result.message, {
                        position: "top-right",
                        autoClose: 1000, 
                        hideProgressBar: true,
                    }) 
                )}

                {/* save button */}
                <button disabled={isPending} className="save-button" 
                // onClick={handleSaveClick}
                >Save</button>

            </form>
            
        </div>
    );
}

export default Upload;