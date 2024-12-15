import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Updateworkshop = () => {
    const [Topic, setTopic] = useState("");
    const [Date, setDate] = useState("");
    const [Location, setLocation] = useState("");
    const [Speaker, setSpeaker] = useState("");
    const [Workshopimage, setWorkshopimage] = useState(null);
    const [Error, setError] = useState('');
    const [Success, setSuccess] = useState('');
    const [SortedSpeaker, setSortedSpeaker] = useState([]);
    const [Booths, setBooths] = useState([])
    const [SortBoothId, setSortBoothId] = useState('')
    const [SorthallId, setSorthallId] = useState('')
    const [floors, setfloors] = useState([])
    const [halls, sethalls] = useState([])
    const [SortfloorId, setSortfloorId] = useState("")
    const [SortedBooth, setSortedBooth] = useState([]);
    const [SortedHalls, setSortedHalls] = useState([]);
    const { id } = useParams(); // Get the workshop ID from URL

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const speakerResponse = await axios.get("http://localhost:5000/api/addspeaker");
                setSortedSpeaker(speakerResponse.data);
            } catch (error) {
                console.error('Error fetching speakers:', error);
            }
        };
        fetchSpeakers();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchWorkshopData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/addworkshop/${id}`);
                    const workshopData = response.data;
                    setTopic(workshopData[0].Topic);
                    setDate(workshopData[0].Date);
                    setLocation(workshopData[0].Location);
                    setSpeaker(workshopData[0].Speaker);
                    setWorkshopimage(null);
                } catch (error) {
                    console.error('Error fetching workshop data:', error);
                }
            };
            fetchWorkshopData();
        }
    }, [id]);
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
    }, [SortfloorId, Booths , halls]);
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

    const HandleWorkshop = async (e) => {
        e.preventDefault();

        const WorkshopData = new FormData();
        WorkshopData.append("Topic", Topic);
        WorkshopData.append("Date", Date);
        WorkshopData.append("Location", Location);
        WorkshopData.append("Speaker", Speaker);
        if (Workshopimage) {
            WorkshopData.append("Workshopimage", Workshopimage);
        }

        try {
            let FetchResponse;
            if (id) {
                // Update existing workshop
                FetchResponse = await axios.put(`http://localhost:5000/api/addworkshop/${id}`, WorkshopData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Create new workshop
                FetchResponse = await axios.post("http://localhost:5000/api/addworkshop", WorkshopData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (FetchResponse.status === 200) {
                setError("");
                setSuccess(FetchResponse.data.success);

                
                setTopic("");
                setDate("");
                setLocation("");
                setSpeaker("");
                setWorkshopimage(null);

                if (SorthallId) {
                    await axios.put(`http://localhost:5000/api/addhall/${SorthallId}/status`, { status: "occupied" });
                }
            }
        } catch (error) {
            setSuccess("");
            setError(error.response.data.error);
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
            <Navbar />
            <Sidebar />
            <div className='app-container' style={gradientStyleforcontainer}>
                <div className='app-content' style={{ height: '300vh' }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Update Workshops</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can update workshops.</h5>
                                        </div>
                                        <div className='card-body'>
                                            <div>
                                                <div className='example-content'>
                                                    <form className='row g-3' onSubmit={HandleWorkshop}>

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
                                                        <div class="form-group">
                                                            <label class="form-label text-white">Workshop Topic</label>
                                                            <input type="text" class="form-control" placeholder="Workshop Topic" value={Topic} onChange={(e) => setTopic(e.target.value)} />
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="form-label text-white">Date</label>
                                                            <input type="date" class="form-control" placeholder="Workshop Date" value={Date} onChange={(e) => setDate(e.target.value)} />
                                                        </div>
                                                        <div className="form-label text-white">
                                                            <label>Location</label>
                                                            <input type="text" class="form-control" placeholder="Location" value={Location} readOnly onChange={(e) => setLocation(e.target.value)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label text-white">Floor</label>
                                                            <select
                                                                className="form-control"
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
                                                            <div className="form-group">
                                                                <label className="form-label text-white">Booth</label>
                                                                <select className="form-control" value={SortBoothId} onChange={(e) => { setSortBoothId(e.target.value); alert(e.target.value) }} >
                                                                    <option value="">Select Booth</option>
                                                                    {SortedBooth.map((Booth) => (
                                                                        <option key={Booth._id} value={Booth._id}>{Booth.boothName}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        {SortBoothId && SortedHalls.length > 0 && (
                                                            <div className="form-group">
                                                                <label className="form-label text-white">Hall</label>
                                                                <select className="form-control" value={SorthallId} onChange={(e) => setSorthallId(e.target.value)}>
                                                                    <option value="">Select Hall</option>
                                                                    {SortedHalls.map((Hall) => (
                                                                        <option key={Hall._id} value={Hall._id}>
                                                                            {Hall.HallName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}

                                                        <div class="form-group">
                                                            <label className="form-label text-white">Speaker</label>
                                                            <select class="form-control" placeholder="Select Speaker" id="" onChange={(e) => setSpeaker(e.target.value)}>
                                                                <option value="">Select Speaker</option>
                                                                {SortedSpeaker.map((speaker, index) => (
                                                                    <option key={index} >{speaker.Speakername}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label className="form-label text-white">Workshop Image</label>
                                                            <input type="file" class="form-control" placeholder="Select Your workshop Image" onChange={(e) => setWorkshopimage(e.target.files[0])} />
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

export default Updateworkshop;