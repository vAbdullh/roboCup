import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { helix } from 'ldrs'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <l-helix
            size="45"
            speed="2.5"
            color="black"
        >adsjfkajd</l-helix >;
    }

    return user ? children : null;
};

export default ProtectedRoute;

helix.register()

// Default values shown
