import { useState, useEffect } from "react";
import { getAccessToken } from "@/config";

export const useAuthListener = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const { accessToken } = getAccessToken();
            setIsLoggedIn(!!accessToken);
        };

        checkAuth();

        window.addEventListener("authChange", checkAuth);
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("authChange", checkAuth);
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    return { isLoggedIn, setIsLoggedIn };
};
