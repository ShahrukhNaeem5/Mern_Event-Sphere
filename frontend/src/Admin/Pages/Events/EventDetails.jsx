import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const EventDetails = () => {
    const [eventDetail, seteventDetail] = useState([]);
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')


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


    const DeleteEvent = async (id) => {
        const singleDelete = await axios.delete(`http://localhost:5000/api/addevent/${id}`)
        if (singleDelete == 201) {
            setError("")
            setSuccess("Event Deleted")
            seteventDetail(eventDetail.filter(event => event._id !== id));


        }

    }

    // for container
    const gradientStyleforcontainer = {
        background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
    };

    const gradientStyleacctheme = {
        background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
    };

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className='app-container' style={gradientStyleforcontainer}>
                <div className='app-content' style={{ height: '100vh' }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>See Events</h1>
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
                                                        <th>Event Date</th>
                                                        <th>Event Location</th>
                                                        <th>Event Description</th>
                                                        <th>Event Theme</th>
                                                        <th>Event Image</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        eventDetail.map((events) => {
                                                            return (
                                                                <tr>
                                                                    <td>{events.title}</td>
                                                                    <td>{events.date}</td>
                                                                    <td>{events.location}</td>
                                                                    <td>{events.description}</td>
                                                                    <td>{events.theme}</td>
                                                                    <td>{events.Eventimage}</td>
                                                                    <td><Link to={`/updateEvent/${events._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                                                    <td><button className='btn btn-danger' onClick={() => DeleteEvent(events._id)}>Delete</button></td>
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
    );
};

export default EventDetails;
