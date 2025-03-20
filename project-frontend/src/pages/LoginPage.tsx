import { UsernamePasswordForm } from "../components/UsernamePasswordForm";
import { sendPostRequest } from "../auth/sendPostRequest";
import { Link } from "react-router";
import { useNavigate } from 'react-router';
import Header from "../components/Header"
import './styles/Pages.css'


interface OnSubmitResponse {
    type: "error" | "success";
    message: string;
}

interface LoginPageProps {
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginPage(props: LoginPageProps) {
    const navigate = useNavigate();

    async function onSubmit(username: string | null, password: string | null): Promise<OnSubmitResponse> {
        const response = await sendPostRequest('/auth/login', { username: username, password: password });
        if (!response) {
            return({
                type: "error",
                message: "Failed to send Post request to /auth/login",
            });
        }
        const data = await response.json();

        if (response.status === 400) {
            return({
                type: "error",
                message: data.message,
            });
        } else if (response.status >= 500) {
            return({
                type: "error",
                message: "Server error",
            });
        } else if (response.status === 401) {
            return({
                type: "error",
                message: data.message,
            });
        } else {
            console.log('token:', data.token);
            props.setAuthToken(data.token);
            navigate("/upload");
            return({
                type: "success",
                message: "successful login",
            });
        }
    }

    return (
        <div className="basic-page">
            <Header></Header>
            <main className="basic-content">
                <h1>Login</h1>
                <UsernamePasswordForm onSubmit={onSubmit} />
                <p>
                    Don't have an account? 
                    <Link to="/register"> Register Here</Link>
                </p>
            </main>
        </div>    
    );
}