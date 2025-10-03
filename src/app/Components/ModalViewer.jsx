"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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
      groupRef.current.rotation.y += 0.008; //  rotation
    }
  });

  return <group ref={groupRef} />;
};

const ModelViewer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
        }}
        camera={{
          position: [0, 0, 12],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[8, 8, 8]}
          intensity={1.2}
          castShadow={false}
        />
        <pointLight position={[-8, -8, 8]} intensity={0.6} />
        <pointLight position={[0, 10, 0]} intensity={0.4} />

        {/*  OrbitControls */}
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />

        <Model />
      </Canvas>
    </div>
  );
};
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

// Main banner component
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

      {/* Left */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "4rem",
          maxWidth: "900px",
          color: "white",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            lineHeight: "1.2",
            background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 1px var(--background)",
          }}
        >
          Driving Business Success Through
        </h1>
      </div>

      {/* 3D Model */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "120vh",
          zIndex: 5,
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

      {/* Right */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          right: "4rem",
          maxWidth: "600px",
          color: "white",
          textAlign: "right",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Strategy, Innovation & Execution
        </h2>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "white",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Connect with us:
          </h3>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              flexWrap: "wrap",
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
                backdropFilter: "blur(10px)",
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
                backdropFilter: "blur(10px)",
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
                backdropFilter: "blur(10px)",
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
                backdropFilter: "blur(10px)",
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
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          opacity: 0.8,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "2px",
            height: "30px",
            background: "white",
            margin: "0 auto 10px auto",
            animation: "bounce 2s infinite",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        />
        <p
          style={{
            fontSize: "0.9rem",
            margin: 0,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Scroll Down
        </p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}

// Preload the model
useGLTF.preload("/infinity.glb");
