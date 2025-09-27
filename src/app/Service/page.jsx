"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../app/globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const ServiceList = [
  {
    id: 1,
    title: "Our Approach",
    description:
      "We believe in a collaborative approach, working closely with our clients to understand their unique needs and challenges. Our team of experts combines industry knowledge with cutting-edge technology to deliver tailored solutions that drive results.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 2,
    title: "Consulting Services",
    description:
      "Our consulting services help businesses identify opportunities for growth and improvement. We provide strategic guidance on digital transformation, process optimization, and technology adoption to help our clients stay ahead in a rapidly evolving market.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 3,
    title: "Technology Solution",
    description:
      "We offer a range of technology solutions designed to meet the specific needs of our clients. From custom software development to cloud computing and cybersecurity, our team leverages the latest technologies to deliver innovative solutions that drive business success.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 4,
    title: "Industry Expertise",
    description:
      "With experience across various industries, including finance, healthcare, retail, and manufacturing, we bring deep industry knowledge to every project. Our understanding of industry-specific challenges allows us to deliver solutions that are both effective and relevant.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 5,
    title: "Client Success Story",
    description:
      "We take pride in the success of our clients. Our portfolio includes numerous case studies showcasing how our services have helped businesses achieve their goals, improve efficiency, and drive growth. We are committed to delivering measurable results and long-term value.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 6,
    title: "Get in Touch",
    description:
      "Ready to take your business to the next level? Contact us today to learn more about our services and how we can help you achieve your goals. Our team is here to answer your questions and provide the support you need to succeed.",
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
      const scrollTop = target.offsetTop - container.offsetTop; // position of target inside scrollable container

      gsap.to(container, {
        scrollTop,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  };

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    refs.current.forEach((section, i) => {
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
            start: "top 80%", // when section enters viewport
            toggleActions: "play reverse play reverse",
            // play on enter, reverse on leave, replay on enterBack, reverse on leaveBack
          },
        }
      );
    });

    refs.current.forEach((section, i) => {
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
  }, []);

  return (
    <div className="service-container">
      {/* Left Side */}
      <div className="title-service">
        <h1>Our Services</h1>
        {ServiceList.map((service, index) => (
          <div key={service.id} className="service-title-box">
            <div
              className={`service-title ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <h2>{service.title}</h2>
            </div>
            {activeIndex === index && (
              <div className="arrow-indicator">
                <span>
                  <FaArrowRight size={25} color="black" />
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
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
