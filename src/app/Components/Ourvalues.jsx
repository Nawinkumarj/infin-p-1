"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOurValues() {
  const visionRef = useRef(null);
  const cardsRef = useRef([]);

  const valuesData = [
    {
      id: 1,
      number: "01",
      title: "Client Success First",
      text: "We align our goals with yours — your success is our priority.",
    },
    {
      id: 2,
      number: "02",
      title: "Excellence in Execution",
      text: "From planning to delivery, we ensure precision, timeliness, and quality in every engagement.",
    },
    {
      id: 3,
      number: "03",
      title: "Integrity and Transparency",
      text: "We uphold ethical practices, clear communication, and full accountability in all we do.",
    },
    {
      id: 4,
      number: "04",
      title: "Innovation and Agility",
      text: "We adapt, innovate, and evolve to help clients thrive in a rapidly changing environment",
    },
    {
      id: 5,
      number: "05",
      title: "Collaboration and Empowerment",
      text: "We build strong, trust-based partnerships and empower teams to lead with confidence",
    },
    {
      id: 6,
      number: "06",
      title: "Sustainability & Responsibility",
      text: "We champion responsible sourcing, inclusive marketing, and projects that add long-term value to society and the environment.",
    },
  ];

  useGSAP(
    () => {
      const cards = cardsRef.current;
      const container = visionRef.current;

      if (!cards.length) return;

      // Initial positions for all cards
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: `${20 + i * 50}vw`,
          opacity: 1,
        });
      });

      // ScrollTrigger animation
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalDistance = cards.length * 40;

          cards.forEach((card, i) => {
            const initialPosition = 20 + i * 50;
            const currentPosition = initialPosition - totalDistance * progress;

            gsap.set(card, {
              x: `${currentPosition}vw`,
              opacity:
                currentPosition > -40 && currentPosition < 100 ? 1 : 0.3,
            });
          });
        },
      });
    },
    { scope: visionRef } // Automatically handles cleanup
  );

  return (
    <section className="about-our-value-wrapper">
      <div
        className="about-our-values"
        ref={visionRef}
        style={{
          padding: "4rem 2rem",
          backgroundImage: "url('/infinbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="about-our-values-heading"
          style={{
            position: "absolute",
            top: "8rem",
            left: "2rem",
            zIndex: 1000,
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#ffffffff",
            }}
          >
            Our Values
          </h1>
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
                lineHeight: "1",
              }}
            >
              {value.number}
            </h1>
            <div
              className="about-value-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#333",
                margin: "0",
                flex: 1,
                maxWidth: "600px",
              }}
            >
              <h2>{value.title}</h2>
              <p>{value.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
