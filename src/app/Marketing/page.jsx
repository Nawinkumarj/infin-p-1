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
    section: "brand-strategy",
    title: "Brand Strategy & Positioning",
    description:
      "Build a brand that truly connects with your audience and stands out in today's competitive market.",
    imageUrl: "/ms-1.jpg",
    detailedDescription: [
      "Develop a unique brand identity that tells your story authentically",
      "Understand your market through comprehensive research and competitor insights",
      "Define your ideal customer personas with precision targeting",
      "Craft messaging that resonates emotionally with your audience",
      "Create a distinctive positioning strategy that highlights your unique value",
      "We partner with you to build a brand that doesn't just look good—it drives real business results. Our strategic approach ensures every element of your brand works together to create meaningful connections with customers while setting you apart from the competition.",
    ],
  },
  {
    id: 2,
    section: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Connect with your customers where they spend their time—online. Drive measurable results through smart, data-driven campaigns.",
    imageUrl: "/ms-2.jpg",
    detailedDescription: [
      "Boost your search rankings with proven SEO strategies that deliver organic traffic",
      "Launch targeted PPC (Pay-Per-Clicks) campaigns on Google Ads and social media platforms",
      "Maximize ROI with conversion-focused landing pages and user experiences",
      "Implement marketing automation to nurture leads at every stage",
      "Leverage retargeting to re-engage interested prospects",
      "Our digital marketing expertise combines the best of organic growth and paid advertising to help you reach the right people at the right time. We focus on strategies that not only increase visibility but also convert clicks into customers, ensuring every dollar spent delivers maximum impact.",
    ],
  },
  {
    id: 3,
    section: "social-media",
    title: "Social Media Management",
    description:
      "Build an engaged community around your brand. Turn followers into loyal customers through authentic social connections.",
    imageUrl: "/ms-3.jpg",
    detailedDescription: [
      "Create platform-specific strategies for Instagram, Facebook, LinkedIn, and X.",
      "Plan and schedule content that keeps your audience engaged year-round",
      "Respond promptly and build relationships through active community management",
      "Partner with influencers who align with your brand values",
      "Monitor conversations and protect your brand reputation online",
      "Social media success isn't just about posting—it's about building real relationships. We help you create content that sparks conversations, encourages shares, and transforms casual followers into brand advocates who genuinely care about your business and recommend it to others.",
    ],
  },
  {
    id: 4,
    section: "content-creation",
    title: "Content Creation & Marketing",
    description:
      "Share stories that matter. Create content your audience actually wants to read, watch, and share.",
    imageUrl: "/ms-4.jpg",
    detailedDescription: [
      "Write compelling blog posts that answer your audience's burning questions",
      "Produce professional videos that capture attention and drive engagement",
      "Design eye-catching infographics that simplify complex information",
      "Develop in-depth guides, case studies, and whitepapers that establish authority",
      "Launch podcasts that build deeper connections with your audience",
      "Great content does more than fill space—it solves problems, answers questions, and builds trust. We create valuable resources that position you as the go-to expert in your field while guiding potential customers naturally through their decision-making journey.",
    ],
  },
  {
    id: 5,
    section: "email-marketing",
    title: "Email Marketing & Automation",
    description:
      "Stay top-of-mind with personalized emails that nurture relationships and drive sales on autopilot.",
    imageUrl: "/ms-5.jpg",
    detailedDescription: [
      "Segment your audience for hyper-targeted messaging that resonates",
      "Design beautiful, mobile-responsive newsletters that get opened",
      "Set up automated sequences that nurture leads while you sleep",
      "Test and optimize every element for maximum engagement",
      "Maintain healthy email lists with proven deliverability practices",
      "Email isn't dead—it's one of the highest-ROI marketing channels when done right. We help you build automated systems that deliver the perfect message at the perfect moment, nurturing leads into customers and customers into repeat buyers without constant manual effort.",
    ],
  },
  {
    id: 6,
    section: "creative-design",
    title: "Creative & Graphic Design",
    description:
      "Make a memorable first impression. Transform your ideas into stunning visuals that capture attention instantly.",
    imageUrl: "/ms-6.jpg",
    detailedDescription: [
      "Design distinctive logos and complete brand identities that stand out",
      "Create professional marketing materials that make you look credible",
      "Develop scroll-stopping social media graphics and templates",
      "Design packaging that jumps off the shelf and into shopping carts",
      "Build persuasive presentations and pitch decks that close deals",
      "In a world where attention spans are shrinking, visual design makes or breaks your first impression. Our creative team blends strategic thinking with artistic flair to create designs that don't just look beautiful—they communicate your message clearly and inspire action.",
    ],
  },
  {
    id: 7,
    section: "web-development",
    title: "Website Design & Development",
    description:
      "Your website is your 24/7 salesperson. Make it work harder for your business with strategic design and development.",
    imageUrl: "/ms-7.jpg",
    detailedDescription: [
      "Build custom websites designed specifically for your business goals",
      "Ensure flawless experiences on every device with responsive design",
      "Launch powerful e-commerce stores that make buying effortless",
      "Implement user-friendly content management systems you can actually use",
      "Provide ongoing support to keep your site fast, secure, and up-to-date",
      "Your website should do more than look pretty—it should convert visitors into customers. We create fast-loading, mobile-optimized websites that guide visitors naturally toward taking action, whether that's making a purchase, booking a call, or signing up for your service.",
    ],
  },
  {
    id: 8,
    section: "analytics-reporting",
    title: "Marketing Analytics & Reporting",
    description:
      "Stop guessing, start knowing. Make smarter marketing decisions backed by real data and actionable insights.",
    imageUrl: "/ms-8.jpg",
    detailedDescription: [
      "Set up comprehensive tracking with Google Analytics and custom dashboards",
      "Measure what matters with clear ROI reporting on every campaign",
      "Map the complete customer journey from first click to final purchase",
      "Benchmark your performance against competitors in your industry",
      "Receive monthly insights with clear recommendations for improvement",
      "Data without action is just noise. We transform complex analytics into clear insights you can actually use. Our reporting shows you exactly what's working, what's not, and where to focus your efforts to get the best return on your marketing investment.",
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
        <h1>Marketing Service</h1>
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
                  background:
                    "linear-gradient(135deg, #ceae95 0%, #f5e6d3 100%)",
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
              <Box
                component="ul"
                sx={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {selectedService.detailedDescription.map((item, index) => {
                  const isLastItem =
                    index === selectedService.detailedDescription.length - 1;

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
                          textAlign: "left",
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
