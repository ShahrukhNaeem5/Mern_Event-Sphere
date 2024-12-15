import React from 'react'
import Singlegallery from './Singlegallery'
import { Link } from 'react-router-dom'

const Gallery = () => {
  return (
    <>
    <section class="gallery">
<div class="container">
<div class="galler-inner">
<div class="section-title text-center">
<div class="row align-items-center ">
<div class="col-lg-6 pb-2">
<div class="title-content  text-lg-start">
<p class="mb-1 pink">EVENT GALLERY</p>
<h2 class="mb-1">WAS AN AMAGING <span class="pink">GALLERY</span></h2>
<p class="m-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.</p>
</div>
</div>
<div class="col-lg-6">
<div class="speaker-button text-lg-end">
<Link class="btn" to="/Pictures">VIEW MORE SHOTS</Link>
</div>
</div>
</div>
</div>
<div class="gallerybox pt-4">
<div id="selector1" class="grid row">
<Singlegallery/>
<Singlegallery/>
<Singlegallery/>
<Singlegallery/>
<Singlegallery/>
<Singlegallery/>
</div>
</div>
</div>
</div>
</section>
    </>
  )
}

export default Gallery
