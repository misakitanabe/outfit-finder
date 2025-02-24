import "./styles/Components.css";

function Dropdown(props) {
    console.log(props)
    return (
        <div className="dropdown-container">
            <label htmlFor="options" className="dropdown-label">
                {props.label}
            </label>
            <select className="dropdown" id="options" name="options">
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
