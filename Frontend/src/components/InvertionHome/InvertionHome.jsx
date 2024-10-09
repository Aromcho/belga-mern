import axios from 'axios';
import { useEffect, useState } from 'react';
import DevelopmentItem from '../DevelopmentsItem/DevelopmentsItem';
import React from 'react';
import SocialSidebar from '../SocialSidebar/SocialSidebar';
import BackToTop from '../BackToTop/BackToTop';
import Title from '../Title/Title';
import Button from '../Button/Button';
import './InvertionHome.css';

const InversionSection = ({}) => {
    const [loading, setLoading] = useState(false);
    const [devProperties, setDevProperties] = useState([]);

    useEffect(() => {
        fetchDevProperty();
    }, []);  // Se ejecuta cuando el componente se monta

    const fetchDevProperty = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/development`);
            setDevProperties(response.data); // Asegúrate de acceder a `response.data`
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener propiedades:', error);
            setLoading(false);
        }
    };

    console.log('Propiedades de desarrollos:', devProperties);

    return (
        <div className="inversion-section">
            <div className="inversion">
                <SocialSidebar color="black" />
                <BackToTop color="black" />
            </div>
            <div className="container inversion--container">
                <div className="inversion-list">
                    <div className="inversion-item item--text ">
                        <Title
                            title="TU PRÓXIMA INVERSIÓN"
                            buttonStyle="outline black"
                            vertical
                            linkButton="/emprendimientos"
                        />
                    </div>
                    <div className='dev-item-container gap-3'>{devProperties.slice(0, 2).map((devProperty, index) => (
                        <DevelopmentItem key={index} development={devProperty} />
                    ))}</div>
                    
                </div>
                <Button className="button--mobile" text="Ver más" type="outline black" link="/emprendimientos" />
            </div>
        </div>
    );
};

export default InversionSection;
