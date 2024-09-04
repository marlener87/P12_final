// API pour la partie Apport.js, radial.js
/**
 * Récupère les données utilisateur à partir de l'API.
 * 
 * @param {number} userId - L'identifiant unique de l'utilisateur dont les données doivent être récupérées.
 * @returns {Promise<Object>} - Une promesse qui résout les données utilisateur.
 * @throws {Error} - Lance une erreur si la récupération des données échoue.
 */
export const fetchUserData = async (userId) => {
  try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur.');
      }
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// API pour la partie bar.js
/**
 * Récupère les données d'activité utilisateur à partir de l'API.
 * 
 * @param {number} userId - L'identifiant unique de l'utilisateur dont les données d'activité doivent être récupérées.
 * @returns {Promise<Array<Object>>} - Une promesse qui résout un tableau des sessions d'activité utilisateur.
 * @throws {Error} - Lance une erreur si la récupération des données d'activité échoue.
 */
export const fetchUserActivity = async (userId) => {
  try {
    console.log(userId)
      const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
      if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données d\'activité.');
      }
      const data = await response.json();      
      return data.data.sessions;
  } catch (error) {
      console.error(error);
      throw error;
  }
};


// API pour la partie line.js
/**
 * Récupère les données de sessions moyennes utilisateur à partir de l'API.
 * 
 * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de sessions moyennes doivent être récupérées.
 * @returns {Promise<Array<Object>>} - Une promesse qui résout un tableau des sessions moyennes utilisateur.
 * @throws {Error} - Lance une erreur si la récupération des données de sessions moyennes échoue.
 */
export const fetchUserSession = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de sessions');
    }
    const data = await response.json();
    console.log(data);
    
    return data.data.sessions;
  } catch (error) {
    console.log('Erreur lors de la récupération des sessions moyennes:', error);
    throw error;
  }
};

// API pour la partie radar.js
/**
 * Récupère les données de performance utilisateur à partir de l'API.
 * 
 * @param {number} userId - L'identifiant unique de l'utilisateur dont les données de performance doivent être récupérées.
 * @returns {Promise<Array<Object>>} - Une promesse qui résout un tableau des performances utilisateur.
 * @throws {Error} - Lance une erreur si la récupération des données de performance échoue.
 */
export const fetchUserRadar = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de performance');
    }
    const data = await response.json();
    console.log(data);
    
    return data.data.sessions;
  } catch (error) {
    console.log('Erreur lors de la récupération des performances:', error);
    throw error;
  }
}