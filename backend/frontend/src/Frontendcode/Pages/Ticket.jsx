import React from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'
import Reach from '../Components/Reach'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, useParams } from 'react-router-dom';
// const axios = require("axios");


const Ticket = () => {


  // const navigate = useNavigate();

  // const notify = (error) => toast.error(error);
  // const successNotify = (success) => toast.success(success);
  // const { id } = useParams();

  // const handleSubmit = async(e)=>{
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("");
  //     successNotify(response.data.msg);

  //     setTimeout(() => {
  //       navigate("/booking");
  //     }, 4000);

  //   } catch (error) {
  //     if(error.response && error.response.data && error.response.data.err)
  //     console.log("Error Booking Workshop",error);
  //     notify()
  //   }
  // }

  return (
    <>



      {/* ticket booking banner start */}

      <section class="banner page-banner position-relative pb-0">
        <div class="overlay">
        </div>
        <div class="container">
          <div class="page-title text-center position-relative py-11">
            <h2 class="text-white">Book Workshop Tickets Now</h2>
          </div>
        </div>
      </section>
      {/* ticket booking banner end */}





      {/* ticket booking form start */}
      <section class="ticket-booking">
        <div class="container">
          <div class="booking-form w-lg-75 m-auto px-2">
            <div class="form-title mb-4">
              <h2 class="mb-2"><span class="pink">Workshop</span> Booking Form</h2>
              <p>Book your tickets to the workshop now!!</p>
            </div>
            <div class="form-content">
              <form>
                <div class="name-email">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="name">
                        <label for="full-name" class="mb-2">Full Name:</label>
                        <input type="text" placeholder="Full Name" id="full-name" class="py-4 mb-4" required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="name">
                        <label for="email" class="mb-2">Email:</label>
                        <input type="email" placeholder="Email Address" id="email" class="py-4 mb-4" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="phone-address">
                  <div class=" row justify-content-around">
                    <div class="col-lg-6 col-md-6">
                      <div class="phone-no">
                        <label for="phone" class="mb-2">Phone No:</label>
                        <input type="tel" placeholder="Phone No." id="phone" class="py-4 mb-4" required />
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <div class="textarea">
                        <label for="address" class="mb-2">Message</label>
                        <textarea placeholder="Any message you want to add?" class="py-4" rows="10"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="event-date-textarea">
                  <div class="row">
                    <div class="col-lg-6 col-md-6">
                      {/* <div class="event-list">
<label for="event-list" class="mb-2 mb-4">Events:</label>
<select id="event-list" class="py-4 mb-4" required>
<option value>--Please choose an preffered event--</option>
<option value="1">Event-1</option>
<option value="2">Event-2</option>
<option value="3">Event-3</option>
<option value="3">Event-4</option>
</select>
</div> */}
                      {/* <div class="event-date">
<label for="event-date" class="mb-2">Event Date:</label>
<input type="date" id="event-date" name="eventdate" class="py-4 mb-4" required/>
</div> */}
                      {/* <div class="attendee-no">
<label for="attendee" class="mb-2">No of Attendee:</label>
<select id="attendee" class="py-4 mb-4" required>
<option value>--Please select no of attendee--</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="3">4</option>
<option value="3">5</option>
</select>
</div> */}
                    </div>
                    {/* <div class="col-lg-6 col-md-6"> */}
                    {/* <div class="textarea">
<label for="address" class="mb-2">Message</label>
<textarea placeholder="Any message you want to add?" class="py-4" rows="10"></textarea>
</div> */}
                    {/* </div> */}
                  </div>
                </div>
                <button class="btn" id="sub-btn">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ticket booking form end */}



      <Reach />
      <br /><br /><br />
      {/* <ToastContainer /> */}

    </>
  )
}

export default Ticket
