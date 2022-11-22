import { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRouteUnLogged({ children, redirectTo="/login" }) {

    const { token } = useContext(Context);

    if(!token) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />;

};

export function ProtectedRouteLogged({ children, redirectTo="/" }) {

    const { token } = useContext(Context);

    if(token) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />;

};