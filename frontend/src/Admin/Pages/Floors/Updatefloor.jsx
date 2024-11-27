import React, { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom';


const Updatefloor = () => {
    const { id } = useParams();
    const [floorname, setfloorname] = useState("")
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    const navigate = useNavigate()




    const HandleSubmit = async (e) => {

        const floorData = {
            floorname: floorname,
        }
        try {

            const FloorResponse = await axios.put(`http://localhost:5000/api/addfloor/${id}`, floorData);
            if (FloorResponse.status === 200) {
                navigate('/showfloor')
                setError("");
                setSuccess("Floor updated successfully.");
            }
        } catch (error) {
            setSuccess("");
            setError(error.response ? error.response.data.error : "Error updating floor.");
        }
    }

     // for container
     const gradientStyleforcontainer = {
        background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
    };
    // for content in container
    const gradientStyleforcontent = {
        background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
    }

    const gradientStyleforbutton = {
        background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
    };



    return (
        <>
            <Sidebar />
            <Navbar />
            <div className='app-container' style={gradientStyleforcontainer}>
                <div className='app-content' style={{height:'100vh'}}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Update Floors</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add floors.</h5>
                                        </div>
                                        <div className='card-body'>
                                            <div>
                                                <div className='example-content'>

                                                    <form className='row g-3' onSubmit={HandleSubmit}>
                                                        {
                                                            Success ? (
                                                                <div class="alert alert-success" role="alert">
                                                                    {Success}
                                                                </div>
                                                            ) : ""
                                                        }

                                                        {
                                                            Error ? (
                                                                <div class="alert alert-danger" role="alert">
                                                                    {Error}
                                                                </div>
                                                            ) : ""
                                                        }
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Floor Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e)=>setfloorname(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>

                                                        <div className="col-12">
                                                            <button type="submit" className="btn text-white" style={gradientStyleforbutton}>Update</button>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
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

export default Updatefloor