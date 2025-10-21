"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutOurValues from "../Components/Ourvalues";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const aboutRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const contentRefs = useRef([]);
  // Vision-Mission
  const visionMissionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  // === "Why Infinitas? ===
 useGSAP(() => {
    const about = aboutRef.current;
    const paragraphs = about.querySelectorAll("p");

    ScrollTrigger.create({
      trigger: about,
      start: "top top",
      end: "+=1000",
      pin: true,
      scrub: true,
    });

    paragraphs.forEach((p) => {
      const text = p.textContent;
      p.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char;
        span.style.display = "inline-block";
        p.appendChild(span);
      });

      const spans = p.querySelectorAll("span");
      gsap.set(spans, { opacity: 0.2, y: 0 });

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        ease: "power1.out",
        scrollTrigger: {
          trigger: p,
          start: "top 35%",
          end: "top 15%",
          scrub: true,
        },
      });
    });
  }, { scope: aboutRef });

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

    gsap.set(vision, {
      x: "0%",
      y: "0%",
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 2,
    });

    gsap.set(mission, {
      x: "0%",
      y: "100vh",
      rotation: -15,
      scale: 0.9,
      opacity: 0.8,
      zIndex: 1,
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

        if (progress <= 0.6) {
          const slideProgress = progress / 0.6;
          gsap.set(mission, {
            y: `${100 - 100 * slideProgress}vh`,
            rotation: -15 + 15 * slideProgress,
            scale: 0.9 + 0.1 * slideProgress,
            opacity: 0.8 + 0.2 * slideProgress,
            zIndex: 3,
          });

          gsap.set(vision, {
            opacity: 1 - 0.4 * slideProgress,
            scale: 1 - 0.05 * slideProgress,
            zIndex: 2,
          });
        } else {
          const settleProgress = (progress - 0.6) / 0.4;
          gsap.set(mission, {
            y: "0%",
            rotation: 0,
            scale: 1,
            opacity: 1,
            zIndex: 3,
          });
          gsap.set(vision, {
            opacity: Math.max(0, 0.6 - 0.6 * settleProgress),
            scale: Math.max(0.8, 0.95 - 0.15 * settleProgress),
            y: `${-30 * settleProgress}%`,
            zIndex: 1,
          });
        }
      },
      onComplete: () => {
        gsap.set(mission, {
          y: "0%",
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: 3,
        });
        gsap.set(vision, {
          opacity: 0,
          scale: 0.8,
          y: "-30%",
          zIndex: 1,
        });
      },
    });
  }, { scope: visionMissionRef });

  
  return (
    <div className="about-us-container">
      {/* WHY INFINITAS */}
      <section className="about-section" ref={aboutRef}>
        <h1 className="about-title">Why Infinitas ?</h1>
        <p className="about-content">
          Together, we turn strategic intent into operational excellence—one
          milestone at a time.” We’re not just project managers—we’re your
          execution partners. With a blend of expertise, agility, integrity,
          innovation, and relentless client focus, we empower you to go further,
          faster "Because precision execution is the difference between planning
          change and making it happens."
        </p>
      </section>

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
              <h1 className="about-experience-title">30 Years</h1>
              <p>in Business</p>
            </div>
            <div
              className="about-clients"
              ref={(el) => (contentRefs.current[3] = el)}
            >
              <h1 className="about-clients-title">250+ Clients</h1>
              <p>across the globe</p>
            </div>
            <div
              className="about-Project"
              ref={(el) => (contentRefs.current[4] = el)}
            >
              <h1 className="about-Project-title">100+ Projects</h1>
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
          background: "#ceae95",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Vision Card */}
        <div
          className="about-vision"
          ref={visionRef}
          style={{
            position: "absolute",
            width: "600px",
            maxWidth: "90vw",
            height: "400px",
            background: "rgba(255, 255, 255, 0.95)",
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
          <ul>
          {/* <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "#040d1e",
              textAlign: "justify",
              margin: 0,
            }}
          >
            To be the leading innovator in technology solutions, transforming
            businesses and creating sustainable value for our clients worldwide
            through cutting-edge digital experiences.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "#040d1e",
              textAlign: "justify",
              margin: 0,
            }}
          >
            To be the leading advisory partner in project execution, strategic marketing, and intelligent sourcing — enabling organizations to transform with agility, clarity, and measurable impact.
          </li> */}
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
          </ul>
        </div>

        {/* Mission Card */}
        <div
          className="about-mission"
          ref={missionRef}
          style={{
            position: "absolute",
            width: "600px", //800
            maxWidth: "90vw",
            height: "400px",  //450
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
          <ul>
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
          {/* <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "justify",
              margin: 0,
            }}
          >
            Our mission is to deliver strategic, results-driven solutions across project management, marketing, and procurement. We are committed to: 
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "justify",
              margin: 0,
              listStyleType: "none",
            }}
          >
           - Executing projects with precision and efficiency to enhance business success.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "justify",
              margin: 0,
              listStyleType: "none",
            }}
          >
           - Crafting impactful marketing strategies that drive engagement and growth.
          </li>
          <li
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "justify",
              margin: 0,
              listStyleType: "none",
            }}
          >
          - Optimizing sourcing and procurement processes to ensure cost-effectiveness and quality. Through innovation, collaboration, and customer-centricity, we aim to be the trusted partner in accelerating business performance.
          </li> */}
          </ul>
        </div>
      </section>
    </div>
  );
}
