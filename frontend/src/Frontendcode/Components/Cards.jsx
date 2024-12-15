import React from 'react'
import Singlecrad from './Singlecrad'

const Cards = () => {
  return (
    <><section class="feature text-white position-relative z-0 start-0">
      <div class="overlay z-n1">
      </div>
      <div class="container">
        <div class="feature-inner">

          <div class="feature-lists pt-8">
            <div class="row g-4">
           
                <Singlecrad />
                <Singlecrad />
                <Singlecrad />
                <Singlecrad />
                <Singlecrad />
                <Singlecrad />
            </div>
          </div>
        </div>
      </div>
    </section></>
  )
}

export default Cards
