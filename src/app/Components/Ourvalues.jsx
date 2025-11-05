"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOurValues() {
  const visionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

      const mm = gsap.matchMedia();

      // Desktop - Horizontal scroll (>768px)
      mm.add("(min-width: 769px)", () => {
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
      });

      // Tablet - Adjusted horizontal scroll (481px - 768px)
      mm.add("(min-width: 481px) and (max-width: 768px)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            x: `${10 + i * 60}vw`,
            opacity: 1,
          });
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${cards.length * 80}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalDistance = cards.length * 50;

            cards.forEach((card, i) => {
              const initialPosition = 10 + i * 60;
              const currentPosition = initialPosition - totalDistance * progress;

              gsap.set(card, {
                x: `${currentPosition}vw`,
                opacity:
                  currentPosition > -50 && currentPosition < 110 ? 1 : 0.3,
              });
            });
          },
        });
      });

      // Mobile - Vertical stack (<=480px)
      mm.add("(max-width: 480px)", () => {
        // Clear GSAP properties
        cards.forEach((card) => {
          gsap.set(card, {
            clearProps: "all",
          });
        });

        // Simple fade-in animations
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: visionRef, dependencies: [isMobile] }
  );

  return (
    <section className="about-our-value-wrapper">
      <div
        className="about-our-values"
        ref={visionRef}
        style={{
          padding: isMobile ? "2rem 1rem" : "4rem 2rem",
          backgroundImage: "url('/infinbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          width: "100%",
          minHeight: isMobile ? "auto" : "100vh",
          display: isMobile ? "flex" : "block",
          flexDirection: isMobile ? "column" : "initial",
          gap: isMobile ? "2rem" : "0",
        }}
      >
        <div
          className="about-our-values-heading"
          style={{
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? "0" : "8rem",
            left: isMobile ? "0" : "2rem",
            zIndex: 1000,
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "2rem" : "3rem",
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
              position: isMobile ? "relative" : "absolute",
              top: isMobile ? "auto" : "55%",
              left: isMobile ? "auto" : "0",
              transform: isMobile ? "none" : "translateY(-50%)",
              width: isMobile ? "100%" : "45vw",
              maxWidth: isMobile ? "100%" : "600px",
              padding: isMobile ? "2rem 1.5rem" : "3rem 4rem",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "1rem" : "2rem",
              justifyContent: isMobile ? "flex-start" : "center",
              borderRadius: "20px",
            }}
          >
            <h1
              className="about-values-title"
              style={{
                fontSize: isMobile ? "2.5rem" : "4.5rem",
                fontWeight: "900",
                color: "#ddd",
                margin: "0",
                flexShrink: 0,
                lineHeight: "1",
                position: isMobile ? "relative" : "absolute",
                left: isMobile ? "0" : "60px",
                top: isMobile ? "0" : "30px",
              }}
            >
              {value.number}
            </h1>
            <div
              className="about-value-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "0.75rem" : "1rem",
                fontSize: isMobile ? "1rem" : "1.2rem",
                lineHeight: "1.6",
                color: "#333",
                margin: "0",
                flex: 1,
                maxWidth: isMobile ? "100%" : "500px",
                padding: isMobile ? "1.5rem" : "1rem",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <h2 style={{ fontSize: isMobile ? "1.25rem" : "var(--text-l)", margin: 0 }}>
                {value.title}
              </h2>
              <p style={{ fontSize: isMobile ? "0.95rem" : "var(--text-xs)", margin: 0 }}>
                {value.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
