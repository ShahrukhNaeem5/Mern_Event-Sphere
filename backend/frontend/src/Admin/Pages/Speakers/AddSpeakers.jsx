import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import Footer from '../../Components/Footer'

const Addspeaker = () => {
    const [Speakername, setSpeakername] = useState("")
    const [Speakeremail, setSpeakeremail] = useState("")
    const [position, setposition] = useState("")
    const [Speakerimage, setSpeakerimage] = useState(null)
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')


    const SpeakerSubmit = async (e) => {
        e.preventDefault()
        const SpeakerData = new FormData();
        SpeakerData.append("Speakername", Speakername)
        SpeakerData.append("Speakeremail", Speakeremail)
        SpeakerData.append("position", position)
        SpeakerData.append("Speakerimage", Speakerimage)

        console.log(SpeakerData)
        try {

            const fetchSpeaker = await axios.post('http://localhost:5000/api/addspeaker', SpeakerData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                console.log(fetchSpeaker)
            setError("")
            setSuccess(fetchSpeaker.data.success)

        } catch (error) {
            setSuccess("")
            setError(error.response.data.error)

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
                <div className='app-content' style={{ height: '100vh' }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Add Speakers</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add speakers.</h5>
                                        </div>
                                        <div className='card-body'>
                                            <div>
                                                <div className='example-content'>

                                                    <form className='row g-3' onSubmit={SpeakerSubmit}>
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
                                                        <div class="col-12">
                                                            <label class="form-label text-white">Speaker Name</label>
                                                            <input type="text" class="form-control" onChange={(e) => setSpeakername(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">Speaker Email</label>
                                                            <input type="email" class="form-control" onChange={(e) => setSpeakeremail(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">Speaker Position</label>
                                                            <input type="text" class="form-control" onChange={(e) => setposition(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">Speaker Image</label>
                                                            <input type="file" class="form-control" onChange={(e) => setSpeakerimage(e.target.files[0])} />
                                                        </div>
                                                        <br />

                                                        <div class='col-12'>
                                                            <button type='submit' class='btn text-white' style={gradientStyleforbutton}>Add</button>

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

export default Addspeaker