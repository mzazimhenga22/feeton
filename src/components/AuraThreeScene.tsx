"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  useGLTF, 
  Html, 
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { FlaskConical, Scan } from "lucide-react";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 w-48">
        <div className="text-[10px] text-primary font-bold uppercase tracking-[0.5em] animate-pulse">
          Syncing...
        </div>
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </Html>
  );
}

function ShoeModel({ isLabMode }: { isLabMode: boolean }) {
  const { scene } = useGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
  const group = useRef<THREE.Group>(null);
  
  React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;
    
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.wireframe = isLabMode;
          mesh.material.emissiveIntensity = isLabMode ? 0.5 : 0;
          if (isLabMode) mesh.material.emissive = new THREE.Color("#ff0000");
        }
      }
    });
  }, [isLabMode, scene]);

  useFrame((state) => {
    if (!group.current) return;
    const targetRotationY = state.mouse.x * 0.3;
    const targetRotationX = state.mouse.y * 0.1;
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY + (Math.PI / 4), 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={10} />
    </group>
  );
}

export const AuraThreeScene = () => {
  const [isLabMode, setIsLabMode] = useState(false);

  return (
    <div className="w-full h-full min-h-[500px] relative">
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-40">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-[1px] bg-primary" />
            <div className="text-[8px] font-mono tracking-widest uppercase">OS V2.6</div>
          </div>
        </div>
        
        <div className="flex justify-end items-end">
          <div className="flex flex-col gap-4 pointer-events-auto items-end mb-4">
             <Button 
                onClick={() => setIsLabMode(!isLabMode)}
                variant="outline" 
                size="sm" 
                className={`rounded-full border-primary/30 text-[10px] tracking-widest uppercase h-10 px-6 backdrop-blur-xl transition-all duration-300 ${isLabMode ? 'bg-primary text-white' : 'bg-black/40 hover:bg-black/60'}`}
             >
                {isLabMode ? <Scan className="w-3 h-3 mr-2" /> : <FlaskConical className="w-3 h-3 mr-2" />}
                {isLabMode ? "SCAN ACTIVE" : "LAB MODE"}
             </Button>
          </div>
        </div>
      </div>

      <Canvas 
        shadows 
        dpr={[1, 1.5]} // Capped for performance
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: false, alpha: true, stencil: false, depth: true }} // Disabled antialias for speed
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <ShoeModel isLabMode={isLabMode} />
          </Float>
          <spotLight position={[5, 10, 5]} angle={0.3} intensity={1} />
          <pointLight position={[2, -2, -2]} color="#ff0000" intensity={5} />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

if (typeof window !== 'undefined') {
  useGLTF.preload("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
}