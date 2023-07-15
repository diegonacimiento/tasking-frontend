import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({ logout, toggleDrawer = () => {} }) {
    function handleLogout() {
        toggleDrawer();
        logout();
    }
    return (
        <>
            <Link onClick={toggleDrawer} className="links-nav-bar" to={"/"}>
                Tareas
            </Link>
            <Link onClick={toggleDrawer} className="links-nav-bar" to={"/update-user"}>
                Editar usuario
            </Link>
            <button title='Cerrar sesión' onClick={handleLogout} id="bt-nav-bar" className="button">
                Cerrar sesión
            </button>
        </>
    )
}
