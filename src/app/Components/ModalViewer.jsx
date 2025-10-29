"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// 3D Model logic
const Model = () => {
  const groupRef = useRef();
  const { scene } = useGLTF("/infinity.glb");

  useEffect(() => {
    if (scene && groupRef.current) {
      const clonedScene = scene.clone();
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);

      if (size.length() > 0) {
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scaleFactor = 6 / maxDimension;
        clonedScene.scale.setScalar(scaleFactor);

        const center = new THREE.Vector3();
        box.getCenter(center);
        clonedScene.position.copy(center.multiplyScalar(-scaleFactor));
      }

      groupRef.current.clear();
      groupRef.current.add(clonedScene);
    }
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
    }
  });

  return <group ref={groupRef} />;
};

const ModelViewer = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
    }}
  >
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 8, 8]} intensity={1.2} castShadow={false} />
      <pointLight position={[-8, -8, 8]} intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.4} />
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      <Model />
    </Canvas>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("3D Model Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
            color: "white",
            fontSize: "4rem",
          }}
        >
          ∞
        </div>
      );
    }
    return this.props.children;
  }
}

export default function BannerSection() {
  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "50%",
          height: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          objectFit: "cover",
        }}
      >
        <source src="/infinitasbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* 3D Model */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "6rem",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                ∞
              </div>
            }
          >
            <ModelViewer />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Headline block */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          maxWidth: "900px",
          color: "white",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "2.3rem",
            fontWeight: 400,
            color: "white",
            marginBottom: "0.7rem",
            lineHeight: 1.1,
            // textShadow: "0 2px 1px var(--background)",
          }}
        >
          Driving Business Through
        </div>
        <div
          style={{
            fontSize: "4.2rem",
            fontWeight: 700,
            background: "linear-gradient(45deg, #ffffff, #ece3d0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            textShadow: "0 2px 6px var(--background)",
          }}
        >
          Strategy, Innovation & Execution
        </div>
      </div>

      {/* Socials */}
      <div
        style={{
          position: "fixed",
          bottom: "20%",
          right: "40px",
          transform: "translateX(50%)",
          maxWidth: "600px",
          color: "white",
          textAlign: "center",
          zIndex: 10,
          paddingTop: "1rem",
        }}
      >
        {/* <h3
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textTransform: "uppercase",
            color: "white",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Connect with us:
        </h3> */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <button
            style={{
              width: "60px",
              height: "60px",
              aspectRatio: 1,
              clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            f
          </button>
          <button
            style={{
              width: "60px",
              height: "60px",
              aspectRatio: 1,
              clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            X
          </button>
          <button
            style={{
              width: "60px",
              height: "60px",
              aspectRatio: 1,
              clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            in
          </button>
          <button
            style={{
              width: "60px",
              height: "60px",
              aspectRatio: 1,
              clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            📷
          </button>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/infinity.glb");
