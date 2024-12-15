import React from 'react'
import Navbar from '../Components/Navbar'
import EventInfo from '../Components/EventInfo'
import About from '../Components/About'
import Speaker from '../Components/Speaker'
import Bookbanner from '../Components/Bookbanner'
import Reach from '../Components/Reach'
import Footer from '../Components/Footer'


const Attendeeabout = () => {
  return (
    <>
  
    <Navbar/>
 
<section class="banner page-banner position-relative pb-0">
<div class="overlay">
</div>
<div class="container">
<div class="page-title text-center position-relative py-11">
<h2 class="text-white text-uppercase">About US</h2>
</div>
</div>
</section>

<About/>

<EventInfo/>

<Bookbanner/>
<Reach/>
<Footer/>
   </>
  )
}

export default Attendeeabout
