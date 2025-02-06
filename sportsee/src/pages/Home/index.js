import React, { useEffect, useState } from 'react';
import NavbarHorizontale from '../../components/navbarHorizontale/NavbarHorizontale';
import NavbarVerticale from '../../components/navbarVerticale/NavbarVerticale';
import TitleMain from '../../components/titleMain/TitleMain';
import Apport from '../../components/Apport/Apport';

import App from '../../components/graphs/bar/bar'
import './style.scss';
import LineGraph from '../../components/graphs/line/line';
import RadarGraph from '../../components/graphs/radar/radar'
import Radial from '../../components/graphs/radial/radial';
import { useParams } from 'react-router-dom';
import ErrorPage from '../Error/error';

/**
 * Composant `Home` représentant la page d'accueil de l'application.
 * 
 * @component
 * @returns {JSX.Element} - Le rendu du composant `Home`.
 */
const Home = () => { 
    // Récupération de l'ID depuis l'URL
    const { id } = useParams();
    //console.log("ID from URL:", id);

    // State pour stocker l'userId 
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Utilisation du useEffect pour surveiller les changements d'ID dans l'URL
    useEffect(() => {
        // convertit id en un nombre entier en base 10. Si id n'est pas convertible (ex: une chaîne non numérique), le résultat sera NaN (Not-a-Number)
        const newId = parseInt(id, 10); // en base 10, système décimal

        if (isNaN(newId)){ // Vérifie si le résultat de parseInt est NaN
            setIsError(true); // on met à jour l'état pour signaler une erreur.
            setIsLoading(false); // on désactive l'indicateur de chargement
            return;  // Empêche l'exécution de setUserId si une erreur est détectée
        } else {
            // Si un id est fourni dans l'URL, on l'utilise
            setUserId(newId); // on met à jour l'état avec le nouvel id converti
            setIsLoading(false); // désactiver le chargement une fois l'ID défini puisque tout s'est bien passé
        }

    }, [id]);  // Ce useEffect se déclenchera à chaque fois que l'ID change, il passé en dépendance   

    if (isError) {
        return (
            <ErrorPage />
        )
    }

    if (isLoading) {
        return <p>chargement en cours..</p>
    }

    return (
        <main>
            <div>
                <NavbarHorizontale />
            </div>
            <div className='mainBody'>
                <NavbarVerticale />

                <section className='sectionRight'>
                    <div className="container">
                        <TitleMain userId={userId}/>

                        <div className="statsBlock">
                            <div className="columnLeft">
                                <App userId={userId} />

                                <div className='blockGraphs'>
                                    <LineGraph userId={userId} />
                                    <RadarGraph userId={userId} />
                                    <Radial userId={userId} />
                                </div>
                            </div>
                            
                            <div className='columnRight'>
                                <Apport userId={userId} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;