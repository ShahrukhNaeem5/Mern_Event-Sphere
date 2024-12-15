import React from 'react'
import EventSchedule from '../Components/EventList'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const EventList = () => {
  return (
    <div>
      <Navbar/>
      <section class="banner page-banner position-relative pb-0">
<div class="overlay">
</div>
<div class="container">
<div class="page-title text-center position-relative py-11">
<h2 class="text-white">Event Lists</h2>
</div>
</div>
</section>

      <EventSchedule/>
      <Footer/>
      
    </div>
  )
}

export default EventList
