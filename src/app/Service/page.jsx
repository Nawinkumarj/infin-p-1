"use client";
import React, { useEffect, useRef, useState } from "react";
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
    title: "Program & Project Delivery",
    description:
      "We lead the full lifecycle of strategic initiatives—from planning and mobilization through to execution and benefit realization.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 2,
    title: "PMO Setup & Governance",
    description:
      "We build and optimize Project Management Offices (PMOs) that bring consistency, visibility, and accountability across enterprise portfolios.",
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
    title: "Change & Transformation Support",
    description:
      "From digital onboarding to operating model redesign, we orchestrate change initiatives that stick—on time and on strategy.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 5,
    title: "Regulatory & Risk Program Management",
    description:
      "We manage large-scale compliance and regulatory projects including AML, ESG, Basel, and IFRS programs with full traceability and transparency",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 6,
    title: "Leading Business Transformation Agendas",
    description:
      "We drive enterprise-wide change across people, processes, and platforms—linking strategy to execution with a focus on value realization",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 7,
    title: "Driving Digital Transformation ",
    description:
      "From AI-driven fintech solutions to open banking innovations, we ensure seamless execution of cutting-edge projects.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 8,
    title: "Managing High-Impact Strategic Initiatives",
    description:
      "Whether it’s launching new ventures, entering new markets, or integrating post-M&A platforms, we bring structured delivery to big ambitions.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 9,
    title: "Enhancing Regulatory & Compliance Efficiency",
    description:
      "Streamlining workflows for AML, risk management, and fraud prevention while ensuring governance excellence.",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 10,
    title: "Accelerating Innovation in Fintech & Insurtech ",
    description:
      "Managing complex deployments of AI-driven claims processing, embedded finance, and neobanking solutions",
    imageUrl: "/bimg.jpeg",
  },
  {
    id: 11,
    title: "PMO-as-a-Service",
    description:
      "For scalable delivery support across portfolios, programs, and change initiatives. Risk-aware Governance aligned with compliance, audit, and performance expectations",
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
