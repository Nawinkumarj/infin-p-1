'use client'
import React from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FiPhone } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { TbMailFilled } from "react-icons/tb";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div className="footer-container">
      <div className="footer-grid-section">
        <div className="footer-heading">
          <h2>infinitas</h2>
        </div>
        <div className="footer-grid-item-1">
          <div className="footer-item">
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
          <Link href="mailto:/info@infinitasadvisory.com"><TbMailFilled size='23'/> info@infinitasadvisory.com</Link>
        </div>
        <div className="footer-grid-item-3">
          <Link href="tel:/"><FiPhone size='23'/> +91 9841059274</Link>
        </div>
        <div className="footer-grid-item-4">
          <div className="footer-item">
            <Link href="">Terms of Service<GoArrowUpRight /></Link>
            <Link href="">Privacy Policy<GoArrowUpRight /></Link>
          </div>
        </div>
        <div className="footer-grid-item-5">
          <div className="footer-item">
            <Link href="" style={{fontSize:'20px'}}>Follow us on social media</Link>
            <Link href=""><FaFacebook size='20'/>Facebook</Link>
            <Link href=""> <FaXTwitter size='20'/>
            Twitter</Link>
            <Link href=""> <FaLinkedin size='20'/>
            LinkedIn</Link>
            <Link href=""> <FaInstagram size='20'/>
            Instagram</Link>
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
