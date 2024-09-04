import React from 'react';
import './navbarHorizontale.scss';
import { Link, NavLink } from 'react-router-dom';
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
            <Link to="/">
                <img className='logo' src={logo} alt='logo du site Sportsee' />
            </Link>

            <nav className='navHorizontale'>
                <NavLink className='navbarLink' >Accueil</NavLink>
                <NavLink className='navbarLink' >Profil</NavLink>
                <NavLink className='navbarLink' >Réglage</NavLink>
                <NavLink className='navbarLink' >Communauté</NavLink>
            </nav>
        </header>
    );
};

export default NavbarHorizontale;