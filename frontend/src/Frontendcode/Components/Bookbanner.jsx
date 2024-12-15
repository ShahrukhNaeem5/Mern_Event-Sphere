import React from 'react'
import { Link } from 'react-router-dom'

const Bookbanner = () => {
  return (
  <><section class="ticket position-relative">
  <div class="overlay">
  </div>
  <div class="container">
  <div class="ticket-inner w-lg-75 mx-auto text-center position-relative text-white">
  <div class="ticket-title">
  <h5 class="text-white mb-1">LET'S DO IT HURRY</h5>
  <h1 class="text-white mb-2">HAVEN'T BOOKED YOUR SEAT YET?
  <span class="spin pink d-inline-block">G</span><span class="spin pink d-inline-block">E</span><span class="spin pink d-inline-block">T</span> <span class="spin pink d-inline-block">W</span><span class="spin pink d-inline-block">o</span><span class="spin pink d-inline-block">r</span><span class="spin pink d-inline-block">K</span><span class="spin pink d-inline-block">s</span><span class="spin pink d-inline-block">h</span><span class="spin pink d-inline-block">o</span><span class="spin pink d-inline-block">p</span>
  </h1>
  </div>
  <div class="ticket-info">
  <p>Secure your spot today and elevate your skills at our exclusive workshop!</p>
  <div class="ticket-button">
  <Link class="btn btn1" to="/Workshop">BOOK WORKSHOP</Link>
  </div>
  </div>
  </div>
  </div>
  </section></>
  )
}

export default Bookbanner
