import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './radar.scss';
import UserService from '../../../services/userService';

/**
 * Composant `RadarGraph` qui affiche un graphique radar représentant les performances de l'utilisateur.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel récupérer les données de performance.
 * @returns {JSX.Element} Le composant React.
 */
const RadarGraph = ({ userId }) => {
    const [userPerformanceFactory, setUserPerformanceFactory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Hook `useEffect` pour récupérer les données de performance de l'utilisateur dès que le composant est monté ou que l'ID de l'utilisateur change.
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données de performance depuis le service utilisateur.
        const fetchData = async () => {
            try{
                const objectFromFactory = await UserService.getPerformance(userId)
                //console.log(objectFromFactory.kind);
            
                // Mise à jour de l'état avec les données récupérées
                setUserPerformanceFactory(objectFromFactory.data);
                setIsLoading(false)
            }catch(err){
                setIsError(true);
                setIsLoading(false);
            }
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
        <div className="graphiqueRadar">
            <ResponsiveContainer width="100%" height="100%" >
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={userPerformanceFactory}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kindName" />
                    <PolarRadiusAxis />
                    <Radar dataKey="value" fill="#E60000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RadarGraph;