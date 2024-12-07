// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/adduser/forgot-password', { email });
            console.log(response)
            toast.success(response.data);
            navigate(`/verify-pin?email=${email}`); // Navigate to pin verification page
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter your account email</label>
                    <br />
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Send Pin Code</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
