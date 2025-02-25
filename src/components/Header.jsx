import "./styles/Components.css";
import { Link } from "react-router";

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <nav>
                <Link className="header-link" to="/">Home</Link>
                <Link className="header-link" to="/clothes">My Clothes</Link>
                <Link className="header-link" to="/upload">Upload Items</Link>
                <Link className="header-link" to="/build">Build Outfit</Link>
            </nav>
        </header>
    );
}

export default Header;