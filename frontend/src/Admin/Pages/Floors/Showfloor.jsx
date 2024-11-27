import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Showfloor = () => {
  const [Floors, setFloors] = useState([])


  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const responseData = await axios.get('http://localhost:5000/api/addfloor');
        setFloors(responseData.data);
      } catch (error) {
        console.error('Error fetching floors:', error);
      }
    };

    fetchFloors();
  }, [Floors]);

  const DeleteFloor = async (id) => {
    const singleDelete = await axios.delete(`http://localhost:5000/api/addfloor/${id}`)
    if (singleDelete == 201) {

      setFloors(Floors.filter(floor => floor._id !== id));


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
        <div className='app-content' style={{height:'100vh'}}>
          <div className='content-wrapper'>
            <div className='container'>
              <div class="row">
                <div class="col">
                  <div class="page-description">
                    <h1 className='text-white'>See Floors</h1>
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
                          <th>Floor Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Floors.map((floor) => {
                            return (
                              <tr>
                                <td>{floor.floorname}</td>

                                <td><Link to={`/updatefloor/${floor._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                <td><button className='btn btn-danger' onClick={() => DeleteFloor(floor._id)}>Delete</button></td>
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

export default Showfloor