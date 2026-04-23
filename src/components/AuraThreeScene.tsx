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
          mesh.material.envMapIntensity = 2.5;
          mesh.material.roughness = 0.1;
          mesh.material.metalness = 0.8;
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
          mesh.material.emissiveIntensity = isLabMode ? 1 : 0;
          if (isLabMode) mesh.material.emissive = new THREE.Color("#ff0000");
        }
      }
    });
  }, [isLabMode, scene]);

  useFrame((state) => {
    if (!group.current) return;
    const targetRotationY = state.mouse.x * 0.4;
    const targetRotationX = state.mouse.y * 0.2;
    
    const currentY = group.current.rotation.y;
    const currentX = group.current.rotation.x;
    const nextY = THREE.MathUtils.lerp(currentY, targetRotationY + (Math.PI / 4), 0.05);
    const nextX = THREE.MathUtils.lerp(currentX, targetRotationX, 0.05);
    
    group.current.rotation.y = nextY;
    group.current.rotation.x = nextX;
    
    // Only keep rendering if rotation is still converging
    if (Math.abs(nextY - currentY) > 0.0001 || Math.abs(nextX - currentX) > 0.0001) {
      state.invalidate();
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={11} />
    </group>
  );
}

const AuraThreeSceneInner = () => {
  const [isLabMode, setIsLabMode] = useState(false);

  return (
    <div className="w-full h-full min-h-[500px] relative bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-60">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="w-8 h-[1px] bg-primary" />
            <div className="text-[8px] font-mono tracking-widest uppercase text-primary">SCAN_CORE V3.0</div>
          </div>
        </div>
        
        <div className="flex justify-end items-end">
          <div className="flex flex-col gap-4 pointer-events-auto items-end mb-4">
             <Button 
                onClick={() => setIsLabMode(!isLabMode)}
                variant="outline" 
                size="sm" 
                className={`rounded-full border-primary/30 text-[10px] tracking-widest uppercase h-10 px-6 backdrop-blur-xl transition-all duration-500 shadow-2xl ${isLabMode ? 'bg-primary text-white border-white/50' : 'bg-black/40 hover:bg-black/60 hover:border-primary'}`}
             >
                {isLabMode ? <Scan className="w-3 h-3 mr-2 animate-pulse" /> : <FlaskConical className="w-3 h-3 mr-2" />}
                {isLabMode ? "SCANNING BIOMETRICS" : "LAB OVERRIDE"}
             </Button>
          </div>
        </div>
      </div>

      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        frameloop="demand"
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="studio" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <ShoeModel isLabMode={isLabMode} />
          </Float>
          {/* Studio lighting that bleeds out into the page UI */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={10} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={15} blur={3} far={10} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export const AuraThreeScene = React.memo(AuraThreeSceneInner);

if (typeof window !== 'undefined') {
  useGLTF.preload("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
}
