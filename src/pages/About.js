import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaUsers, FaLightbulb, FaAward, FaAngleRight, FaSearch, FaUserGraduate, FaBell } from 'react-icons/fa';

// Components
import Section from '../components/Section';
import ParallaxBackground from '../components/ParallaxBackground';

const PageContainer = styled.div`
  position: relative;
  background: ${props => props.theme.colors.backgroundPrimary || 'linear-gradient(to bottom, #0f0f0f, #000000)'};
  min-height: 100vh;
  padding-bottom: 5rem;
  font-family: ${props => props.theme.fonts.main || "'Montserrat', sans-serif"};
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.4;
`;

const PageHeader = styled.div`
  padding: 10rem 0 8rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
              url('/assets/images/eee-background.jpg') center/cover no-repeat;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #E50914, transparent);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
    z-index: 1;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background-color: #E50914;
    margin: 0.8rem auto 0;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(motion.button)`
  background: #E50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  position: relative;
  z-index: 2;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.7s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutText = styled(motion.div)`
  position: relative;
  padding: 3rem;
  background: ${props => props.theme.effects?.glass?.background || 'rgba(20, 20, 20, 0.8)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  box-shadow: ${props => props.theme.shadows?.glass || '0 15px 35px rgba(0, 0, 0, 0.5)'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(229, 9, 20, 0.05), transparent);
    border-radius: 10px;
    z-index: -1;
  }
`;

const AboutTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  position: relative;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #E50914;
  }
`;

const AboutParagraph = styled.p`
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  line-height: 1.6;
  margin-bottom: 1.2rem;
  font-size: 1rem;
`;

const FeaturesSection = styled.div`
  background: linear-gradient(to right, rgba(20, 20, 20, 0.8), rgba(15, 15, 15, 0.9));
  padding: 6rem 0;
  margin: 5rem 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.5), transparent);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.5), transparent);
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background-color: #E50914;
    margin: 0.8rem auto 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeatureItem = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.effects?.glass?.background || 'rgba(25, 25, 25, 0.7)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-15px);
    background: rgba(30, 30, 30, 0.8);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  color: #E50914;
  margin-bottom: 2rem;
`;

const FeatureItemTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: linear-gradient(to right, rgba(20, 20, 20, 0.8), rgba(15, 15, 15, 0.9));
  padding: 6rem 0;
  margin: 6rem 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.5), transparent);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.5), transparent);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2.5rem;
  background: ${props => props.theme.effects?.glass?.background || 'rgba(25, 25, 25, 0.7)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-15px);
    background: rgba(30, 30, 30, 0.8);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2);
  }
`;

const StatIcon = styled.div`
  font-size: 3.5rem;
  color: #E50914;
  margin-bottom: 1.8rem;
`;

const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  font-weight: 500;
`;

const CTASection = styled.div`
  text-align: center;
  margin: 6rem auto;
  padding: 6rem 2rem;
  background: ${props => props.theme.effects?.glass?.background || 'rgba(20, 20, 20, 0.7)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  box-shadow: ${props => props.theme.shadows?.glass || '0 20px 40px rgba(0, 0, 0, 0.5)'};
  max-width: 1200px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(229, 9, 20, 0.05), transparent);
    z-index: -1;
  }
`;

const CTATitle = styled(motion.h2)`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const CTADescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: #E50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.7s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

// Floating gradient elements similar to Home page
const FloatingGradient = styled(motion.div)`
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.05) 0%, rgba(229, 9, 20, 0) 70%);
  filter: blur(60px);
  opacity: 0.4;
  pointer-events: none;
`;

const About = ({ soundContext }) => {
  // Add fallback for soundContext
  const playSound = useMemo(() => {
    return soundContext?.playSound || (() => {});
  }, [soundContext]);
  
  // Animation controls
  const aboutControls = useAnimation();
  const featuresControls = useAnimation();
  const statsControls = useAnimation();
  const ctaControls = useAnimation();
  
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [statsRef, statsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [ctaRef, ctaInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Use effect to trigger animations when sections come into view
  React.useEffect(() => {
    if (aboutInView) aboutControls.start('visible');
    if (featuresInView) featuresControls.start('visible');
    if (statsInView) statsControls.start('visible');
    if (ctaInView) ctaControls.start('visible');
  }, [aboutInView, featuresInView, statsInView, ctaInView, aboutControls, featuresControls, statsControls, ctaControls]);
  
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
    playSound('hover');
  };
  
  const handleButtonClick = () => {
    playSound('click');
  };

  return (
    <PageContainer>
      {/* Background Elements */}
      <BackgroundWrapper>
        <ParallaxBackground />
        {/* Floating gradient elements */}
        <FloatingGradient 
          initial={{ x: '-10%', y: '10%' }}
          animate={{ 
            x: ['0%', '10%', '0%'],
            y: ['10%', '15%', '10%'],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <FloatingGradient 
          initial={{ x: '80%', y: '30%' }}
          animate={{ 
            x: ['80%', '70%', '80%'],
            y: ['30%', '40%', '30%'],
            scale: [1.2, 0.9, 1.2],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </BackgroundWrapper>
      
      {/* Header Section */}
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          Find Your Rollmate and Connect with the EEE Family
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          Join a network of EEE students, from juniors to seniors, making your university life easier and more connected.
        </PageDescription>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <CTAButton 
            onMouseEnter={handleButtonHover}
            onClick={handleButtonClick}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(229, 9, 20, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Start Connecting <FaAngleRight />
          </CTAButton>
        </motion.div>
      </PageHeader>
      
      {/* Story Section */}
      <Section>
        <AboutContent>
          <AboutText
            ref={aboutRef}
            initial="hidden"
            animate={aboutControls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <AboutTitle>The Story Behind EEEFlix</AboutTitle>
              <AboutParagraph>
                EEEFlix was created to bridge the gap between juniors and seniors. It's a platform where you can find your rollmate, seek academic help, and build lasting connections.
              </AboutParagraph>
              <AboutParagraph>
                Built with the goal of fostering stronger academic bonds and peer networks, EEEFlix allows you to easily search, explore, and connect with your fellow rollmates using name or roll number – no login required.
              </AboutParagraph>
              <AboutParagraph>
                Whether you're looking for a senior for academic advice, a classmate to form a study group, or simply reconnecting with friends, EEEFlix is your digital companion to build meaningful student relationships.
              </AboutParagraph>
              <AboutParagraph>
                Discover your rollmates. Strengthen your network. Grow together with EEEFlix.
              </AboutParagraph>
            </motion.div>
          </AboutText>
        </AboutContent>
      </Section>
      
      {/* Features Section */}
      <FeaturesSection ref={featuresRef}>
        <motion.div
          initial="hidden"
          animate={featuresControls}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <motion.div variants={itemVariants}>
            <FeatureTitle>How EEEFlix Helps</FeatureTitle>
          </motion.div>
          <FeaturesGrid>
            <FeatureItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <FeatureIcon>
                <FaSearch />
              </FeatureIcon>
              <FeatureItemTitle>Find Your Rollmate</FeatureItemTitle>
              <FeatureDescription>
                Search through batches and roll numbers to easily find students you can connect with.
              </FeatureDescription>
            </FeatureItem>
            
            <FeatureItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <FeatureIcon>
                <FaUserGraduate />
              </FeatureIcon>
              <FeatureItemTitle>Connect with Seniors</FeatureItemTitle>
              <FeatureDescription>
                Get guidance, mentorship, and help with projects from seniors.
              </FeatureDescription>
            </FeatureItem>
            
            <FeatureItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <FeatureIcon>
                <FaBell />
              </FeatureIcon>
              <FeatureItemTitle>Event Notifications</FeatureItemTitle>
              <FeatureDescription>
                Stay informed about upcoming academic and social events.
              </FeatureDescription>
            </FeatureItem>
          </FeaturesGrid>
        </motion.div>
      </FeaturesSection>
      
      {/* Stats Section */}
      <StatsSection ref={statsRef}>
        <motion.div
          initial="hidden"
          animate={statsControls}
          variants={containerVariants}
        >
          <StatsGrid>
            <StatItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <StatIcon>
                <FaGraduationCap />
              </StatIcon>
              <StatNumber>60</StatNumber>
              <StatTitle>Students Per Batch</StatTitle>
            </StatItem>
            
            <StatItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <StatIcon>
                <FaUsers />
              </StatIcon>
              <StatNumber>30+</StatNumber>
              <StatTitle>Faculty Members</StatTitle>
            </StatItem>
            
            <StatItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <StatIcon>
                <FaLightbulb />
              </StatIcon>
              <StatNumber>100+</StatNumber>
              <StatTitle>Research Projects</StatTitle>
            </StatItem>
            
            <StatItem
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(229, 9, 20, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <StatIcon>
                <FaAward />
              </StatIcon>
              <StatNumber>50+</StatNumber>
              <StatTitle>Publications Per Year</StatTitle>
            </StatItem>
          </StatsGrid>
        </motion.div>
      </StatsSection>
      
      {/* CTA Section */}
      <Section>
        <CTASection ref={ctaRef}>
          <motion.div
            initial="hidden"
            animate={ctaControls}
            variants={containerVariants}
          >
            <CTATitle variants={itemVariants}>
              Don't get lost in your first year. Join EEEFlix today!
            </CTATitle>
            <CTADescription variants={itemVariants}>
              No more searching for the right connections. With EEEFlix, you'll find your rollmates and start your journey together. Our platform connects students across all years of study, making your university experience richer and more collaborative.
            </CTADescription>
            <motion.div variants={itemVariants}>
              <Button 
                onMouseEnter={handleButtonHover}
                onClick={handleButtonClick}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(229, 9, 20, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now <FaAngleRight />
              </Button>
            </motion.div>
          </motion.div>
        </CTASection>
      </Section>
    </PageContainer>
  );
};

export default About;
