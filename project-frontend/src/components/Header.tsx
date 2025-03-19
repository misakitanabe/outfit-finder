import { useState, useEffect } from "react";
import "./styles/Components.css";
import { Link } from "react-router";
import { IoPersonCircleOutline } from "react-icons/io5";

function Header() {
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
            <Link className="profile-link" to="/login">
                <IoPersonCircleOutline className="profile" 
                    // style={{ color: 'pink' }} 
                />
            </Link>
                
        </header>
    );
}

export default Header;