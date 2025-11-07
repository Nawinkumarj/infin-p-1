"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const flipRef = useRef(null);
  const industries = [
  // Ring 1 - 2 items
  { id: 1, name: "Legal Service", icon: "/icons/ls.svg", ring: 1, angle: 50 },
  { id: 2, name: "Financial Service", icon: "/icons/fs.svg", ring: 1, angle: 180 },

  // Ring 2 - 3 items
  { id: 3, name: "Telecommunication", icon: "/icons/tc.svg", ring: 2, angle: 320 },
  { id: 4, name: "Management Consulting", icon: "/icons/mc.svg", ring: 2, angle: 80 },
  { id: 5, name: "GCC", icon: "/icons/gcc.svg", ring: 2, angle: 240 },
  

  // Ring 3 - 5 items
  { id: 6, name: "Transportation", icon: "/icons/tl.svg", ring: 3, angle: 30 },
  { id: 7, name: "Mining", icon: "/icons/mn.svg", ring: 3, angle: 72 },
  { id: 8, name: "Manufacturing", icon: "/icons/mf.svg", ring: 3, angle: 124 },
  { id: 9, name: "Healthcare", icon: "/icons/hc.svg", ring: 3, angle: 216 },
  { id: 10, name: "Realestate", icon: "/icons/re.svg", ring: 3, angle: 288 },

  // Ring 4 - 7 items
  { id: 11, name: "Hospitality", icon: "/icons/ht.svg", ring: 4, angle: 0 },
  { id: 12, name: "Education", icon: "/icons/et.svg", ring: 4, angle: 51.43 },
  { id: 13, name: "Construction", icon: "/icons/cm.svg", ring: 4, angle: 102.86 },
  { id: 14, name: "Agriculture & Farming", icon: "/icons/af.svg", ring: 4, angle: 154.29 },
  { id: 15, name: "Energy & Utilities", icon: "/icons/eu.svg", ring: 4, angle: 205.72 },
  { id: 16, name: "Information Technology", icon: "/icons/it.svg", ring: 4, angle: 257.15 },
  { id: 17, name: "Media & Entertainment", icon: "/icons/me.svg", ring: 4, angle: 308.58 },
];

  useGSAP(
    () => {
      gsap.to(".card", {
        rotateX: 180,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".flip-wrapper",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      gsap.to(".industries-circles-container", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".industry-icon-wrapper", {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".center-logo", {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".industry-icon", {
        y: "random(-10, 10)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    },
    { scope: flipRef }
  );

  return (
    <div className="industries-container" ref={flipRef}>
      <div className="flip-wrapper">
        <div className="card">
          {/* Front */}
          <div className="card-face industries-section-1">
            <div className="industries-banner-img"></div>
            <div className="industries-banner-text">
              <h1>Industries We Serve</h1>
            </div>
          </div>

          {/* Back */}
          <div className="card-face industries-section-2">
            <div className="industries-circles-container">
              <div className="center-logo">
                <img src="/Infinitas.png" alt="Infinitas" />
              </div>

              {industries.map((industry) => {
                const ringRadius = industry.ring * 90; // spacing per ring
                const angleRad = (industry.angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * ringRadius;
                const y = Math.sin(angleRad) * ringRadius;

                return (
                  <div
                    key={industry.id}
                    className="industry-icon-wrapper"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className="industry-icon" title={industry.name}>
                      <div className="icon-image">
                        <img
                          src={industry.icon}
                          alt={industry.name}
                          className="svg-icon"
                        />
                      </div>
                      <span className="label">{industry.name}</span>
                    </div>
                  </div>
                );
              })}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
              <div className="ring ring-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
