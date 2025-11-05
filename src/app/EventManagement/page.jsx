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
  Box,
  Divider,
} from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ServiceList = [
  {
    id: 1,
    section: "corporate-events",
    title: "Corporate Events",
    description: "Our corporate offerings cover:",
    imageUrl: "/ems-1.jpg",
    detailedDescription: [
      "Conferences, Seminars, and Workshops",
      "Product Launches and Brand Activations",
      "Awards Ceremonies and Gala Dinners",
      "Board Meetings and Executive Retreats",
      "Team-Building Activities and Offsites",
      "Your brand is amplified through cutting-edge event technology, creative design, and seamless attendee experience.​",
    ],
  },
  {
    id: 2,
    section: "social-events",
    title: "Social Events",
    description:
      "Celebrate life's milestones with events tailored to your unique story. We manage:",
    imageUrl: "/ems-2.jpg",
    detailedDescription: [
      "Weddings and Engagements",
      "Birthday Parties and Anniversaries",
      "Cultural and Religious Celebrations",
      "Private Dinners and Social Gatherings",
      "From concept to completion, we handle every detail—so you focus on making memories.​",
    ],
  },
  {
    id: 3,
    section: "event-production",
    title: "Event Production & Logistics",
    description:
      "Ensure every event runs smoothly with our comprehensive production and logistics expertise:",
    imageUrl: "/ems-3.jpg",
    detailedDescription: [
      "Venue & equipment coordination, setup, and breakdown",
      "Transport and warehousing of event assets",
      "AV, lighting, and stage design",
      "Onsite workflow, safety, and staff management",
      "Vendor coordination",
      "With robust planning and execution, your event is supported by efficient, secure, and flexible logistics—all tailored for seamless operations and guest satisfaction.",
    ],
  },
  {
    id: 4,
    section: "virtual-hybrid-events",
    title: "Virtual & Hybrid Events",
    description:
      "Reach attendees anywhere and combine live and digital engagement through smart, scalable solutions:",
    imageUrl: "/ems-4.jpg",
    detailedDescription: [
      "Virtual conferences, expos, and webinars",
      "Hybrid events blending in-person and online participation",
      "Powerful streaming technology, live interaction, and on-demand sessions",
      "AI-driven networking, real-time analytics, and branded digital environments",
      "Mobile-friendly platforms for attendee flexibility",
      "Seamless integration of content, engagement, and sponsor features",
      "Deliver impactful, engaging experiences for both in-person and remote audiences, maximizing your event reach and ROI.",
    ],
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
    { scope: scrollRef }
  );

  return (
    <div className="service-container">
      {/* Left Side */}
      <div className="title-service">
        <h1>Event Management</h1>
        {ServiceList.map((service, index) => (
          <div className="service-title-box" key={service.id}>
            <div
              className={`service-title ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <h3 style={{ margin: 0, padding: 0 }}>{service.title}</h3>
            </div>
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
            <h3 className="service-heading">{service.title}</h3>
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

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            maxHeight: "90vh",
            overflow: "hidden",
          },
        }}
      >
        {selectedService && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                pr: 6,
                pb: 2,
                pt: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  flex: 1,
                  fontWeight: "700",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" },
                  background: "linear-gradient(135deg, #ceae95 0%, #f5e6d3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {selectedService.title}
              </Typography>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                  backgroundColor: "rgba(207, 165, 133, 0.1)",
                  "&:hover": {
                    transform: "scale(1.1) rotate(90deg)",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(207, 165, 133, 0.2)",
                  },
                }}
              >
                <IoIosCloseCircleOutline size={36} color="#cfa585ff" />
              </IconButton>
            </DialogTitle>

            <Divider
              sx={{
                backgroundColor: "rgba(206, 174, 149, 0.3)",
                mb: 3,
                height: "2px",
              }}
            />

            <DialogContent
              sx={{
                pt: 0,
                pb: 3,
                maxHeight: "calc(90vh - 150px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(206, 174, 149, 0.5)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "rgba(206, 174, 149, 0.7)",
                  },
                },
              }}
            >
              <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
                {selectedService.detailedDescription.map((item, index) => {
                  const isLastItem = index === selectedService.detailedDescription.length - 1;
                  
                  return (
                    <Box
                      component="li"
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: isLastItem ? "flex-start" : "center",
                        gap: "1rem",
                        mb: 2.5,
                        pb: 2.5,
                        borderBottom: !isLastItem
                          ? "1px solid rgba(206, 174, 149, 0.15)"
                          : "none",
                        animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                        "@keyframes fadeInUp": {
                          from: {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          to: {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                      }}
                    >
                      {!isLastItem && (
                        <FaCheckCircle
                          size={20}
                          style={{
                            color: "#ceae95",
                            minWidth: "20px",
                            marginTop: "2px",
                          }}
                        />
                      )}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isLastItem ? "1.05rem" : "1.1rem",
                          lineHeight: 1.7,
                          color: isLastItem
                            ? "rgba(206, 174, 149, 0.9)"
                            : "#e0e0e0",
                          fontWeight: isLastItem ? "500" : "400",
                          fontStyle: isLastItem ? "italic" : "normal",
                          textAlign: isLastItem ? "left" : "left",
                          flex: 1,
                          letterSpacing: "0.3px",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Page;
