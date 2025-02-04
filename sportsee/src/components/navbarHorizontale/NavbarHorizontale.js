import React from 'react';
import './navbarHorizontale.scss';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/img/logo.png";

/**
 * Composant `NavbarHorizontale` qui affiche une barre de navigation horizontale avec un logo et des liens de navigation.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant NavbarHorizontale.
 */
const NavbarHorizontale = () => {
    return (
        <header className='headerHorizontal'>
            <img className='logo' src={logo} alt='logo du site Sportsee' />
            <nav className='navbar'>
                <ul class='navbarList'>
                    <li className='navbarItem'><NavLink className='navbarLink' >Accueil</NavLink></li>
                    <li className='navbarItem'><NavLink className='navbarLink' >Profil</NavLink></li>
                    <li className='navbarItem'><NavLink className='navbarLink' >Réglages</NavLink></li>
                    <li className='navbarItem'><NavLink className='navbarLink' >Communauté</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default NavbarHorizontale;