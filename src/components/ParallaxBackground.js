import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { throttle } from '../utils/performance';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: #0F0F0F;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
`;

const GradientOverlay = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(30, 30, 30, 0.15) 0%,
    transparent 40%
  );
  opacity: 0.5;
  will-change: opacity;
  pointer-events: none;
`;

const NetflixParallelogram = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 120%;
  top: -10%;
  background: linear-gradient(to bottom right, rgba(229, 9, 20, 0.03), transparent 70%);
  transform: skewY(-5deg);
  z-index: 0;
`;

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const glowControls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Use throttle for mouse move event to reduce calculations
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = throttle((e) => {
      // Update CSS variables for the gradient position
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${e.clientX / window.innerWidth * 100}%`);
        containerRef.current.style.setProperty('--mouse-y', `${e.clientY / window.innerHeight * 100}%`);
      }
    }, 100); // Throttle to 100ms

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMounted]);

  return (
    <BackgroundContainer ref={containerRef}>
      <NoiseOverlay />
      <NetflixParallelogram 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <GradientOverlay />
    </BackgroundContainer>
  );
};

export default ParallaxBackground;
