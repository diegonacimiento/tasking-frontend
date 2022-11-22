import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./menuBar.css";
import { VscClose } from "react-icons/vsc";

export default function MenuBar() {

    const { menuNone, setToken } = useContext(Context);

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
        menuNone();
    };


    return(<>
        <button onClick={menuNone} className="menu-bar__button"><VscClose /></button>
        <div className="contain-menu">
            <Link onClick={menuNone} className="links-menu" to={"/"}>Tareas</Link>
            <Link onClick={menuNone} className="links-menu" to={"/update-user"}>Editar usuario</Link>
            <button onClick={logout} id="bt-menu" className="button">Cerrar sesión</button>
        </div>
    </>
    );
};