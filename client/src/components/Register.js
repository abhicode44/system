import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/register.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'user',
        adminSecretKey: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value,
            adminSecretKey: '', // Clear the secret key if switching from Admin to User
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://system-1wf6.onrender.com/api/register', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <ToastContainer />
                    <h3>Bank System Registration Form</h3>
                    
                    <div className="role-selection">
                        Register As
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleRoleChange}
                            />
                            Customer
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={handleRoleChange}
                            />
                            Banker
                        </label>
                    </div>
                    
                    {formData.role === 'admin' && (
                        <div className="admin-secret-key">
                            <label>Admin Secret Key</label>
                            <input
                                type="password"
                                name="adminSecretKey"
                                placeholder="Admin Secret Key"
                                value={formData.adminSecretKey}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="email"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>
                
                <span>Already Have Account? <Link to='/'>Login</Link></span>
            </div>
        </div>
    );
}

export default Register;
