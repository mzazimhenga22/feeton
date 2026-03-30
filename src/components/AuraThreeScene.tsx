"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  useGLTF, 
  Html, 
  useProgress 
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white font-headline font-bold uppercase tracking-widest text-sm flex flex-col items-center gap-2">
        <div className="w-16 h-[2px] bg-white/20 overflow-hidden rounded-full">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function ShoeModel() {
  const { scene } = useGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
  
  // Center and scale
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.x = -center.x;
  scene.position.y = -center.y;
  scene.position.z = -center.z;

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5} 
      floatingRange={[-0.1, 0.1]}
    >
      <primitive object={scene} scale={10} rotation={[0, Math.PI / 4, 0]} />
    </Float>
  );
}

export const AuraThreeScene = () => {
  return (
    <div className="w-full h-full min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Red Rim Light */}
        <pointLight position={[2, -2, -2]} color="#ff0000" intensity={10} distance={10} />
        {/* Blue/White Fill Light */}
        <pointLight position={[-2, 2, 2]} color="#ffffff" intensity={5} distance={10} />

        <Suspense fallback={<Loader />}>
          <ShoeModel />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

// Preload the model
if (typeof window !== 'undefined') {
  useGLTF.preload("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
}
