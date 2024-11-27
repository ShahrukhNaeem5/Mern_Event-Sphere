import React from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Footer from './Components/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Home = () => {


  const navigate = useNavigate();

  useEffect(() => {
      const userRole = localStorage.getItem('Userroleee_login');

      // If the role is not 'admin', redirect to login or exhibitor panel
      if (userRole !== 'admin') {
          navigate('/login');
      }
  }, [navigate]);

  var userData = localStorage.getItem("Admindata");
  var User = JSON.parse(userData)
   
   
    // for container
    const gradientStyleforcontainer = {
      background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
  };

  const gradientStyleacctheme = {
      background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
  };

 



  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div class="app-container" style={gradientStyleforcontainer}>
      <div class="app-content" style={{height:'100vh'}}>
         <h1 className='text-white text-center'>ADMIN DASHBOARD</h1>
         <br />
         <h2 className='text-white text-center'><b>{User.Username}</b></h2>
      </div>
    </div>
     <Footer/>
    </>
  )
}

export default Home