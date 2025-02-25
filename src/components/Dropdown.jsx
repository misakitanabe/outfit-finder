import "./styles/Components.css";

function Dropdown(props) {
    return (
        <div className="dropdown-container" style={props.containerStyle}>
            <label htmlFor="options" className="dropdown-label">
                {props.label}
            </label>
            <select className="dropdown" onChange={props.handleDropdownChange} id="options" name="options" style={props.dropdownStyle}>
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
