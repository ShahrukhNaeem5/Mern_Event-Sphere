import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SingleDays from './SingleDays'
import SingleEvent from './SingleEvent'

const Schedule = () => {
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

  return (

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
    <div class="row">
      {
        eventDetail.map((event)=>(
          <>
          <div class="col-lg-4 col-md-4">
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
  )
}

export default Schedule
