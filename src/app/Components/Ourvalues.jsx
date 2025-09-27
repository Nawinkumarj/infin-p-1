"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOurValues() {
  const visionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const container = visionRef.current;
    
    if (!cards.length) return;
    ScrollTrigger.getAll().forEach(st => st.kill());

    cards.forEach((card, i) => {
      gsap.set(card, {
        x: `${20 + (i * 50)}vw`,
        opacity: 1,
      });
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${cards.length * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalDistance = cards.length * 40; // Total scroll distance
        
        cards.forEach((card, i) => {
          const initialPosition = 20 + (i * 50); // First card  20vw
          const currentPosition = initialPosition - (totalDistance * progress);
          
          gsap.set(card, {
            x: `${currentPosition}vw`,
            opacity: currentPosition > -40 && currentPosition < 100 ? 1 : 0.3,
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const valuesData = [
    {
      id: 1,
      number: "01",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore est optio nulla quidem atque?"
    },
    {
      id: 2,
      number: "02", 
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore es optio nulla quidem atque?"
    },
    {
      id: 3,
      number: "03",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore est opt io nulla quidem atque?"
    },
    {
      id: 4,
      number: "04",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore est opt io nulla quidem atque?"
    },
    {
      id: 5,
      number: "05",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore est opt io nulla quidem atque?"
    },
    {
      id: 6,
      number: "06",
      text: "Lorem ipsum dolor sit amet6 consectetur adipisicing elit. Fuga, obcaecati quia quod iste dignissimos dolore est opt io nulla quidem atque?"
    }
  ];

  return (
    <section className="about-our-value-wrapper">
      <div
        className="about-our-values"
        ref={visionRef}
        style={{ 
          background: "#eee", 
          padding: "4rem 2rem",
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          width: "100vw"
        }}
      >
        <div className="about-our-values-heading" style={{
          position: "absolute",
          top: "8rem",
          left: "2rem",
          zIndex: 1000
        }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#333"
          }}>Our Values</h1>
        </div>

        {valuesData.map((value, index) => (
          <div
            key={value.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="about-values-card"
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
              width: "50vw",
              height: "auto",
              padding: "3rem 4rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          >
            <h1 
              className="about-values-title"
              style={{
                fontSize: "8rem",
                fontWeight: "900",
                color: "#ddd",
                margin: "0",
                flexShrink: 0,
                lineHeight: "1"
              }}
            >
              {value.number}
            </h1>
            <p 
              className="about-values-para"
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#333",
                margin: "0",
                flex: 1,
                maxWidth: "600px"
              }}
            >
              {value.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
