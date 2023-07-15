import React from 'react';
import NavBar from '../navBar/NavBar';

export default function HeaderDesktop({ logout }) {
    return (
        <div className="contain-desktop">
            <NavBar logout={logout} />
        </div>
    )
}
