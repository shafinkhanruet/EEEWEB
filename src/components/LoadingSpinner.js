import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Import logo for the loading screen
import eeeflixLogo from '../assets/images/logos/eeeflix-logo.png';

// Pulse animation for the logo
const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

// Rotation animation for the spinner
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Fade in animation for text
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #000000, #141414);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
  
  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;

const LogoFallback = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #E50914;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(229, 9, 20, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
  
  span {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const SpinnerRing = styled.div`
  width: 40px;
  height: 40px;
  margin: 1rem 0;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #E50914;
  animation: ${rotate} 1.5s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #FFFFFF;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  animation: ${fadeIn} 1s ease-out forwards;
  opacity: 0;
  animation-delay: 0.5s;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 1.5rem;
  overflow: hidden;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    background: #E50914;
    animation: progress 2s ease-in-out infinite;
    border-radius: 10px;
  }
  
  @keyframes progress {
    0% { left: -30%; width: 30%; }
    50% { width: 30%; }
    100% { left: 100%; width: 30%; }
  }
`;

const LoadingSpinner = () => {
  const [logoLoaded, setLogoLoaded] = React.useState(true);
  
  const handleLogoError = () => {
    setLogoLoaded(false);
  };
  
  return (
    <SpinnerContainer>
      <LogoContainer>
        {logoLoaded ? (
          <Logo>
            <img 
              src={eeeflixLogo} 
              alt="EEEFlix Logo" 
              onError={handleLogoError}
            />
          </Logo>
        ) : (
          <LogoFallback>
            EEE<span>FLIX</span>
          </LogoFallback>
        )}
        <SpinnerRing />
        <LoadingText>Loading EEEFlix...</LoadingText>
        <ProgressBar />
      </LogoContainer>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
