import { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function ProtectedRouteUnLogged({ children, redirectTo = "/login" }) {
  const { token, setToken } = useContext(Context);

  const decoded = jwtDecode(token);

  const timeNow = decoded.exp;
  const timeToken = decoded.iat;

  if (timeNow - timeToken > 259200) {
    localStorage.removeItem("token");
    setToken(localStorage.getItem("token"));
  }

  if (!token) return <Navigate to={redirectTo} />;

  return children ? children : <Outlet />;
}

export function ProtectedRouteLogged({ children, redirectTo = "/" }) {
  const { token } = useContext(Context);

  if (token) return <Navigate to={redirectTo} />;

  return children ? children : <Outlet />;
}

export function ProtectedRecoveryPass({ children, redirectTo = "/" }) {
  const uri = window.location.href;

  const contain = uri.includes("?token=ey");

  if (!contain) return <Navigate to={redirectTo} />;

  return children ? children : <Outlet />;
}
