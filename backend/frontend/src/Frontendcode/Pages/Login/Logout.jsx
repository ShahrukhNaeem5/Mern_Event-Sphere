import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Logout = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(Cookies.get('UserAuthToken'));

    useEffect(() => {
        const logoutUser = () => {
            // Remove the authentication token from cookies
            Cookies.remove('UserAuthToken');
            Cookies.remove('UserEmail');
            Cookies.remove('UserId');
            Cookies.remove('UserRole');
            
            // Redirect to login page or homepage
            navigate('/login');
        };
        
        // Call the logout function when the component mounts
        logoutUser();
    }, [navigate]);

    return (
        <>
            {/* {token ? (
                <p>Logging out...</p>
            ) : (
                <p>You have been logged out successfully.</p>
            )} */}
        </>
    );
}

export default Logout;
