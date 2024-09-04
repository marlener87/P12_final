import React, { useEffect, useState } from 'react';
import ApportAside from './aside';
import UserService from '../../services/userService';
import './apport.scss';

/**
 * Composant `Apport` qui affiche une liste des valeurs énergétiques pour un utilisateur spécifique.
 * 
 * @component
 * @param {Object} props - Les propriétés passées au composant.
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel récupérer les apports.
 * @returns {JSX.Element} Le rendu du composant Apport.
 */
const Apport = ({userId}) => {
    /** 
     * État pour stocker les données de l'utilisateur récupérées.
     * @type {[userFactory, Function]} 
     */
    const [userFactory, setUserFactory] = useState([]);

    /** 
     * État pour indiquer si les données sont en cours de chargement.
     * @type {[boolean, Function]} 
     */
    const [isLoading, setIsLoading] = useState(true);

    /** 
     * État pour indiquer si une erreur s'est produite lors de la récupération des données.
     * @type {[boolean, Function]} 
     */
    const [isError, setIsError] = useState(false);

    /**
     * Utilise `useEffect` pour récupérer les données utilisateur lorsque `userId` change.
     * @function
     * @returns {void}
     */
    useEffect(() => {
        const fetchData = async () => {
            const objectFromFactory = await UserService.getUser(userId)
            console.log(objectFromFactory.keyData)
            
            setUserFactory(objectFromFactory);
            setIsLoading(false)
        }
      
        fetchData()

    }, [userId])

    /**
     * Affiche un message de chargement si les données sont en cours de récupération.
     */
    if(isLoading) {
        return <p>Chargement en cours...</p>
    }

    /**
     * Affiche un message d'erreur si une erreur s'est produite lors de la récupération des données.
     */
    if(isError){
        return <p>Une erreur est survenue...</p>
    }

    // Je veux parcourir des données, et demander un affichage
    /**
     * Affiche la liste des apports de l'utilisateur.
     */
    return (
        <div className='apportBlock'>
            {userFactory.getApports().map((item, index) => (
                <ApportAside key={index} unit={item.unit} title={item.title} value={item.value} image={item.image} />
            ))}
        </div>
    );
};

export default Apport;