import React from 'react';
import './custom.css';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios'
// import Cookies from 'js-cookie';

const ChangePassword = () => {


  const userData = localStorage.getItem('Userdata');
  const User = JSON.parse(userData);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   // Function to handle password change
   const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/adduser/${User.userId}`, {
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
    



  return (
    <>
    <Navbar/>
            {/* Page Banner */}
            <section className="banner page-banner position-relative pb-0">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-title text-center position-relative py-11">
            <h2 className="text-white">Change Password</h2>
          </div>
        </div>
      </section>

      {/* User Profile Container */}
      <div className="container rounded mt-5 mb-5" style={{
        border: '4px solid #e91e63',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.2s',
        backgroundColor: '#ffff',
        color: "white",
        width: '800px'
      }}>
        <div className="row">
            <h3 className='text-center mt-5'>Change Password of {User.Username}</h3>
            
        </div>
     <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-9">
                <div className="d-flex flex-column align-items-center text-center py-5">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form for User Profile Details */}
        <div className="row">
          <div className="col-md-2 border-right"></div>
          <div className="col-md-9 border-right">
            <div className="p-3 py-5">
              <div className="row ">
                <div className="col-md-12">
                  <label className="labels">Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control hovPink" placeholder="User Password" />
                </div>
                <div className="col-md-12">
                  <label className="labels">Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control hovPink" placeholder="Confirm User Password" />
                </div>
            
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary" type="submit" onClick={handleChangePassword}>Change Pasword</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default ChangePassword
