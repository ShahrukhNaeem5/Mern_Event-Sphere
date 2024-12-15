import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Bookingtable = () => {
  const [workshopBookings, setWorkshopBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');  // New state to store error messages
  

  useEffect(() => {
    const usrid = Cookies.get('UserId');
    if (usrid) {
      setUserId(usrid);
    }
  }, []);

  useEffect(() => {
    const fetchworkshopBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/workshopbooking/${userId}`);
        setWorkshopBookings(response.data);
        setError('');  // Clear error when data is successfully fetched
      } catch (error) {
        // Check if it's a 404 error
        if (error.response && error.response.status === 404) {
          setError('No bookings found');  // Set error message
          setWorkshopBookings([]);  // Clear bookings data
        } else {
          console.log("Error fetching workshop bookings", error);
        }
      }
    };

    if (userId) {
      fetchworkshopBookings();
    }
  }, [userId]);

  return (
    <>
    <Navbar/>
      <section className="banner page-banner position-relative pb-0">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-title text-center position-relative py-11">
            <h2 className="text-white">Your Booking's</h2>
          </div>
        </div>
      </section>
      
      <br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Show Booking Details</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered zero-configuration">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Workshop Name</th>
                    <th>Workshop Date</th>
                    <th>Workshop Location</th>
                    <th>Workshop Speaker</th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    // Display error message if any error occurs
                    <tr>
                      <td colSpan="7">{error}</td>
                    </tr>
                  ) : workshopBookings.length > 0 ? (
                    workshopBookings.map((workshopBooking) => (
                      <tr key={workshopBooking._id}>
                        <td>{workshopBooking.user.Username}</td>
                        <td>{workshopBooking.user.Useremail}</td>
                        <td>{workshopBooking.workshop.Topic}</td>
                        <td>{new Date(workshopBooking.workshop.Date).toLocaleString()}</td>
                        <td>{workshopBooking.workshop.Location}</td>
                        <td>{workshopBooking.workshop.Speaker}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">Loading bookings...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <br /><br /><br /><br /><br /><br />
      <Footer/>
    </>
  );
};

export default Bookingtable;
