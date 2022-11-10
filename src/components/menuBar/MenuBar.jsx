import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./menuBar.css";

export default function MenuBar() {

    const { menuNone } = useContext(Context);

    const navigate = useNavigate();

    function logout() {
        navigate("/login");
        menuNone();
    };

    return(<>
        <div id="contain-menu">
            <Link onClick={menuNone} className="links-menu" to={"/login"}>Tareas</Link>
            <Link onClick={menuNone} className="links-menu" to={"/update-user"}>Editar usuario</Link>
            <button onClick={logout} id="bt-menu" className="button">Cerrar sesión</button>
        </div>
    </>
    );
};