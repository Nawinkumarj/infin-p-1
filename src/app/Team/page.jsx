"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Dr. Uma Jagadeesan",
    designation: "Director",
    image: "/dr.uma.jpeg",
    description: "bgywe vg",
  },
  {
    name: "John Ben Victor",
    designation: "Business Development Manager",
    image: "https://pics.craiyon.com/2024-09-04/lVIdzSccREy2xW2pf853oA.webp",
    description: "Team 2",
  },
  {
    name: "Lakshmi",
    designation: "Director",
    image: "https://cdn.pixabay.com/photo/2016/06/06/17/05/man-1439909_1280.jpg",
    description: "Team Member 3",
  },
];

export default function TeamScroll() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  imageRefs.current = [];
  textRefs.current = [];

  const addToImageRefs = (el) => el && !imageRefs.current.includes(el) && imageRefs.current.push(el);
  const addToTextRefs = (el) => el && !textRefs.current.includes(el) && textRefs.current.push(el);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: "+=1500",
          scrub: true,
          pin: true,
        },
      });

      teamMembers.forEach((_, i) => {
        if (i === 0) return;

        tl.to(imageRefs.current[i], {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          duration: 1,
        }, i * 1.8)
          .to(textRefs.current[i], {
            opacity: 1,
            zIndex: 2,
            duration: 1,
          }, i * 1.5)
          .to(imageRefs.current[i - 1], {
            opacity: 0,
            duration: 1,
          }, i * 1.5 + 0.5)
          .to(textRefs.current[i - 1], {
            opacity: 0,
            zIndex: 1,
            duration: 1,
          }, i * 1.5 + 0.5);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="team-container">
        <div className="team-image">
          {teamMembers.map((member, i) => (
            <React.Fragment key={i}>
              <img
                ref={addToImageRefs}
                className="image-layer"
                src={member.image}
                alt={member.name}
                style={{
                  clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? "scale(1)" : "scale(1)",
                }}
              />
              <div
                className={`text-layer`}
                ref={addToTextRefs}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? 2 : 1,
                  padding: "1rem",
                }}
              >
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
                <p>{member.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
