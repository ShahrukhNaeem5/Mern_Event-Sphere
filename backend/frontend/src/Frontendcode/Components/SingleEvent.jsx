import React from 'react';
import { Link } from 'react-router-dom';
import './SingleWorkshop.css'; 

const SingleEvent = (prop) => {
  console.log(`This is the event prop `,prop)
  

  const {_id,title,date,location,description,theme,Eventimage} = prop.event;
  return (
     
    <div className="schedule-list-box bg-lightgrey border border-white border-2 rounded px-6 py-4 mb-5" style={{height:700}}>
      {/* Event image at the top */}
      <div className="event-image mb-3">
        <img src={`/uploads/eventImages/${Eventimage}`}  style={{height:"350px"}}  alt="event" className="img-fluid"  />
      </div>

      {/* Title of the workshop */}
      <div className="schedule-box-title">
        <h5 className="mb-2">
          <Link to="/Scheduledetail" className="black">{title}</Link>
        </h5>
      </div>
      
      {/* Workshop information section */}
      <div className="schedule-box-info">
       
        
        {/* Date, location, and floor information */}
        <ul className="mb-2 p-0">
          <li className="d-inline"><i className="fa fa-clock-o pink me-2" aria-hidden="true"></i><small><strong>Date:</strong> {new Date(date).toLocaleString()}</small></li> 
          <br />
          <li className="d-inline"><i className="fa fa-thumb-tack pink mx-2" aria-hidden="true"></i><small><strong>Location:</strong> {location}</small></li>
        </ul>


        
      </div>
      
      {/* Speaker information section */}
      <div className="schedule-box-bio d-md-flex">
        <div className="schedule-bio-image mb-2">
        <small><strong>Theme:</strong> <span className="pink">{theme}</span> </small>
        {/* <p className="mt-1 mb-0"><Link to="/Speakerdetail" className="pink">{theme}</Link></p> */}
          {/* Speaker image */}
          {/* <img src="images/team/1.jp  g" alt="team-image" className="me-2 rounded-circle" /> */}
        </div>
        
        {/* <div className="schedule-bio-info"> */}
          {/* Speaker name and role */}
          {/* <small><strong>Theme</strong></small>
          <p className="mt-1 mb-0"><Link to="/Speakerdetail" className="pink">{theme}</Link></p> */}
        {/* </div> */}
      </div>
               {/* Description of the workshop */}
               <p className="mb-2">
          <strong >Description:</strong> <small >{description}</small>
        </p>
    </div>
  );
};

export default SingleEvent;
