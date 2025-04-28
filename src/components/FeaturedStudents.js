import React from 'react';
import styled from 'styled-components';
import StudentCard from './StudentCard';
import { motion } from 'framer-motion';

const FeaturedContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 600px;
  padding: 60px 0;
  background: rgb(10, 10, 10);
  overflow: visible;
  isolation: isolate;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 30%,
      rgba(229, 9, 20, 0.15),
      transparent 70%
    );
    z-index: 1;
  }
`;

const CardsWrapper = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  gap: -120px;
  perspective: 1000px;
  transform-style: preserve-3d;
  z-index: 2;

  @media (max-width: 1400px) {
    gap: -80px;
  }

  @media (max-width: 1200px) {
    gap: -40px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const CardContainer = styled(motion.div)`
  position: relative;
  transform-origin: center;
  z-index: ${props => props.index};
  filter: brightness(0.9);
  transition: filter 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => {
      const colors = [
        'linear-gradient(135deg, rgba(0, 150, 255, 0.4), rgba(0, 80, 255, 0.6))',  // Blue
        'linear-gradient(135deg, rgba(229, 9, 20, 0.4), rgba(255, 0, 80, 0.6))',   // Red
        'linear-gradient(135deg, rgba(255, 180, 0, 0.4), rgba(255, 120, 0, 0.6))', // Gold
        'linear-gradient(135deg, rgba(0, 255, 150, 0.4), rgba(0, 200, 100, 0.6))', // Green
        'linear-gradient(135deg, rgba(170, 0, 255, 0.4), rgba(120, 0, 255, 0.6))'  // Purple
      ];
      return colors[props.index % colors.length];
    }};
    border-radius: 24px;
    mix-blend-mode: color;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.4s ease;
    transform: translateZ(20px);
  }

  &:after {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${props => {
      const colors = [
        'rgba(0, 150, 255, 0.2)',  // Blue
        'rgba(229, 9, 20, 0.2)',   // Red
        'rgba(255, 180, 0, 0.2)',  // Gold
        'rgba(0, 255, 150, 0.2)',  // Green
        'rgba(170, 0, 255, 0.2)'   // Purple
      ];
      return colors[props.index % colors.length];
    }};
    border-radius: 26px;
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover {
    filter: brightness(1.1);
    
    &:before {
      opacity: 1;
    }
    
    &:after {
      opacity: 1;
    }
  }
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 
    0 0 20px rgba(229, 9, 20, 0.5),
    0 0 40px rgba(229, 9, 20, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 40,
    rotateY: -20
  },
  visible: i => ({
    opacity: 1,
    y: 0,
    rotateY: [-4, 4, -2, 2, 0][i % 5], // Slight 3D rotation
    rotateZ: [-2, 2, -1, 1, 0][i % 5], // Slight Z rotation
    x: [-20, 20, -10, 10, 0][i % 5], // Slight X offset
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

const FeaturedStudents = ({ students }) => {
  if (!students || students.length === 0) return null;

  return (
    <FeaturedContainer>
      <SectionTitle>Featured Students</SectionTitle>
      <CardsWrapper>
        {students.map((student, index) => (
          <CardContainer
            key={student.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.05,
              rotate: 0,
              transition: { duration: 0.3 }
            }}
            index={index}
          >
            <StudentCard 
              student={student}
              delay={index * 0.1}
            />
          </CardContainer>
        ))}
      </CardsWrapper>
    </FeaturedContainer>
  );
};

export default FeaturedStudents; 