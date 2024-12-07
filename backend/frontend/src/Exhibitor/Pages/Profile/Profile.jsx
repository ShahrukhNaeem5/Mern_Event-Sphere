import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../../Admin/Components/Footer';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

const Profile = () => {
  // Get user data from localStorage
  const userData = localStorage.getItem('Exhibitordata');
  const User = JSON.parse(userData);

  const navigate = useNavigate();
  

  // State management for form fields
  const [email, setEmail] = useState(User.Useremail);
  const [username, setUsername] = useState(User.Username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);

  // Function to handle form submission for updating account details
  const handleUpdateAccount = async () => {
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Useremail', email);
    if (file) formData.append('Userimage', file);

    try {
      const response = await axios.put(`http://localhost:5000/api/adduser/${User.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Profile updated successfully!', {
        position: "top-right",
      });

      // Update local storage data if successful
      localStorage.setItem('Exhibitordata', JSON.stringify(response.data.updatedUser));
    } catch (error) {
      toast.error('Error updating profile', {
        position: "top-right",
      });
    }
  };

  // Function to handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/adduser/${User._id}`, {
        Userpassword: newPassword,
      });


      toast.success('Password changed successfully!', {
        position: "top-right",
      });
    } catch (error) {
      toast.error('Error changing password', {
        position: "top-right",
      });
    }
  };

  // delete user

  const handleDelete = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/adduser/${userId}`);
        
        // Clear token from localStorage
        localStorage.clear();
         
        // cookies remove 
        Cookies.remove('UserAuthToken')
        
        // Redirect to login page
        navigate('/login');
        
        toast.success('Account deleted successfully', {
            position: "top-right",
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting account', {
            position: "top-right",
        });
    }
};



  const gradientStyleacctheme = {
    background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
  };

  const gradientStyleforbutton = {
    background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
};

   
  // for container
  const gradientStyleforcontainer = {
    background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
  };

   // for content in container
   const gradientStyleforcontent = {
    background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="app-container" style={gradientStyleforcontainer}>
        <div className="app-content" style={{height:'100vh'}}>
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="page-description page-description-tabbed">
                    <h1 className='text-white'>Settings</h1>

                    <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link text-white" id="integrations-tab" data-bs-toggle="tab" data-bs-target="#integrations" type="button" role="tab" aria-controls="integrations" aria-selected="false">
                          Profile
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active text-white" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="account" aria-selected="true">
                          Account
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link text-white" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="security" aria-selected="false">
                          Security
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="tab-content" id="myTabContent">
                    {/* Profile Tab */}
                    <div className="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
                      <section className="vh-200" style={gradientStyleacctheme}>
                        <div className="container py-5 h-100">
                          <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-md-9 col-lg-7 col-xl-9">
                              <div className="card" style={{ borderRadius: '15px', backgroundColor: '#2F2F2F' }}>
                                <div className="card-body p-4 text-white">
                                  <div>
                                    <h6 className="mb-4" style={{ color: 'white' }}>
                                      Name : {User.Username}
                                    </h6>
                                  </div>
                                  <div className="d-flex align-items-center mb-4">
                                    <div className="flex-shrink-0">
                                      <img
                                        src={User.Userimage ? `http://localhost:5000/uploads/profileImages/${User.Userimage}` : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp'}
                                        alt="avatar"
                                        className="img-fluid rounded-circle border border-dark border-3"
                                        style={{ width: 70 }}
                                      />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      <div className="d-flex flex-row align-items-center mb-2">
                                        <p className="mb-0 me-2">
                                          Email : <strong>{User.Useremail}</strong>
                                        </p>
                                      </div>
                                      <p className="mb-0 me-2">
                                        Role : <strong>{User.Userrole}</strong>
                                      </p>
                                    </div>
                                    
                                  </div>
                                  <hr />
                                  <div className="d-flex justify-content-center">
                                    <a href="#!">
                                      <i className="fab fa-facebook-f fa-lg me-3"></i>
                                    </a>
                                    <a href="#!">
                                      <i className="fab fa-twitter fa-lg me-3"></i>
                                    </a>
                                    <a href="#!">
                                      <i className="fab fa-instagram fa-lg"></i>
                                    </a>
                                  </div>
                                  <br />
                                  <button className='btn btn-danger' style={{width:'100%'}} onClick={()=> handleDelete(User.userId)}>Delete Account</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Account Tab */}
                    <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                      <div className="card" style={gradientStyleforcontent}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="settingsInputEmail" className="form-label text-white">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="settingsInputEmail"
                                aria-describedby="settingsEmailHelp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <div id="settingsEmailHelp" className="form-text">
                                We'll never share your email with anyone else.
                              </div>
                            </div>
                          </div>

                          <div className="row m-t-lg">
                            <div className="col-md-6">
                              <label htmlFor="settingsInputUserName" className="form-label text-white">
                                Username
                              </label>
                              <div className="input-group">
                                <span className="input-group-text" id="settingsInputUserName-add">
                                  eventsphere.com/
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="settingsInputUserName"
                                  aria-describedby="settingsInputUserName-add"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row m-t-lg">
                            <div className="col-md-6">
                              <label htmlFor="settingsInputUserImage" className="form-label text-white">
                                User Image
                              </label>
                              <div className="input-group">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="settingsInputUserImage"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row m-t-lg">
                            <div className="col">
                              <a href="#!" className="btn text-white m-t-sm" style={gradientStyleforbutton} onClick={handleUpdateAccount}>
                                Update
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Tab */}
                    <div className="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                      <div className="card" style={gradientStyleforcontent}>
                        <div className="card-body">
                          <div className="settings-security-two-factor">
                            <h5>Two-Factor Authentication</h5>
                            <span>
                              Two-factor authentication is automatically enabled on your account, for security reasons we require all users to authenticate with SMS code or authorized third-party auth apps. Read more about our security policy{' '}
                              <a href="#">here</a>.
                            </span>
                          </div>
                        
                          <div className="row m-t-xxl">
                            <div className="col-md-6">
                              <label htmlFor="settingsNewPassword" className="form-label text-white">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                aria-describedby="settingsNewPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                              />
                            </div>
                          </div>
                          <div className="row m-t-xxl">
                            <div className="col-md-6">
                              <label htmlFor="settingsConfirmPassword" className="form-label text-white">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                aria-describedby="settingsConfirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                              />
                            </div>
                          </div>
                          <div className="row m-t-lg">
                            <div className="col">
                              <a href="#!" className="btn text-white m-t-sm" style={gradientStyleforbutton} onClick={handleChangePassword}>
                                Change Password
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Profile;
