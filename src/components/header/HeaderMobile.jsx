import React, { useState } from 'react'
import Menu from '../../../Menu'
import Drawer from '../drawer/Drawer'
import { HiOutlineMenu } from 'react-icons/hi'

export default function HeaderMobile() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function handleDrawer() {
        setIsDrawerOpen(prevState => !prevState);
    }
    return (
        <>
            <Menu>
                <Drawer isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />{" "}
            </Menu>
            <button onClick={handleDrawer} className="drawer">
                {<HiOutlineMenu />}
            </button>
        </>
    )
}
