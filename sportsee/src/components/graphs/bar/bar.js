import React, { useEffect, useState } from 'react';
import './bar.scss';
import UserService from '../../../services/userService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/**
 * Composant personnalisé pour afficher une infobulle (tooltip) sur le graphique à barres.
 * fenêtre rouge au survol, valeur
 * @param {Object} props - Les propriétés passées au composant.
 * @param {boolean} props.active - Indique si le tooltip est actif (visible).
 * @param {Array} props.payload - Les données passées au tooltip.
 * @returns {JSX.Element|null} L'infobulle personnalisée ou null si inactive.
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="customTooltipBar">
                <p className='textTooltip'>{`${payload[0].value}kg`}</p>
                <p>{`${payload[1].value}kCal`}</p>
            </div>
        );
    }
    return null;
};

/**
 * Composant principal de l'application qui affiche un graphique à barres représentant
 * l'activité quotidienne d'un utilisateur.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel récupérer les données d'activité.
 * @returns {JSX.Element} Le composant React.
 */
const App = ({ userId }) => {
    const [userActivityFactory, setUserActivityFactory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    /**
     * Hook `useEffect` pour récupérer les données d'activité de l'utilisateur
     * dès que le composant est monté ou que l'ID de l'utilisateur change.
     */
    useEffect(() => {
        /**
         * Fonction asynchrone pour récupérer les données d'activité depuis le service utilisateur.
         */
        const fetchData = async () => {
            // Appel du service pour récupérer les données d'activité de l'utilisateur
            const objectFromFactory = await UserService.getActivity(userId);
            console.log(objectFromFactory);
            
            // Mise à jour de l'état avec les données récupérées
            setUserActivityFactory(objectFromFactory);
            setIsLoading(false);
        }
      
        fetchData()

    }, [userId]); // Dépendance sur l'userId, le hook se ré-exécutera si l'userId change

    // Affiche un message de chargement si les données sont en cours de récupération
    if(isLoading) {
        return <p>Chargement en cours..</p>
    }

    // Affiche un message d'erreur en cas de problème lors de la récupération des données
    if(isError){
        return <p>Une erreur est survenue..</p>
    }

    return (
        <div className="app">
            <div className="titleApp">
                <h2>Activité quotidienne</h2>
                <ul className="legend">
                    <li className="itemBlack">Poids (kg)</li>
                    <li className="itemRed">Calories brûlées (kCal)</li>
                </ul>
            </div>
            
            <BarChart
                width={800}
                height={250}
                data={userActivityFactory.sessions}
                margin={{
                    top: 5, right: 0, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis orientation="right" />
                <Tooltip className="tooltip" content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[20, 20, 0, 0]} />
                <Bar dataKey="calories" fill="#E60000" barSize={7} radius={[20, 20, 0, 0]} />
            </BarChart>
        </div>
    );
}

export default App;
