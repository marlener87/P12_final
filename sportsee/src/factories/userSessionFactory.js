/**
 * Classe `UserSessionFactory` pour gérer et formater les données de sessions utilisateur provenant de l'API.
 */
class UserSessionFactory {
    /**
     * Crée une instance de `UserSessionFactory`.
     * 
     * @param {Object} dataFromApi - Les données de sessions utilisateur récupérées depuis l'API.
     * @param {Object} dataFromApi.data - Les données principales fournies par l'API.
     * @param {Array<Object>} dataFromApi.data.sessions - Tableau des sessions utilisateur, chaque session contenant des informations sur une période de temps.
     */
    constructor(dataFromApi) {
        console.log(dataFromApi);
        
        // Format à utiliser dans l'application = format qui vient de l'API
        this.sessions = dataFromApi.data.sessions;
    }
}

export default UserSessionFactory;