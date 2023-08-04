import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import Drawer from '../drawer/Drawer';
import Menu from '../../../Menu';

const style = document.documentElement.style;

const root = document.getElementById("root");

export default function HeaderMobile({ logout }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function toggleDrawer() {
        setIsDrawerOpen(prevState => !prevState);
        !isDrawerOpen
            ? (style.setProperty("--left", "0"),
                setTimeout(() => {
                    root.setAttribute("style", "display:none");
                }, 500))
            : (style.setProperty("--left", "-2000px"), root.removeAttribute("style"));
    }
    return (
        <>
            <Menu>
                <Drawer toggleDrawer={toggleDrawer} logout={logout} />{" "}
            </Menu>
            <button onClick={toggleDrawer} className="drawer" title='Abrir cajón' type='button'>
                {<HiOutlineMenu />}
            </button>
        </>
    )
}
