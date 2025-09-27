"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scrollcard() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const container = containerRef.current;
    
    if (!cards.length) return;

    // Clear previous ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Set initial positions for all cards
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      
      gsap.set(card, {
        x: isLeft ? "-40%" : "40%", // Stay in left/right position
        y: "0%",
        scale: 0.7,
        filter: "blur(8px)",
        opacity: 0.3,
        zIndex: cards.length - i,
      });
    });

    // Create main ScrollTrigger that pins the container and animates cards
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${cards.length * window.innerHeight}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const totalProgress = self.progress;
        const cardProgress = totalProgress * cards.length;
        const currentCardIndex = Math.floor(cardProgress);
        const currentCardProgress = cardProgress - currentCardIndex;

        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;

          if (i === currentCardIndex) {
            // Current active card
            if (currentCardProgress <= 0.5) {
              // First half: scale up and become clear (stay in position)
              const progress = currentCardProgress * 2;
              gsap.set(card, {
                x: isLeft ? "-40%" : "40%", // Keep original position
                y: "0%",
                scale: 0.7 + (0.5 * progress), // Scale from 0.7 to 1.2
                filter: `blur(${8 - (8 * progress)}px)`,
                opacity: 0.3 + (0.7 * progress),
                zIndex: 999,
              });
            } else {
              // Second half: zoom to screen then hide
              const progress = (currentCardProgress - 0.5) * 2;
              gsap.set(card, {
                x: isLeft ? "-40%" : "40%",
                y: "0%",
                scale: 1.2 + (0.8 * progress), // Scale from 1.2 to 2.0 (zoom to screen)
                filter: `blur(${2 * progress}px)`, // Slight blur as it zooms out
                opacity: 1 - (1 * progress), // Fade out completely
                zIndex: 999,
              });
            }
          } else if (i < currentCardIndex) {
            // Cards that have already been shown - completely hidden
            gsap.set(card, {
              x: isLeft ? "-40%" : "40%",
              y: "0%",
              scale: 2,
              filter: "blur(10px)",
              opacity: 0,
              zIndex: 1,
            });
          } else {
            // Cards waiting to be shown - blurred and small
            gsap.set(card, {
              x: isLeft ? "-40%" : "40%",
              y: "0%",
              scale: 0.7,
              filter: "blur(8px)",
              opacity: 0.3,
              zIndex: cards.length - i,
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Card data
  const cardData = [
    {
      id: 1,
      title: "Multimarket Execution",
      description: "Expertise in delivering programs across APAC, EMEA, and North America.",
      position: "right"
    },
    {
      id: 2,
      title: "Regulatory Acumen",
      description: "Fluency in international compliance standards—from Basel III to GDPR, FATF, and ESG frameworks.",
      position: "left"
    },
    {
      id: 3,
      title: "Cultural Fluency",
      description: "Cross-cultural collaboration models that enable seamless alignment with diverse teams and stakeholders.",
      position: "right"
    },
    {
      id: 4,
      title: "Partnership-Ready Models",
      description: "Scalable delivery, whether embedded with clients or operating as a global PMO-as-a-Service.",
      position: "left"
    }
  ];

  return (
    <section ref={containerRef}
    style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    }}> 
    <h1 style={{
        textAlign: "center",
        fontSize: "3rem",
        fontWeight: "400",
        padding: "150px 20px 0px 20px",
        color: "white",
        textTransform: "uppercase",
    }}>
        Global Expertise. Local Precision.
    </h1>
    <div
      className="scrollcard-container"
      style={{
        position: "relative",
        height: "80vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
      }}>
      {cardData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[index] = el)}
          className="scrollcard"
          style={{
            position: "absolute",
            width: "600px",
            maxWidth: "90vw",
            padding: "60px 40px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            color: "white",
            textAlign: card.position === "left" ? "left" : "right",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "300",
            marginBottom: "20px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            background: "linear-gradient(45deg, #00d4ff, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            {card.title}
          </h2>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            opacity: 0.9,
            fontWeight: "300",
            color: "#e0e0e0"
          }}>
            {card.description}
          </p>
          
          <div style={{
            position: "absolute",
            bottom: "20px",
            [card.position]: "20px",
            display: "flex",
            gap: "5px"
          }}>
            <div style={{
              width: "30px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #00d4ff)",
              opacity: 0.6
            }}></div>
            <div style={{
              width: "10px",
              height: "2px",
              background: "#00d4ff",
              opacity: 0.8
            }}></div>
            <div style={{
              width: "5px",
              height: "2px",
              background: "#ffffff",
              opacity: 0.4
            }}></div>
          </div>
        </div>
        
      ))}
        </div>
    </section>
  );
}
