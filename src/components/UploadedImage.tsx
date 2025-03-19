import "./styles/Components.css";

interface UploadedImageProps {
    src: string;
}

function UploadedImage(props : UploadedImageProps) {
    return (
        <img src={props.src} alt="green top" className="uploaded-image"/>
    )
}

export default UploadedImage;