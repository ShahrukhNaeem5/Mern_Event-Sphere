import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Footer from '../../../Admin/Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Bookevents = () => {

  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();


  // naviagte with event id to booking form

  const handleBookEvent = (id) => {

    navigate(`/bookings/${id}`);
  };


  // get all events

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const fetch = await axios.get('http://localhost:5000/api/addevent')
        setEvents(fetch.data.events)
      } catch (error) {
        console.error(`error fetching : ${error} `)
      }
    };

    fetchevents();

  }, [])

  const gradientStyleacctheme = {
    background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
  };

   
  // for container
  const gradientStyleforcontainer = {
    background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
  };

  
  const gradientStyleforbutton = {
    background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
};


  return (

    <>
      <Header />
      <Sidebar />

      <div class="app-container" style={gradientStyleforcontainer}>
        <div class="app-content" style={{height:'100%'}}>
          <div class="content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="page-description">
                    <h1 className='text-white'>ALL EVENTS</h1>

                  </div>
                </div>
              </div>
              <br />
              <div className='row'>
                {Events.length > 0 ? (
                  Events.map((temp) => (
                    <div class="col-xl-6" style={{ textAlign: 'center' }}>
                      <div class="card" style={gradientStyleacctheme}>
                        <img src={temp.Eventimage ? `http://localhost:5000/uploads/eventImages/${temp.Eventimage}` :  '' } height={400} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h3 class="card-title" style={{color:'white'}}>EVENT TITLE : <strong> {temp.title}</strong> </h3>
                          <br />
                          <h5 class="card-title" style={{color:'white'}}>EVENT DATE :  <strong>{temp.date}</strong> </h5>
                          <h5 class="card-title" style={{color:'white'}}>EVENT DESCRIPTION : <strong> {temp.description}</strong> </h5>
                          <h5 class="card-title" style={{color:'white'}}>EVENT LOCATION :  <strong>{temp.location}</strong> </h5>
                          <h5 class="card-title" style={{color:'white'}}>EVENT THEME :  <strong>{temp.theme}</strong> </h5>
                          <br />
          
                          <button onClick={() => handleBookEvent(temp._id)} className='btn text-white' style={gradientStyleforbutton}>Book Event</button>
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <p>No events available</p>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Bookevents