import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router'

const r = document.getElementById('root');
if (r) {
    createRoot(r).render(
        <StrictMode>
           <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>,
    )
}