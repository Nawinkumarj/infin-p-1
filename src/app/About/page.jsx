"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutOurValues from "../Components/Ourvalues";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const aboutRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const contentRefs = useRef([]);
  // Vision-Mission refs
  const visionMissionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  // === Animate "Why Infinitas?" section ===
  useEffect(() => {
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
      gsap.set(spans, { opacity: 0.2, y: 0 });  //Opacity text

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        ease: "power1.out",
        scrollTrigger: {
          trigger: p,
          start: "top 30%",
          end: "top 10%",
          scrub: true,
          // markers: true,
        },
      });
    });
  }, []);

  // === Animate "Who We Are" card section ===
  useEffect(() => {
    const card = cardRef.current;

    // Card animation
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
          // markers: true,
        },
        opacity: 1,
        y: 0,
        x: 0,
        rotateZ: 0,
        scale: 1,
        ease: "power3.out",
      }
    );
    // Content stagger reveal
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
  }, []);

  // === Vision-Mission Animation ===
  useEffect(() => {
    const section = visionMissionRef.current;
    const vision = visionRef.current;
    const mission = missionRef.current;

    if (!section || !vision || !mission) return;

    // Clear previous ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) {
        st.kill();
      }
    });

    // Set initial positions
    gsap.set(vision, {
      x: "0%",
      y: "0%",
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 2
    });

    gsap.set(mission, {
      x: "0%",
      y: "100vh", // Start from bottom off-screen
      rotation: -15, // Initial tilt
      scale: 0.9,
      opacity: 0.8,
      zIndex: 1
    });

    // Pin the section and animate cards with shorter duration
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%", // Reduced from 200% to 100%
      pin: true,
      scrub: 1,
      pinSpacing: true, // Important: ensures proper spacing after unpin
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.6) {
          // Mission card slides up with tilt
          const slideProgress = progress / 0.6; // Normalize to 0-1
          
          gsap.set(mission, {
            y: `${100 - (100 * slideProgress)}vh`,
            rotation: -15 + (15 * slideProgress),
            scale: 0.9 + (0.1 * slideProgress),
            opacity: 0.8 + (0.2 * slideProgress),
            zIndex: 3
          });

          gsap.set(vision, {
            opacity: 1 - (0.4 * slideProgress),
            scale: 1 - (0.05 * slideProgress),
            zIndex: 2
          });
        } else {
          // Mission card settles, vision card fades out completely
          const settleProgress = (progress - 0.6) / 0.4; // Normalize remaining progress
          
          gsap.set(mission, {
            y: "0%",
            rotation: 0,
            scale: 1,
            opacity: 1,
            zIndex: 3
          });

          gsap.set(vision, {
            opacity: Math.max(0, 0.6 - (0.6 * settleProgress)),
            scale: Math.max(0.8, 0.95 - (0.15 * settleProgress)),
            y: `${-30 * settleProgress}%`,
            zIndex: 1
          });
        }
      },
      onComplete: () => {
        // Ensure final state when animation completes
        gsap.set(mission, {
          y: "0%",
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: 3
        });
        gsap.set(vision, {
          opacity: 0,
          scale: 0.8,
          y: "-30%",
          zIndex: 1
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <div className="about-us-container">
      {/* WHY INFINITAS */}
      <section className="about-section" ref={aboutRef}>
        <h1 className="about-title">Why Infinitas ?</h1>
        <p className="about-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam nam, expedita minus atque saepe et quaerat aspernatur praesentium dolore asperiores suscipit sint libero sed doloremque repellendus quas quasi, officia fuga! Vel praesentium temporibus non dolores alias a sequi dicta distinctio accusamus velit quo deserunt voluptatibus repudiandae, consequatur suscipit provident omnis voluptas consequuntur. Vel alias minima saepe quidem totam, soluta nulla veritatis laudantium ducimus aperiam necessitatibus, iste quos sequi qui, maiores dolorem dolores nisi. Placeat dignissimos ullam, sunt, nobis explicabo est dolore consequuntur possimus, dolores sint cumque quos recusandae quo!
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
              Lorem ipsum dolor sit amet consectetur...
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
      <AboutOurValues/>

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
          overflow: "hidden"
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
            borderRadius: "20px",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
        >
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#040d1e",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            Our Vision
          </h2>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            color: "#040d1e",
            textAlign: "center",
            margin: 0
          }}>
            To be the leading innovator in technology solutions, transforming businesses and creating sustainable value for our clients worldwide through cutting-edge digital experiences.
          </p>
        </div>

        {/* Mission Card */}
        <div 
          className="about-mission"
          ref={missionRef}
          style={{
            position: "absolute",
            width: "600px",
            maxWidth: "90vw",
            height: "400px",
            background: "#040d1e",
            borderRadius: "20px",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#ceae95",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            margin: 0
          }}>
            We empower businesses through innovative technology solutions, delivering exceptional digital experiences that drive growth, efficiency, and success in an ever-evolving digital landscape.
          </p>
        </div>
      </section>
    </div>
  );
}
