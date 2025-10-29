"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Service dropdown items
  const serviceDropdowns = [
    {
      id: 1,
      title: "Project Management",
      items: [
        { name: "Leading Business Transformation", href: "/Service" },
        { name: "Driving Digital Transformation", href: "/Service" },
        { name: "Regulatory & Risk Program", href: "/Service" },
      ],
    },
    {
      id: 2,
      title: "Event Management",
      items: [
        { name: "Corporate Events", href: "/EventManagement" },
        { name: "Personal Events", href: "/EventManagement" },
        { name: "Event Production & Logistics", href: "/EventManagement" },
      ],
    },
    {
      id: 3,
      title: "Marketing",
      items: [
        { name: "Brand Strategy & Positioning", href: "/Marketing" },
        { name: "Digital Marketing", href: "/Marketing" },
        { name: "Social Media Management", href: "/Marketing" },
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
            <Link href="/Service">Service</Link>
            
            <div className={`dropdown-menu ${activeDropdown === "service" ? "active" : ""}`}>
              {serviceDropdowns.map((dropdown) => (
                <div key={dropdown.id} className="dropdown-column">
                  <h4 className="dropdown-heading">{dropdown.title}</h4>
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveDropdown(null);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
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
