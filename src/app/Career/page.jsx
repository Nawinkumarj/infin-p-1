"use client";

import React, {useRef} from 'react'

export default function page() {
  const listRef = useRef(null);
  
  const down = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className='careers-container'>
      <div className="careers-section">
        <div className="careers-heading">
          <h1>Careers at Infinitas</h1>
        </div>
      </div>
        <div className="careers-open-position">
          <button type="button" onClick={down}>See Open Positions</button>
        </div>
        <div className="careers-list" ref={listRef}>
          <p>Currently there is No Open Positions, Mail your CV & we'll get back to you.</p>
          <a href=''>info@infinitasadvisory.com</a>
        </div>
    </div>
  )
}
