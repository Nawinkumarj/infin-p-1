"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
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
export const dynamic = "force-dynamic";

const ServiceList = [
  {
    id: 1,
    section: "leading-business-transformation",
    title: "Leading Business Transformation Agendas",
    description:
      "Transform your entire organization with strategic change that sticks. We connect vision to execution.",
    imageUrl: "/pms-1.jpg",
    detailedDescription: [
      "Lead enterprise-wide transformation initiatives across people, processes, and technology",
      "Align strategic vision with practical execution roadmaps",
      "Establish clear governance frameworks and accountability structures",
      "Track and measure transformation value at every milestone",
      "Manage stakeholder engagement and organizational change resistance",
      "We partner with leadership teams to orchestrate complex transformations that deliver lasting business impact. Our proven methodology ensures your transformation agenda moves from boardroom strategy to real operational results, with every stakeholder aligned and every milestone tracked.",
    ],
  },
  {
    id: 2,
    section: "driving-digital-transformation",
    title: "Driving Digital Transformation",
    description:
      "Navigate digital change with confidence. From AI adoption to cloud migration, we make complex technology transformations simple.",
    imageUrl: "/pms-2.jpg",
    detailedDescription: [
      "Implement AI and machine learning solutions that solve real business problems",
      "Execute cloud migration strategies with zero downtime",
      "Deploy modern fintech platforms including open banking and digital wallets",
      "Integrate emerging technologies into existing business operations",
      "Build digital-first customer experiences that drive engagement",
      "Digital transformation isn't just about technology—it's about reimagining how your business operates. We guide you through every step of your digital journey, from selecting the right technologies to training your teams, ensuring smooth adoption and measurable business outcomes.",
    ],
  },
  {
    id: 3,
    section: "managing-strategic-initiatives",
    title: "Managing High-Impact Strategic Initiatives",
    description:
      "Turn bold strategic goals into reality. We deliver complex programs that others find impossible.",
    imageUrl: "/pms-3.jpg",
    detailedDescription: [
      "Launch new business ventures with structured go-to-market execution",
      "Manage market expansion programs across multiple geographies",
      "Integrate acquisitions and mergers seamlessly into existing operations",
      "Execute product launches with cross-functional coordination",
      "Deliver large-scale organizational restructuring initiatives",
      "Strategic initiatives succeed or fail based on execution excellence. We bring battle-tested program management expertise to your most critical business priorities, ensuring they're delivered on time, on budget, and with the business impact your leadership expects.",
    ],
  },
  {
    id: 4,
    section: "regulatory-risk-program",
    title: "Regulatory & Risk Program Management",
    description:
      "Navigate complex compliance requirements with ease. Stay ahead of regulations while maintaining business agility.",
    imageUrl: "/pms-4.jpg",
    detailedDescription: [
      "Manage AML (Anti-Money Laundering) compliance programs end-to-end",
      "Implement ESG (Environmental, Social, Governance) reporting frameworks",
      "Execute Basel III/IV regulatory compliance initiatives for financial institutions",
      "Deploy IFRS 9 and IFRS 17 implementation programs",
      "Establish risk management frameworks aligned with regulatory requirements",
      "Regulatory compliance doesn't have to slow your business down. We manage large-scale compliance programs that meet regulatory requirements while preserving operational efficiency. Our approach provides full audit traceability and keeps regulators satisfied without overwhelming your teams.",
    ],
  },
  {
    id: 5,
    section: "regulatory-compliance",
    title: "Enhancing Regulatory & Compliance Efficiency",
    description:
      "Work smarter, not harder on compliance. Automate and streamline your regulatory workflows.",
    imageUrl: "/pms-5.jpg",
    detailedDescription: [
      "Streamline AML and KYC (Know Your Customer) processes with automation",
      "Implement risk monitoring systems with real-time alerting",
      "Deploy fraud detection and prevention platforms",
      "Build compliance dashboards with actionable insights",
      "Establish governance frameworks that scale with your business",
      "Modern compliance operations should be efficient, not overwhelming. We help you leverage automation and smart workflows to reduce manual effort, improve accuracy, and free up your compliance team to focus on high-value strategic work instead of repetitive tasks.",
    ],
  },
  {
    id: 6,
    section: "program-project-delivery",
    title: "Program & Project Delivery",
    description:
      "Execute what matters most. Professional program delivery from planning to benefit realization.",
    imageUrl: "/pms-6.jpg",
    detailedDescription: [
      "Develop comprehensive program plans with realistic timelines and budgets",
      "Mobilize cross-functional teams with clear roles and responsibilities",
      "Execute complex programs using proven delivery methodologies (Agile, Waterfall, Hybrid)",
      "Manage program risks, issues, and dependencies proactively",
      "Track and report benefit realization throughout the program lifecycle",
      "Great ideas fail without great execution. We lead the full lifecycle of your strategic programs with discipline, transparency, and a relentless focus on delivering the business benefits you expect. Our program managers become extensions of your team, committed to your success.",
    ],
  },
  {
    id: 7,
    section: "pmo-setup",
    title: "PMO Setup & Governance",
    description:
      "Build a Project Management Office that actually adds value. Get visibility, consistency, and control.",
    imageUrl: "/pms-7.jpg",
    detailedDescription: [
      "Design PMO operating models tailored to your organizational culture",
      "Establish project governance frameworks and decision-making protocols",
      "Implement portfolio management tools and processes",
      "Create standardized templates, playbooks, and delivery methodologies",
      "Train internal teams on PMO processes and best practices",
      "A well-designed PMO brings order to chaos without adding bureaucracy. We help you build or optimize your Project Management Office to provide the right level of oversight, standardization, and support that drives better project outcomes across your entire portfolio.",
    ],
  },
  {
    id: 8,
    section: "pmo-as-service",
    title: "PMO-as-a-Service",
    description:
      "Get enterprise-grade program management without the overhead. Scale your delivery capacity instantly.",
    imageUrl: "/pms-8.jpg",
    detailedDescription: [
      "Access experienced PMO resources on-demand without permanent hiring",
      "Scale program management capability up or down based on portfolio needs",
      "Implement risk-aware governance aligned with audit and compliance requirements",
      "Provide executive reporting and portfolio visibility",
      "Bring best-practice methodologies and tools from day one",
      "Why build a full-time PMO when you can access one on-demand? Our PMO-as-a-Service gives you instant access to experienced program management professionals who integrate seamlessly with your teams, bring proven processes, and flex based on your changing portfolio needs.",
    ],
  },
  {
    id: 9,
    section: "change-transformation",
    title: "Change & Transformation Support",
    description:
      "Make change stick. We help your people embrace transformation, not resist it.",
    imageUrl: "/pms-9.jpg",
    detailedDescription: [
      "Develop change management strategies aligned with transformation objectives",
      "Conduct stakeholder analysis and create targeted engagement plans",
      "Design and deliver training programs that build new capabilities",
      "Manage communication campaigns that maintain momentum and excitement",
      "Measure adoption and address resistance through the transition",
      "Technology is easy—changing how people work is hard. We bring structured change management to your transformation initiatives, ensuring your people are engaged, trained, and ready to adopt new ways of working. Because transformation only succeeds when people embrace it.",
    ],
  },
  {
    id: 10,
    section: "fintech-insurtech",
    title: "Accelerating Innovation in Fintech & Insurtech",
    description:
      "Move fast without breaking things. Launch fintech and insurtech innovations that customers love.",
    imageUrl: "/pms-10.jpg",
    detailedDescription: [
      "Deploy AI-powered claims processing and underwriting systems",
      "Launch embedded finance and Banking-as-a-Service platforms",
      "Implement neobanking solutions with modern UX/UI",
      "Integrate payment processing and digital wallet capabilities",
      "Execute open API and marketplace platform initiatives",
      "Financial services innovation moves at lightning speed. We help fintech and insurtech companies bring new products to market faster, managing complex technical deployments while navigating regulatory requirements. Our expertise ensures you can innovate quickly without compromising on compliance or security.",
    ],
  },
  {
    id: 11,
    section: "technology-solution",
    title: "Technology Solutions",
    description:
      "Build technology that works for your business. Custom solutions designed for your unique challenges.",
    imageUrl: "/pms-11.jpg",
    detailedDescription: [
      "Develop custom software applications tailored to your business processes",
      "Implement cloud infrastructure for scalability and cost efficiency",
      "Deploy cybersecurity solutions that protect without hindering operations",
      "Integrate systems and data across your technology landscape",
      "Provide ongoing support and evolution of technology solutions",
      "Off-the-shelf software rarely fits perfectly. We design and build custom technology solutions that address your specific business challenges, leveraging the latest cloud platforms, security practices, and development methodologies to deliver systems that scale with your growth.",
    ],
  },
];

const Page = () => {
  const refs = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchParams = useSearchParams();
  const hasScrolled = useRef(false);

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
    const section = searchParams.get("section");

    if (section && !hasScrolled.current) {
      const targetIndex = ServiceList.findIndex(
        (service) => service.section === section
      );

      if (targetIndex !== -1) {
        setTimeout(() => {
          setActiveIndex(targetIndex);
          handleClick(targetIndex);
          hasScrolled.current = true;
        }, 500);
      }
    }
  }, [searchParams]);

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
        <h1>Project Management</h1>
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
              <img
                src={service.imageUrl}
                alt={service.title}
                className="service-img"
              />
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
            maxHeight: "70vh",
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