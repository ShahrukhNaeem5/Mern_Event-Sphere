  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { jwtDecode } from "jwt-decode"
  import Cookies from "js-cookie";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import axios from 'axios';
  import Navbar from '../../Components/Navbar';
  import Footer from '../../Components/Footer';

  const Login = () => {
    const [Useremail, setUseremail] = useState("");
    const [Userpassword, setUserpassword] = useState("");


    const navigate = useNavigate();
    
    const notify = (message) => toast.error(message);
    const successNotify = (message) => toast.success(message);

    const HandleLoginSubmit = async (e) => {
      e.preventDefault();

      try {
          const UserLoginData = {
              Useremail,
              Userpassword
          };

          const fetchData = await axios.post("http://localhost:5000/api/adduser/login", UserLoginData);
          notify("")
          
         
          const usertoken = fetchData.data.token;
          const token_decode = jwtDecode(usertoken);
          const Useremailll = token_decode.Useremail;
          const Userroleee = token_decode.Userrole;
          
          

          localStorage.setItem("useremail_login", Useremailll);
          localStorage.setItem("Userroleee_login", Userroleee);
          
          
          Cookies.set("UserAuthToken", usertoken, { expires: 1 });
          
          successNotify(fetchData.data.success);
          setTimeout(() => {

          }, 1000);
          
          if (Userroleee === "admin") {
              localStorage.setItem("Admindata", JSON.stringify(token_decode));
              navigate('/admin');
          } else if (Userroleee === "exibitor") {
              localStorage.setItem("Exhibitordata", JSON.stringify(token_decode));
              navigate('/Exhibitor');
          }
          else if (Userroleee === "attendee") {
            localStorage.setItem("Userdata", JSON.stringify(token_decode));
            navigate('/');
        }
      } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
              notify(error.response.data.error); // Specific error from backend
          } else {
            notify("An unexpected error occurred. Please try again."); // General error
          }
          console.log(error);
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
  <h2 class="text-white">Login page</h2>
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
                        <form onSubmit={HandleLoginSubmit}>
                          <p><strong>Please login to your account</strong></p>
                          <div className="form-outline mb-4">
                            <input type="email" id="form2Example11" className="form-control" placeholder="UserEmail" onChange={(e) => setUseremail(e.target.value)} />
                          </div>
                          <div className="form-outline mb-4">
                            <input type="password" placeholder='UserPassword' id="form2Example22" className="form-control" onChange={(e) => setUserpassword(e.target.value)} />
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 form-control rounded" style={{ width: 200, height: 40, fontSize: 15 }} type="submit">Log in</button>
                            <br />
                            <Link className="text-muted" to="/forgot-password">Forgot password?</Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <Link to="/Signup" className="btn btn-outline-danger">Create new</Link>
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
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Footer/>
        <ToastContainer />
      </>
    );
  }

  export default Login;
