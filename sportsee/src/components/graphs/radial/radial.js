import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import './radial.scss';
import UserService from '../../../services/userService';

/**
 * Composant `Radial` qui affiche un graphique radial représentant le score de l'utilisateur.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel récupérer le score.
 * @returns {JSX.Element} Le composant React.
 */
const Radial = ({ userId }) => {
    const [userScoreFactory, setUserScoreFactory] = useState();
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Hook `useEffect` pour récupérer le score de l'utilisateur dès que le composant est monté ou que l'ID de l'utilisateur change.
    useEffect(() => {
        // Fonction asynchrone pour récupérer le score de l'utilisateur depuis le service utilisateur.
        const fetchData = async () => {
            const objectFromFactory = await UserService.getScore(userId);
            //console.log(objectFromFactory);
            const formattedData = [
                { name: 'Score', value: objectFromFactory.score * 100, fill: '#FF0000' }
            ];

            setPercentage(objectFromFactory.score)
            setUserScoreFactory(formattedData);
            setIsLoading(false);
        }
        fetchData()
    }, [userId]); // Dépendance sur l'userId, le hook se ré-exécutera si l'userId change

    // Affiche un message de chargement si les données sont en cours de récupération
    if(isLoading) {
      return <p>Chargement en cours...</p>
    }

    // Affiche un message d'erreur en cas de problème lors de la récupération des données
    if(isError){
        return <p>Une erreur est survenue...</p>
    }

    return (
      <div className="graphiqueRadial">
          <div className="titleRadial">
              <h2>Score</h2>
          </div>
          <ResponsiveContainer width="100%" height="100%" >
              <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="80%" 
                  outerRadius="70%" 
                  barSize={10} 
                  data={userScoreFactory}
                  startAngle={90}
                  endAngle={90 + 360 * percentage}
              >
                  <RadialBar
                      minAngle={15}
                      //label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                  />
              </RadialBarChart>
              <div className="pourcentage">
                  <div className="textContainer">
                      <span className="nombreScore">{percentage * 100}%</span>
                      <span> de votre objectif</span>
                  </div>
              </div>
          </ResponsiveContainer>
      </div>
    );
}

export default Radial;