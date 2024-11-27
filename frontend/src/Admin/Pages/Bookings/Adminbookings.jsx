import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import Footer from '../../Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Adminbookings = () => {

    const [Bookings, setBookings] = useState([]);
    const [Error, setError] = useState([])
    console.log(Bookings)

    useEffect(() => {
        const fetchBookings = async () => {
            try {

                const { data } = await axios.get('http://localhost:5000/api/bookings/allbookings', {

                });
                setBookings(data);
            } catch (err) {
                setError('Failed to fetch bookings.');
                console.error('Error fetching bookings:', err);
            }
        };

        fetchBookings();
    }, []);



    const updateBookingStatus = async (bookingId, status) => {
        try {

            await axios.patch(`http://localhost:5000/api/bookings/${bookingId}`, { status }, {

            });
            // Refresh the list of bookings
            const { data } = await axios.get('http://localhost:5000/api/bookings/allbookings', {

            });
            setBookings(data);
        } catch (err) {
            setError('Failed to update booking status.');
            console.error('Error updating booking status:', err);
        }
    };


    // for container
    const gradientStyleforcontainer = {
        background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
    };

    const gradientStyleacctheme = {
        background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <div class="app-container" style={gradientStyleforcontainer}>
                <div class="app-content" style={{ height: '100vh' }}>
                    <div class="content-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>See Bookings</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="container mt-4">
                                        <div className="table-responsive text-white" style={gradientStyleacctheme}>
                                            <table className="table table-bordered text-white" style={gradientStyleacctheme}>
                                                <thead>
                                                    <tr>
                                                        <th>Event Title</th>
                                                        <th>Exhibitor Name</th>
                                                        <th>Company Name</th>
                                                        <th>Product Name</th>
                                                        <th>Status</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Bookings.map((temp) => {
                                                            return (
                                                                <tr key={temp._id}>
                                                                    <td>{temp.Booking_Event_title}</td>
                                                                    <td>{temp.exhibitorname}</td>
                                                                    <td>{temp.companyname}</td>
                                                                    <td>{temp.productname}</td>
                                                                    <td>{temp.status}</td>
                                                                    <td>
                                                                        <button onClick={() => updateBookingStatus(temp._id, 'Approved')} className='btn btn-primary'>Approve</button>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => updateBookingStatus(temp._id, 'Rejected')} className='btn btn-danger'>Reject</button>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
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
    )
}

export default Adminbookings
