import React from 'react'
import { Link } from 'react-router-dom'

const Section1 = () => {
  return (
   <>
   <section class="banner position-relative pb-0">
<div class="overlay" >
</div>
<div class="container">
<div class="inner-banner position-relative text-white ">
<div class="row">
<div class="col-lg-6 order-2 order-lg-1">
<div class="banner-left text-center pb-lg-5 p-md-0">
<div class="banner-image">
<img src="images/team/4.png" alt="banner-image" class="w-50"/><br/>
</div>
<br /><br />
</div>
</div>
<div class="col-lg-6 order-1 order-lg-2">
<div class="banner-right  ms-2 text-center text-lg-start pb-8">
<div class="banner-title pb-3">
<h4 class="text-white pb-3">UPCOMING NEW <span class="pink">EVENT</span> 2023</h4>
<h1 class="text-white">STARTUP <span class="pink">GLOBAL</span> CONFERENCE</h1>
</div>
<div class="banner-event-info pb-3">
<ul class="m-0 ps-0 d-sm-flex justify-content-center justify-content-lg-start list-unstyled">
<li class="pe-2 border-end border-1 border-lightgrey">
<i class="fa  fa-calendar-o pe-1"></i> 22-24 MAY 2024
</li>
<li class="ps-2">
<i class="fa  fa-map-marker pe-1"></i> QUEENBAY MALL 4217 ROAD, USA
</li>
</ul>
</div>
<div class="event-discription">
<p class="pb-4 m-0">Welcome to EventSphere – your ultimate solution for seamless event booking and management..</p>
<div class="banner-button">
<div class="row">
<div class="col-lg-6 col-md-6">
<Link class="btn me-3 my-1 w-100" to="/Workshop">VIEW workshop's</Link>
</div>
<div class="col-lg-6 col-md-6">
<Link class="btn btn2 my-1 w-100" to="/Event">VIEW Event's</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="wave overflow-hidden position-absolute w-100 z-0" >
<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" class="d-block position-relative">
<path class="elementor-shape-fill" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3
          c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
          c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></path>
</svg>
</div>
</section>
   </>
  )
}

export default Section1
