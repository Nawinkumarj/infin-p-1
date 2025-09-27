"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const caseStudyData = [
  {
    id: "1",
    title: "Startup Growth",
    content: "Discover how we helped a startup triple its online traffic through a complete website redesign."
  },
  {
    id: "2",
    title: "Ecommerce Boost",
    content: "A case study on the optimization of an e-commerce site that increased sales by 40% in just 3 months."
  },
  {
    id: "3",
    title: "B2B Branding",
    content: "How we supported a B2B company in building a strong and credible digital identity."
  },
  {
    id: "4",
    title: "SaaS UX",
    content: "Implementation of a UX/UI strategy that improved the conversion rate of a SaaS platform by 25%."
  },
  {
    id: "5",
    title: "Digital Transformation",
    content: "A successful digital transformation for an SME that automated its processes and gained efficiency."
  }
];

const Page = () => {
  const { id } = useParams();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
      }}
    >
      {/* Background with blur */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(8px) brightness(0.8)", // 👈 blur effect
          zIndex: -1, // behind content
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "2rem",
        }}
      >
        {caseStudyData.map((item, index) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ceae95",
              borderRadius: "10px",
              padding: "2rem",
              backgroundColor: "rgba(34,34,34,0.8)", // semi-transparent over blur
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: '#ceae95',
              gap: "30px",
              width: "100%",
              height: "80vh",
              margin: "4em 0",
              transform: `translateY(${(offset * 0.2 * (index + 1)) % 100}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <h2 style={{ fontSize: "36px" }}>{item.title}</h2>
            <p style={{ fontSize: "16px", color: "#ccc", fontWeight: "normal" }}>
              {item.content}
            </p>
            <img
              src="https://via.placeholder.com/300x400"
              alt="CS Logo"
              style={{ height: "400px", width: "300px", borderRadius: "10px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
