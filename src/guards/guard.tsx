import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { getAccessToken } from "@/config";

interface GuardProps {
    children: JSX.Element;
    requireAuth?: boolean;
    redirectTo?: string;
}

export const Guard = ({
    children,
    requireAuth = false,
    redirectTo = "/",
}: GuardProps) => {
    const { accessToken, refreshToken } = getAccessToken();

    if (requireAuth && !accessToken && !refreshToken) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!requireAuth && accessToken && !refreshToken) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};
