import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Showbooth = () => {
  const [Booths, setBooths] = useState([])
  console.log(Booths)

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const responseData = await axios.get('http://localhost:5000/api/addbooth');
        setBooths(responseData.data.boths);
      } catch (error) {
        console.error('Error fetching Booths:', error);
      }
    };

    fetchBooths();
  }, [Booths]);
  const DeleteBooth = async (id) => {
    const singleDelete = await axios.delete(`http://localhost:5000/api/addbooth/${id}`)
    if (singleDelete == 201) {
        setError("")
        setSuccess("Booth Deleted")
        seteventDetail(Booths.filter(booth => booth._id !== id));


    }

}


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
                    <h1 className='text-white'>See Booths</h1>
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
                            <th>Booth Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Booths.map((booth) => {
                              return (
                                <tr>
                                  <td>{booth.boothName}</td>

                                  <td><Link to={`/updatebooth/${booth._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                  <td><button className='btn btn-danger' onClick={()=>DeleteBooth(booth._id)}>Delete</button></td>
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

export default Showbooth