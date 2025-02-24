import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import Upload from "./pages/Upload";
import Build from './pages/Build'
import Home from './pages/Home';

function App() {
    const [itemName, setItemName] = useState("");

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />} />
            <Route path="/build" element={<Build />} />
        </Routes>
    )
}

export default App;
