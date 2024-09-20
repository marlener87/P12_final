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

    // State pour stocker l'userId (par défaut 12)
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Utilisation du useEffect pour surveiller les changements d'ID dans l'URL
    useEffect(() => {

        const newId = parseInt(id, 10); // => NaN => NotANumber

        // isNaN("abc") => true
        // isNaN(12) => false        

        if(isNaN(newId)){
            setIsError(true); 
            setIsLoading(false);
        }else {
            // Si un id est fourni dans l'URL, on l'utilise
            setUserId(newId);
        }

    }, [id]);  // Ce useEffect se déclenchera à chaque fois que l'ID change
   

    useEffect(() => {
        if(userId){
            setIsLoading(false);
        }
    }, [userId])


    if (isLoading) {
        return <p>chargement en cours..</p>
    }

    if (isError) {
        return (
            <ErrorPage />
        )
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