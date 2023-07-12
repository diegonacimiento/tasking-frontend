import React from 'react'
import Menu from '../../../Menu'
import MenuBar from '../menuBar/MenuBar'
import { HiOutlineMenu } from 'react-icons/hi'

export default function HeaderMobile({ menuNone }) {
    return (
        <>
            <Menu>
                <MenuBar />{" "}
            </Menu>
            <button onClick={menuNone} className="menu">
                {<HiOutlineMenu />}
            </button>
        </>
    )
}
