import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderDesktop({ logout }) {
    return (
        <div className="contain-desktop">
            <Link className="links-menu" to={"/"}>
                Tareas
            </Link>
            <Link className="links-menu" to={"/update-user"}>
                Editar usuario
            </Link>
            <button onClick={logout} id="bt-menu" className="button">
                Cerrar sesión
            </button>

        </div>
    )
}
