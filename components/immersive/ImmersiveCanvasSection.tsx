"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    meshRef.current.rotation.y = t * 0.25
    meshRef.current.position.y = Math.sin(t) * 0.15
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 128, 128]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#4338ca"
        emissiveIntensity={2}
        metalness={1}
        roughness={0.15}
      />
    </mesh>
  )
}

function BackgroundRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.15
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[3, 0.02, 32, 200]} />
      <meshBasicMaterial color="#4f46e5" />
    </mesh>
  )
}

export default function ImmersiveCanvasSection() {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-violet-500/20 bg-white/5 px-5 py-2 text-xs tracking-[0.3em] text-violet-300 backdrop-blur-xl">
            INTERACTIVE IMMERSION
          </div>

          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Experience the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              future
            </span>{" "}
            of VR content
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Explore cinematic immersive environments directly from your browser.
            Built for next-generation creators and viewers.
          </p>
        </div>

        {/* Interactive Container */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

          {/* Top HUD */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl">
            <div>
              <p className="text-sm font-medium">Immersive180 Preview</p>
              <p className="text-xs text-white/50">
                Drag to interact with the environment
              </p>
            </div>

            <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
              LIVE WEBGL
            </div>
          </div>

          {/* Canvas */}
          <div className="h-[750px] w-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              
              <ambientLight intensity={1.5} />

              <directionalLight
                position={[3, 3, 3]}
                intensity={2}
              />

              <FloatingOrb />
              <BackgroundRing />

              <Environment preset="city" />

              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>

          {/* Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 bg-black/20 px-8 py-6 backdrop-blur-xl md:flex-row">
            <div>
              <h3 className="text-xl font-medium">
                Cinematic VR experiences
              </h3>

              <p className="mt-2 text-sm text-white/50">
                Powered by WebGL, React Three Fiber, and WebXR-ready architecture.
              </p>
            </div>

            <button className="rounded-full border border-violet-500/20 bg-violet-500/10 px-6 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20 hover:text-white">
              Explore Experiences →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}