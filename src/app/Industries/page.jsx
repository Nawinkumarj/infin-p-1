"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
  const flipRef = useRef(null); // ref for scoping animations

  useGSAP(
    () => {
      gsap.to(".card", {
        rotateX: 180,
        ease: "none",
        scrollTrigger: {
          trigger: ".flip-wrapper",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });
    },
    { scope: flipRef } // automatically scoped to this element
  );

  return (
    <div className="industries-container" ref={flipRef}>
      <div className="flip-wrapper">
        <div className="card">
          {/* Front */}
          <div className="card-face industries-section-1">
            <div className="industries-banner-img">
              {/* <img src="/imgg.jpg" alt="industries banner" /> */}
            </div>
            <div className="industries-banner-text">
              <h1>Industries</h1>
            </div>
          </div>

          {/* Back */}
          <div className="card-face industries-section-2">
            <div className="industries-circle-1">
              <img src="/imgg.jpg" alt="" className="img-a" />
              <div className="industries-circle-2">
                <img src="/imgg.jpg" alt="" className="img-b" />
                <div className="industries-circle-3">
                  <img src="/infinitas.png" alt="" className="img-c" />
                  <div className="industries-circle-4">
                    <img src="/infinitas.png" alt="" className="img-d" />
                    <div className="industries-circle-5">
                      <img src="/infinitas.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
