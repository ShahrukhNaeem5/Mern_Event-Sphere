import React from 'react'
import { Link } from 'react-router-dom'

const Singlegallery = () => {
  return (
    <>
    <div class="item grid-item col-lg-4 col-md-6 px-1 mb-2" data-src="images/group/4.jpg">
<Link to="/Pictures"><img src="images/thumbnail/4.jpg" class="w-100 rounded" alt="VR Presentation and conference"/></Link>
</div>
    </>
  )
}

export default Singlegallery
