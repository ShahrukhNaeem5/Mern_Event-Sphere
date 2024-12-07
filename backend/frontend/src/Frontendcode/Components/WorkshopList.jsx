import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Singleworkshop from './Singleworkshop'
import SingleDays from './SingleDays'
// import SingleEvent from './SingleEvent'
import SingleWorkshop from './Singleworkshop'

const WorkshopList = () => {
  const [workshopDetail, setworkshopDetail] = useState([]);
  const [Error, setError] = useState('')
  const [Success, setSuccess] = useState('')

  
  useEffect(() => {
    const fetchWorkshop = async () => {
        try {
            const responseData = await axios.get('http://localhost:5000/api/addworkshop');
            setworkshopDetail(responseData.data.workshops);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        }
    };

    fetchWorkshop();
}, []);


  return (
    <section class="schedules">
    <div class="container">
    <div class="schedule-inner">
    <div class="schedule-title text-center mb-6 w-lg-60 mx-auto">
    <p class="mb-1 pink">OUR SCHEDULES</p>
    <h2 class="mb-1">FOLLOW <span class="pink">Workshop</span> SCHEDULES</h2>
    <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
    mattis, pulvinar dapibus leo.</p>
    </div>
    
    <div class="schedule-list-outer">
    <div class="schedule-list-top mb-7">
    <div class="row">
      {
        workshopDetail.map((workshop)=>(
          <>
          {/* to adjust the height of the card give height to this class (.bg-lightgrey) in SingleWorkshop.css in components folder  */}
          <div class="col-lg-4   col-md-4 ">
            <div class="schedule-list  text-center text-sm-start">
                {/* <SingleWorkshop key={workshop._id} workshop={workshop}/> */}
                <SingleWorkshop workshop={workshop} />

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

export default WorkshopList
