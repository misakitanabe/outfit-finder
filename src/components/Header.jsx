import { useState, useEffect } from "react";
import "./styles/Components.css";
import { Link } from "react-router";

function Header(props) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDark]); 

    const handleDarkModeChange = () => {
        setIsDark(!isDark);
    }

    return (
        <header>
            <h1>{props.title}</h1>
            <nav>
                <Link className="header-link" to="/">Home</Link>
                <Link className="header-link" to="/clothes">My Clothes</Link>
                <Link className="header-link" to="/upload">Upload Items</Link>
                <Link className="header-link" to="/build">Build Outfit</Link>
            </nav>
            <label className="dark-mode-checkbox">
                <input onChange={handleDarkModeChange} type="checkbox" autoComplete="off" />
                Dark mode
            </label>
        </header>
    );
}

export default Header;