import React from 'react'
import {Link} from 'react-router-dom'


const Sidebar = () => {
  
    var userData = localStorage.getItem("Exhibitordata");
    var User  = JSON.parse(userData)
  
    
  const gradientStyleacctheme = {
    background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
  };

    return (
    <>
    <div class="app align-content-stretch d-flex flex-wrap">
    <div class="app-sidebar" style={gradientStyleacctheme}>
            <div class="logo"  style={gradientStyleacctheme}>
                <Link to="/Exhibitor" class="logo-icon"><span class="logo-text text-white" >EventSphere</span></Link>
                <div class="sidebar-user-switcher user-activity-online">
                    <Link to="/profile">
                        <img src={User.Userimage ? `http://localhost:5000/uploads/profileImages/${User.Userimage}` : 'avatar1.jpg'}/>
                        <span class="activity-indicator"></span>
                        <span class="user-info-text text-white  ">{User.Username}<br/><span class="user-state-info">Active</span></span>
                    </Link>
                </div>
            </div>
            <div class="app-menu">
                <ul class="accordion-menu"> 
                    <li class="sidebar-title" style={{color:'white'}}>
                        Exhibitor Dashboard
                    </li>
                    <li>
                        <Link to="/Exhibitor" style={{color:'white'}}><i class="material-icons-two-tone">dashboard</i>Dashboard</Link>
                    </li>
                    
                  
                    <li class="sidebar-title" style={{color:'white'}}>
                        Book Events
                    </li>
                    <li >
                        <Link to="/bookevents" style={{color:'white'}}><i class="material-icons-two-tone">card_giftcard</i>Events</Link>
                    
                    </li>
                   
                    <li>
                        <Link to="/booking" style={{color:'white'}}><i class="material-icons-two-tone">grid_on</i>Bookings</Link>
                       
                    </li>
                    <li class="sidebar-title" style={{color:'white'}}>
                        Your Profile
                    </li>
                    <li >
                        <Link to="/profile" style={{color:'white'}}><i class="material-icons-two-tone">account_circle</i>Profile</Link>
                       
                    </li>
                    
                   
                   
                  
                </ul>
            </div>
        </div>
        </div>
    </>

  )
}

export default Sidebar