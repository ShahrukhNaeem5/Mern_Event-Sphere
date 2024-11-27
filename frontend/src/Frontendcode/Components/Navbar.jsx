import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import JwtDecode, { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import { Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [token, setToken] = useState(Cookies.get('UserAuthToken') || '');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate()

  
  const logout = () => {
    // Clear local storage
    localStorage.clear();

    // Remove specific cookies
    Cookies.remove('UserAuthToken'); // Replace 'UserAuthToken' with the actual name of your cookie

    Cookies.remove('UserId')


    // Optionally, you might want to redirect the user or handle post-logout logic here
    navigate('/'); // Redirect to login page or any other page
}


const userData = localStorage.getItem('Userdata');
const User = JSON.parse(userData);


  useEffect(() => {
      const checkToken = () => {
          const newToken = Cookies.get('UserAuthToken');
          setToken(newToken); // Update the token state if it changes

          // Decode the token and extract values if it exists
          if (newToken) {
              try {
                  const decodedToken = jwtDecode(newToken);
                  setUserId(decodedToken.userId); // Store userId in state
                  setUserEmail(decodedToken.Useremail); // Store email in state
                  setUserRole(decodedToken.Userrole); // Store role in state

                  // Set cookies for user info
                  Cookies.set('UserId', decodedToken.userId);
                  Cookies.set('UserEmail', decodedToken.Useremail);
                  Cookies.set('UserRole', decodedToken.Userrole);
              } catch (error) {
                  console.error("Invalid token", error);
                  setUserId('');
                  setUserEmail('');
                  setUserRole('');
              }
          } else {
              setUserId('');
              setUserEmail('');
              setUserRole('');
          }
      };

      // Check token initially
      checkToken();
      
      // Set up an interval for token changes
      const intervalId = setInterval(checkToken, 1000); // Check every second

      return () => clearInterval(intervalId); // Clean up
  }, []);

  const isLoggedIn = !!token; // Determine logged-in status based on token

  return (
    <>
      <header className="main_header_area position-absolute w-100">
        <div className="header-content text-white">
          <div className="container">
            <div className="header-content-inner py-2">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="social-links">
                    <ul className="m-0 p-0">
                      <li className="d-inline"><a href="#"><i className="fab fa-facebook border-social rounded-circle text-center"></i></a></li>
                      <li className="d-inline"><a href="#"><i className="fab fa-twitter border-social rounded-circle text-center"></i></a></li>
                      <li className="d-inline"><a href="#"><i className="fab fa-google border-social rounded-circle text-center"></i></a></li>
                      <li className="d-inline"><a href="#"><i className="fab fa-instagram border-social rounded-circle text-center"></i></a></li>
                      <li className="d-inline"><a href="#"><i className="fab fa-youtube-play border-social rounded-circle text-center"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="header-event-info text-end">
                    <ul className="m-0 p-0">
                      <li className="px-2 border-end border-lightgrey border-opacity-50 d-inline"><i className="fa fa-phone pe-1"></i><small>+33 877 554 332</small></li>
                      <li className="px-2 border-end d-inline border-lightgrey border-opacity-50"><i className="fa fa-envelope-o pe-1"></i><small><a href="#" className="__cf_email__">[email protected]</a></small></li>
                      <li className="px-2 d-inline"><i className="fa fa-clock-o pe-1"></i><small>Mon - Fri: 9:00 - 18:30</small></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header_menu" id="header_menu">
          <div className="container">
            <nav className="navbar navbar-expand-lg py-2">
              <div className="row">
                <div className="col-lg-2 col-md-6">
                  <div className="navbar-brand m-0">
                    <Link to="/"><img src="/images/logo/1.png" alt="Logo" className="w-100" /></Link>
                  </div>
                </div>
                <div className="col-lg-7 col-md-6">
                  <div className="collapse navbar-collapse justify-content-center" id="bs-example-navbar-collapse-1">
                    <ul className="navbar-nav align-items-center" id="responsive-menu">
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" aria-current="page" to="/">Home</Link></li>
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/Workshop">Workshop</Link></li>
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/Event">Events</Link></li>
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/Speaker">Speaker's</Link></li>
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/aboutus">About US</Link></li>
                      <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/Contact">Contact Us</Link></li>
                      {/* <li className="nav-item"><Link className="nav-link px-2 my-4 py-0 text-white" to="/userprofille">userprofille</Link></li> */}
                  </ul>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="menu-search text-end">
                    {isLoggedIn ? (
                      <li className="nav-item dropdown">
                        <Link 
                          className="nav-link dropdown-toggle px-2 my-4 py-0 text-white bb1 fa fa-user fa-lg me-5" role="button" data-bs-toggle="dropdown" aria-expanded="false"></Link>
                        <ul className="dropdown-menu bg-lightgrey p-0 rounded">
                          <li><Link className="dropdown-item py-3 px-6 text-capitalize black border-0" to="/"> <strong className='pink'> {User.Useremail}</strong> </Link></li>
                          <li><Link className="dropdown-item py-3 px-6 text-capitalize black border-0" to="/userprofile">Profile </Link></li>
                          <li><Link className="dropdown-item py-3 px-6 text-capitalize black border-0" to="/changepass">Settings</Link></li>
                          <li><Link className="dropdown-item py-3 px-6 text-capitalize black border-0" to="/userbooking">Working Table's</Link></li>
                          <li><Link className="dropdown-item py-3 px-6 text-capitalize black border-0" onClick={() => logout()}>Logout</Link></li>
                        </ul>
                      </li>
                    ) : (
                      <div className="d-flex justify-content-end">
                        <Link className="btn btn3 me-2" to="/Login">Login <i className="fa fa-long-arrow-right ms-1"></i></Link>
                        <Link className="btn btn3" to="/Signup">Signup <i className="fa fa-long-arrow-right ms-1"></i></Link>
                      </div>
                    )}
                  </div>
                </div>

                <div id="slicknav-mobile"></div>
              </div>
            </nav>
          </div>
          <div id="search1">
            <button type="button" className="close">×</button>
            <form>
              <input className="form-control form-control-lg rounded text-white" placeholder="Search..." />
            </form>
            <button type="button" className="btn"><i className="fa fa-search text-white" aria-hidden="true"></i></button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
