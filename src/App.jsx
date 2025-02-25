import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import Upload from "./pages/Upload";
import Build from './pages/Build'
import Home from './pages/Home';
import Clothes from './pages/Clothes';

function App() {
    const [itemName, setItemName] = useState("");

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/upload" element={<Upload onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />} />
            <Route path="/build" element={<Build />} />
        </Routes>
    )
}

export default App;
