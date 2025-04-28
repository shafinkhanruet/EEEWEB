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
  background-color: #000;
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
  bottom: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const NetflixLogo = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #E50914;
  font-size: 40px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  letter-spacing: -2px;
  z-index: 10000;
`;

const VolumeButton = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const IntroVideo = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
      setIsVisible(false);
      if (onComplete) onComplete();
    } else {
      setIsVisible(true);
    }

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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <NetflixLogo
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
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
          </VideoContainer>
          
          <SkipButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={skipIntro}
          >
            Skip Intro
          </SkipButton>
          
          <VolumeButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={toggleMute}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </VolumeButton>
        </VideoOverlay>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo; 