import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import axios from 'axios'

const Showbooth = () => {
  const [Booths, setBooths] = useState([]);
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state

  // Fetch booths from backend
  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const responseData = await axios.get('https://mernevent-sphere-production.up.railway.app/api/addbooth');
        setBooths(responseData.data.boths);
      } catch (error) {
        console.error('Error fetching Booths:', error);
        setError("Error fetching booths"); // Set error message if fetching fails
      }
    };

    fetchBooths();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Delete a booth
  const DeleteBooth = async (id) => {
    try {
      const singleDelete = await axios.delete(`https://mernevent-sphere-production.up.railway.app/api/addbooth/${id}`);
      if (singleDelete.status === 201) { // Check response status properly
        setError(""); // Clear any previous error messages
        setSuccess("Booth Deleted"); // Set success message
        setBooths(Booths.filter(booth => booth._id !== id)); // Update the Booths state
      }
    } catch (error) {
      setError("Error deleting booth"); // Set error message
      setSuccess(""); // Clear success message
      console.error("Error deleting booth:", error);
    }
  };

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
              <div className="row">
                <div className="col">
                  <div className="page-description">
                    <h1 className='text-white'>See Booths</h1>
                  </div>
                </div>
              </div>

              {/* Display Success or Error Message */}
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="row">
                <div className="col">
                  <div className="container mt-4">
                    <div className="table-responsive text-white" style={gradientStyleacctheme}>
                      <table className="table table-bordered text-white" style={gradientStyleacctheme}>
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
                                <tr key={booth._id}>
                                  <td>{booth.boothName}</td>
                                  <td><Link to={`/updatebooth/${booth._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                  <td><button className='btn btn-danger' onClick={() => DeleteBooth(booth._id)}>Delete</button></td>
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
  );
}

export default Showbooth;
