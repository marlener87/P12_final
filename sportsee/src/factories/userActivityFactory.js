/**
 * Classe `UserActivityFactory` pour gérer et formater les données d'activité utilisateur provenant de l'API.
 */
class UserActivityFactory {
    /**
     * Crée une instance de `UserActivityFactory`.
     * 
     * @param {Object} dataFromApi - Les données d'activité utilisateur récupérées depuis l'API.
     * @param {Object} dataFromApi.data - Les données principales fournies par l'API.
     * @param {Array<Object>} dataFromApi.data.sessions - Tableau des sessions d'activité utilisateur.
     * @param {string} dataFromApi.data.sessions[].sessionDate - La date de la session.
     * @param {number} dataFromApi.data.sessions[].sessionDuration - La durée de la session en minutes.
     */
    constructor(dataFromApi) {
        console.log(dataFromApi);
        
        // Format à utiliser dans l'application = format qui viens de l'API
        this.sessions = dataFromApi.data.sessions;
    }
}

export default UserActivityFactory;