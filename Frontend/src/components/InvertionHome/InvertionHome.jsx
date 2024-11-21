import axios from 'axios';
import { useEffect, useState } from 'react';
import DevelopmentItem from '../DevelopmentsItem/DevelopmentsItem';
import React from 'react';
import SocialSidebar from '../SocialSidebar/SocialSidebar';
import BackToTop from '../BackToTop/BackToTop';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Swal from 'sweetalert2'; // Importar SweetAlert2
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
            setDevProperties(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener propiedades:', error);
            setLoading(false);
        }
    };

    console.log('Propiedades de desarrollos:', devProperties);

    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user', formData);
            console.log('User registered:', response.data);
            
            // Mostrar alerta de éxito con SweetAlert2
            Swal.fire({
                title: '¡Registro Exitoso!',
                text: 'Gracias por suscribirte. Pronto recibirás nuestras novedades.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar el formulario
            setFormData({ email: '' });
        } catch (error) {
            console.error('Error registering user:', error);

            // Mostrar alerta de error con SweetAlert2
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al registrarse. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="inversion-section pb-0">
            <div className="inversion">
                <BackToTop color="black" />
            </div>
            <div className="container inversion--container">
                <div className="inversion-list gap-5">
                    <div className="inversion-item item--text">
                        <Title
                            title="TU PRÓXIMA INVERSIÓN"
                            buttonStyle="outline black"
                            vertical
                            linkButton="/emprendimientos"
                        />
                    </div>
                    <div className='dev-item-container gap-3'>
                        {devProperties.slice(0, 2).map((devProperty, index) => (
                            <DevelopmentItem key={index} development={devProperty} />
                        ))}
                    </div>
                </div>
                <Button className="button--mobile" text="Ver más" type="outline black" link="/emprendimientos" />
            </div>
            <div className='register-home p-5'>
                <div className='title-cont d-flex gap-2 justify-content-center pb-3'>
                    <h2>Suscribite para recibir todas las novedades</h2>
                </div>
                <form className='form-register-home d-flex mt-3' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder='Ingrese su email'
                        className='input-register'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <button className='btn-register' type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default InversionSection;
