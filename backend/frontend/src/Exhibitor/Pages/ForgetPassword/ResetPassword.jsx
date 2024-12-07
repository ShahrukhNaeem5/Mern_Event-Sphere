// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const email = query.get('email'); // Get email from URL

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/adduser/reset-password', { email, newPassword });
            toast.success(response.data.message);
            navigate('/login'); // Navigate back to login page after reset
        } catch (error) {
            toast.error(error.response?.data?.error || 'Password reset failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <br />
            <form onSubmit={handleReset}>
                <div className="form-group">
                    <label htmlFor="password">Enter your new password</label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ResetPassword;
