import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled(motion.section)`
  padding: ${props => props.padding || '5rem 0'};
  position: relative;
  overflow: hidden;
  background: ${props => props.background || 'transparent'};
  perspective: 1200px;
  transform-style: preserve-3d;
  will-change: transform;
`;

const SectionInner = styled(motion.div)`
  max-width: ${props => props.fullWidth ? '100%' : '1200px'};
  margin: 0 auto;
  padding: ${props => props.fullWidth ? '0' : '0 2rem'};
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  will-change: transform;
`;

const SectionHeader = styled(motion.div)`
  text-align: ${props => props.align || 'center'};
  margin-bottom: ${props => props.spacing || '3rem'};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
  position: relative;
  display: inline-block;
  letter-spacing: -0.5px;
  font-weight: 800;
  
  ${props => props.gradient && `
    background: ${props.theme.colors.gradientPremium};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: ${props.theme.shadows.textGlow};
  `}
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: ${props => props.align === 'left' ? '80px' : '120px'};
    height: 3px;
    background: ${props => props.gradient ? 'linear-gradient(90deg, #3D5AF1, #D4AF37)' : props.theme.colors.gold};
    left: ${props => props.align === 'left' ? '0' : '50%'};
    transform: ${props => props.align === 'left' ? 'none' : 'translateX(-50%)'};
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${props => props.theme.shadows.goldGlow};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 700px;
  margin: ${props => props.align === 'center' ? '0 auto' : '0'};
  margin-top: 1.5rem;
  line-height: 1.7;
  letter-spacing: 0.2px;
  font-weight: 400;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

// Background decorative elements - simplified for better performance
const BackgroundDecoration = styled(motion.div)`
  position: absolute;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
`;

const CircleDecoration = styled(BackgroundDecoration)`
  border-radius: 50%;
  background: ${props => props.color || 'rgba(61, 90, 241, 0.15)'};
  filter: blur(${props => props.blur || '40px'});
  will-change: transform;
  box-shadow: ${props => props.glow ? props.theme.shadows.glow : 'none'};
`;

const LineDecoration = styled(BackgroundDecoration)`
  height: 2px;
  background: linear-gradient(90deg, transparent, ${props => props.color || 'rgba(212, 175, 55, 0.25)'}, transparent);
  will-change: transform;
`;

const Section = ({ 
  children, 
  title, 
  subtitle, 
  align = 'center', 
  padding,
  background,
  fullWidth = false,
  headerSpacing,
  id,
  gradientTitle = false,
  decorations = true,
  parallax = true
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '-100px 0px'
  });
  
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state after initial render
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Simplified parallax effect for better performance
  const contentY = useTransform(scrollY, [0, 1000], [0, -15]);
  
  React.useEffect(() => {
    // Only run animations after component is mounted
    if (!isMounted) return;
    
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView, isMounted]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };
  
  // Reduced number of decorative elements for better performance with premium colors
  const decorationElements = [
    { type: 'circle', top: '10%', left: '5%', size: 150, color: 'rgba(61, 90, 241, 0.1)', blur: '40px', glow: true },
    { type: 'line', bottom: '20%', right: '0', width: '30%', color: 'rgba(212, 175, 55, 0.15)' },
  ];

  return (
    <SectionContainer
      ref={ref}
      id={id}
      padding={padding}
      background={background}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Decorative background elements */}
      {decorations && decorationElements.map((decoration, index) => {
        if (decoration.type === 'circle') {
          return (
            <CircleDecoration
              key={`decoration-${index}`}
              style={{
                top: decoration.top,
                left: decoration.left,
                right: decoration.right,
                bottom: decoration.bottom,
                width: decoration.size,
                height: decoration.size,
              }}
              color={decoration.color}
              blur={decoration.blur}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          );
        } else if (decoration.type === 'line') {
          return (
            <LineDecoration
              key={`decoration-${index}`}
              style={{
                top: decoration.top,
                left: decoration.left,
                right: decoration.right,
                bottom: decoration.bottom,
                width: decoration.width,
              }}
              color={decoration.color}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          );
        }
        return null;
      })}
      
      <SectionInner 
        fullWidth={fullWidth}
        style={parallax ? { y: contentY } : {}}
      >
        {(title || subtitle) && (
          <SectionHeader align={align} spacing={headerSpacing}>
            {title && (
              <SectionTitle 
                align={align} 
                variants={itemVariants}
                gradient={gradientTitle}
                style={parallax ? { y: contentY } : {}}
              >
                {title}
              </SectionTitle>
            )}
            {subtitle && (
              <SectionSubtitle 
                align={align} 
                variants={itemVariants}
                style={parallax ? { y: contentY } : {}}
              >
                {subtitle}
              </SectionSubtitle>
            )}
          </SectionHeader>
        )}
        {children}
      </SectionInner>
    </SectionContainer>
  );
};

export default Section;
