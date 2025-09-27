"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollcard from "./Components/Scrollcard";
import ModelViewer from "./Components/ModalViewer";

export default function HomeSection() {
  return (
    <>
      {/* Banner Section */}
        <ModelViewer />
        <Scrollcard />
    </>
  );
}
