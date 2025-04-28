import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0.95) 100%
  );
  overflow: hidden;
  padding: 0 4%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(0.6);
  transform-origin: center;
`;

const BackgroundOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 0;
`;

const VignetteBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
  z-index: 1;
  pointer-events: none;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ExclusiveTag = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #E50914 0%, #B20710 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 4px 15px rgba(229, 9, 20, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  position: relative;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: skewX(-25deg);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  }
`;

const ExclusiveTagContent = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '✦';
    font-size: 1.2rem;
  }
  
  &::after {
    content: '✦';
    font-size: 1.2rem;
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: 3.6rem;
  color: white;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  max-width: 800px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  span {
    color: #E50914;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #E50914;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
  
  &.animated span::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.4rem;
  color: #e5e5e5;
  line-height: 1.5;
  margin-bottom: 2rem;
  max-width: 700px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
`;

const InfoBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 4px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform-origin: left;

  span {
    color: #e5e5e5;
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:not(:last-child)::after {
      content: '•';
      margin: 0 0.5rem;
      opacity: 0.7;
    }
    
    &:first-child {
      color: #E50914;
      font-weight: 700;
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  
  svg {
    margin-top: 0.5rem;
    width: 30px;
    height: 30px;
  }
`;

const HeroSection = () => {
  const controls = useAnimation();
  const bgControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Start with background animation
      await bgControls.start({
        scale: 1,
        filter: "brightness(0.6)",
        transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
      });
      
      // Then animate the content
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      });
      
      // Add class to trigger the line animation under the title
      const titleElement = document.querySelector(".hero-title");
      if (titleElement) {
        titleElement.classList.add("animated");
      }
    };
    
    sequence();
  }, [controls, bgControls]);

  return (
    <HeroContainer>
      <BackgroundImage 
        as={motion.div} 
        initial={{ scale: 1.1, filter: "brightness(0.4)" }}
        animate={bgControls}
      />
      <BackgroundOverlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <VignetteBorder />
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <ExclusiveTag
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 8px 20px rgba(229, 9, 20, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
          }}
        >
          <ExclusiveTagContent>
            Elite Access for A Section Students
          </ExclusiveTagContent>
        </ExclusiveTag>

        <MainTitle
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          Join the brilliant minds of the{' '}
          <span>Electrical and Electronics Engineering</span>
          {' '}department
        </MainTitle>

        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.7, 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          at RUET as they uncover hidden truths about the mysterious forces shaping the future of technology.
          Explore the challenges, discoveries, and breakthroughs that will define the next generation of engineers.
        </Description>

        <InfoBadge
          initial={{ opacity: 0, scale: 0.9, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            delay: 0.9, 
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: 'rgba(51, 51, 51, 0.9)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            transition: { duration: 0.2 }
          }}
        >
          <span>A-SEC</span>
          <span>Innovation</span>
          <span>Technology</span>
          <span>2023</span>
        </InfoBadge>
      </ContentWrapper>
      
      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 1, 0.7],
          y: [20, 0, 10]
        }}
        transition={{ 
          delay: 2.5,
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Scroll Down
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection; 