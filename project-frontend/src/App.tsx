import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import Upload from "./pages/Upload";
import Build from './pages/Build'
import Home from './pages/Home';
import Clothes from './pages/Clothes';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './auth/ProtectedRoute';

function App() {
    const [itemName, setItemName] = useState("");
    const [authToken, setAuthToken] = useState("");

    return (
        <Routes>
            {/* TODO: UNCOMMENT PROTECTED ROUTES LATER */}
            {/* Home Page */}
            {/* <Route 
                path="/" 
                element={
                    <Home />
                } 
            /> */}

            {/* My Clothes Page */}
            {/* <Route 
                path="/clothes" 
                element={<ProtectedRoute authToken={authToken} >
                    <Clothes />
                </ProtectedRoute>} 
            /> */}

            {/* Upload Page */}
            {/* <Route 
                path="/upload" 
                element={<ProtectedRoute authToken={authToken} >
                    <Upload onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />
                </ProtectedRoute>} 
            /> */}

            {/* Build Page */}
            {/* <Route 
                path="/build" 
                element={<ProtectedRoute authToken={authToken} >
                    <Build onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />
                </ProtectedRoute>} 
            /> */}
            
            {/* Register new user Page */}
            <Route path="/register" element={<RegisterPage setAuthToken={setAuthToken}  />} />

            {/* Login Page */}
            <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />

            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/upload" element={<Upload onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />} />
            <Route path="/build" element={<Build onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />} />

        </Routes>
    )
}

export default App;
