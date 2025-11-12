"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const teamMembers = [
  {
    name: "Dr. Uma Jagadeesan",
    designation: "Director",
    image: "/dr.uma.jpeg",
    description: 
    <>
      <p>Uma, a seasoned and highly experienced Banking Professional with over 27 years of experience in the industry. Her specialization is in on Large Scale Transformation and Change Management Programmes, Business Process Management, Data Analytics and Information systems, Outsourcing, Offshoring, and the Creation of Centres of Excellence. With a diverse background in progressive leadership roles, Uma has excelled in Client Lifecycle Management, New Setups, Mergers and Acquisitions, Transition, Re-engineering, and Shared Services & Global Capability Centres. She has successfully Strategized and led cross-functional teams to drive change and transformation in Strategy and operations Best Practices.</p>
      <p>Her career spans Banking and Management Consulting globally. She has been with Standard Chartered Bank for 20 years in Regional and Global Roles based out of India, Dubai & Singapore. Her last role was Global Head of Client Onboarding and Lifecycle Management for Corporate, Institutional, and Commercial Banking at SCB based in Singapore. Her Consulting career spans around 5 years in Financial Services and FINTECH domains across geographies.</p>
      <p>Her approach to banking is characterized by a combination of analytical thinking, strategic planning, and a customer-centric mindset.</p>
      <p>She embraces innovation and leverages the latest technology to streamline processes, enhance operational efficiency, and provide clients with convenient and seamless banking experiences. Her mission is to positively impact clients' lives, helping them navigate the ever-changing financial landscape and guiding them toward financial success.</p>
    </>
  },
  {
    name: "John Bennett Victor",
    designation: "Business Manager",
    image:"/ben.jpg",
    description: 
    <>
    <p>About</p>
    </>,
  },
  {
    name: "Lakshmi",
    designation: "Operations Manager",
    image:
      "lakshmi1.png",
    description: 
    <>
    <p></p>
    </>,
  },
];

export default function TeamScroll() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  const addToImageRefs = (el) => el && !imageRefs.current.includes(el) && imageRefs.current.push(el);
  const addToTextRefs = (el) => el && !textRefs.current.includes(el) && textRefs.current.push(el);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 15%",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });

    const gap = 2; // additional scroll space/time between 2nd and 3rd section

    teamMembers.forEach((_, i) => {
      if (i === 0) return;

      const startTime = i === 2 ? i * 1.8 + gap : i * 1.8;

      tl.to(imageRefs.current[i], {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        scale: 1,
        duration: 1,
      }, startTime)
        .to(textRefs.current[i], {
          opacity: 1,
          zIndex: 2,
          duration: 1,
        }, startTime) // Same start time to sync with image
        .to(imageRefs.current[i - 1], {
          opacity: 0,
          duration: 1,
        }, startTime + 0.5)
        .to(textRefs.current[i - 1], {
          opacity: 0,
          zIndex: 1,
          duration: 1,
        }, startTime + 0.5);
    });
  }, { scope: sectionRef });

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
                  transform: "scale(1)",
                }}
              />
              <div
                className="text-layer"
                ref={addToTextRefs}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? 2 : 1,
                  padding: "1rem",
                }}
              >
                <h2 className="team-name">{member.name}</h2>
                <p className="team-designation">{ member.designation}</p>
                <p className="team-description">{member.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
