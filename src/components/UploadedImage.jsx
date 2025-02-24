import "./styles/Components.css";

function UploadedImage(props) {
    return (
        <img src={props.src} alt="green top" className="uploaded-image"/>
    )
}

export default UploadedImage;