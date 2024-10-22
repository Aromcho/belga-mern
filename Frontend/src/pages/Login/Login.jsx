import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Importante: para incluir cookies con la solicitud
            });

            const data = await response.json();
            console.log();
            if (data.email.role === 'ADMIN') {	
                // Pasa los datos del usuario a Admin usando navigate y state
                navigate('/admin', { state: { user: data.user } });
                console.log('Login successful:', data);
            } else {
                navigate('/', { state: { user: data.user } });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className='formulario' onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder='Email:'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder='Contraseña:'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='login-button' type="submit">Ingesar</button>
            </form>
        </div>
    );
};

export default Login;
