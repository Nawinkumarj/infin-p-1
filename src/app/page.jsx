"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollcard from "./Components/Scrollcard";
import ModelViewer from "./Components/ModalViewer";
import Cta from "./Components/Cta";
import CircularGallery from "./Components/Testimonials";
import About from "./Components/About";
import Help from "./Components/help";

export default function HomeSection() {
  return (
    <>
      {/* Banner Section */}
      <ModelViewer />
      <About />
      <Scrollcard />
      <Help />

      {/* Testimonials Section */}
      <div
        style={{
          height: "90vh",
          position: "relative",
          backgroundColor: "var(--foreground)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "400",
            textTransform: "uppercase",
            position: "absolute",
            top: "50px",
            width: "100%",
          }}
          className="heading"
        >
          Testimonials
        </h1>
        <CircularGallery
          bend={1.5}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.11}
        />
      </div>
      {/* CTA Section */}
      <Cta />
    </>
  );
}
