/**
 * Classe `UserFactory` pour gérer et formater les données utilisateur provenant de l'API.
 */
class UserFactory {
    /**
     * Crée une instance de `UserFactory`.
     * 
     * @param {Object} dataFromApi - Les données utilisateur récupérées depuis l'API.
     * @param {Object} dataFromApi.data - Les données principales fournies par l'API.
     * @param {Object} dataFromApi.data.keyData - Les données clés de l'utilisateur, telles que les compteurs de calories, protéines, glucides, et lipides.
     * @param {Object} dataFromApi.data.userInfos - Les informations sur l'utilisateur, telles que son nom et son prénom.
     * @param {number} dataFromApi.data.score - Le score associé à l'utilisateur.
     * @param {number} dataFromApi.data.id - L'identifiant unique de l'utilisateur.
     */
    constructor(dataFromApi){
        console.log(dataFromApi)

        // Format à utiliser dans l'application = format qui viens de l'API
        this.keyData = dataFromApi.data.keyData;
        this.userInfos = dataFromApi.data.userInfos;
        this.score = dataFromApi.data.score;
        this.id = dataFromApi.data.id;
    }

    /**
     * Retourne un tableau contenant les différents apports de l'utilisateur
     * Chaque apport est un objet contenant :
     * - `title` : Le titre de l'apport (par exemple, 'Calories').
     * - `unit` : L'unité de mesure de l'apport (par exemple, 'kCal', 'g').
     * - `value` : La valeur de l'apport (par exemple, le nombre de calories).
     * - `image` : L'URL de l'image associée à l'apport.
     * 
     * @returns {Array<Object>} Tableau d'objets représentant les apports de l'utilisateur.
     */
    getApports () {
        return [
            { title: 'Calories', unit: 'kCal', value: this.keyData.calorieCount, image: '/assets/images/calories-icon.png' },
            { title: 'Protéines', unit: 'g', value: this.keyData.proteinCount, image: '/assets/images/protein-icon.png'  },
            { title: 'Glucides', unit: 'g', value: this.keyData.carbohydrateCount, image: '/assets/images/carbs-icon.png'  },
            { title: 'Lipides', unit: 'g', value: this.keyData.lipidCount, image: '/assets/images/fat-icon.png'  },
        ];
    }
}

export default UserFactory;