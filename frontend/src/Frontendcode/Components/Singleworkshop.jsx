import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import JwtDecode, { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from 'react-router-dom';
import './SingleWorkshop.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const SingleWorkshop = (props) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  const notify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const { _id, Topic, Date: workshopDate, Location, Speaker, Workshopimage } = props.workshop || {};
  
  // Format the date
  const formattedDate = workshopDate ? new Date(workshopDate).toLocaleString() : 'Date Not Available';

  useEffect(() => {
    const token = Cookies.get('UserAuthToken');
    setToken(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
      setIsLoggedIn(true);
    }
  }, []); // Only run once on mount

  const handleBooking = async (workshopId) => {
    const formData = { user: userId, workshop: workshopId };
    
    try {
      const response = await axios.post("http://localhost:5000/api/workshopbooking", formData);
      successNotify(response.data.msg);

      setTimeout(() => {
        navigate("/booking");
      }, 4000);
    } catch (error) {
      const errorMessage = error.response?.data?.err || "Error Booking Workshop";
      notify(errorMessage);
    }
  };

  return (
    <>
      <div className="schedule-list-box bg-lightgrey border border-white border-2 rounded px-6 py-4 mb-5">
        <div className="event-image mb-3">
          <img src={Workshopimage ? `http://localhost:5000/uploads/workshopImages/${Workshopimage}` :  '' } style={{ height: "240px" }} alt="event" className="img-fluid" />
        </div>

        <div className="schedule-box-title">
          <h5 className="mb-2">
            <Link to="/Scheduledetail" className="black">{Topic}</Link>
          </h5>
        </div>

        <div className="schedule-box-info">
          <ul className="mb-2 p-0">
            <li className="d-inline">
              <i className="fa fa-calendar-o pink me-2" aria-hidden="true"></i>
              <small><strong>Date:</strong> {formattedDate}</small>
              <small><strong>Date:</strong> {_id}</small>
            </li>
            <br />
            <li className="d-inline">
              <i className="fa fa-map-marker pink mx-2" aria-hidden="true"></i>
              <small><strong>Location:</strong> {Location}</small>
            </li>
          </ul>
        </div>

        <div className="schedule-box-bio">
          <div className="schedule-bio-info">
            <p className="mt-1 mb-0">
              <Link to="/Speakerdetail" className="pink">{Speaker}</Link>
            </p>
            <small><strong>Host & Speaker</strong></small>
          </div>

          <div className="align-self-end">
            {isLoggedIn ? (
              <Link className="btn btn3" onClick={() => handleBooking(_id)}>Book Workshop<i className="fa fa-long-arrow-right ms-4"></i></Link>
            ) : (
              <Link className="btn btn3" onClick={() => notify("First You Have to LogIn To book for workshop")}>
                Book Workshop<i className="fa fa-long-arrow-right ms-4"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleWorkshop;
