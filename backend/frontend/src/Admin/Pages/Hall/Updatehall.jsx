import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const Updatehall = () => {
    const { id } = useParams();
    const [HallName, setHallName] = useState("")
    const [BoothId, setBoothId] = useState([])
    const [FloorId, setFloorId] = useState([])
    const [boothSelected_sortFloor, setboothSelected_sortFloor] = useState()
    const [floorSelected_sortBoth, setfloorSelected_sortBoth] = useState()
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    const [Hallstatus, setHallstatus] = useState('')


    const [SortedBooth, setSortedBooth] = useState([]);


    useEffect(async () => {

        const Response = await axios("http://localhost:5000/api/addbooth/");

        setBoothId(Response.data.boths);
        setFloorId(Response.data.floor);
    }, [0])




    const HandleSubmit = async (e) => {
        e.preventDefault();

        const HallData = {
            HallName: HallName,
            boothId: floorSelected_sortBoth,
            floorId: boothSelected_sortFloor,
            status : Hallstatus
        };

        try {
            // Send PUT request to update hall details
            const hallResponse = await axios.put(`http://localhost:5000/api/addhall/${id}`, HallData);
            setError("");
            setSuccess(hallResponse.data.success);
        } catch (error) {
            setError(error.response?.data?.error || "Failed to update hall");
        }
    };


    useEffect(() => {
        console.log("both select kia")
        floorSelected();

    }, [floorSelected_sortBoth])


    const floorSelected = (id) => {

        console.log(BoothId)
        console.log(`${id}`)

        console.log("booth select krne per chalega")


    }




    useEffect(() => {
        console.log(boothSelected_sortFloor)


        boothSelected()

    }, [boothSelected_sortFloor])

    const boothSelected = () => {
        // Filter FloorId based on the selected floor
        const floorDetailData = FloorId.filter(option => option.floorname === boothSelected_sortFloor);

        console.log(floorDetailData);

        // Check if we have at least one matching entry
        if (floorDetailData.length > 0) {
            // Destructure the first object to get _id
            const [{ _id }] = floorDetailData;
            console.log(_id);

            const BoothDetailData = BoothId.filter(option => option.floorId === _id);




            setSortedBooth(BoothDetailData);

            console.log(SortedBooth)
        } else {
            console.error('No matching floor found.');
        }
    };

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
                    <div class="content-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Update Halls</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add halls.</h5>
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
                                                            <label className='form-label text-white'>Add Hall</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={HallName}
                                                                onChange={(e) => setHallName(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Floor</label>
                                                            <select className="form-control" onChange={(e) => { setboothSelected_sortFloor(e.target.value); }}>
                                                                <option>Choose Floor</option>


                                                                {
                                                                    FloorId.map((floor, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={floor._Id}>{floor.floorname}</option>
                                                                            </>
                                                                        )
                                                                    })

                                                                }
                                                            </select>
                                                        </div>

                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Booth</label>
                                                            <select className="form-control" onChange={(e) => { setfloorSelected_sortBoth(e.target.value); }} >
                                                                <option>Choose Booth</option>


                                                                {
                                                                    SortedBooth.map((booth, index) => {
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={booth._Id}>{booth.boothName}</option>
                                                                            </>
                                                                        )
                                                                    })

                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Status</label>
                                                            <select className="form-control" nChange={(e) => { setHallstatus(e.target.value)}}  >
                                                                <option>Choose Status</option>
                                                                <option>Occupied</option>
                                                                <option>Unoccupied</option>
                                                            </select>
                                                        </div>





                                                        <div class='form-group'>
                                                            <button type='submit' class='btn text-white' style={gradientStyleforbutton}>Update</button>

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

export default Updatehall