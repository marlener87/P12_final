import UserFactory from '../factories/userFactory';
import UserActivityFactory from '../factories/userActivityFactory';
import UserSessionFactory from '../factories/userSessionFactory';
import UserScoreFactory from '../factories/userScoreFactory';
import UserPerformanceFactory from '../factories/userPerformanceFactory';

// Importation des données mockées depuis le fichier "mockData.js"
import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE,
} from "./mockData"; // Importation des données mockées

// URL de base de l'API backend
const API_BASE_URL = 'http://localhost:3000/user/';


// Objectifs du service : 
// - Aller chercher les données sur le serveur (fetch, axios, ..)
// - Les formater (factories)
// - Les restituer à l'application (return)


// Fonction pour vérifier si le backend est disponible et basculer sur les données mockées si nécessaire
// fonction qui effectue un appel 'fetch' à l'URL spécifiée, si l'appel échoue (ex : si le BE est hors ligne ou renvoie une erreur), elle bascule automatiquement sur les données mockées fournies
const fetchWithFallback = async (url, mockData) => {
    try {
        // Tente de faire un appel à l'API avec l'URL fournie
        const response = await fetch(url);
        // Vérifie si la réponse n'est pas valide (ex : code d'erreur HTTP)
        if (!response.ok) {
            // Si la réponse n'est pas valide, déclenche une erreur
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Si tout se passe bien, renvoie les données au format JSON
        return await response.json();
    } catch (error) {
        // En cas d'erreur (ex : BE indisponible), affiche un message d'erreur et renvoie les données mockées
        console.error(`Backend unavailable, using mock data: ${error}`);
        return { data: mockData };
    }
};

// Service utilisateur qui fournit les méthodes pour récupérer les données formatées
const UserService = {
    /**
     * Récupère les données de l'utilisateur sur le serveur et les formate avec la factory associée.
     * @param {number} userId - L'identifiant unique de l'utilisateur dont les données doivent être récupérées.
     * @returns {Promise<UserFactory>} - Une promesse qui résout une instance de `UserFactory` contenant les données utilisateur formatées.
     */
    async getUser(userId) {
        // Construit l'URL pour l'appel API
        const url = `${API_BASE_URL}${userId}`;
        // Trouve les données mockées correspondantes
        const mockData = USER_MAIN_DATA.find(user => user.id === userId);

        // Utilise fetchWithFallback pour obtenir les données depuis l'API ou les données mockées
        const resultsFromApi = await fetchWithFallback(url, mockData);
        return new UserFactory(resultsFromApi); // Formate les données avec la factory UserFactory
    },

    async getActivity(userId) {
        const url = `${API_BASE_URL}${userId}/activity`;
        const mockData = USER_ACTIVITY.find(activity => activity.userId === userId);

        const resultsFromApi = await fetchWithFallback(url, mockData);
        return new UserActivityFactory(resultsFromApi);
    },

    async getSession(userId) {
        const url = `${API_BASE_URL}${userId}/average-sessions`;
        const mockData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);

        const resultsFromApi = await fetchWithFallback(url, mockData);
        return new UserSessionFactory(resultsFromApi);
    },

    async getPerformance(userId) {
        const url = `${API_BASE_URL}${userId}/performance`;
        const mockData = USER_PERFORMANCE.find(performance => performance.userId === userId);

        const resultsFromApi = await fetchWithFallback(url, mockData);
        return new UserPerformanceFactory(resultsFromApi);
    },

    async getScore(userId) {
        const url = `${API_BASE_URL}${userId}`;
        const mockData = USER_MAIN_DATA.find(user => user.id === userId);

        const resultsFromApi = await fetchWithFallback(url, mockData);
        return new UserScoreFactory(resultsFromApi);
    }
}


export default UserService;























/*
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
/*    async getUser(userId) {
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
/*       async getActivity(userId) {
           return await fetch(`http://localhost:3000/user/${userId}/activity`) // Récupère l'objet response
           .then(response => response.json())
           .then(resultsFromApi => new UserActivityFactory(resultsFromApi))
       },
   
       /**
        * Récupère les données de la session de l'utilisateur sur le serveur et les formate avec la factory associée
        * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de session doivent être récupérées.
        * @returns {Promise<UserSessionFactory>} - Une promesse qui résout une instance de `UserSessionFactory` contenant les données de session formatées.
        */
/*       async getSession(userId) {
           return await fetch(`http://localhost:3000/user/${userId}/average-sessions`) // Récupère l'objet response
           .then(response => response.json())
           .then(resultsFromApi => new UserSessionFactory(resultsFromApi))
       },
   
       /**
        * Récupère les données de la session de l'utilisateur sur le serveur et les formate avec la factory associée
        * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de performance doivent être récupérées.
        * @returns {Promise<UserPerformanceFactory>} - Une promesse qui résout une instance de `UserPerformanceFactory` contenant les données de performance formatées.
        */
/*       async getPerformance(userId) {
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
   
/*       async getScore(userId) {
           return await fetch(`http://localhost:3000/user/${userId}`)
           .then(response => response.json())
           .then(resultsFromApi => new UserScoreFactory(resultsFromApi))
       }
   }
   
   export default UserService;

*/