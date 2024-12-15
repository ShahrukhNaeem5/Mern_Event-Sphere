import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import WorkshopList from '../Components/WorkshopList'
const Workshop = () => {
  return (
<>

<Navbar/>
<section class="banner page-banner position-relative pb-0">
<div class="overlay">
</div>
<div class="container">
<div class="page-title text-center position-relative py-11">
<h2 class="text-white">Work shop</h2>
</div>
</div>
</section>



<WorkshopList/>

<Footer/>
</>
  )
}

export default Workshop
