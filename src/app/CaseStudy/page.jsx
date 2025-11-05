'use client';
import React, { useRef, useEffect, useState } from 'react'
import { IoIosGlobe, IoMdClose } from "react-icons/io";

const caseStudyList = [
  {
    "id": "1",
    "name": "Financial Service",
    "icon": "react-icon/startup",
    "title": "FS1",
    "des": "Digital onboarding and customer experience enhancements for banks.",
    "points": [
      "Digital onboarding and customer experience enhancements for banks",
      "Implementation of advanced risk management frameworks",
      "Fraud detection and prevention systems",
      "Data analytics-driven credit scoring models"
    ]
  },
  {
    "id": "2",
    "name": "Business Strategy",
    "icon": "react-icon/ecommerce",
    "title": "BS2",
    "des": "Market entry strategies for new geographies or segments",
    "points": [
      "Market entry strategies for new geographies or segments",
      "Competitive analysis and strategic positioning",
      "Business model innovation and value proposition design",
      "Mergers and acquisitions strategy development"
    ]
  },
  {
    "id": "3",
    "name": "Digital Transformation",
    "icon": "react-icon/branding",
    "title": "DT3",
    "des": "End-to-end digitalization of business processes",
    "points": [
      "End-to-end digitalization of business processes.",
      "Deployment of AI and automation to optimize operations.",
      "Digital customer engagement platforms.",
      "Technology roadmap development."
    ]
  },
  {
    "id": "4",
    "name": "Regulatory Compliance",
    "icon": "react-icon/saas",
    "title": "RC4",
    "des": "Development of compliance monitoring dashboards",
    "points": [
      "Development of compliance monitoring dashboards.",
      "Implementation of AML/KYC procedures.",
      "Regulatory gap analysis and remediation strategies.",
      "Data privacy and cybersecurity compliance frameworks."
    ]
  },
  {
    "id": "5",
    "name": "Operational Strategies",
    "icon": "react-icon/digital",
    "title": "OS5",
    "des": "Process optimization and cost reduction initiatives.",
    "points": [
      "Process optimization and cost reduction initiatives.",
      "Supply chain digitization and resilience planning.",
      "Service delivery excellence programs.",
      "Operational KPI dashboards."
    ]
  },
  {
    "id": "6",
    "name": "Risk & Governance",
    "icon": "react-icon/digital",
    "title": "RG6",
    "des": "Enterprise risk management framework design.",
    "points": [
      "Enterprise risk management framework design.",
      "Policy development and implementation.",
      "Business continuity planning.",
      "Governance structure optimization."
    ]
  },
  {
    "id": "7",
    "name": "Process Re-engineering",
    "icon": "react-icon/digital",
    "title": "PR7",
    "des": "Workflow automation projects.",
    "points": [
      "Workflow automation projects",
      "Lean and Six Sigma process improvements.",
      "Customer onboarding and claims processing redesign.",
      "Efficiency benchmarking."
    ]
  },
  {
    "id": "8",
    "name": "Programme Management",
    "icon": "react-icon/digital",
    "title": "PM8",
    "des": "Large-scale technology implementation oversight.",
    "points": [
      "Large-scale technology implementation oversight.",
      "Portfolio management for strategic initiatives.",
      "Change management and stakeholder engagement.",
      "Benefits realization tracking."
    ]
  },
  {
    "id": "9",
    "name": "GCCs (Global Capability Centers)",
    "icon": "react-icon/digital",
    "title": "GCC9",
    "des": "Setting up and optimizing GCCs for cost and talent advantages.",
    "points": [
      "Setting up and optimizing GCCs for cost and talent advantages.",
      "Governance and performance measurement of GCCs.",
      "Knowledge transfer and center of excellence development."
    ]
  },
  {
    "id": "10",
    "name": "COEs (Centers of Excellence)",
    "icon": "react-icon/digital",
    "title": "COE10",
    "des": "Establishing specialized units for analytics, cybersecurity, or compliance.",
    "points": [
      "Establishing specialized units for analytics, cybersecurity, or compliance.",
      "Best practices and knowledge sharing frameworks.",
      "Innovation and continuous improvement initiatives."
    ]
  },
  {
    "id": "11",
    "name": "Management Consulting",
    "icon": "react-icon/digital",
    "title": "MC11",
    "des": "Strategic transformation projects.",
    "points": [
      "Strategic transformation projects.",
      "Leadership and organizational development.",
      "Stakeholder management strategies.",
      "Digital maturity assessments."
    ]
  },
]

const Page = () => {
  const scrollRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const el = scrollRef.current;

    const onWheel = (e) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

      if (e.deltaY > 0 && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      } else if (e.deltaY < 0 && !atStart) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);
  const handleCardClick = (service) => {
    setSelectedService(service);
  }
  const closePopup = () => {
    setSelectedService(null);
  }
  return (
    <div className="cs-container">
      <div className="cs-top-section">
        <h1 className="cs-heading">Success Stories That Speak for Themselves</h1>
        <p className="cs-subtext">
          Explore how we've partnered with leading organizations across industries to drive measurable business transformation. From financial services innovation to global capability center optimization, our proven expertise turns complex challenges into strategic opportunities. Discover real-world solutions that deliver lasting impact.
        </p>
      </div>
      <div ref={scrollRef} className="cs-scroll-section">
        {caseStudyList.map((list, index) => (
          <div 
            key={index} 
            className="cs-card"
            onClick={() => handleCardClick(list)}
          >
            <div className="cs-card-header">
              <div className="cs-card-left">
                <p className="cs-card-name">{list.name}</p>
                <div className="cs-card-icon"><IoIosGlobe /></div>
              </div>
              <div className="cs-card-title">{list.title}</div>
            </div>
            <div className="cs-card-description">
              {list.des}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="cs-popup-overlay" onClick={closePopup}>
          <div className="cs-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="cs-popup-close" onClick={closePopup}>
              <IoMdClose />
            </button>
            <div className="cs-popup-header">
              <div className="cs-popup-icon">
                <IoIosGlobe />
              </div>
              <h2 className="cs-popup-title">{selectedService.name}</h2>
            </div>
            <div className="cs-popup-points">
              <h3>Key Highlights</h3>
              <ul>
                {selectedService.points?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page;
