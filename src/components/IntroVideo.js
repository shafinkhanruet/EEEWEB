import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VideoOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.backgroundDark};
  overflow: hidden;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SkipButton = styled(motion.button)`
  position: absolute;
  top: 30px;
  right: 30px;
  background: ${props => props.theme.colors.accentGradient};
  color: ${props => props.theme.colors.textPrimary};
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
  box-shadow: ${props => props.theme.shadows.buttonGlow};
  
  &:hover {
    background: ${props => props.theme.colors.gradientButtonHover};
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.accentGlow};
  }
`;

const NetflixLogo = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: ${props => props.theme.colors.accent};
  font-size: 40px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  letter-spacing: -2px;
  z-index: 10000;
  text-shadow: ${props => props.theme.shadows.textGlow};
`;

const VolumeButton = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: rgba(0, 0, 0, 0.7);
  color: ${props => props.theme.colors.textPrimary};
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => props.theme.colors.accent};
  box-shadow: ${props => props.theme.shadows.accentGlow};
`;

// Adding subtle vignette overlay
const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 150px 60px rgba(0, 0, 0, 0.9);
  pointer-events: none;
  z-index: 1;
`;

const IntroVideo = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const autoSkipTimeMs = 7000; // Extended to 7 seconds for more premium feel

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
      setIsVisible(false);
      if (onComplete) onComplete();
    } else {
      setIsVisible(true);
    }

    // Progress bar animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / autoSkipTimeMs) * 100);
      setProgress(newProgress);
      
      if (elapsed >= autoSkipTimeMs) {
        clearInterval(progressInterval);
        skipIntro();
      }
    }, 50);

    // Handle video end
    const handleVideoEnd = () => {
      skipIntro();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const skipIntro = () => {
    // Mark that user has seen the intro
    localStorage.setItem('hasSeenIntro', 'true');
    
    // Fade out animation
    setIsVisible(false);
    
    // Call complete callback
    if (onComplete) {
      onComplete();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <VideoOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NetflixLogo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            EEEFLIX
          </NetflixLogo>
          
          <VideoContainer>
            <Video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
            >
              <source src="https://drive.google.com/uc?export=download&id=11HIUb9J5NW5RhGdrPLTN_bqOKSkbp7am" type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
            <Vignette />
          </VideoContainer>
          
          <SkipButton
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={skipIntro}
            whileHover={{ scale: 1.05 }}
          >
            Skip Intro
          </SkipButton>
          
          <VolumeButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </VolumeButton>
          
          <ProgressBar 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </VideoOverlay>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo; 