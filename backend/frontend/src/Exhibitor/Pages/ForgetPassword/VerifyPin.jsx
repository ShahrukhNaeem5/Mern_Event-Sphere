// VerifyPin.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyPin = () => {
    const [pin, setPin] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const email = query.get('email'); // Get email from URL

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/adduser/verify-pin', { email, pin });
            toast.success(response.data.message);
            navigate(`/reset-password?email=${email}`); // Navigate to reset password page
        } catch (error) {
            toast.error(error.response?.data?.error || 'Invalid pin or expired');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Verify Pin</h2>
            <br />
            <form onSubmit={handleVerify}>
                <div className="form-group">
                    <label htmlFor="pin">Enter the pin sent to your email</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Verify Pin</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default VerifyPin;
