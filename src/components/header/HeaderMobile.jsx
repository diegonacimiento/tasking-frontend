import React, { useState } from 'react';
import Menu from '../../../Menu';
import Drawer from '../drawer/Drawer';
import { HiOutlineMenu } from 'react-icons/hi';

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
            <button onClick={toggleDrawer} className="drawer">
                {<HiOutlineMenu />}
            </button>
        </>
    )
}
