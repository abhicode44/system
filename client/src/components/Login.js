import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importing as a named export
import "../css/login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('https://system-1wf6.onrender.com/api/login', {
                username,
                password,
                role
            });

            console.log('Response Data:', response.data);

            const token = response.data.data;
            if (token) {
                localStorage.setItem('token', token);
                console.log('Token stored:', token);

                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                localStorage.setItem('user', JSON.stringify(decodedToken));

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                if (role === 'admin') {
                    navigate('/bankeraccount');
                } else {
                    navigate('/transaction');
                }
            } else {
                console.error('Token not received');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page"> {/* Add this wrapper */}
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <h3 className="login-subtitle">Welcome To The Banking System</h3>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="role-selection">
                        <label>
                            Login As 
                            <input 
                                type="radio" 
                                value="user" 
                                checked={role === 'user'} 
                                onChange={(e) => setRole(e.target.value)} 
                            />
                            Customer
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="admin" 
                                checked={role === 'admin'} 
                                onChange={(e) => setRole(e.target.value)} 
                            />
                            Banker
                        </label>
                    </div>
                    <label className="login-label">Username</label>
                    <input 
                        type="email" 
                        className="login-input" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label className="login-label">Password</label>
                    <input 
                        type="password" 
                        className="login-input" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="login-button" type="submit" disabled={loading}>Login</button>
                    {loading && <p className="loading-text">Loading...</p>}
                    {error && <p className="error-text">{error}</p>}
                </form>
                <span className="register-link">Don't Have An Account? <Link to='/register'>Register</Link></span>
            </div>
        </div>
    );
};

export default Login;
