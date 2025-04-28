import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaGraduationCap, FaLaptopCode, FaBookOpen } from 'react-icons/fa';
import { throttle } from '../utils/helpers';
import { SoundContext } from '../contexts/SoundContext';

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  background: #181818;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 3rem 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  min-height: 340px;
  will-change: transform, box-shadow;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(229, 9, 20, 0.2);
    transform: translateY(-10px);
    border-color: rgba(229, 9, 20, 0.3);
    
    .icon-container {
      transform: scale(1.05);
      background: #E50914;
      
      svg {
        color: white;
      }
    }
  }
`;

const IconContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #141414;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  border: 2px solid rgba(229, 9, 20, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  
  svg {
    font-size: 2.8rem;
    color: #E50914;
    transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1.2rem 0;
  color: #FFFFFF;
  font-weight: 700;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  ${FeatureCard}:hover & {
    transform: translateY(-5px);
    color: #E50914;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #B3B3B3;
  margin: 0;
  line-height: 1.7;
  position: relative;
  z-index: 2;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${FeatureCard}:hover & {
    color: #FFFFFF;
  }
`;

// Individual feature card as a memoized component for better performance
const Feature = React.memo(({ feature, onMouseEnter }) => {
  return (
    <FeatureCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={onMouseEnter}
    >
      <IconContainer className="icon-container">
        {feature.icon}
      </IconContainer>
      <FeatureTitle>{feature.title}</FeatureTitle>
      <FeatureDescription>{feature.description}</FeatureDescription>
    </FeatureCard>
  );
});

// Set display name for debugging
Feature.displayName = 'Feature';

const Features = () => {
  const { playSound } = useContext(SoundContext);
  
  const featuresList = [
    {
      id: 1,
      icon: <FaUsers />,
      title: 'Student Directory',
      description: 'Browse through detailed profiles of all 60 students in the EEE department, complete with contact information and achievements.',
    },
    {
      id: 2,
      icon: <FaGraduationCap />,
      title: 'Academic Resources',
      description: 'Access course materials, lecture notes, and academic resources to support your studies in Electrical & Electronic Engineering.',
    },
    {
      id: 3,
      icon: <FaLaptopCode />,
      title: 'Interactive Interface',
      description: 'Experience a premium user interface with smooth animations, sound effects, and responsive design across all devices.',
    },
    {
      id: 4,
      icon: <FaBookOpen />,
      title: 'Department Information',
      description: 'Stay updated with the latest news, events, and information about the Electrical & Electronic Engineering department.',
    }
  ];
  
  // Throttle sound events to reduce callback frequency
  const handleCardHover = useCallback(
    throttle(() => {
      if (playSound) {
        playSound('hover');
      }
    }, 500),
    [playSound]
  );
  
  // Use InView to only animate when visible
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "-100px 0px"
  });
  
  return (
    <FeaturesContainer ref={ref}>
      {featuresList.map((feature) => (
        <Feature 
          key={feature.id}
          feature={feature}
          onMouseEnter={handleCardHover}
        />
      ))}
    </FeaturesContainer>
  );
};

// Export as memoized component to prevent unnecessary re-renders
export default React.memo(Features);
