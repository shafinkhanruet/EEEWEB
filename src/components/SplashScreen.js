import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

// Premium overlay with gradient
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.gradientPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
`;

// Premium logo
const Logo = styled(motion.div)`
  font-size: 6rem;
  font-weight: 800;
  background: ${props => props.theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
  position: relative;
  text-shadow: ${props => props.theme.shadows.textGlow};
`;

// Premium glow effect
const LogoGlow = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, ${props => props.theme.colors.accentGlow} 0%, rgba(229, 9, 20, 0) 70%);
  filter: blur(20px);
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards, ${pulse} 2s ease-in-out infinite;
  animation-delay: 0.3s;
  pointer-events: none;
  z-index: -1;
`;

// Premium loading line
const LoadingLine = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  background: ${props => props.theme.colors.gradientAccent};
  box-shadow: ${props => props.theme.shadows.accentGlow};
`;

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const displayTime = 3000; // Extended to 3 seconds for more premium feel

  useEffect(() => {
    // Auto-hide after display time
    const timer = setTimeout(() => {
      setShow(false);
      
      // Delay the onComplete callback to allow exit animation to complete
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, displayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Logo
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <LogoGlow />
            EEEFLIX
          </Logo>
          
          <LoadingLine
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "30%", opacity: 1 }}
            transition={{ 
              width: { duration: displayTime/1000, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }}
          />
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 