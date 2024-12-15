import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
const UpdateEvent = () => {
    const [Title, setTitle] = useState("")
    const [Date, setDate] = useState("")
    const [Location, setLocation] = useState("")
    const [Description, setDescription] = useState("")
    const [Theme, setTheme] = useState("")
    const [Eventimage, setEventimage] = useState("")
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    const [Booths, setBooths] = useState([])
    const [SortBoothId, setSortBoothId] = useState('')
    const [SorthallId, setSorthallId] = useState('')
    const [floors, setfloors] = useState([])
    const [halls, sethalls] = useState([])
    const [SortfloorId, setSortfloorId] = useState("")
    const [SortedBooth, setSortedBooth] = useState([]);
    const [SortedHalls, setSortedHalls] = useState([]);
    let { id } = useParams()

    useEffect(() => {
        const EventData = async () => {
            try {
                console.log(id);
                const FetchEvent = await axios.get(`http://localhost:5000/api/addevent/${id}`)
                const eventdetail = FetchEvent.data
                console.log(eventdetail);
                setTitle(eventdetail[0].title)
                setDate(eventdetail[0].date)
                setLocation(eventdetail[0].location)
                setDescription(eventdetail[0].description)
                setTheme(eventdetail[0].theme)


            } catch (error) {
                console.error('Error fetching event data:', error);

            }

        }
        EventData()

    }, [id])

    useEffect(() => {
        const fetchBooths = async () => {
            try {
                const responsee = await axios.get('http://localhost:5000/api/addevent/');
                setBooths(responsee.data.booth);
                const unoccupiedHalls = responsee.data.Halls.filter(hall => hall.status === 'unoccupied');
                sethalls(unoccupiedHalls);



            } catch (error) {
                console.error('Failed to fetch Booths:', error);
            }
        };

        fetchBooths();
    }, [])

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const responsee = await axios.get('http://localhost:5000/api/addevent/');
                setfloors(responsee.data.floor);



            } catch (error) {
                console.error('Failed to fetch floors:', error);
            }
        };

        fetchFloors();
    }, []);

    useEffect(() => {
        if (SortfloorId) {
            const filtered = Booths.filter(booth => booth.floorId === SortfloorId);
            setSortedBooth(filtered);

            const filteredHalls = halls.filter(hall => hall.floorId === SortfloorId);
            setSortedHalls(filteredHalls);
        }
    }, [SortfloorId, Booths, halls]);
    useEffect(() => {
        console.log(SortfloorId)


        boothSelected()

    }, [SortfloorId])

    const boothSelected = () => {
        // Filter FloorId based on the selected floor
        const floorDetailData = floors.filter(option => option.floorname === SortfloorId);

        console.log(floorDetailData);

        // Check if we have at least one matching entry
        if (floorDetailData.length > 0) {
            // Destructure the first object to get _id
            const [{ _id }] = floorDetailData;
            console.log(_id);

            const BoothDetailData = Booths.filter(option => option.floorId === _id);

            console.log(BoothDetailData)


            setSortedBooth(BoothDetailData);


        } else {
            console.error('No matching floor found.');
        }
    };


    useEffect(() => {
        if (SortfloorId && SortBoothId && SorthallId) {
            const selectedFloor = floors.find(floor => floor._id === SortfloorId)?.floorname || "";
            const selectedBooth = Booths.find(booth => booth._id === SortBoothId)?.boothName || "";
            const selectedHall = halls.find(hall => hall._id === SorthallId)?.HallName || "";

            setLocation(`Floor-${selectedFloor}, Booth no ${selectedBooth}, Hall ${selectedHall}`);
        }
    }, [SortfloorId, SortBoothId, SorthallId, floors, Booths, halls]);


    const HandleSubmit = async (e) => {
        const neweventData = new FormData()
        neweventData.append("title", Title)
        neweventData.append("date", Date)
        neweventData.append("location", Location)
        neweventData.append("description", Description)
        neweventData.append("theme", Theme)
        neweventData.append("Eventimage", Eventimage)

        try {
            const FetchResponse = await axios.put(`http://localhost:5000/api/addevent/${id}`, neweventData,
                { headers: { 'Content-Type': 'multipart/form-data' } }

            )

            if (FetchResponse.status == 201) {
                setError("")
                setSuccess(FetchResponse.data.success)

                setTitle("");
                setDate("");
                setLocation("");
                setDescription("");
                setTheme("");
                setEventimage("");
                if (SorthallId) {
                    await axios.put(`http://localhost:5000/api/addhall/${SorthallId}/status`, {
                        status: "occupied"
                    });
                }
            }

        } catch (error) {
            setSuccess("")
            setError("Error Occured While creating an Event")
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
                <div className='app-content' style={{ height: '300vh' }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Update Events</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add events.</h5>
                                        </div>
                                        <div className='card-body'>
                                            <div>
                                                <div className='example-content'>

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
                                                    <form className='row g-3' onSubmit={HandleSubmit}>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <label className='form-label text-white'>Date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                onChange={(e) => setDate(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <label className='form-label text-white'>Location</label>
                                                            <input
                                                                type="text"
                                                                value={Location}
                                                                readOnly
                                                                className="form-control"
                                                                onChange={(e) => setLocation(e.target.value)}

                                                            />
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Floor</label>
                                                            <select className='form-control'
                                                                value={SortfloorId}
                                                                onChange={(e) => { setSortfloorId(e.target.value); alert(e.target.value) }}
                                                            >
                                                                <option value="">Select Floor</option>
                                                                {floors.map((floor) => (
                                                                    <option key={floor._id} >
                                                                        {floor.floorname}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        {SortfloorId && SortedBooth.length > 0 && (
                                                            <div className='col-12'>
                                                                <label className='form-label text-white'>Booth</label>
                                                                <select className='form-control'
                                                                    value={SortBoothId}
                                                                    onChange={(e) => { setSortBoothId(e.target.value); alert(e.target.value) }}
                                                                >
                                                                    <option value="">Select Booth</option>
                                                                    {SortedBooth.map((Booth) => (
                                                                        <option key={Booth._id} value={Booth._id}>{Booth.boothName}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        {SortBoothId && SortedHalls.length > 0 && (
                                                            <div className='col-12'>
                                                                <label className='form-label text-white'>Hall</label>
                                                                <select className='form-control'
                                                                    value={SorthallId}
                                                                    onChange={(e) => setSorthallId(e.target.value)}
                                                                >
                                                                    <option value="">Select Hall</option>
                                                                    {SortedHalls.map((Hall) => (
                                                                        <option key={Hall._id} value={Hall._id}>
                                                                            {Hall.HallName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Description</label>
                                                            <input
                                                                type="text"
                                                                // value={location}
                                                                // readOnly
                                                                className="form-control"
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Theme</label>
                                                            <input
                                                                type="text"
                                                                // value={location}
                                                                // readOnly
                                                                className="form-control"
                                                                onChange={(e) => setTheme(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className='col-12'>
                                                            <label className='form-label text-white'>Event Image</label>
                                                            <input
                                                                type="file"
                                                                // value={location}
                                                                // readOnly
                                                                className="form-control"
                                                                onChange={(e) => setEventimage(e.target.files[0])}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <button type="submit" className="btn text-white" style={gradientStyleforbutton}>Submit</button>
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

export default UpdateEvent