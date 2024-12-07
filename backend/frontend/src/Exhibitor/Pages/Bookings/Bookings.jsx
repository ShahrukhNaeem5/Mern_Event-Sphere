import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../../Admin/Components/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const { id } = useParams();

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = Cookies.get('UserAuthToken'); // Get token from cookies
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token in Authorization header
                    }
                });
                console.log(response.data)
                setBookings(response.data);
            } catch (error) {
                console.log('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [id]);

    const gradientStyleacctheme = {
        background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
      };

       
  // for container
  const gradientStyleforcontainer = {
    background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
  };
    

    // Confirm booking function
    // const handleConfirm = async (bookingId) => {
    //     try {
    //         await axios.post(`http://localhost:5000/api/bookings/${bookingId}/confirm`);
    //         setBookings(bookings.map(booking =>
    //             booking._id === bookingId ? { ...booking, status: 'Confirmed' } : booking
    //         ));
    //     } catch (error) {
    //         console.error('Error confirming booking:', error);
    //     }
    // };

    // Reject booking function
    // const handleReject = async (bookingId) => {
    //     try {
    //         await axios.post(`http://localhost:5000/api/bookings/${bookingId}/reject`);
    //         setBookings(bookings.map(booking =>
    //             booking._id === bookingId ? { ...booking, status: 'Rejected' } : booking
    //         ));
    //     } catch (error) {
    //         console.error('Error rejecting booking:', error);
    //     }
    // };

    return (
        <>
            <Header />
            <Sidebar />
            <div className="app-container" style={gradientStyleforcontainer}>
                <div className="app-content" style={{height:'100vh'}}>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="page-description">
                                        <h1 className='text-white'>Your Bookings</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="container mt-4">
                                        <div className="table-responsive text-white" style={gradientStyleacctheme}>
                                            <table className="table table-bordered text-white" style={gradientStyleacctheme}>
                                                <thead className='table-dark'>
                                                    <tr>
                                                        <th>Event Title</th>
                                                        <th>Exhibitor Name</th>
                                                        <th>Company Name</th>
                                                        <th>Status</th>
                                                        <th>Booking</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='table-dark'>
                                                    {bookings.map((booking) => (
                                                        <tr key={booking._id}>
                                                            <td>{booking.Booking_Event_title}</td>
                                                            <td>{booking.exhibitorname}</td>
                                                            <td>{booking.companyname}</td>
                                                            <td>{booking.status}</td>
                                                            <td>
                                                                {booking.status === 'Pending' ? (
                                                                    <button className="btn btn-secondary" disabled>
                                                                        Pending
                                                                    </button>
                                                                ) : booking.status === 'Approved' ? (
                                                                    <button className="btn btn-success" enable>
                                                                        Confirmed
                                                                    </button>
                                                                ) : booking.status === 'Rejected' ? (
                                                                    <button className="btn btn-danger" disabled>
                                                                        Rejected
                                                                    </button>
                                                                ) : null}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Bookings;
