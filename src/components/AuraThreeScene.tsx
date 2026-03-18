"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const AuraThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use parent dimensions if available, otherwise default
    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;
    console.log("AuraThreeScene: Initializing with dimensions:", width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
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

    const accentLight = new THREE.PointLight(0xffffff, 10, 10);
    accentLight.position.set(-2, 2, 2);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0xff0000, 8, 10);
    rimLight.position.set(2, -2, -2);
    scene.add(rimLight);

    camera.position.set(0, 0, 4);

    let shoe: THREE.Object3D | null = null;
    let fallbackCube: THREE.Mesh | null = null;

    // Add a temporary invisible cube to ensure something is in the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: true, transparent: true, opacity: 0 });
    fallbackCube = new THREE.Mesh(geometry, material);
    scene.add(fallbackCube);

    // Load Shoe Model
    const loader = new GLTFLoader();
    const shoeUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

    console.log("AuraThreeScene: Loading shoe from:", shoeUrl);
    loader.load(
      shoeUrl,
      (gltf) => {
        console.log("AuraThreeScene: Shoe loaded successfully");
        shoe = gltf.scene;
        shoe.scale.set(10, 10, 10);
        shoe.rotation.y = Math.PI / 4;
        
        // Center the shoe
        const box = new THREE.Box3().setFromObject(shoe);
        const center = box.getCenter(new THREE.Vector3());
        shoe.position.sub(center);
        
        scene.add(shoe);
        
        // Remove fallback if shoe is loaded
        if (fallbackCube) {
          scene.remove(fallbackCube);
        }
      },
      (xhr) => {
        if (xhr.total > 0) {
          console.log(`AuraThreeScene: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
        } else {
          console.log(`AuraThreeScene: ${xhr.loaded} bytes loaded`);
        }
      },
      (error) => {
        console.error("AuraThreeScene: Error loading 3D shoe:", error);
        // Make fallback visible if loading fails
        if (fallbackCube) {
          fallbackCube.material.opacity = 0.5;
        }
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
      const animationId = requestAnimationFrame(animate);

      if (shoe) {
        shoe.rotation.y += 0.005;
        shoe.rotation.y += mouseX * 0.01;
        shoe.rotation.x += mouseY * 0.01;
        shoe.position.y = Math.sin(Date.now() * 0.002) * 0.05;
      } else if (fallbackCube) {
        fallbackCube.rotation.y += 0.01;
        fallbackCube.rotation.x += 0.01;
      }

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

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
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center" />;
};
