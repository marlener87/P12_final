import React from 'react';

/**
 * Composant `ApportAside` qui affiche un apport individuel avec son titre, sa valeur, son unité et une image associée.
 * 
 * @component
 * @param {Object} props - Les propriétés passées au composant.
 * @param {string} props.title - Le titre de l'apport.
 * @param {string} props.unit - L'unité de mesure de la valeur.
 * @param {number|string} props.value - La valeur de l'apport.
 * @param {string} props.image - L'URL de l'image associée à l'apport.
 * @returns {JSX.Element} Le rendu du composant ApportAside.
 */
const ApportAside = ({title, unit, value, image}) => {

    return (
    <div className="apportAside">
        <img src={image} alt={title} className='iconApport' />

        <div className="values">
            <h2>{value}{unit}</h2>
            <p>{title}</p>
        </div>  
    </div>
    )
}

export default ApportAside;