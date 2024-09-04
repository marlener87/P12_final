/**
 * Classe `UserPerformanceFactory` pour gérer et formater les données de performance utilisateur provenant de l'API.
 */
class UserPerformanceFactory {
    /**
     * Crée une instance de `UserPerformanceFactory`.
     * 
     * @param {Object} dataFromApi - Les données de performance utilisateur récupérées depuis l'API.
     * @param {Object} dataFromApi.data - Les données principales fournies par l'API.
     * @param {Array<Object>} dataFromApi.data.data - Tableau des données de performance de l'utilisateur.
     * @param {number} dataFromApi.data.data[].kind - Le type de performance (représenté par un nombre) pour chaque entrée.
     * @param {Object} dataFromApi.data.kind - Objet associant chaque type de performance (clé) à son nom (valeur).
     */
    constructor(dataFromApi) {
        console.log(dataFromApi);
        
        // Format à utiliser dans l'application = format qui viens de l'API
        this.data = dataFromApi.data.data;
        this.kind = dataFromApi.data.kind;

        // Ajout de kindName à chaque entrée de données
        this.data = this.data.map(item => ({
            ...item,
            kindName: this.capitalizeWords(this.kind[item.kind])
        })).reverse();
    }

    // Fonction pour capitaliser la première lettre de chaque mot
    /**
     * Capitalise la première lettre de chaque mot dans une chaîne.
     * 
     * @param {string} word - La chaîne de caractères à capitaliser.
     * @returns {string} La chaîne de caractères avec la première lettre de chaque mot en majuscule.
     */
    capitalizeWords(word) {
        return word.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
}

export default UserPerformanceFactory;
