import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

// More premium cinematic soundtrack for the intro
const introSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-epic-orchestra-transition-2290.mp3'],
  volume: 0.7,
  loop: false,
  preload: false, // Don't preload to avoid blocking initial load
  onloaderror: () => {
    console.error('Failed to load sound');
  },
  onplayerror: () => {
    console.error('Failed to play sound');
  }
});

// Premium cinematic secondary sound effect for the logo reveal
const logoRevealSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-cinematic-transition-blast-1047.mp3'],
  volume: 0.6,
  loop: false,
  preload: false, // Don't preload to avoid blocking initial load
});

// Keyframes animations for premium cinematic effects
const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #e50914, 0 0 82px #e50914, 0 0 92px #e50914, 0 0 102px #e50914, 0 0 151px #e50914; }
  20%, 24%, 55% { text-shadow: none; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const fadeInSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.05); filter: brightness(1.2); }
  100% { transform: scale(1); filter: brightness(1); }
`;

const fadeOutFadeIn = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const zoomPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
`;

// Premium cinematic overlay with depth
const CinematicOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #000000 0%, #0c1016 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  perspective: 1000px;
`;

const DarkVignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 250px 80px rgba(0, 0, 0, 0.95);
  pointer-events: none;
`;

// Premium cinema letterbox effect
const Letterbox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 8vh;
    background: #000;
    z-index: 10;
  }
  
  &::before {
    top: 0;
    animation: ${fadeInSlideUp} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  &::after {
    bottom: 0;
    animation: ${fadeInSlideUp} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
`;

// Enhanced film grain for premium cinematic look
const FilmGrain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==');
  pointer-events: none;
  opacity: 0.4;
  z-index: 2;
  animation: ${fadeOutFadeIn} 8s infinite;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, 
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.05) 50%,
    rgba(255,255,255,0) 100%);
  animation: ${scanline} 8s linear infinite;
  opacity: 0.4;
  pointer-events: none;
  z-index: 3;
`;

// Premium backdrop beams of light
const LightBeams = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  transform: translate(-50%, -50%) rotate(0deg);
  pointer-events: none;
  opacity: 0.15;
  background: radial-gradient(
    ellipse at center,
    transparent 30%,
    rgba(229, 9, 20, 0.05) 60%,
    rgba(229, 9, 20, 0.1) 100%
  );
  animation: ${zoomPulse} 15s infinite ease-in-out;
`;

const LogoRevealContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  filter: drop-shadow(0 0 20px rgba(229, 9, 20, 0.3));
  z-index: 5;
  transform-style: preserve-3d;
`;

// Premium cinematic logo
const CinematicLogo = styled(motion.div)`
  font-size: 7rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e50914 60%, #b00710 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${({ theme }) => theme.shadows.textGlow};
  font-family: ${({ theme }) => theme.fonts.heading};
  position: relative;
  letter-spacing: 4px;
  user-select: none;
  transform-style: preserve-3d;
  
  &::after {
    content: 'EEEFLIX';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
                 0 0 42px #e50914, 0 0 82px #e50914, 0 0 92px #e50914;
    opacity: 0;
    animation: ${flicker} 2s forwards;
    animation-delay: 1.5s;
  }
`;

// Premium glow effect
const LogoGlow = styled(motion.div)`
  position: absolute;
  width: 180%;
  height: 180%;
  border-radius: 50%;
  background: radial-gradient(
    circle, 
    rgba(229, 9, 20, 0.7) 0%, 
    rgba(229, 9, 20, 0.3) 30%, 
    rgba(229, 9, 20, 0.1) 60%, 
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(40px);
  opacity: 0;
  z-index: -1;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  pointer-events: none;
`;

// Premium tagline with shimmer effect
const TagLine = styled(motion.div)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.body};
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  padding-bottom: 15px;
  
  span {
    display: inline-block;
    opacity: 0;
    animation: ${fadeInSlideUp} 0.3s forwards;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #e50914, transparent);
    background-size: 200% 100%;
    box-shadow: 0 0 10px #e50914, 0 0 20px #e50914;
    transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation: ${shimmer} 3s infinite linear;
  }
`;

// Premium progress tracker
const ProgressTracker = styled(motion.div)`
  width: 350px;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(229, 9, 20, 0.3);
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: #e50914;
    top: -1px;
    filter: blur(1px);
    box-shadow: 0 0 8px #e50914;
    z-index: 10;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

// Premium progress line
const ProgressLine = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, 
    rgba(229, 9, 20, 0.8),
    #ff0f1f, 
    rgba(229, 9, 20, 0.8));
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(229, 9, 20, 0.9), 0 0 6px rgba(255, 255, 255, 0.7);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 15px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    filter: blur(3px);
  }
`;

// Premium status text
const ProgressStatus = styled(motion.div)`
  position: absolute;
  top: -25px;
  right: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(229, 9, 20, 0.8);
`;

// Premium particle effect
const ElectricalParticle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '3px'};
  height: ${props => props.size || '3px'};
  background: ${props => props.color || '#e50914'};
  border-radius: 50%;
  filter: blur(1px) brightness(1.5);
  box-shadow: 0 0 8px ${props => props.color || '#e50914'};
`;

// Premium circuit lines
const CircuitLine = styled(motion.div)`
  position: absolute;
  background: ${props => props.color || 'rgba(229, 9, 20, 0.5)'};
  height: ${props => props.height || '2px'};
  width: ${props => props.width || '20px'};
  border-radius: 2px;
  transform-origin: left center;
  box-shadow: 0 0 5px ${props => props.color || 'rgba(229, 9, 20, 0.5)'};
`;

// Premium status text
const PowerUpText = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 10px;
  text-shadow: 0 0 10px rgba(229, 9, 20, 0.8);
  animation: ${pulse} 2s infinite ease-in-out;
`;

// Premium decorative elements
const CinematicElement = styled(motion.div)`
  position: absolute;
  background: rgba(229, 9, 20, 0.5);
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
  border-radius: 3px;
  opacity: 0.2;
  pointer-events: none;
`;

// Get random position that ensures element stays within container bounds
const getRandomPosition = (size) => {
  const padding = 50; // Keep away from edges
  return {
    x: Math.random() * (window.innerWidth - size - padding * 2) + padding,
    y: Math.random() * (window.innerHeight - size - padding * 2) + padding
  };
};

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [cinematicElements, setCinematicElements] = useState([]);
  const [tagLineVisible, setTagLineVisible] = useState(false);
  const [tagLineLetters, setTagLineLetters] = useState([]);
  const logoGlowRef = useRef(null);
  const tagLineRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    // Ensure the splash screen completes even if there are errors
    const forceCompletionTimer = setTimeout(() => {
      console.log('Force completing splash screen');
      setIsVisible(false);
      onComplete && onComplete();
    }, 8000); // Force completion after 8 seconds maximum
    
    try {
      // Set up cinematic elements (floating decoration)
      const elements = Array.from({ length: 12 }, (_, i) => {
        const size = 20 + Math.random() * 120;
        const pos = getRandomPosition(size);
        return {
          id: i,
          width: size,
          height: Math.random() * 50 + 15,
          x: pos.x,
          y: pos.y,
          opacity: Math.random() * 0.3 + 0.1,
          rotate: Math.random() * 360,
          duration: 15 + Math.random() * 20
        };
      });
      setCinematicElements(elements);
      
      // Create particles with more cinematic properties
      const newParticles = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2 + 'px',
        scale: Math.random() * 0.6 + 0.3,
        color: i % 5 === 0 ? '#e50914' : i % 8 === 0 ? '#ff9500' : i % 12 === 0 ? '#3cf0ff' : '#ffffff',
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
      
      // Create circuit lines that connect
      const newCircuits = Array.from({ length: 25 }, (_, i) => {
        const startAngle = Math.random() * 360;
        const length = 50 + Math.random() * 150;
        return {
          id: i,
          x: Math.random() * 80 + 10, // percentage of screen
          y: Math.random() * 80 + 10, // percentage of screen
          width: length + 'px',
          angle: startAngle,
          color: i % 3 === 0 ? 'rgba(229, 9, 20, 0.8)' : i % 5 === 0 ? 'rgba(60, 240, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          delay: i * 0.15
        };
      });
      setCircuits(newCircuits);
      
      // Split tagline for letter animation
      setTagLineLetters("PREMIUM EXPERIENCE".split(''));
      
      // Play intro sound
      try {
        introSound.once('load', function() {
          introSound.play();
        });
        introSound.load();
        
        // Play logo reveal sound after a delay
        setTimeout(() => {
          try {
            logoRevealSound.once('load', function() {
              logoRevealSound.play();
            });
            logoRevealSound.load();
          } catch (soundError) {
            console.error('Error playing logo sound:', soundError);
          }
        }, 1200);
      } catch (error) {
        console.error('Error playing intro sound:', error);
      }

      // Show tagline after animation starts
      setTimeout(() => {
        setTagLineVisible(true);
        
        // Animate underline after letters appear
        if (tagLineRef.current) {
          tagLineRef.current.style.setProperty('--after-width', '100%');
        }
      }, 1500);
      
      // Animate logo glow
      setTimeout(() => {
        if (logoGlowRef.current) {
          controls.start({
            opacity: [0, 0.9, 0.6],
            scale: [0.5, 1.4, 1.2],
            transition: { duration: 2, ease: "easeOut" }
          });
        }
      }, 1200);

      const duration = 6000; // Longer duration for more cinematic impact
      const interval = 20;
      const steps = duration / interval;
      const increment = 100 / steps;
      
      let startTime = Date.now();
      
      const progressInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const calculatedProgress = Math.min(100, (elapsedTime / duration) * 100);
        
        // Add easing to the progress bar for more cinematic feel
        const easedProgress = Math.pow(calculatedProgress / 100, 0.65) * 100;
        setProgress(easedProgress);
        
        if (calculatedProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, interval);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete && onComplete();
        clearTimeout(forceCompletionTimer); // Clear the force completion timer since we're completing normally
      }, duration);

      return () => {
        clearTimeout(timer);
        clearTimeout(forceCompletionTimer);
        clearInterval(progressInterval);
        try {
          introSound.stop();
          logoRevealSound.stop();
        } catch (error) {
          console.error('Error stopping sound:', error);
        }
      };
    } catch (error) {
      console.error('Error in SplashScreen:', error);
      // If we encounter a critical error, still ensure we complete the splash screen
      setTimeout(() => {
        setIsVisible(false);
        onComplete && onComplete();
      }, 1000);
      
      return () => {
        clearTimeout(forceCompletionTimer);
      };
    }
  }, [onComplete, controls]);

  return (
    <AnimatePresence>
      {isVisible && (
        <CinematicOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: {
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }
          }}
          transition={{ duration: 1.8 }}
        >
          <Letterbox />
          <FilmGrain />
          <ScanLine />
          <DarkVignette />
          <LightBeams />
          
          {/* Dynamic cinematic background elements */}
          {cinematicElements.map(element => (
            <CinematicElement
              key={element.id}
              style={{
                width: element.width,
                height: element.height,
                left: element.x,
                top: element.y,
                opacity: element.opacity,
                rotate: element.rotate
              }}
              animate={{
                rotate: [element.rotate, element.rotate + 360],
                opacity: [element.opacity, element.opacity * 1.8, element.opacity],
                y: [element.y, element.y - 25, element.y]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: element.duration,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Electrical circuit lines */}
          {circuits.map(circuit => (
            <CircuitLine
              key={circuit.id}
              color={circuit.color}
              width={circuit.width}
              style={{
                left: `${circuit.x}%`,
                top: `${circuit.y}%`,
                rotate: circuit.angle + 'deg',
                transformOrigin: 'left center',
                scaleX: 0
              }}
              animate={{
                scaleX: [0, 1],
                opacity: [0, 1, 0.8]
              }}
              transition={{
                delay: circuit.delay,
                duration: 1.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          ))}
          
          {/* Electrical particles */}
          {particles.map(particle => (
            <ElectricalParticle
              key={particle.id}
              color={particle.color}
              size={particle.size}
              initial={{ 
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: `${particle.x + (Math.random() * 18 - 9)}%`,
                y: `${particle.y + (Math.random() * 18 - 9)}%`,
                scale: [0, particle.scale, 0],
                opacity: [0, 0.9, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
          
          <LogoRevealContainer
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [60, 0],
              filter: [
                "blur(15px) brightness(0.4)",
                "blur(0px) brightness(1.2)",
                "blur(0px) brightness(1)"
              ],
              z: [-50, 0]
            }}
            transition={{
              duration: 2.2,
              y: { duration: 2, ease: [0.215, 0.61, 0.355, 1] },
              filter: { duration: 2.5, ease: "easeOut" },
              z: { duration: 2, ease: "easeOut" }
            }}
          >
            <LogoGlow
              ref={logoGlowRef}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
            />
            
            <CinematicLogo
              initial={{ opacity: 0, scale: 0.9, rotateX: 45, z: -50 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: 0,
                z: 0,
                transition: {
                  duration: 2,
                  delay: 0.6,
                  ease: [0.215, 0.61, 0.355, 1]
                }
              }}
            >
              EEEFLIX
            </CinematicLogo>
            
            <TagLine
              ref={tagLineRef}
              style={{ '--after-width': '0%' }}
              animate={{ 
                opacity: tagLineVisible ? 1 : 0
              }}
              transition={{ 
                duration: 1.2,
                delay: 0.8
              }}
            >
              {tagLineLetters.map((letter, index) => (
                <span 
                  key={index} 
                  style={{ 
                    animationDelay: `${1.5 + index * 0.06}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </TagLine>
            
            <ProgressTracker>
              <ProgressStatus
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                {Math.round(progress)}%
              </ProgressStatus>
              <ProgressLine
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: 0.1,
                  ease: "linear"
                }}
              />
            </ProgressTracker>
          </LogoRevealContainer>
          
          <PowerUpText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          >
            INITIALIZING
          </PowerUpText>
        </CinematicOverlay>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 