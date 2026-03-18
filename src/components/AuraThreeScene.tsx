"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const AuraThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xff9900, 10, 10);
    accentLight.position.set(-2, 2, 2);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0xcc1717, 8, 10);
    rimLight.position.set(2, -2, -2);
    scene.add(rimLight);

    camera.position.set(0, 0, 4);

    let shoe: THREE.Group | null = null;

    // Load Shoe Model
    const loader = new GLTFLoader();
    // Using a reliable public URL for a high-quality shoe model
    const shoeUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

    loader.load(
      shoeUrl,
      (gltf) => {
        shoe = gltf.scene;
        shoe.scale.set(10, 10, 10); // Scale up for visibility
        shoe.rotation.y = Math.PI / 4;
        
        // Center the shoe
        const box = new THREE.Box3().setFromObject(shoe);
        const center = box.getCenter(new THREE.Vector3());
        shoe.position.sub(center);
        
        scene.add(shoe);
      },
      undefined,
      (error) => {
        console.error("Error loading 3D shoe:", error);
      }
    );

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (shoe) {
        // Continuous rotation
        shoe.rotation.y += 0.005;
        
        // Interaction
        shoe.rotation.y += mouseX * 0.01;
        shoe.rotation.x += mouseY * 0.01;

        // Floating effect
        shoe.position.y = Math.sin(Date.now() * 0.002) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[500px]" />;
};
