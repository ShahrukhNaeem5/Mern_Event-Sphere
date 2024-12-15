import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Footer from '../../Admin/Components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


// For icons

const WelcomePage = () => {
   
   const navigate = useNavigate()

   useEffect(() => {
    const userRole = localStorage.getItem('Userroleee_login');

    // If the role is not 'exhibitor', redirect to login or admin panel
    if (userRole !== 'exibitor') {
        navigate('/login');
    }
}, [navigate]);

  var userData = localStorage.getItem("Exhibitordata");
  var User = JSON.parse(userData)


  const gradientStyle = {
    background: 'linear-gradient(to right, #9b59b6, #ff6f61)', // Purple to Pink gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '40px',
    fontWeight: 'bold',
    fontFamily:'Georgia'
  };


  const gradientStyleforpara = {
    background: 'linear-gradient(to right, #9b59b6, #ff6f61)', // Purple to Pink gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '15px',
    fontWeight: 'bold',
    fontFamily:'Georgia'
  };
  // for content in container
  const gradientStyleforcontent = {
    background: 'linear-gradient(to right, #000000, #1a1a1a, #333333)', // Purple to Pink gradient
  };
  
  
  // for container
  const gradientStyleforcontainer = {
    background: 'linear-gradient(to right, #1a1a1a, #6e6e6e)', // Purple to Pink gradient
  };

  const gradientStyleforbutton = {
    background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
};


  return (
    <>
      <Header />
      <Sidebar />
      
      <div class="app-container" style={gradientStyleforcontainer}>
        <div class="app-content" style={{height:'100%'}}>
          <div>


            {/* Hero Section with Background Video */}
            <header className="hero text-white text-center py-5" style={{ backgroundImage: 'url(https://whova.com/wp-content/uploads/2015/06/choose-perfect-event-venue.jpg)' , backgroundSize: 'cover', backgroundPosition: 'center' , height:400 }}>
              <div className="d-flex justify-content-center align-items-center">
                <div className="container">
                  <h1 className="display-4 mb-4" style={{ color: 'white' }}>
                    <span style={gradientStyle}>Welcome to EventSphere</span>
                  </h1>
                  <h2 className=" mb-2" style={{ color: 'white' }}>
                    <span style={gradientStyle}>{User.Username}</span>
                  </h2>
                  <br />
                  <p style={gradientStyleforpara}>EventSphere connects you to cutting-edge events and industry leaders, creating unforgettable experiences and driving innovation.</p>

                </div>
              </div>
            </header>



            {/* Upcoming Events Section */}
            <section className=" py-5">
              <div className="container">
                <h2 className="text-center mb-4 text-white"><strong>Upcoming Events</strong></h2>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <div class="card bg-dark text-white" style={{ height: 300 }}>
                      <img src="https://www.gl-events.com/sites/default/files/styles/max_2600x2600/public/2019-03/about_us.jpg?itok=G8TBpJbF" height={300} class="card-img" alt="..." />
                      <div class="card-img-overlay">
                        <h5 class="card-title text-white">Tech Expo 2024</h5>
                        <p class="card-text m-t-md">Explore cutting-edge technology and meet leading tech exhibitors.</p>
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div class="card bg-dark text-white" style={{ height: 300 }}>
                      <img src="https://media.licdn.com/dms/image/v2/C4D1BAQFAC3o2eHS_vA/company-background_10000/company-background_10000/0/1583354651497/gl_events_cover?e=2147483647&v=beta&t=vYbDxX-8NtFbXXygSIhuJHveB3fzVMLW9BEQJWOf-yU" height={300} class="card-img" alt="..." />
                      <div class="card-img-overlay">
                        <h5 class="card-title text-white">Business Summit 2024</h5>
                        <p class="card-text m-t-md">A must-attend event for business leaders and entrepreneurs.</p>
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                  <div class="card bg-dark text-white" style={{ height: 300 }}>
                      <img src="https://www.gl-events.com/sites/default/files/styles/max_2600x2600/public/2019-03/gl_events_venues_riocentro_jeuness_congress.jpg?itok=iBTJdcEr" height={300} class="card-img" alt="..." />
                      <div class="card-img-overlay">
                        <h5 class="card-title text-white">Design Conference 2024</h5>
                        <p class="card-text m-t-md">Discover the latest trends and innovations in design.</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-5 text-white text-center rounded-lg" style={gradientStyleforcontent}>
              <div className="container">
                <h2 className="mb-4" style={{ color: 'white' }}>Get In Touch</h2>
                <p className="lead mb-4">Have questions or need more information? Contact us today!</p>
                <form>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <input type="text" className="form-control mb-3" placeholder="Your Name" required />
                      <input type="email" className="form-control mb-3" placeholder="Your Email" required />
                      <textarea className="form-control mb-3" rows="4" placeholder="Your Message" required></textarea>
                      <button type="submit" className="btn text-white" style={gradientStyleforbutton}>Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </section>



            {/* Bootstrap JS and dependencies */}
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default WelcomePage;
