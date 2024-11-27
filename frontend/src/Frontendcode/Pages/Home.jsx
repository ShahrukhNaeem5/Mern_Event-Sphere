import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Section1 from '../Components/Section1';
import About from '../Components/About';
import Cards from '../Components/Cards';
import Speaker from '../Components/Speaker';
import Bookbanner from '../Components/Bookbanner';
import SingleEvent from '../Components/SingleEvent'
import Testimonial from '../Components/Testimonial';
import Faq from '../Components/Faq';
import Reach from '../Components/Reach';
import Footer from '../Components/Footer';


const Home = () => {
  const [speakerDetail, setspeakerDetail] = useState([]);
  const [eventDetail, seteventDetail] = useState([]);

  
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const responseData = await axios.get('http://localhost:5000/api/addevent');
            seteventDetail(responseData.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    fetchEvents();
}, [eventDetail]);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const responseData = await axios.get('http://localhost:5000/api/addspeaker');
        setspeakerDetail(responseData.data);
      } catch (error) {
        console.error('Error fetching Speakers:', error);
      }
    };

    fetchSpeaker();
  }, []); // Run only once when component mounts

  

  return (
    <>
      <Navbar />
      <Section1 />
      <br />
      <About />
      {/* <Cards /> */}

      {/* Speakers Section */}
      <section className="speakers">
        <div className="container">
          <div className="speaker-title text-center p-2">
            <h2>MEET OUR <span className="pink">SPEAKERS</span></h2>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <Link className="btn my-2" to="/Speakerlist">VIEW MORE SPEAKERS</Link>
          </div>
          <div className="speaker-list text-center text-white">
            <div className="row">
              {speakerDetail.length > 0 && speakerDetail.slice(0,4).map((speaker) => (
                <>
                <div className="col-lg-3 col-md-6 p-2">
                      <Speaker key={speaker._id} speaker={speaker} />
                </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Bookbanner />

      {/* event */}
      <section class="schedules">
    <div class="container">
    <div class="schedule-inner">
    <div class="schedule-title text-center mb-6 w-lg-60 mx-auto">
    <p class="mb-1 pink">OUR SCHEDULES</p>
    <h2 class="mb-1">FOLLOW <span class="pink">EVENT</span> SCHEDULES</h2>
    <p class="m-0">Book your place now for an unforgettable event experience!</p>
    <p class="m-0">wanna book event? explore exhibitor panel for event booking <Link to="/login" style={{color:'red'}}>CLICK HERE</Link> !</p>
    </div>
    <div class="schedule-list-outer">
    <div class="schedule-list-top mb-7">
    <div class="row align-items-center">
      {/* <div class="col-lg-3 col-md-4">
      <SingleDays/>
      </div> */}
          {
        eventDetail.slice(0,2).map((event)=>(
          <>
          <div class="col-lg-6 col-md-6">
    <div class="schedule-list  text-center text-sm-start">
          <SingleEvent key={event._id} event={event}/>
          </div>
    </div>
          </>
        ))
      }

    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
      {/* event */}


      {/* <EventSchedule /> */}
      {/* <EventSchedule /> */}
      {/* <WorkshopSchedule /> */}
      {/* <Gallery /> */}
      <Testimonial />
      
      <Faq />
      <Reach />
      <br /><br />
      <Footer />
    </>
  );
};

export default Home;
