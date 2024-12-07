import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
const ShowWorkshop = () => {
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
    }, [workshopDetail]);

    const DeleteWorkshop = async (id) => {
        const singleDelete = await axios.delete(`http://localhost:5000/api/addworkshop/${id}`)
        if (singleDelete === 201) {
            setError("")
            setSuccess("Workshop Deleted")
            setworkshopDetail(workshopDetail.filter(work => work._id !== id));


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
                                        <h1 className='text-white'>See Workshops</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="container mt-4">
                                        <div className="table-responsive text-white" style={gradientStyleacctheme}>
                                            <table class="table table-bordered text-white" style={gradientStyleacctheme}>
                                                <thead>
                                                    <tr>
                                                        <th>Workshop Topic</th>
                                                        <th>Workshop Date</th>
                                                        <th>Workshop Location</th>
                                                        <th>Workshop Speaker</th>
                                                        <th>Workshop Image</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        workshopDetail.map((work) => {
                                                            return (
                                                                <tr>
                                                                    <td>{work.Topic}</td>
                                                                    <td>{work.Date}</td>
                                                                    <td>{work.Location}</td>
                                                                    <td>{work.Speaker}</td>

                                                                    <td>{work.Workshopimage}</td>
                                                                    <td><Link to={`/updateworkshop/${work._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                                                    <td><button className='btn btn-danger' onClick={() => DeleteWorkshop(work._id)}>Delete</button></td>
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

export default ShowWorkshop