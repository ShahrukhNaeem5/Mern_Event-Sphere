import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../../Admin/Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Form = () => {
    const [ExhibitorName, setExhibitorName] = useState('');
    const [ProductName, setProductName] = useState('');
    const [Title, setTitle] = useState('');
    const [ExhibitorEmail, setExhibitorEmail] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [Description, setDescription] = useState('');

    const [Event_title, setEvent_title] = useState('');
    const [Date, setDate] = useState('');
    const [Location, setLocation] = useState('');
    const [Event_description, setEvent_description] = useState('');
    const [Theme, setTheme] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/addevent/${id}`);
                setEvent(response.data);
                setEvent_title(response.data.title);
                setDate(response.data.date);
                setLocation(response.data.location);
                setEvent_description(response.data.description);
                setTheme(response.data.theme);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return <div>Loading...</div>;

    const validateForm = () => {
        let isValid = true;
        if (!Title) {
            toast.error('Title is required');
            isValid = false;
        }
        if (!ExhibitorName) {
            toast.error('Exhibitor Name is required');
            isValid = false;
        }
        if (!ExhibitorEmail) {
            toast.error('Exhibitor Email is required');
            isValid = false;
        }
        if (!CompanyName) {
            toast.error('Company Name is required');
            isValid = false;
        }
        if (!Description) {
            toast.error('Description is required');
            isValid = false;
        }
        if (!ProductName) {
            toast.error('Product Name is required');
            isValid = false;
        }
        return isValid;
    };

    const HandleFormsubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const token = Cookies.get('UserAuthToken');


        const exhibitordata = {
            Booking_Event_title: Title,
            exhibitorname: ExhibitorName,
            exhibitoremail: ExhibitorEmail,
            companyname: CompanyName,
            Booking_Event_description: Description,
            productname: ProductName,
            Event_Title: Event_title,
            Event_Date: Date,
            Event_Location: Location,
            Event_Description: Event_description,
            Event_Theme: Theme,
        };

        try {
            const fetchresponse = await axios.post('http://localhost:5000/api/bookings', exhibitordata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (fetchresponse.status === 200) {
                toast.success('Event booked successfully');
                setTitle("");
                setExhibitorName("");
                setExhibitorEmail("");
                setCompanyName("");
                setDescription("");
                setProductName("");
                navigate("/booking");
            } else {
                toast.error('Failed to Book Event');
            }
        } catch (error) {
            console.log('error', error);
            toast.error('An error occurred while Booking the event.');
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
            <Header />
            <Sidebar />
            <div className="app-container" style={gradientStyleforcontainer}>
                <div className="app-content" style={{ height: '100%' }}>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="page-description">
                                        <h1 className='text-white'>Booking</h1>
                                        <span className='text-white'>Please fill the form.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card" style={gradientStyleforcontent}>
                                        <div className="card-header">
                                            <h5 className="card-title text-white">The event you want to book</h5>
                                        </div>
                                        <div className="card-body">

                                            <p className="card-description text-white" >
                                                Booking of: <strong>{event.title}</strong><br />
                                                Date: <strong>{event.date}</strong><br />
                                                Location: <strong>{event.location}</strong><br />
                                                Description: <strong>{event.description}</strong><br />
                                            </p>

                                            <div>
                                                <div className="example-content">
                                                    <form className="row g-3" onSubmit={HandleFormsubmit}>
                                                        <div className="col-12">
                                                            <label className="form-label text-white">Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label text-white">Exhibitor Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setExhibitorName(e.target.value)}
                                                                id="inputEmail4"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label text-white">Exhibitor Email</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                onChange={(e) => setExhibitorEmail(e.target.value)}
                                                                id="inputPassword4"
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label text-white">Company Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setCompanyName(e.target.value)}
                                                                id="inputAddress"
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label text-white">Description</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                id="inputAddress2"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label text-white">Product Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => setProductName(e.target.value)}
                                                                id="inputCity"
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
            <ToastContainer />
        </>
    );
};

export default Form;
