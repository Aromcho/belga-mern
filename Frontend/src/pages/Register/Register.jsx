import React, { useState } from 'react';
import axios from 'axios';
import { IoNewspaper } from "react-icons/io5";
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: ''
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
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='mt-4 pt'>
            <div className=' title-cont d-flex gap-2 justify-content-center pb-3 mt-5'>

            <h2>Suscribite para recibir todas las novedades</h2>
            
            </div>
            
            <form className='form-register d-flex mt-3 mb-5' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder='Igresá tu correo electrónico'
                        className='input-register'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                
                <button className='btn-register' type="submit">REGISTRAR</button>
            </form>
        </div>
    );
};

export default Register;