"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Model component - simplified and more stable
const Model = () => {
  const groupRef = useRef();
  const { scene } = useGLTF("/infinity.glb");

  useEffect(() => {
    if (scene && groupRef.current) {
      const clonedScene = scene.clone();
      
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);

      // Scale and center the model
      if (size.length() > 0) {
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scaleFactor = 4 / maxDimension;
        
        clonedScene.scale.setScalar(scaleFactor);
        
        const center = new THREE.Vector3();
        box.getCenter(center);
        clonedScene.position.copy(center.multiplyScalar(-scaleFactor));
      }

      // Clear and add the model
      groupRef.current.clear();
      groupRef.current.add(clonedScene);
    }
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return <group ref={groupRef} />;
};

const ModelViewer = () => {
  return (
    <div style={{ 
      width: "100%", 
      height: "100vh",
      position: "relative"
    }}>
      <Canvas
        style={{ 
          width: "100%", 
          height: "100vh"
        }}
        camera={{ 
          position: [0, 0, 12],
          fov: 60
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          premultipliedAlpha: false
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow={false}
        />

        <OrbitControls 
          enableZoom={true}
          enableRotate={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          dampingFactor={0.05}
          enableDamping={true}
        />

        <Model />
      </Canvas>
    </div>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#1a1a1a",
          color: "white",
          fontSize: "1.2rem"
        }}>
          Something went wrong with the 3D model.
        </div>
      );
    }

    return this.props.children;
  }
}

// Main stable component
export default function SuspenseModelViewer() {
  return (
    <ErrorBoundary>
      <div style={{ 
        width: "100%", 
        height: "700px",
      }}>
        <Suspense fallback={
          <div style={{ 
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#1a1a1a",
            color: "white",
            fontSize: "1.2rem"
          }}>
            Loading 3D Model...
          </div>
        }>
          <ModelViewer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

useGLTF.preload("/infinity.glb");