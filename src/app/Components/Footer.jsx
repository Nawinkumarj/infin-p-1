'use client'
import React from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { GoNorthStar } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div className="footer-container">
      <div className="footer-grid-section">
        <div className="footer-heading">
          <h2>infinitas</h2>
        </div>
        <div className="footer-grid-item-1">
          <div className="footer-item" style={{fontSize: '20px'}}>
            <Link href="/" className={pathname === "/" ? "active-link" : ""}>Home</Link>
            <Link href="/About" className={pathname === "/About" ? "active-link" : ""}>About</Link>
            <Link href="/Service" className={pathname === "/Service" ? "active-link" : ""}>Service</Link>
            <Link href="/Industries" className={pathname === "/Industries" ? "active-link" : ""}>Industries</Link>
            <Link href="/Team" className={pathname === "/Team" ? "active-link" : ""}>Team</Link>
            <Link href="/Career" className={pathname === "/Career" ? "active-link" : ""}>Careers</Link>
            <Link href="/Contact" className={pathname === "/Contact" ? "active-link" : ""}>Contact</Link>
          </div>
        </div>
        <div className="footer-grid-item-2">
          <Link href="mailto:/"><GoNorthStar size='20'/> info@infinitasadvisory.com</Link>
        </div>
        <div className="footer-grid-item-3">
          <Link href="tel:/"><GoNorthStar size='20'/> +91 9840159274</Link>
        </div>
        <div className="footer-grid-item-4">
          <div className="footer-item">
            <Link href="">Terms of Service<FaChevronRight /></Link>
            <Link href="">Privacy Policy<FaChevronRight /></Link>
            <Link href="">Cookie Policy<FaChevronRight /></Link>
          </div>
        </div>
        <div className="footer-grid-item-5">
          <div className="footer-item">
            <Link href="" style={{fontSize:'20px'}}>Follow us on social media</Link>
            <Link href="">Facebook</Link>
            <Link href="">Twitter</Link>
            <Link href="">LinkedIn</Link>
            <Link href="">Instagram</Link>
          </div>
        </div>
        <div style={{gridRow: '1 / span 4',gridColumnStart: '4', display:'flex',justifyContent: 'space-between',flexDirection: 'column' , textAlign: 'center', padding: '16px 0 0 0', fontSize: '18px', color: 'orange'}}>
          <div style={{textAlign: 'start', fontWeight: '800', fontSize: '3rem', color: 'grey'}}>
            Immersive Experience.
          </div> 
          <div style={{textAlign:'end', fontSize: '10px'}}>
            <span>
              © 2025 Infinitas Advisory. All rights reserved.
            </span> 
          </div>
        </div>
      </div>
    </div>
  );
}
