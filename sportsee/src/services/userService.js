import UserFactory from '../factories/userFactory';
import UserActivityFactory from '../factories/userActivityFactory';
import UserSessionFactory from '../factories/userSessionFactory';
import UserScoreFactory from '../factories/userScoreFactory';
import UserPerformanceFactory from '../factories/userPerformanceFactory';


// URL de base de l'API backend
const ENVIRONMENT = 'dev' // 'prod' | 'dev'
const API_BASE_URL = 'http://localhost:3000/user/'; // Production
const API_BASE_URL_MOCKED = 'http://localhost:3001/data/'; // Données mockées


// Objectifs du service : 
// - Aller chercher les données sur le serveur (fetch, axios, ..)
// - Les formater (factories)
// - Les restituer à l'application (return)


// Fonction pour vérifier si le backend est disponible et basculer sur les données mockées si nécessaire
// fonction qui effectue un appel 'fetch' à l'URL spécifiée, si l'appel échoue (ex : si le BE est hors ligne ou renvoie une erreur), elle bascule automatiquement sur les données mockées fournies
const fetchWithFallback = async (url, mockData = {}) => {
    //try {
        // Tente de faire un appel à l'API avec l'URL fournie
        const response = await fetch(url);
        // Vérifie si la réponse n'est pas valide (ex : code d'erreur HTTP)
        if (!response.ok) {
            // Si la réponse n'est pas valide, déclenche une erreur
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Si tout se passe bien, renvoie les données au format JSON
        return await response.json();
    //} catch (error) {
      //  throw new Error(`Une erreur est survenue avec la requête`);
        // En cas d'erreur (ex : BE indisponible), affiche un message d'erreur et renvoie les données mockées
        //console.error(`Backend indisponible, utilisation des mock data: ${error}`);
        //return { data: mockData };
    //}
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
        //const url = `${API_BASE_URL}${userId}`;
        const urlProduction = `${API_BASE_URL}${userId}`;
        const urlMocked = `${API_BASE_URL_MOCKED}${userId}/mainData.json`;
        
        // Trouve les données mockées correspondantes
        //const mockData = USER_MAIN_DATA.find(user => user.id === userId);

        // Utilise fetchWithFallback pour obtenir les données depuis l'API ou les données mockées
        //const resultsFromApi = await fetchWithFallback(url, mockData);
        const resultsFromApi = await fetchWithFallback(ENVIRONMENT === 'prod' ? urlProduction : urlMocked);
        return new UserFactory(resultsFromApi); // Formate les données avec la factory UserFactory
    },

    // WILLIAM OK
    async getActivity(userId) {
        const urlProduction = `${API_BASE_URL}${userId}/activity`;
        const urlMocked = `${API_BASE_URL_MOCKED}${userId}/activity.json`;

        const resultsFromApi = await fetchWithFallback(ENVIRONMENT === 'prod' ? urlProduction : urlMocked);
        return new UserActivityFactory(resultsFromApi);
    },

    // OK
    async getSession(userId) {
        // const url = `${API_BASE_URL}${userId}/average-sessions`;
        // const mockData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);

        // const resultsFromApi = await fetchWithFallback(url, mockData);
        const urlProduction = `${API_BASE_URL}${userId}/average-sessions`;
        const urlMocked = `${API_BASE_URL_MOCKED}${userId}/sessions.json`;

        const resultsFromApi = await fetchWithFallback(ENVIRONMENT === 'prod' ? urlProduction : urlMocked);
        return new UserSessionFactory(resultsFromApi);
    },

    // OK
    async getPerformance(userId) {
        // const url = `${API_BASE_URL}${userId}/performance`;
        // const mockData = USER_PERFORMANCE.find(performance => performance.userId === userId);

        // const resultsFromApi = await fetchWithFallback(url, mockData);
        const urlProduction = `${API_BASE_URL}${userId}/performance`;
        const urlMocked = `${API_BASE_URL_MOCKED}${userId}/performance.json`;

        const resultsFromApi = await fetchWithFallback(ENVIRONMENT === 'prod' ? urlProduction : urlMocked);
        return new UserPerformanceFactory(resultsFromApi);
    },


    async getScore(userId) {
        // const url = `${API_BASE_URL}${userId}`;
        // const mockData = USER_MAIN_DATA.find(user => user.id === userId);

        // const resultsFromApi = await fetchWithFallback(url, mockData);
        const urlProduction = `${API_BASE_URL}${userId}`;
        const urlMocked = `${API_BASE_URL_MOCKED}${userId}/mainData.json`;

        const resultsFromApi = await fetchWithFallback(ENVIRONMENT === 'prod' ? urlProduction : urlMocked);
        return new UserScoreFactory(resultsFromApi);
    }
}

export default UserService;