"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < 50) {
        setVisible(true); // always show at top
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
      <div className={`navbar-section ${visible ? "navbar-visible" : "navbar-hidden"}`}>
        <div className="navbar-logo">
          <img src="/Infinitas.png" alt="Logo" />
        </div>

        <div className="navbar-item">
          <Link href="/CaseStudy">casestudy</Link>
        </div>

        <div className="navbar-list">
          <Link href="/">Home</Link>
          <Link href="/About">About</Link>
          <Link href="/Service">service</Link>
          <Link href="/Industries">industries</Link>
          <Link href="/Team">team</Link>
          <Link href="/Career">careers</Link>
        </div>

        <div className="navbar-contact">
          <Link href="/Contact">contact</Link>
        </div>
      </div>
    </div>
  );
}
