import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const gr = {
    background : 'linear-gradient(90deg,#24369C 0%,#C40F4C 100%'
  }
  return (
   <>
   <footer class="pt-9 text-center text-white position-relative z-1" style={gr}>
<div class=" z-n1 start-0"></div>
<div class="container">
<div class="footer-content w-lg-50 m-auto">
<div class="footer-logo mb-4 pt-1">
<a href="index.html"><img src="./images/logo/1.png" class="w-50" alt="footer-logo"/></a>
</div>
<div class="footer-disciption border-bottom border-white border-opacity-25 m-auto mb-6">
<p class=" mb-6">Welcome to EventSphere – your ultimate solution for seamless event booking and management.</p>
<div class="footer-socials pb-6">
<ul class="m-0 p-0">
<li class="d-inline me-2">
<a class="d-inline-block rounded-circle bg-white  bg-opacity-25">
<i class="fab fa-facebook"></i>
</a>
</li>
<li class="d-inline me-2">
<a class="d-inline-block rounded-circle bg-white  bg-opacity-25">
<i class="fab fa-twitter"></i>
</a>
</li>
<li class="d-inline me-2">
<a class="d-inline-block rounded-circle bg-white  bg-opacity-25">
<i class="fab fa-youtube-play"></i>
</a>
</li>
<li class="d-inline me-2">
<a class="d-inline-block rounded-circle bg-white  bg-opacity-25">
<i class="fab fa-linkedin"></i>
</a>
</li>
</ul>
</div>
</div>
<div class="footer-menu pb-9">
<ul class="p-0 m-0">
<li class="d-inline mx-2"><Link to="/Schedulelist"><small>Events</small></Link></li>
<li class="d-inline mx-2"><Link to="/Speakerlist"><small>Speakers</small></Link></li>
<li class="d-inline mx-2"><Link to="/Attendeeabout"><small>About us</small></Link></li>
<li class="d-inline mx-2"><Link to="/Workshop"><small>Workshop</small></Link></li>
<li class="d-inline mx-2"><Link to="/Contact"><small>Contact Us</small></Link></li>
</ul>
</div>
</div>
<div class="copyright pb-6 pt-1">
<small>Copyright &#169;2024 EventSphere. All Rights Reserved Copyright</small>
</div>
</div>
</footer>
   </>
  )
}

export default Footer
