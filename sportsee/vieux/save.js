import React, { useEffect, useState } from 'react';
import ApportAside from './aside';

import caloriesIcon from '../../assets/img/calories-icon.png';
import proteinIcon from '../../assets/img/protein-icon.png';
import carbsIcon from '../../assets/img/carbs-icon.png';
import lipidIcon from '../../assets/img/fat-icon.png';

import './apport.scss';
import { fetchUserData } from '../../service/api';

const Apport = ({userId}) => {

    const [data, setData] = useState([]);
    //console.log(data);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/user/${userId}`)
    //     .then(response => response.json())
    //     .then(response => {
    
    //         // OK j'ai une réponse
    //         setTimeout(() => {
    //             setData([
    //                 {title: 'Calories', unit: 'kCal', value: response.data.keyData.calorieCount, image: caloriesIcon},
    //                 {title: 'Proteines', unit: 'g', value: response.data.keyData.proteinCount, image: proteinIcon},
    //                 {title: 'Glucides', unit: 'g', value: response.data.keyData.carbohydrateCount, image: carbsIcon},
    //                 {title: 'Lipides', unit: 'g', value: response.data.keyData.lipidCount, image: lipidIcon},            
    //             ])
    //             setIsLoading(false)
    //         }, 1000) 
  
    //     })
    //     .catch(error =>{
    //         // KO j'ai une erreur
    //         console.error('Error fetching user data:', error)
    //         setIsError(true);
    //     });
    // }, [userId]);

    useEffect(() => {

        fetchUserData(userId)
            .then(userData => {
                setData([
                    { title: 'Calories', unit: 'kCal', value: userData.keyData.calorieCount, image: caloriesIcon },
                    { title: 'Protéines', unit: 'g', value: userData.keyData.proteinCount, image: proteinIcon },
                    { title: 'Glucides', unit: 'g', value: userData.keyData.carbohydrateCount, image: carbsIcon },
                    { title: 'Lipides', unit: 'g', value: userData.keyData.lipidCount, image: lipidIcon },
                ]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsError(true);
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, [userId]);

    
    if(isError) {
        return <p>Une erreur est survenue.</p>
    }

    if(isLoading) {
        return <p>Chargement en cours</p>
    }

    return (
        <div className='apportBlock'>
            {data.map((item, index) => (
                <ApportAside key={index} unit={item.unit} title={item.title} value={item.value} image={item.image} />
            ))}
        </div>
    );
};

export default Apport;




// userService.js
import UserFactory from '../factories/userFactory';
import UserActivityFactory from '../factories/userActivityFactory';
import UserSessionFactory from '../factories/userSessionFactory';
import UserScoreFactory from '../factories/userScoreFactory';
import UserPerformanceFactory from '../factories/userPerformanceFactory';


// Objectifs du service : 
// - Aller chercher les données sur le serveur (fetch, axios, ..)
// - Les formater (factories)
// - Les restituer à l'application (return)

const UserService = {
    /**
     * Récupère les données de l'utilisateur sur le serveur et les formate avec la factory associée.
     * 
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données doivent être récupérées.
     * @returns {Promise<UserFactory>} - Une promesse qui résout une instance de `UserFactory` contenant les données utilisateur formatées.
     */
    async getUser(userId) {
     const newObjectToUse =  await fetch(`http://localhost:3000/user/${userId}`) // Récupère l'objet response
        .then(response => {
            return response.json() // Récupère le contenu body au format json de l'objet response
        })
        .then(resultsFromApi => {
            console.log(resultsFromApi)
            const newObject = new UserFactory(resultsFromApi)
            console.log(newObject)
            return newObject
        })

        return newObjectToUse
    },


    /**
     * Récupère les données d'activité de l'utilisateur sur le serveur et les formate avec la factory associée
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données d'activité doivent être récupérées.
     * @returns {Promise<UserActivityFactory>} - Une promesse qui résout une instance de `UserActivityFactory` contenant les données d'activité formatées.
     */
    async getActivity(userId) {
        return await fetch(`http://localhost:3000/user/${userId}/activity`) // Récupère l'objet response
        .then(response => response.json())
        .then(resultsFromApi => new UserActivityFactory(resultsFromApi))
    },

    /**
     * Récupère les données de la session de l'utilisateur sur le serveur et les formate avec la factory associée
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de session doivent être récupérées.
     * @returns {Promise<UserSessionFactory>} - Une promesse qui résout une instance de `UserSessionFactory` contenant les données de session formatées.
     */
    async getSession(userId) {
        return await fetch(`http://localhost:3000/user/${userId}/average-sessions`) // Récupère l'objet response
        .then(response => response.json())
        .then(resultsFromApi => new UserSessionFactory(resultsFromApi))
    },

    /**
     * Récupère les données de la session de l'utilisateur sur le serveur et les formate avec la factory associée
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de performance doivent être récupérées.
     * @returns {Promise<UserPerformanceFactory>} - Une promesse qui résout une instance de `UserPerformanceFactory` contenant les données de performance formatées.
     */
    async getPerformance(userId) {
        return await fetch(`http://localhost:3000/user/${userId}/performance`) // Récupère l'objet response
        .then(response => response.json())
        //.then(resultsFromApi => new UserPerformanceFactory(resultsFromApi))
        .then(resultsFromApi => {
            const userPerformanceFactory = new UserPerformanceFactory(resultsFromApi);
            console.log(userPerformanceFactory);
            return userPerformanceFactory;
            
        })
    },

    /**
     * Récupère les données du score de l'utilisateur sur le serveur et les formate avec la factory associée
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de score doivent être récupérées.
     * @returns {Promise<UserScoreFactory>} - Une promesse qui résout une instance de `UserScoreFactory` contenant les données de score formatées.
     */

    async getScore(userId) {
        return await fetch(`http://localhost:3000/user/${userId}`)
        .then(response => response.json())
        .then(resultsFromApi => new UserScoreFactory(resultsFromApi))
        // .then(resultsFromApi => {
        //     const userScoreFactory = new UserScoreFactory(resultsFromApi);
        //     // Log de la valeur finale
        //     //console.log(userScoreFactory.score);
        //     return userScoreFactory;
        // });
    }

    // async getScore(userId) {
    //     return await fetch(`http://localhost:3000/user/${userId}`) // Récupère l'objet response
    //     .then(response => response.json())
    //     .then(resultsFromApi => {
    //         const userScoreFactory = new UserScoreFactory(resultsFromApi);
            
    //         // Formater les données pour le graphique
    //         const formattedData = [
    //             { name: 'Score', value: userScoreFactory.score * 100, fill: '#FF0000' }
    //         ];
            
    //         return {
    //             formattedData,
    //             percentage: userScoreFactory.score
    //         };
    //     });
    // },
}

export default UserService;