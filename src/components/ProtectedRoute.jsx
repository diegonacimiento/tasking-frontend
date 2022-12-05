import { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRouteUnLogged({ children, redirectTo="/login" }) {

    const { token, setToken } = useContext(Context);

    const timeToken = localStorage.getItem("timeToken");

    const timeNow = Date.now();

    if(timeNow - timeToken == 259200000 ) {
        localStorage.removeItem("timeToken");
        localStorage.removeItem("token");
        setToken(localStorage.getItem("token"));
    };

    if(!token) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />;

};

export function ProtectedRouteLogged({ children, redirectTo="/" }) {

    const { token } = useContext(Context);

    if(token) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />;

};

export function ProtectedRecoveryPass({ children, redirectTo="/" }) {

    const uri = window.location.href;

    const contain = uri.includes("?token=ey");

    if(!contain) return <Navigate to={redirectTo} />

    return children ? children : <Outlet />;

};