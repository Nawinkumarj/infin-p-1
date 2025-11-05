"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Scrollcard() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const cardData = [
    {
      id: 1,
      title: "Multimarket Execution",
      description: "Expertise in delivering programs across APAC, EMEA, and North America.",
      position: "left",
    },
    {
      id: 2,
      title: "Regulatory Acumen",
      description: "Fluency in international compliance standards—from Basel III to GDPR, FATF, and ESG frameworks.",
      position: "right",
    },
    {
      id: 3,
      title: "Cultural Fluency",
      description: "Cross-cultural collaboration models that enable seamless alignment with diverse teams and stakeholders.",
      position: "left",
    },
    {
      id: 4,
      title: "Partnership-Ready Models",
      description: "Scalable delivery, whether embedded with clients or operating as a global PMO-as-a-Service.",
      position: "right",
    },
  ];

  // ✅ Use gsap.matchMedia for responsive animations
  useGSAP(
    () => {
      const cards = cardsRef.current;
      const container = containerRef.current;

      if (!cards.length) return;

      // Create a matchMedia context for different screen sizes
      const mm = gsap.matchMedia();

      // Desktop animation (>768px)
      mm.add("(min-width: 769px)", () => {
        // Set initial positions for cards
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.set(card, {
            x: isLeft ? "-40%" : "40%",
            y: "0%",
            scale: 0.7,
            filter: "blur(8px)",
            opacity: 0.3,
            zIndex: cards.length - i,
          });
        });

        // Create main ScrollTrigger animation
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
                // Current active card animation
                if (currentCardProgress <= 0.5) {
                  const progress = currentCardProgress * 2;
                  gsap.set(card, {
                    x: isLeft ? "-40%" : "40%",
                    y: "0%",
                    scale: 0.7 + 0.5 * progress,
                    filter: `blur(${8 - 8 * progress}px)`,
                    opacity: 0.3 + 0.7 * progress,
                    zIndex: 999,
                  });
                } else {
                  const progress = (currentCardProgress - 0.5) * 2;
                  gsap.set(card, {
                    x: isLeft ? "-40%" : "40%",
                    y: "0%",
                    scale: 1.2 + 0.8 * progress,
                    filter: `blur(${2 * progress}px)`,
                    opacity: 1 - 1 * progress,
                    zIndex: 999,
                  });
                }
              } else if (i < currentCardIndex) {
                // Cards that have passed
                gsap.set(card, {
                  x: isLeft ? "-40%" : "40%",
                  y: "0%",
                  scale: 2,
                  filter: "blur(10px)",
                  opacity: 0,
                  zIndex: 1,
                });
              } else {
                // Upcoming cards
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
          },
        });
      });

      // Tablet animation (481px - 768px)
      mm.add("(min-width: 481px) and (max-width: 768px)", () => {
        // Simpler animation for tablets
        cards.forEach((card, i) => {
          gsap.set(card, {
            x: "0%",
            y: "0%",
            scale: 0.8,
            filter: "blur(5px)",
            opacity: 0.4,
            zIndex: cards.length - i,
          });
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 0.8}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const totalProgress = self.progress;
            const cardProgress = totalProgress * cards.length;
            const currentCardIndex = Math.floor(cardProgress);
            const currentCardProgress = cardProgress - currentCardIndex;

            cards.forEach((card, i) => {
              if (i === currentCardIndex) {
                if (currentCardProgress <= 0.5) {
                  const progress = currentCardProgress * 2;
                  gsap.set(card, {
                    x: "0%",
                    y: "0%",
                    scale: 0.8 + 0.3 * progress,
                    filter: `blur(${5 - 5 * progress}px)`,
                    opacity: 0.4 + 0.6 * progress,
                    zIndex: 999,
                  });
                } else {
                  const progress = (currentCardProgress - 0.5) * 2;
                  gsap.set(card, {
                    x: "0%",
                    y: "0%",
                    scale: 1.1 + 0.5 * progress,
                    filter: `blur(${3 * progress}px)`,
                    opacity: 1 - 1 * progress,
                    zIndex: 999,
                  });
                }
              } else if (i < currentCardIndex) {
                gsap.set(card, {
                  x: "0%",
                  y: "0%",
                  scale: 1.6,
                  filter: "blur(10px)",
                  opacity: 0,
                  zIndex: 1,
                });
              } else {
                gsap.set(card, {
                  x: "0%",
                  y: "0%",
                  scale: 0.8,
                  filter: "blur(5px)",
                  opacity: 0.4,
                  zIndex: cards.length - i,
                });
              }
            });
          },
        });
      });

      // Mobile animation (<481px)
      mm.add("(max-width: 480px)", () => {
        // Simple stacked scroll for mobile
        cards.forEach((card, i) => {
          gsap.set(card, {
            x: "0%",
            y: "0%",
            scale: 0.85,
            filter: "blur(3px)",
            opacity: 0.5,
            zIndex: cards.length - i,
          });
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const totalProgress = self.progress;
            const cardProgress = totalProgress * cards.length;
            const currentCardIndex = Math.floor(cardProgress);
            const currentCardProgress = cardProgress - currentCardIndex;

            cards.forEach((card, i) => {
              if (i === currentCardIndex) {
                if (currentCardProgress <= 0.5) {
                  const progress = currentCardProgress * 2;
                  gsap.set(card, {
                    x: "0%",
                    y: "0%",
                    scale: 0.85 + 0.15 * progress,
                    filter: `blur(${3 - 3 * progress}px)`,
                    opacity: 0.5 + 0.5 * progress,
                    zIndex: 999,
                  });
                } else {
                  const progress = (currentCardProgress - 0.5) * 2;
                  gsap.set(card, {
                    x: "0%",
                    y: "0%",
                    scale: 1 + 0.3 * progress,
                    filter: `blur(${2 * progress}px)`,
                    opacity: 1 - 1 * progress,
                    zIndex: 999,
                  });
                }
              } else if (i < currentCardIndex) {
                gsap.set(card, {
                  x: "0%",
                  y: "0%",
                  scale: 1.3,
                  filter: "blur(8px)",
                  opacity: 0,
                  zIndex: 1,
                });
              } else {
                gsap.set(card, {
                  x: "0%",
                  y: "0%",
                  scale: 0.85,
                  filter: "blur(3px)",
                  opacity: 0.5,
                  zIndex: cards.length - i,
                });
              }
            });
          },
        });
      });

      // Cleanup is handled automatically by matchMedia
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="scrollcard-section">
      <h1
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2rem)",
          fontWeight: "400",
          padding: "70px 20px 0px 20px",
          margin: "0 auto",
          marginTop: "40px",
          textTransform: "uppercase",
        }}
        className="heading"
      >
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
          justifyContent: "space-around",
        }}
      >
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="scrollcard"
            style={{
              position: "absolute",
              width: "min(450px, 90vw)",
              maxWidth: "90vw",
              padding: "clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              border: "1px solid rgba(204, 167, 87, 0.8)",
              color: "white",
              textAlign: card.position === "left" ? "left" : "right",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.2rem, 4vw, 2rem)",
                fontWeight: "300",
                marginBottom: "clamp(15px, 3vw, 20px)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                background: "linear-gradient(45deg, var(--background), #ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.2",
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                lineHeight: "1.6",
                opacity: 0.9,
                fontWeight: "300",
                color: "#e0e0e0",
              }}
            >
              {card.description}
            </p>

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                [card.position]: "20px",
                display: "flex",
                gap: "5px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, var(--background), transparent)",
                  opacity: 0.6,
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "2px",
                  background: "var(--background)",
                  opacity: 0.8,
                }}
              ></div>
              <div
                style={{
                  width: "5px",
                  height: "2px",
                  background: "#ffffff",
                  opacity: 0.4,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
