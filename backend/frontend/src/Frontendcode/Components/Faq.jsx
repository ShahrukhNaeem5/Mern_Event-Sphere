import React from 'react'


const Faq = () => {
  return (
   <>
   <section class="faq pb-0 overflow-visible d-block position-relative z-1">
   <div class=" bg-blue opacity-25 z-n1">
   </div>
   <div class="container">
   <div>
   <div class="row">
   <div class="col-lg-6 px-4 mb-2">
   <div class="faq-general">
   <div class="section-title pb-3 text-center text-lg-start">
   <p class="mb-1 pink">GENERAL QUESTIONS</p>
   <h2 class="mb-2 text-white">FREQUENT ASKED <span class="pink">QUESTIONS!!</span></h2>
   <p class="text-white">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
   mollit anim id est laborum.</p>
   </div>
   <div class="faq-accordion p-4 mb-5 bg-white rounded">
   <div class="accordion accordion-faq" id="accordionFlushExample">
   <div class="accordion-item ">
   <p class="accordion-header p-4">
   <button class="accordion-button collapsed fw-semibold p-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
   How do I book an event?
   </button>
   </p>
   <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
   <div class="accordion-body bg-lightgrey p-6">You can book an event by selecting the desired event from our listings, clicking the "Book Now" button, and following the steps to confirm your reservation. You will receive a confirmation email once your booking is successful.

   </div>
   </div>
   </div>
   <div class="accordion-item">
   <p class="accordion-header p-4">
   <button class="accordion-button collapsed  fw-semibold p-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
   Can I cancel or modify my booking?
   </button>
   </p>
   <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
   <div class="accordion-body bg-lightgrey p-6">Yes, you can cancel or modify your booking by logging into your account, going to the "My Bookings" section, and selecting the option to cancel or edit your reservation. Please note that changes may be subject to the event organizer’s policies.</div>
   </div>
   </div>
   <div class="accordion-item">
   <p class="accordion-header p-4">
   <button class="accordion-button collapsed fw-semibold p-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
   HOW LONG DO I GET SUPPORT & UPDATES?
   </button>
   </p>
   <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
   <div class="accordion-body bg-lightgrey p-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur interdum, arcu a accumsan vulputate, leo diam sodales mi, et bibendum mi nunc at lorem. Etiam ut nisi hendrerit,</div>
   </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   <div class="col-lg-6  align-self-center px-4">
   <div class="faq-form bg-white rounded shadow-lg p-6 mb-mi">
   <div class="form-title mb-4">
   <p class="mb-1 pink">CONTACT US</p>
   <h2 class="mb-2">FEEL FREE TO <span class="pink">CONNECT</span></h2>
   <p class="m-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
   anim id est laborum.</p>
   </div>
   <div class="form-content justify-content-between">
   <form>
   <input type="text" placeholder="Full Name" class="mb-5"/>
   <div class=" row justify-content-around">
   <div class="col-lg-6 col-md-6">
   <div class="phone-no">
   <input type="tel" placeholder="Phone No." class="mb-5"/>
   </div>
   </div>
   <div class="col-lg-6 col-md-6">
   <div class="emai">
   <input type="email" placeholder="Email Address" class="mb-5" required/>
   </div>
   </div>
   </div>
   <textarea placeholder="How may we help you?" rows="4" class="mb-5"></textarea>
   <button class="btn mb-5" id="sub-btn">SEND MESSAGE</button>
   </form>
   <small>"Have questions or need assistance? Contact us today and we’ll be happy to help!".</small>
   </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   </section>
   </>
  )
}

export default Faq
