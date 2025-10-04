"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const centerRef = useRef(null);
  const promiseRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const ctx = gsap.context(() => {
        
        // LEFT
        gsap.fromTo(missionRef.current, 
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // TOP  
        gsap.fromTo(centerRef.current, 
          { y: -200, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: centerRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // RIGHT
        gsap.fromTo(promiseRef.current, 
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: promiseRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // Bottom
        gsap.fromTo(bottomRef.current, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

      }, sectionRef);

      return () => ctx.revert();
    }, 500);

  }, []);

  return (
    <div ref={sectionRef} className="home-about-section">
      <div className="home-about-container">
        
        <div className="home-about-top">
          
          {/* Mission */}
          <div ref={missionRef} className="home-about-mission">
            <h2>Our Mission</h2>
            <p>Our mission is to empower businesses with expert guidance and end-to-end support in delivering high-impact projects, building resilient brands, and optimizing procurement strategies.</p>
            <div className="home-about-image">
              <img src="/abt1.jpg" alt="Team" />
            </div>
          </div>

          <div ref={centerRef} className="home-about-center">
            <div className="home-about-main-image">
              <img src="/abtimg.jpg" alt="Construction" />
              <div className="home-about-overlay">ABOUT&nbsp;US</div>
            </div>
          </div>

          {/* Vision */}
          <div ref={promiseRef} className="home-about-promise">
            <h2>Our Vision</h2>
            <p>To be the leading advisory partner in project delivery, strategic marketing, and intelligent sourcing — enabling clients to transform with speed, precision, and purpose.</p>
            <div className="home-about-image">
              <img src="/abt2.jpg" alt="Delivery" />
            </div>
          </div>

        </div>

        <div ref={bottomRef} className="home-about-bottom">
          <div className="home-about-left">
            <h1>Delivering Precision.<br />Driving Results</h1>
          </div>
          <div className="home-about-right">
            <p>— We are a forward-thinking advisory firm helping businesses unlock value through precision project management, strategic marketing, and intelligent sourcing. With a blend of deep industry experience, data-driven insight, and a hands-on approach, we deliver solutions that not only solve today’s challenges but also prepare you for tomorrow’s opportunities.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
