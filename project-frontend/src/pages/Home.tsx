import Header from "../components/Header"
import './styles/Pages.css'

function Home() {
    return (
        <div className="basic-page">
            <Header></Header>
            <main className="basic-content">
                <h1>Welcome to Fit Slayer</h1>
                <p className="home-text">Upload photos of YOUR clothes and start building outfits that are a slay!</p>
            </main>
        </div>
    );
}

export default Home;