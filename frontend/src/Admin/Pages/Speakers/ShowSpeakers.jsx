import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const Showspeaker = () => {
    const [speakerDetail, setspeakerDetail] = useState([])

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
    }, [speakerDetail]);
    const Deletespeaker = async (id) => {
        const singleDelete = await axios.delete(`http://localhost:5000/api/addspeaker/${id}`)
        if (singleDelete == 201) {

            setspeakerDetail(speakerDetail.filter(speaker => speaker._id !== id));


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
                                        <h1 className='text-white'>Show Speakers</h1>
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
                                                        <th>Speaker Name</th>
                                                        <th>Speaker Email</th>
                                                        <th>Speaker Position</th>
                                                        <th>Speaker Image</th>

                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        speakerDetail.map((speaker) => {
                                                            return (
                                                                <tr>
                                                                    <td>{speaker.Speakername}</td>
                                                                    <td>{speaker.Speakeremail}</td>
                                                                    <td>{speaker.position}</td>
                                                                    <td>{speaker.Speakerimage}</td>

                                                                    <td><Link to={`/updateSpeaker/${speaker._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                                                    <td><button className='btn btn-danger' onClick={() => Deletespeaker(speaker._id)}>Delete</button></td>
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

export default Showspeaker