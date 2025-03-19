import { Navigate } from "react-router";

interface ProtectedRouteProps {
    authToken: string;
    children: React.ReactNode;
}

export function ProtectedRoute(props : ProtectedRouteProps) {
    if (!props.authToken) {
        console.log("redirecting to login");
        return <Navigate to="/login" replace />
    }

    return props.children;
}