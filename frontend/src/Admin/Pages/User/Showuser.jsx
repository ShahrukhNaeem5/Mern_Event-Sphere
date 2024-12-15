import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'


const Showuser = () => {
    const [UserDetail, setUserDetail] = useState([]);
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await axios.get('http://localhost:5000/api/adduser');
                setUserDetail(responseData.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchUser();
    }, [UserDetail]);
    const DeleteUser = async (id) => {
        const singleDelete = await axios.delete(`http://localhost:5000/api/adduser/${id}`)
        if (singleDelete == 201) {
            setError("")
            setSuccess("User Deleted")
            setUserDetail(UserDetail.filter(user => user._id !== id));


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
                                        <h1 className='text-white'>Show Users</h1>
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
                                                        <th>User Name</th>
                                                        <th>User Email</th>
                                                        <th>User Password</th>
                                                        <th>User Role</th>
                                                        <th>User Age</th>
                                                        <th>User Image</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        UserDetail.map((user) => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.Username}</td>
                                                                    <td>{user.Useremail}</td>
                                                                    <td>{user.Userpassword}</td>
                                                                    <td>{user.Userrole}</td>
                                                                    <td>{user.Userage}</td>
                                                                    <td>{user.Userimage}</td>
                                                                    <td><Link to={`/updateuser/${user._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                                                    <td><button className='btn btn-danger' onClick={() => DeleteUser(user._id)}>Delete</button></td>
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

export default Showuser