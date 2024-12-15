import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Contactus = () => {
  const [username, setUsername] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [usersubject, setUserSubject] = useState('');
  const [usermessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const notify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const contactData = {
      username,
      useremail,
      userphone,
      usersubject,
      usermessage,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/contact/', contactData);
      successNotify(response.data.msg || 'Message sent successfully!');

      // Clear input fields after successful submission
      setUsername('');
      setUserEmail('');
      setUserPhone('');
      setUserSubject('');
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error.response?.data?.err || 'Failed to send message. Please try again later.';
      notify(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
      <section className="banner page-banner position-relative pb-0">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-title text-center position-relative py-11">
            <h2 className="text-white">Contact Us</h2>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact-inner text-center text-md-start">
            <div className="row g-md-5 gy-5 align-items-center">
              <div className="col-lg-4 col-md-5">
                <div className="contact-event-info p-8 text-white h-100 rounded bg-pink">
                  <div className="event-venue pb-5">
                    <h5 className="text-white pb-2">EVENT VENUE:</h5>
                    <p className="m-0">Galleria Mall Conference Center</p>
                  </div>
                  <div className="address pb-5">
                    <h5 className="text-white pb-2">ADDRESS:</h5>
                    <p className="m-0">19 By Pass NR, Bali, Indonesia, BC 22196</p>
                  </div>
                  <div className="reception-info pb-5">
                    <h5 className="text-white pb-2">RECEPTION INFO:</h5>
                    <p className="m-0">Booking: (+62) 1919-2020</p>
                  </div>
                  <div className="ticket-info pb-5">
                    <h5 className="text-white pb-2">TICKET INFO:</h5>
                    <p className="m-0">Booking: (+62) 1919-2020</p>
                    <p className="m-0">Email: <a href="mailto:email@example.com">email@example.com</a></p>
                  </div>
                  <div className="direction-link">
                    <a href="#">Get Directions</a>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="form-title mb-4">
                    <h2 className="mb-1">Drop a <span className="pink">line</span></h2>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          type="text"
                          placeholder="Name"
                          className="mb-3"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="email"
                          placeholder="Email"
                          className="mb-3"
                          value={useremail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="phone-no">
                      <input
                        type="tel"
                        placeholder="Phone No."
                        className="mb-3"
                        value={userphone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="subject">
                      <input
                        type="text"
                        placeholder="Subject"
                        className="mb-3"
                        value={usersubject}
                        onChange={(e) => setUserSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="message">
                      <textarea
                        placeholder="Message"
                        rows="4"
                        className="mb-3"
                        value={usermessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'} <i className="fa fa-long-arrow-right ms-3"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="map-direction mt-5">
              <iframe
                height="400"
                className="rounded w-100"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=+(mangal%20bazar)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <ToastContainer />
    </>
  );
};

export default Contactus;
