import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

const Header = () => {
    
    const navigate = useNavigate()

    const logout = () => {
        // Clear local storage
        localStorage.clear();

        // Remove specific cookies
        Cookies.remove('UserAuthToken'); // Replace 'UserAuthToken' with the actual name of your cookie

        // Optionally, you might want to redirect the user or handle post-logout logic here
        navigate('/login'); // Redirect to login page or any other page
    }
    



    const gradientStyleacctheme = {
        background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
    };


    return (
        <>

            <div class="app-header">
                <nav class="navbar navbar-light navbar-expand-lg" style={gradientStyleacctheme}>
                    <div class="container-fluid">
                        <div class="navbar-nav" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons" style={{ color: 'white' }}>first_page</i></a>
                                </li>

                            </ul>

                        </div>
                        <div class="d-flex">
                            <ul class="navbar-nav">

                                <button style={gradientStyleacctheme} className='btn'><i onClick={() => logout()} className="fas fa-sign-out-alt" style={{ color: 'white' }}></i> </button>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default Header