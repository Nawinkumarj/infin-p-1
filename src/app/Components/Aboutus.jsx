'use client'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Aboutus() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const infinityRef = useRef(null)
  const imagesRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    // Hero title animation
    gsap.from(titleRef.current, {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: 'power3.out'
    })

    // Infinity symbol animation
    gsap.from(infinityRef.current, {
      opacity: 0,
      scale: 0,
      rotationX: 280,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.3
    })

    // Images section animation
    gsap.from('.about-us-image-card', {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: imagesRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Text block animation
    gsap.from(textRef.current, {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Continuous rotation animation for infinity symbol
    gsap.to(infinityRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    })

  }, { scope: containerRef })

  return (
    <div className="about-us-containe" ref={containerRef}>
      <div className="about-us-hero" ref={heroRef}>
        <div className="about-us-hero-content">
          <h1 className="about-us-title" ref={titleRef}>Why infinitas?</h1>
        </div>
        <div className="about-us-hero-symbol">
          <div className="about-us-infinity">
            <div className="about-us-infinity-circle about-us-infinity-top">
              <img src="/infinity-icon.png" alt="infinitas" />
            </div>
          </div>
        </div>
      </div>
      <div className="about-us-content">
        <div className="about-us-images-section" ref={imagesRef}>
          <div className="about-us-image-card about-us-image-1">
            <img src="/abt1.jpg" alt="infinitas-about" />
          </div>
          <div className="about-us-image-card about-us-image-2">
            <img src="/abt3.jpg" alt="Infinitas-about" />
          </div>
        </div>
        <div className="about-us-info-section">
          <div className="about-us-text-block" ref={textRef}>
            <p className="about-us-description">
              Together, we turn strategic intent into operational excellence—one milestone at a time." We're not just project managers—we're your execution partners. With a blend of expertise, agility, integrity, innovation, and relentless client focus, we empower you to go further, faster "Because precision execution is the difference between planning change and making it happens.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
