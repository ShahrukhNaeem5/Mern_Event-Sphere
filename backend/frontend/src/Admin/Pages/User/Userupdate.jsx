import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const Userupdate = () => {
    const { id } = useParams();
    const [Roles, setRoles] = useState([]);
    const [Username, setUsername] = useState('');
    const [Useremail, setUseremail] = useState('');
    const [Userpassword, setUserpassword] = useState('');
    const [Userage, setUserage] = useState('');
    const [Userrole, setUserrole] = useState('');
    const [Userimage, setUserimage] = useState(null);
    const [Error, setError] = useState('');
    const [Success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responsee = await axios.get(`http://localhost:5000/api/adduser/${id}`);
                const user = responsee.data;
                setUsername(user[0].Username);
                setUseremail(user[0].Useremail);
                setUserage(user[0].Userage);
                setUserrole(user[0].Userrole);
                setUserimage(user[0].Userimage);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/adduser/role');
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchUserData();
        fetchRoles();
    }, [id]);

    const handleUserUpdUpdate = async (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append("Username", Username);
        userData.append("Useremail", Useremail);
        userData.append("Userage", Userage);
        userData.append("Userrole", Userrole);
        if (Userimage) userData.append("Userimage", Userimage);
        if (Userpassword) userData.append("Userpassword", Userpassword);

        try {
            const response = await axios.put(`http://localhost:5000/api/adduser/${id}`, userData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setError('');
            setSuccess(response.data.success);
        } catch (error) {
            setSuccess('');
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
            <Sidebar />
            <Navbar />
            <div className='app-container' style={gradientStyleforcontainer}>
                <div className='app-content' style={{ height: '100vh' }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div class="row">
                                <div class="col">
                                    <div class="page-description">
                                        <h1 className='text-white'>Update User</h1>
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

                                                    <form className='row g-3' onSubmit={handleUserUpdUpdate}>
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
                                                            <label class="form-label text-white">User Name</label>
                                                            <input type="text" class="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">User Email</label>
                                                            <input type="email" class="form-control" value={Useremail} onChange={(e) => setUseremail(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">User Password</label>
                                                            <input type="password" class="form-control" onChange={(e) => setUserpassword(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">User Age</label>
                                                            <input type="number" min={18} max={70} class="form-control" value={Userage} onChange={(e) => setUserage(e.target.value)} />
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">User Role</label>
                                                            <select class="form-control" value={Userrole} onChange={(e) => setUserrole(e.target.value)}>
                                                                <option>Choose Your Role</option>
                                                                {Roles.map((role, index) => (
                                                                    <option key={index} value={role.Roles}>{role.Roles}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="col-12">
                                                            <label class="form-label text-white">User Image</label>
                                                            <input type="file" class="form-control" onChange={(e) => setUserimage(e.target.files[0])} />
                                                        </div>
                                                        <br />

                                                        <div class='col-12'>
                                                            <button type='submit' class='btn text-white' style={gradientStyleforbutton}>Update User</button>

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

export default Userupdate