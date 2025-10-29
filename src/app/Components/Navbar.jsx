"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
const serviceDropdowns = [
  {
    id: 1,
    title: "Project Management",
    titleHref: "/Service?section=project-management",
    items: [
      { name: "Leading Business Transformation", href: "/Service?section=leading-business-transformation" },
      { name: "Driving Digital Transformation", href: "/Service?section=driving-digital-transformation" },
      { name: "Regulatory & Risk Program", href: "/Service?section=regulatory-risk-program" },
    ],
  },
  {
    id: 2,
    title: "Event Management",
    titleHref: "/EventManagement",
    items: [
      { name: "Corporate Events", href: "/EventManagement?section=corporate-events" },
      { name: "Personal Events", href: "/EventManagement?section=personal-events" },
      { name: "Event Production & Logistics", href: "/EventManagement?section=event-production" },
    ],
  },
  {
    id: 3,
    title: "Marketing",
    titleHref: "/Marketing",
    items: [
      { name: "Brand Strategy & Positioning", href: "/Marketing?section=brand-strategy" },
      { name: "Digital Marketing", href: "/Marketing?section=digital-marketing" },
      { name: "Social Media Management", href: "/Marketing?section=social-media" },
    ],
  },
];


  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < 50) {
        setVisible(true);
      } else {
        setVisible(prevScrollPos > currentScrollPos);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="navbar-container">
      <div
        className={`navbar-section ${
          visible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <div className="navbar-logo">
          <img src="/Infinitas.png" alt="Logo" />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar-item">
          <Link href="/CaseStudy">casestudy</Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`navbar-list ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/About" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>

          {/* Service with Hover Dropdown */}
          <div
            className="dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown("service")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/">Service</Link>

            <div
              className={`dropdown-menu ${
                activeDropdown === "service" ? "active" : ""
              }`}
            >
              {serviceDropdowns.map((dropdown) => (
                <div key={dropdown.id} className="dropdown-column">
                  <Link
                    href={dropdown.titleHref}
                    onClick={() => {
                      setActiveDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <h4 className="dropdown-heading">{dropdown.title}</h4>
                  </Link>
                  {dropdown.items.map((item, index) => (
                    <Link
                      key={`${item.href}-${index}`}
                      href={item.href}
                      className="dropdown-item"
                      onClick={() => {
                        setActiveDropdown(null);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href={dropdown.titleHref}
                    className="dropdown-see-more"
                    onClick={() => {
                      setActiveDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    + See More
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link href="/Industries" onClick={() => setMobileMenuOpen(false)}>
            Industries
          </Link>
          <Link href="/Team" onClick={() => setMobileMenuOpen(false)}>
            Team
          </Link>
          <Link href="/Career" onClick={() => setMobileMenuOpen(false)}>
            Careers
          </Link>
        </div>

        <div className="navbar-contact">
          <Link href="/Contact">contact</Link>
        </div>
      </div>
    </div>
  );
}