
import React, { useState, useRef, useEffect } from 'react';
import './custom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import Cookies from 'js-cookie';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { toast, ToastContainer } from 'react-toastify';


const UserProfile = () => {


  const userData = localStorage.getItem('Userdata');
  const User = JSON.parse(userData);

  const [email, setEmail] = useState(User.Useremail);
  const [username, setUsername] = useState(User.Username);
  const [file, setFile] = useState(null);

   // Function to handle form submission for updating account details
   const handleUpdateAccount = async () => {
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Useremail', email);
    if (file) formData.append('Userimage', file);

    try {
      const response = await axios.put(`http://localhost:5000/api/adduser/${User.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Profile updated successfully!', {
        position: "top-right",
      });

      // Update local storage data if successful
      localStorage.setItem('Userdata', JSON.stringify(response.data.updatedUser));
    } catch (error) {
      toast.error('Error updating profile', {
        position: "top-right",
      });
    }
  };


  // const [selectedImage, setSelectedImage] = useState(null); // State for storing image URL
  const fileInputRef = useRef(null); // Reference to file input
  // const [userData,setUserData]= useState([]);
  // const [userId, setUserId] = useState('');


  // Function to open file selector when camera icon is clicked
  const handleCameraClick = () => {
    fileInputRef.current.click(); // Opens the hidden file input
  };

  // Function to handle the image file selection
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // Generate the image URL
  //     setSelectedImage(imageUrl); // Set the generated URL in state to display the image
  //   }
  // };

  // useEffect(()=>{
  //   const fetchUserId = ()=>{
  //     try {
  //       const usrid = Cookies.get("UserId");
  //       if(usrid)
  //     setUserId(usrid)
  //     } catch (error) {
  //       console.log("Error fetching User Id ",error)
  //     }
  //   }
  //   fetchUserId();
  // },[])

  // useEffect(()=>{
  //       const fetchUser = async()=>{
  //         try {
  //           const responce = await axios.get(`http://localhost:5000/api/adduser/${userId}`); 
  //           setUserData(responce.data);
  //         } catch (error) {
  //             console.log("Error Fetching User",error)    
  //         }
  //       } 

  //       if (userId) {
  //         fetchUser();
  //       }
  // },[userId]);

  return (
    <>
    <Navbar/>
      {/* Page Banner */}
      <section className="banner page-banner position-relative pb-0">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-title text-center position-relative py-11">
            <h2 className="text-white">User Profile</h2>
          </div>
        </div>
      </section>

      {/* User Profile Container */}
      <div className="container rounded mt-5 mb-5" style={{
        border: '4px solid #e91e63',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.2s',
        backgroundColor: '#ffff',
        color: "white",
        width: '800px'
      }}>

        {/* {
          userData.length > 0 ? (
            UserData.map((user)=>( */}


              <>
     <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-9">
                <div className="d-flex flex-column align-items-center text-center py-5">
                  {/* Display the selected image or a placeholder */}
                  <img 
                    className="rounded-circle mt-5 b-border" 
                    height='200px'  width="200px"   
                    // style={{ objectFit: 'cover' }}
                    style={{ objectFit: 'fill' }}
                    src={User.Userimage ? `http://localhost:5000/uploads/profileImages/${User.Userimage}` : 'avatar.jpg' } 
                    alt="User Profile" />

                  {/* Camera Icon to trigger file input */}
                  <FontAwesomeIcon 
                    icon={faCamera} 
                    onClick={handleCameraClick} 
                    style={{
                      marginTop: '-35px',
                      marginLeft: '130px',
                      fontSize: '25px',
                      color: '#e91e63',
                      cursor: 'pointer'
                    }} 
                  />
                  
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} // Hides the input
                    // onChange={handleImageChange} // When image is selected
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>

        {/* Form for User Profile Details */}
        <div className="row">
          <div className="col-md-2 border-right"></div>
          <div className="col-md-9 border-right">
            <div className="p-3 py-5">
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Name</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control hovPink" placeholder="User name" />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control hovPink" placeholder="User email" />
                </div>
            
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary" type="submit" onClick={handleUpdateAccount}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>
              </>


            {/* ))
          ): (

            <p className="text-center"  style={{color:'black',fontSize:'900'}}>Loading user data...</p>
            
          )
        } */}

      </div>
      <Footer/>
      <ToastContainer/>
    </>
  );
};

export default UserProfile;
