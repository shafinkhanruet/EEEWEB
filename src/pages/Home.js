import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SoundContext } from '../contexts/SoundContext';
import { FaUsers, FaEnvelope, FaFacebook, FaPhoneAlt } from 'react-icons/fa';

// Components
import Section from '../components/Section';
import Button from '../components/Button';
import StudentCard from '../components/StudentCard';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ParallaxBackground from '../components/ParallaxBackground';

// Mock data
import { featuredStudents } from '../data/students';

// Get the Class Representatives data (CRs)
import { allStudents } from '../data/students';

// Filter out the CRs
const classRepresentatives = allStudents.filter(
  student => student.role === 'CR'
);

// Styled Components
const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.4; /* Reduced opacity for better performance */
`;

const SectionWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.gradientOverlay};
  z-index: -1;
  pointer-events: none;
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #E50914;
  transform-origin: 0%;
  z-index: 1000;
`;

const ViewAllButton = styled(motion.div)`
  margin-top: 3rem;
  text-align: center;
`;

// Add these styled components for enhanced section headings
const EnhancedSectionTitle = styled.h2`
  color: #FFFFFF;
  font-size: 3.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  letter-spacing: 0.5px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #E50914;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2.2rem;
  }
`;

const EnhancedSectionSubtitle = styled.p`
  color: #B3B3B3;
  font-size: 1.3rem;
  text-align: center;
  max-width: 700px;
  margin: 2.5rem auto 3rem;
  line-height: 1.7;
  letter-spacing: 0.3px;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 2rem auto 2.5rem;
    padding: 0 1.5rem;
  }
`;

const ParallaxSection = styled.div`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  will-change: transform;
`;

const FloatingGradient = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(229, 9, 20, 0.15) 0%, 
    rgba(229, 9, 20, 0) 70%
  );
  filter: blur(30px);
  opacity: 0.5;
  pointer-events: none;
`;

// Add these styled components for the Features section
const EnhancedFeaturesWrapper = styled.div`
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(229, 9, 20, 0) 0%, 
      rgba(229, 9, 20, 0.6) 50%, 
      rgba(229, 9, 20, 0) 100%
    );
  }
`;

// Enhanced Styling for Featured Students section
const PremiumFeaturedSection = styled.div`
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
`;

const SectionHeading = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const PremiumTitle = styled.h2`
  color: #FFFFFF;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #E50914;
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.5);
    border-radius: 2px;
  }
`;

const PremiumSubtitle = styled.p`
  color: #B3B3B3;
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 2rem auto 3rem;
  line-height: 1.7;
  letter-spacing: 0.5px;
`;

const FeaturedStudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  margin: 2rem auto;
  padding: 0 4rem;
  max-width: 1400px;
  justify-items: center;
  
  @media (max-width: 1400px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > div {
      flex: 0 0 calc(25% - 2rem);
      margin: 1rem;
      min-width: 220px;
    }
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    & > div {
      flex: 0 0 calc(50% - 2rem);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 2rem;
    & > div {
      flex: 0 0 calc(50% - 2rem);
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
    & > div {
      flex: 0 0 100%;
    }
  }
`;

const ViewAllButtonWrapper = styled(motion.div)`
  margin-top: 4rem;
  text-align: center;
  
  button, a {
    padding: 1rem 2.2rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
  }
`;

// Add these styled components for the Class Representatives section
const CRSectionWrapper = styled.div`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(229, 9, 20, 0) 0%, 
      rgba(229, 9, 20, 0.6) 50%, 
      rgba(229, 9, 20, 0) 100%
    );
  }
`;

const CRTitle = styled(EnhancedSectionTitle)`
  font-size: 2.6rem;
  
  &:after {
    width: 80px;
  }
`;

const CRGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin: 1.5rem auto;
  max-width: 900px;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const CRCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.6);
  border-radius: 10px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(229, 9, 20, 0.2);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2);
    border-color: rgba(229, 9, 20, 0.5);
  }
`;

const CRImageContainer = styled.div`
  width: 100%;
  position: relative;
  height: 280px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${CRCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CRBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #E50914;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.8rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const CRInfo = styled.div`
  padding: 1.2rem;
  text-align: center;
`;

const CRName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: white;
`;

const CRQuote = styled.p`
  color: #B3B3B3;
  font-style: italic;
  margin: 0.8rem 0;
  line-height: 1.4;
  font-size: 0.85rem;
`;

const CRContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const CRContactButton = styled(motion.a)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: #E50914;
    transform: translateY(-3px);
  }
`;

const Home = () => {
  const { playSound } = useContext(SoundContext);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Animation controls
  const studentControls = useAnimation();
  const featuresControls = useAnimation();
  
  // Multiple refs for different sections
  const [studentsRef, studentsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Add ref for CR section
  const [crRef, crInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Add animation control for CR section
  const crControls = useAnimation();
  
  // Handle intro video completion
  const handleIntroComplete = () => {
    setIsIntroComplete(true);
  };
  
  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Update useEffect to include CR animations
  useEffect(() => {
    // Only start animations if component is mounted
    if (!isMounted) return;
    
    if (studentsInView) {
      studentControls.start('visible');
    }
    if (featuresInView) {
      featuresControls.start('visible');
    }
    if (crInView) {
      crControls.start('visible');
    }
  }, [studentsInView, featuresInView, crInView, studentControls, featuresControls, crControls, isMounted]);
  
  // Improved variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const handleButtonHover = () => {
    if (playSound) playSound('hover');
  };
  
  const handleButtonClick = () => {
    if (playSound) playSound('click');
  };

  return (
    <PageContainer>
      {/* Scroll Progress Bar */}
      <ScrollProgress style={{ scaleX, willChange: 'transform' }} />
      
      {/* Background Effect */}
      <BackgroundWrapper>
        <ParallaxBackground />
        {/* Floating gradient elements */}
        <FloatingGradient 
          style={{ 
            x: useTransform(scrollYProgress, [0, 1], ['-10%', '30%']),
            y: useTransform(scrollYProgress, [0, 1], ['10%', '60%']),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
          }} 
        />
        <FloatingGradient 
          style={{ 
            x: useTransform(scrollYProgress, [0, 1], ['80%', '50%']),
            y: useTransform(scrollYProgress, [0, 1], ['30%', '70%']),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.8, 1.4])
          }} 
        />
      </BackgroundWrapper>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <SectionWrapper
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={containerVariants}
      >
        <EnhancedFeaturesWrapper>
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <EnhancedSectionTitle>Why Choose EEEFlix</EnhancedSectionTitle>
            <EnhancedSectionSubtitle>
              Discover the benefits of our premium platform for Electrical & Electronic Engineering students and faculty.
            </EnhancedSectionSubtitle>
          </motion.div>
          <Features />
        </EnhancedFeaturesWrapper>
      </SectionWrapper>
      
      {/* Class Representatives Section */}
      <SectionWrapper
        ref={crRef}
        initial="hidden"
        animate={crControls}
        variants={containerVariants}
      >
        <CRSectionWrapper>
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <CRTitle>Class Representatives</CRTitle>
            <EnhancedSectionSubtitle style={{ fontSize: '1.1rem', margin: '2rem auto 1rem' }}>
              Meet our dedicated Class Representatives who bridge students and faculty.
            </EnhancedSectionSubtitle>
          </motion.div>
          
          <CRGrid>
            {classRepresentatives.map((cr) => (
              <CRCard
                key={cr.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <CRImageContainer>
                  <img src={cr.image} alt={cr.name} />
                  <CRBadge>
                    <FaUsers /> Class Rep
                  </CRBadge>
                </CRImageContainer>
                <CRInfo>
                  <CRName>{cr.name}</CRName>
                  <CRQuote>"{cr.quote.length > 100 ? cr.quote.slice(0, 100) + '...' : cr.quote}"</CRQuote>
                  <CRContactInfo>
                    <CRContactButton 
                      href={`mailto:${cr.contactInfo.email}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                    >
                      <FaEnvelope />
                    </CRContactButton>
                    <CRContactButton 
                      href={cr.contactInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                    >
                      <FaFacebook />
                    </CRContactButton>
                    <CRContactButton 
                      href={`tel:${cr.contactInfo.phone}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={handleButtonHover}
                      onClick={handleButtonClick}
                    >
                      <FaPhoneAlt />
                    </CRContactButton>
                  </CRContactInfo>
                </CRInfo>
              </CRCard>
            ))}
          </CRGrid>
        </CRSectionWrapper>
      </SectionWrapper>
      
      {/* Featured Students Section */}
      <SectionWrapper
        ref={studentsRef}
        initial="hidden"
        animate={studentControls}
        variants={containerVariants}
      >
        <PremiumFeaturedSection>
          <SectionHeading variants={itemVariants}>
            <PremiumTitle>Featured Students</PremiumTitle>
            <PremiumSubtitle>
              Meet our exceptional students who are making a difference in the
              field of Electrical & Electronic Engineering with groundbreaking 
              research and innovative solutions.
            </PremiumSubtitle>
          </SectionHeading>
          
          <FeaturedStudentsGrid>
            {featuredStudents.slice(0, 4).map((student) => (
              <motion.div 
                key={student.id} 
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <StudentCard student={student} />
              </motion.div>
            ))}
          </FeaturedStudentsGrid>
          
          <ViewAllButtonWrapper variants={itemVariants}>
            <Button 
              to="/students"
              variant="premium"
              onMouseEnter={handleButtonHover}
              onClick={handleButtonClick}
            >
              View All Students
            </Button>
          </ViewAllButtonWrapper>
        </PremiumFeaturedSection>
      </SectionWrapper>
      
      <GradientOverlay />
    </PageContainer>
  );
};

export default Home;
