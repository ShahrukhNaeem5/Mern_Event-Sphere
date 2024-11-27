import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
const Addworkshop = () => {
    const [Topic, setTopic] = useState("")
    const [Date, setDate] = useState("")
    const [Location, setLocation] = useState("")
    const [Booths, setBooths] = useState([])
    const [SortBoothId, setSortBoothId] = useState('')
    const [SorthallId, setSorthallId] = useState('')
    const [floors, setfloors] = useState([])
    const [Halls, setHalls] = useState([])
    const [SortfloorId, setSortfloorId] = useState("")
    const [Speaker, setSpeaker] = useState("")
    const [Workshopimage, setWorkshopimage] = useState(null)
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    const [SortedBooth, setSortedBooth] = useState([]);
    const [SortedHalls, setSortedHalls] = useState([]);
    const [SortedSpeaker, setSortedSpeaker] = useState([]);
    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const speakerResponse = await axios.get("http://localhost:5000/api/addspeaker")
                const Fetchspeaker = speakerResponse.data
                setSortedSpeaker(Fetchspeaker)
            } catch (error) {
                console.error('Error fetching speakers:', error);

            }

        }
        fetchSpeakers()
    }, [])

    useEffect(() => {
        const fetchBooths = async () => {
            try {
                const responsee = await axios.get('http://localhost:5000/api/addworkshop/');
                setBooths(responsee.data.booth);
                
                const unoccupiedHalls = responsee.data.Halls.filter(hall => hall.status === 'unoccupied');
                setHalls(unoccupiedHalls);

              

            } catch (error) {
                console.error('Failed to fetch Booths:', error);
            }
        };

        fetchBooths();
    }, [])
    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const responsee = await axios.get('http://localhost:5000/api/addworkshop/');
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

            const hallFilter = Halls.filter(hall => hall.floorId === floors.find(floor => floor._id === SortfloorId)?.floorname);
            console.log("SortfloorId: ", SortfloorId);
            console.log("Halls", Halls);
            setSortedHalls(hallFilter)

           
        }
    }, [SortfloorId, Booths , Halls]);

    useEffect(() => {
        console.log("booth select kia")
        floorSelected();

    }, [SortBoothId])


    const floorSelected = (id) => {

        console.log(Booths)
        console.log(`${id}`)
       

        console.log("booth select krne per chalega")


    }
    useEffect(() => {
        console.log(SortfloorId)


        boothSelected()

    }, [SortfloorId])


    const boothSelected = () => {
        // Filter FloorId based on the selected floor
        const floorDetailData = floors.filter(option => option._id === SortfloorId);

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
            const selectedHall = Halls.find(hall => hall._id === SorthallId)?.HallName || "";

            setLocation(`Floor-${selectedFloor}, Booth no ${selectedBooth}, Hall ${selectedHall}`);
        }
    }, [SortfloorId, SortBoothId, SorthallId, floors, Booths, Halls]);


    const HandleWorkshop = async (e) => {
        e.preventDefault()

        const WorkshopData = new FormData
        WorkshopData.append("Topic", Topic)
        WorkshopData.append("Date", Date)
        WorkshopData.append("Location", Location)
        WorkshopData.append("Speaker", Speaker)
        WorkshopData.append("Workshopimage", Workshopimage)



        try {
            const FetchResponse = await axios.post("http://localhost:5000/api/addworkshop", WorkshopData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            console.log(FetchResponse)

            if (FetchResponse.status == 201) {
                setError("")
                setSuccess(FetchResponse.data.success)

                setTopic("");
                setDate("");
                setLocation("");
                setSpeaker("");
                setWorkshopimage("");
                if (SorthallId) {
                    const hallResponse = await axios.put(`http://localhost:5000/api/addhall/${SorthallId}/status`, { status: "occupied" });
                if (hallResponse.status === 200) {
                    console.log('Hall status updated successfully');
                } else {
                    console.error('Failed to update hall status:', hallResponse.data);
                }
                }
            } 

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
                <div className='app-content' style={{height:'150vh'}}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Add Workshops</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-md-6'>
                                    <div className='card' style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">here you can add workshops.</h5>
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
                                                            <input type="text" class="form-control" placeholder="Workshop Topic" onChange={(e) => setTopic(e.target.value)} />
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="form-label text-white">Date</label>
                                                            <input type="date" class="form-control" placeholder="Workshop Date" onChange={(e) => setDate(e.target.value)} />
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
                                                                onChange={(e) => setSortfloorId(e.target.value)}

                                                            >
                                                                <option value="">Select Floor</option>
                                                                {floors.map((floor) => (
                                                                    <option key={floor._id} value={floor._id}>
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
                                                                {
                                                                    SortedSpeaker.map((speaker, index) => {
                                                                        return (
                                                                            <option key={index}>{speaker.Speakername}</option>
                                                                        )


                                                                    })

                                                                }
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label className="form-label text-white">Workshop Image</label>
                                                            <input type="file" class="form-control" placeholder="Select Your workshop Image" onChange={(e) => setWorkshopimage(e.target.files[0])} />
                                                        </div>

                                                        <div class='form-group'>
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

export default Addworkshop