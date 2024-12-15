import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Speaker2 from '../Components/Speaker2'
import Reach from '../Components/Reach'
import Bookbanner from '../Components/Bookbanner';


const Speakerlist = () => {
  
    return (
        <>
            <Navbar/>

 {/* {Header} */}
 <section class="banner page-banner position-relative pb-0">
<div class="overlay">
</div>
<div class="container">
<div class="page-title text-center position-relative py-11">
<h2 class="text-white">Our Speakers</h2>
</div>
</div>
</section>
 {/* {Header} */}


        <Speaker2/>

{/* {Let Hurry Up} */}
<Bookbanner/>
{/* {Let Hurry Up} */}
<Reach/>
<br /><br />

            <Footer/>         
        </>
    )
}

export default Speakerlist
