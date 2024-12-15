import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Admin/Dashboard'
import Sidebar from './Admin/Components/Sidebar'
import Navbar from './Admin/Components/Navbar'
import Adduser from './Admin/Pages/User/Adduser'
import Showuser from './Admin/Pages/User/Showuser'
import Userupdate from './Admin/Pages/User/Userupdate'
import AddEvent from './Admin/Pages/Events/AddEvent'
import EventDetails from './Admin/Pages/Events/EventDetails'
import Footer from './Admin/Components/Footer'
import UpdateEvent from './Admin/Pages/Events/UpdateEvent'
import UpdateWorkshop from './Admin/Pages/Workshops/UpdateWorkshop'
import Addworkshop from './Admin/Pages/Workshops/Addworkshop'
import ShowWorkshop from './Admin/Pages/Workshops/ShowWorkshop'
import AddBooths from './Admin/Pages/Booths/AddBooths'
import Showbooth from './Admin/Pages/Booths/Showbooth'
import Bookevents from './Exhibitor/Pages/Events/Bookevents'
import Exhibitor_Dashboard from './Exhibitor/Pages/Exhibitor_Dashboard'
import Bookingform from './Exhibitor/Pages/Bookingform/Bookingform'
import Bookings from './Exhibitor/Pages/Bookings/Bookings'
import Profile from './Exhibitor/Pages/Profile/Profile'
import Login from './Frontendcode/Pages/Login/Login'
import Adminbookings from './Admin/Pages/Bookings/Adminbookings'
import Addfloor from './Admin/Pages/Floors/Addfloor'
import Showfloor from './Admin/Pages/Floors/Showfloor'
import Addhalls from './Admin/Pages/Hall/Addhalls'
import Showhall from './Admin/Pages/Hall/Showhalls'
import Addspeaker from './Admin/Pages/Speakers/AddSpeakers'
import Showspeaker from './Admin/Pages/Speakers/ShowSpeakers'
import Updatefloor from './Admin/Pages/Floors/Updatefloor'
import Updatebooth from './Admin/Pages/Booths/Updatebooth'
import Updatehall from './Admin/Pages/Hall/Updatehall'
import UpdateSpeaker from './Admin/Pages/Speakers/Updatespeaker'
import ForgotPassword from './Exhibitor/Pages/ForgetPassword/ForgotPassword'
import VerifyPin from './Exhibitor/Pages/ForgetPassword/VerifyPin'
import ResetPassword from './Exhibitor/Pages/ForgetPassword/ResetPassword'
import Home from './Frontendcode/Pages/Home'
import Signup from './Frontendcode/Pages/Signup/Signup'
import Attendeeabout from './Frontendcode/Pages/Attendeeabout'
import Contactus from './Frontendcode/Pages/Contactus'
import Speakerlist from './Frontendcode/Pages/Speakerlist'
import Workshop from './Frontendcode/Pages/Workshop'
import Bookingtable from './Frontendcode/Pages/Bookingtable'
import Userprofille from './Frontendcode/Pages/Userpro/Userprofille'
import ChangePassword from './Frontendcode/Pages/Userpro/ChangePassword'
import EventList from './Frontendcode/Pages/Event'




const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>

        {/* frontend routes */}

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/aboutus' element={<Attendeeabout/>}/>
        <Route path='/Contact' element={<Contactus/>}/>
        <Route path='/Speaker' element={<Speakerlist/>}/>
        <Route path='/Event' element={<EventList/>}/>
        <Route path='/Workshop' element={<Workshop/>}/>
        <Route path='/userbooking' element={<Bookingtable/>} />
        <Route path='/userprofile' element={<Userprofille/>} />
        <Route path='/changepass' element={<ChangePassword/>} />

        
        


        {/* Exhibitor routes */}

        <Route path='/Exhibitor' element={<Exhibitor_Dashboard/>}/>
        <Route path='/bookevents' element={<Bookevents/>}/>
        <Route path='/bookings/:id' element={<Bookingform/>}/>
        <Route path='/booking' element={<Bookings/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/verify-pin' element={<VerifyPin/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>


        {/* admin routes */}

        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/addUser' element={<Adduser/>}/>
        <Route path='/showUser' element={<Showuser/>}/>
        <Route path='/updateuser/:id' element={<Userupdate/>}/>
        <Route path='/adminbookings' element={<Adminbookings/>}/>
        <Route path='/addfloor' element={<Addfloor/>}/>
        <Route path='/showfloor' element={<Showfloor/>}/>
        <Route path='/updatefloor/:id' element={<Updatefloor/>}/>
        <Route path='/addbooth' element={<AddBooths/>}/>
        <Route path='/showbooth' element={<Showbooth/>}/>
        <Route path='/updatebooth/:id' element={<Updatebooth/>}/>
        <Route path='/addhall' element={<Addhalls/>}/>
        <Route path='/showhall' element={<Showhall/>}/>
        <Route path='/updatehall/:id' element={<Updatehall/>}/>
        <Route path='/addevent' element={<AddEvent/>}/>
        <Route path='/eventdetails' element={<EventDetails/>}/>
        <Route path='/updateEvent/:id' element={<UpdateEvent/>}/>
        <Route path='/addspeaker' element={<Addspeaker/>}/>
        <Route path='/showspeaker' element={<Showspeaker/>}/>
        <Route path='/updatespeaker/:id' element={<UpdateSpeaker/>}/>
        <Route path='/addworkshop' element={<Addworkshop/>}/>
        <Route path='/showworkshop' element={<ShowWorkshop/>}/>
        <Route path='/updateworkshop/:id' element={<UpdateWorkshop/>}/>


        

  
   </Routes>
   </BrowserRouter>
    </>
   
  )
}

export default App