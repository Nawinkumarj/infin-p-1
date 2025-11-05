import React from 'react'
import Image from 'next/image'

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="logo-container">
        <Image 
          src="/cta.gif" 
          alt="Infinitas Animated Logo" 
          width={400}
          height={200}
          className="animated-logo"
          priority
          unoptimized 
        />
      </div>

      <h1 className="cta-heading">
        Eager to shape a brand-new reality?
      </h1>

      <div className="cta-buttons">
        <a href='tel:/919841059274' className="btn btn-primary">
          Contact&nbsp;Infinitas
        </a>
        
        <a href='mailto:/info@infinitasadvisory.com' className="btn btn-secondary">
          Drop a Mail
        </a>
      </div>
    </section>
  )
}
