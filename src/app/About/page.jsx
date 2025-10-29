"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutOurValues from "../Components/Ourvalues";
import Aboutus from "../Components/Aboutus";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const contentRefs = useRef([]);
  // Vision-Mission
  const visionMissionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  // === WHO WE ARE CARD ===
  useGSAP(() => {
    const card = cardRef.current;
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        x: -60,
        rotateZ: -15,
        scale: 0.95,
      },
      {
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        },
        opacity: 1,
        y: 0,
        x: 0,
        rotateZ: 0,
        scale: 1,
        ease: "power3.out",
      }
    );

    gsap.from(contentRefs.current, {
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: cardRef });

  // === VISION & MISSION ===
  useGSAP(() => {
    const section = visionMissionRef.current;
    const vision = visionRef.current;
    const mission = missionRef.current;
    if (!section || !vision || !mission) return;

    // Set initial positions - both cards start from bottom
    gsap.set(vision, {
      x: "-25%",
      y: "150%",
      opacity: 0,
      scale: 0.9,
    });

    gsap.set(mission, {
      x: "25%",
      y: "150%",
      opacity: 0,
      scale: 0.9,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: 1,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.5) {
          // First half: Vision slides up from bottom-left
          const visionProgress = progress / 0.5;
          gsap.set(vision, {
            x: "-25%",
            y: `${150 - 150 * visionProgress}%`,
            opacity: visionProgress,
            scale: 0.9 + 0.1 * visionProgress,
          });
        } else {
          // Vision stays in position
          gsap.set(vision, {
            x: "-25%",
            y: "0%",
            opacity: 1,
            scale: 1,
          });

          // Second half: Mission slides up from bottom-right
          const missionProgress = (progress - 0.5) / 0.5;
          gsap.set(mission, {
            x: "25%",
            y: `${150 - 150 * missionProgress}%`,
            opacity: missionProgress,
            scale: 0.9 + 0.1 * missionProgress,
          });
        }
      },
    });
  }, { scope: visionMissionRef });

  return (
    <div className="about-us-container">
      <Aboutus />
      {/* WHO WE ARE CARD */}
      <section
        className="about-section-wrapper"
        style={{ position: "relative" }}
      >
        <div
          className="about-who-we-are"
          ref={cardRef}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="about-who-we-content">
            <h1 ref={(el) => (contentRefs.current[0] = el)}>Who We Are</h1>
            <p ref={(el) => (contentRefs.current[1] = el)}>
              Infinitas Advisory is a multifaceted services firm specializing in Advisory, Consulting & Marketing incorporated at RAZEZ, UAE. The company offers Project Management Services, Advisory, Consulting and Marketing Services to Financial Institutions, FINTECH, Corporates. We specialise in Driving Business and Digital Transformation programs, Regulatory and Compliance efficiency, Strategic Growth Initiatives, accelerating innovation across industries. With proven expertise, agile frameworks, and industry insights, we position BFSI & Corporate  leaders for sustainable success.
            </p>
          </div>
          <div className="about-who-experience">
            <div
              className="about-experience"
              ref={(el) => (contentRefs.current[2] = el)}
            >
              <h1 className="about-experience-title">25+ Years</h1>
              <p>in Business</p>
            </div>
            <div
              className="about-clients"
              ref={(el) => (contentRefs.current[3] = el)}
            >
              <h1 className="about-clients-title">30+ Clients</h1>
              <p>across the globe</p>
            </div>
            <div
              className="about-Project"
              ref={(el) => (contentRefs.current[4] = el)}
            >
              <h1 className="about-Project-title">75+ Projects</h1>
              <p>completed successfully</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <AboutOurValues />

      {/* Vision & Mission */}
      <section
        className="about-vision-mission"
        ref={visionMissionRef}
        style={{
          height: "100vh",
          background: "var(--foreground)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "0 4rem",
        }}
      >
        {/* Vision */}
        <div
          className="about-vision"
          ref={visionRef}
          style={{
            position: "absolute",
            left: "10rem",
            width: "600px",
            maxWidth: "45vw",
            height: "400px",
            background: "var(--background)",
            borderRadius: "10px",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#040d1e",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Our Vision
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "#040d1e",
              textAlign: "justify",
              margin: 0,
            }}
          >
            To be the leading provider of integrated business solutions, empowering organizations with seamless project management, innovative marketing strategies, and efficient sourcing and procurement services. We strive to drive excellence, foster sustainable growth, and create lasting value for our clients.
          </p>
        </div>

        {/* Mission */}
        <div
          className="about-mission"
          ref={missionRef}
          style={{
            position: "absolute",
            right: "10rem",
            width: "600px",
            maxWidth: "45vw",
            height: "400px",
            background: "#040d1e",
            borderRadius: "10px",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ceae95",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "justify",
              margin: 0,
            }}
          >
           Our mission is to empower businesses with expert guidance and end-to-end support in delivering high-impact projects, building resilient brands, and optimizing procurement strategies. We combine industry insight, innovation, and precision to drive sustainable growth and operational excellence for our clients.
          </p>
        </div>
      </section>
    </div>
  );
}
