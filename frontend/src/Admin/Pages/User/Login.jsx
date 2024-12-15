import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginUser = () => {
    const [Useremail, setUseremail] = useState("");
    const [Userpassword, setUserpassword] = useState("");
    const [Success, setSuccess] = useState("");
    const [Error, setError] = useState("");

    const navigate = useNavigate();

    const HandleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const UserLoginData = {
                Useremail,
                Userpassword
            };

            const fetchData = await axios.post("http://localhost:5000/api/adduser/login", UserLoginData);
            setError(""); // Clear any previous error
            
           
            const usertoken = fetchData.data.token;
            const token_decode = jwtDecode(usertoken);
            const Useremailll = token_decode.Useremail;
            const Userroleee = token_decode.Userrole;
            const Userimagee = token_decode.Userimage;
            

            localStorage.setItem("useremail_login", Useremailll);
            localStorage.setItem("Userroleee_login", Userroleee);
            localStorage.setItem("Userimagee_login", Userimagee);
            
            Cookies.set("UserAuthToken", usertoken, { expires: 1 });
            
            setSuccess("Login successful!");
            setTimeout(() => {
                setSuccess("");
            }, 1000);
            
            if (Userroleee === "admin") {
                localStorage.setItem("Admindata", JSON.stringify(token_decode));
                navigate('/admin');
            } else if (Userroleee === "exibitor") {
                localStorage.setItem("Exhibitordata", JSON.stringify(token_decode));
                navigate('/Exhibitor');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error); // Specific error from backend
            } else {
                setError("An unexpected error occurred. Please try again."); // General error
            }
            console.log(error);
        }
    };

    return (
        <div className='container'>
            <h1 className='text-center'>User Login</h1>
            <form onSubmit={HandleLoginSubmit}>
                {Success && (
                    <div className="alert alert-success" role="alert">
                        {Success}
                    </div>
                )}
                {Error && (
                    <div className="alert alert-danger" role="alert">
                        {Error}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        onChange={(e) => setUseremail(e.target.value)} 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        onChange={(e) => setUserpassword(e.target.value)} 
                        id="exampleInputPassword1" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="mt-3">
                {/* Link to Forgot Password page */}
                <p>
                    Forgot your password? <Link to="/forgot-password">Reset it here</Link>
                </p>
            </div>
            </form>
        </div>
    );
};

export default LoginUser;
