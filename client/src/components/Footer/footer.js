import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <footer className='footer-component'>
      {console.log("footer component rendering")}
      <p>2022</p>
      <div className='footer-circle'>C</div>
      <p>Laundry</p>
    </footer>
  )
}

export default Footer