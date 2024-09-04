import React from 'react';
import './navbarVerticale.scss';
import assis from "../../assets/img/assis.png"
import nage from "../../assets/img/nage.png"
import velo from "../../assets/img/velo.png"
import haltere from "../../assets/img/haltere.png"
import { NavLink } from 'react-router-dom';

/**
 * Composant `NavbarVerticale` qui affiche une barre de navigation verticale avec des icônes et un message de copyright.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant NavbarVerticale.
 */
const NavbarVerticale = () => {
    return (
        <nav className='navVerticale'>
            <div className="icons">
                <NavLink><img src={assis} alt="assis" className='iconNavbar' /></NavLink> 
                <NavLink><img src={nage} alt="nage" className='iconNavbar' /></NavLink>
                <NavLink><img src={velo} alt="velo" className='iconNavbar' /></NavLink>
                <NavLink><img src={haltere} alt="haltere" className='iconNavbar' /></NavLink>
            </div>
            
            <p>Copyright SportSee 2024</p>
        </nav>
    );
};

export default NavbarVerticale;