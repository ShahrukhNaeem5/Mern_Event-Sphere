import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';


const Showhall = () => {
  const [Halls, setHalls] = useState([])


  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const responseData = await axios.get('http://localhost:5000/api/addhall');
        setHalls(responseData.data);
      } catch (error) {
        console.error('Error fetching Halls:', error);
      }
    };

    fetchHalls();

  }, [Halls]);


  const Deletehall = async (id) => {
    const singleDelete = await axios.delete(`http://localhost:5000/api/addhall/${id}`)
    if (singleDelete == 201) {

      setHalls(Halls.filter(hall => hall._id !== id));


    }
    Deletehall();
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
                    <h1 className='text-white'>See halls</h1>
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
                            <th>Hall Name</th>
                            <th>Floor Name</th>
                            <th>Booth Number</th>
                            <th>Hall status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Halls.map((hall) => {
                              return (
                                <tr>
                                  <td>{hall.HallName}</td>
                                  <td>{hall.floorId}</td>
                                  <td>{hall.boothId}</td>
                                  <td>{hall.status}</td>

                                  <td><Link to={`/updatehall/${hall._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                  <td><button className='btn btn-danger' onClick={() => Deletehall(hall._id)}>Delete</button></td>
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

export default Showhall