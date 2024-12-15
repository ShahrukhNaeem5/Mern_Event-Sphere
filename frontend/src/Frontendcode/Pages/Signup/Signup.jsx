import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Login/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const Signup = () => {
  const [Roles, setRoles] = useState([]);
  const [Username, setUsername] = useState('');
  const [Useremail, setUseremail] = useState('');
  const [Userpassword, setUserpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Userage, setUserage] = useState('');
  const [Userrole, setUserrole] = useState('');
  const [Userimage, setUserimage] = useState(null);
  
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/adduser/role');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const HandleUserSubmit = async (e) => {
    e.preventDefault();

    // Confirm password validation
    if (Userpassword !== confirmPassword) {
      notify("Passwords do not match");
      return;
    }

    if (Userage < 18) {
      notify("Your Age must be 18 or above");
      return;
    }

    const userData = new FormData();
    userData.append("Username", Username);
    userData.append("Useremail", Useremail);
    userData.append("Userpassword", Userpassword);
    userData.append("Userage", Userage);
    userData.append("Userrole", Userrole);
    userData.append("Userimage", Userimage);

    try {
      const response = await axios.post('http://localhost:5000/api/adduser', userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      successNotify(response.data.success);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        notify(error.response.data.error);
      } else {
        console.log('Registration Failed');
      }
    }
  };

  return (
    <>
    <Navbar/>
      
    <section class="banner page-banner position-relative pb-0">
          <div class="overlay">
          </div>
          <div class="container">
          <div class="page-title text-center position-relative py-11">
          <h2 class="text-white">Signup page</h2>
          </div>
          </div>
  </section>

      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The EventSphere</h4>
                      </div>

                      <form onSubmit={HandleUserSubmit}>
                        <p><strong>Create an Account</strong></p>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control" placeholder="UserName" onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="email" className="form-control" placeholder="UserEmail" onChange={(e) => setUseremail(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <select className="form-control" onChange={(e) => setUserrole(e.target.value)}>
                            <option value="">Select role</option>
                            {Roles.map((role, index) => (
                              <option key={index} value={role.Roles}>{role.Roles}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" placeholder='UserPassword' className="form-control" onChange={(e) => setUserpassword(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" placeholder='ConfirmPassword' className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="number" placeholder='Age' className="form-control" onChange={(e) => setUserage(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="file" className="form-control" onChange={(e) => setUserimage(e.target.files[0])} />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 form-control rounded" style={{ width: 200, height: 40, fontSize: 15 }} type="submit">Sign Up</button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <Link to="/Login" className="btn btn-outline-danger">Log in</Link>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">EventSphere: Elevate Your Gatherings</h4>
                      <p className="small mb-0">Your go-to platform for seamless event planning and unforgettable experiences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /> <br /> <br /><br /> <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer/>
      <ToastContainer />
    </>
  );
}

export default Signup;
