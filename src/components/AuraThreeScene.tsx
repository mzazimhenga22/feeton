"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  useGLTF, 
  Html, 
  useProgress,
  PerspectiveCamera,
  Stage
} from "@react-three/drei";
import * as THREE from "three";

/**
 * High-tech loading interface that matches the Feeton Kicks aesthetic.
 */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 w-64">
        <div className="text-[10px] text-primary font-bold uppercase tracking-[0.5em] animate-pulse">
          Initializing DNA...
        </div>
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out glow-red shadow-[0_0_10px_rgba(255,0,0,0.8)]" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="text-[10px] text-foreground/40 font-mono">
          {progress.toFixed(0)}% SYNCED
        </div>
      </div>
    </Html>
  );
}

/**
 * The core Shoe model with interactive parallax and optimized materials.
 */
function ShoeModel() {
  const { scene } = useGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
  const group = useRef<THREE.Group>(null);
  
  // Center the model once loaded
  React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;
    
    // Enhance materials for a more premium look
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.envMapIntensity = 2;
          mesh.material.roughness = Math.max(mesh.material.roughness, 0.2);
        }
      }
    });
  }, [scene]);

  // Mouse tracking parallax
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    
    // Subtle auto-float
    group.current.position.y = Math.sin(t / 2) / 10;
    
    // Mouse follow rotation (smoothly lerped)
    const targetRotationX = state.mouse.y * 0.2;
    const targetRotationY = state.mouse.x * 0.4;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY + (Math.PI / 4), 0.1);
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={10} />
    </group>
  );
}

/**
 * Lighting rig designed to emphasize the silhouette and technical details.
 */
function Lights() {
  return (
    <>
      {/* Main Key Light */}
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
      
      {/* Brand Rim Lights (Red) */}
      <pointLight position={[2, -2, -2]} color="#ff0000" intensity={15} distance={15} />
      <pointLight position={[-3, 0, -3]} color="#ff0000" intensity={10} distance={10} />
      
      {/* Cold Fill Light */}
      <pointLight position={[-5, 5, 5]} color="#00ffff" intensity={2} distance={20} />
      
      {/* Under-glow for the "pedestal" feel */}
      <pointLight position={[0, -2, 0]} color="#ffffff" intensity={5} distance={5} />
    </>
  );
}

export const AuraThreeScene = () => {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      {/* Technical HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-40">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-[1px] bg-primary" />
            <div className="text-[8px] font-mono tracking-widest">FEETON-OS V2.6</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-mono tracking-widest text-primary">KINETIC ANALYSIS: ACTIVE</div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-24 h-24 border-l border-b border-white/10" />
          <div className="w-24 h-24 border-r border-b border-white/10" />
        </div>
      </div>

      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ShoeModel />
          </Float>

          <Lights />

          <ContactShadows 
            position={[0, -1.2, 0]} 
            opacity={0.6} 
            scale={12} 
            blur={2.5} 
            far={4} 
            color="#000000"
          />

          {/* Floor Reflection Mock-up */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial 
              color="#050505" 
              transparent 
              opacity={0.8} 
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

// Preload for performance
if (typeof window !== 'undefined') {
  useGLTF.preload("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
}
