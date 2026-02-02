import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

interface Props {
    children: React.ReactNode;
    allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
    const token = Cookies.get("token");
    const rol = Cookies.get("rol");

    if (!token) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(rol || "")) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}
