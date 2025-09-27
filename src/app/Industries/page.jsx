"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function page() {
  const flipRef = useRef(null); // ref for scoped animation

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".card", {
        scrollTrigger: {
          trigger: ".flip-wrapper",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
        rotateX: 180,
        ease: "none",
      });
    }, flipRef); // apply animations only within this ref

    return () => ctx.revert(); // clean up on unmount
  }, []);

  return (
    <div className="industries-container" ref={flipRef}>
      <div className="flip-wrapper">
        <div className="card">
          {/* front */}
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
