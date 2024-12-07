import React from 'react'

const Footer = () => {

  const gradientStyleacctheme = {
    background: 'linear-gradient(to right, #000000, #111111)', // Purple to Pink gradient
};

  return (
    <div className='app-container' style={gradientStyleacctheme}>
    <footer class="bg-body-tertiary text-center text-lg-start" style={gradientStyleacctheme}>
    <div class="text-center p-3 text-white">
      © 2020 Copyright
      EventSphere:All Rights Reserved Copyright
    </div>
   </footer>
   </div>
  )
}

export default Footer