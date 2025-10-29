"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ServiceList = [
  {
    id: 1,
    section: "corporate-events",
    title: "Corporate Events",
    description:
      "We drive enterprise-wide change across people, processes, and platforms—linking strategy to execution with a focus on value realization",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 2,
    section: "personal-events",
    title: "Personal Events",
    description:
      "From AI-driven fintech solutions to open banking innovations, we ensure seamless execution of cutting-edge projects.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 3,
    section: "event-production",
    title: "Event Production & Logistics",
    description:
      "Whether it’s launching new ventures, entering new markets, or integrating post-M&A platforms, we bring structured delivery to big ambitions.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 4,
    title: "Virtual & Hybrid Events",
    description:
      "We manage large-scale compliance and regulatory projects including AML, ESG, Basel, and IFRS programs with full traceability and transparency",
    imageUrl: "/bimg.jpeg",
  },
];

const Page = () => {
  const refs = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    const target = refs.current[index];

    if (container && target) {
      const scrollTop = target.offsetTop - container.offsetTop;

      gsap.to(container, {
        scrollTop,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  };

 useGSAP(
    () => {
      const sections = refs.current;

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              scroller: scrollRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          scroller: scrollRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: () => {
            let maxVisible = 0;
            let active = 0;

            refs.current.forEach((el, idx) => {
              const rect = el.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const visibleHeight =
                Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
              const ratio = visibleHeight / windowHeight;

              if (ratio > maxVisible) {
                maxVisible = ratio;
                active = idx;
              }
            });

            setActiveIndex(active);
          },
        });
      });
    },
    { scope: scrollRef } // ensures cleanup & scoping
  );

  return (
    <div className="service-container">
      {/* Left Side */}
      <div className="title-service">
        <h1>Our Services</h1>
        {ServiceList.map((service, index) => (
          <div className="service-title-box">
            <div
              className={`service-title ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <h2 style={{ margin: 0, padding: 0 }}>{service.title}</h2>
            </div>
            {activeIndex === index && (
              <div className="arrow-indicator">
                <span>
                  <FaArrowRight size={20} color="black" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side */}
      <div ref={scrollRef} className="description-service">
        {ServiceList.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => (refs.current[index] = el)}
            className="service-description-box"
            onClick={() => handleServiceClick(service)}
          >
            <h2 className="service-heading">{service.title}</h2>
            <div className="service-content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <p>{service.description}</p>
                <div className="know-more-btn">
                  <span className="know-more-text">Know more</span>
                  <FaCirclePlus size={20} />
                </div>
              </div>
              <img src={service.imageUrl} alt={service.title} />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedService && (
          <>
            <DialogTitle sx={{ display: "flex", alignItems: "center", pr: 6 }}>
              <Typography variant="h3" sx={{ flex: 1 }}>
                {selectedService.title}
              </Typography>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "white",
                }}
              >
                <IoIosCloseCircleOutline size={40} color="black" />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" sx={{ mb: 2, size: "38px" }}>
                {selectedService.description}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Page;