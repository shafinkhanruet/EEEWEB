'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FaArrowRight, FaFilm, FaBookOpen, FaEllipsisV } from 'react-icons/fa';

// Components will be imported here

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradientHero};
  padding: 0 ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    z-index: -1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 4vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Button = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.gradientButton};
  color: white;
  box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3);
  
  &:hover {
    box-shadow: 0 15px 25px rgba(229, 9, 20, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(229, 9, 20, 0.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ResourcesButton = styled(motion.div)`
  margin-top: 1.5rem;
`;

const VerticalDots = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  height: 24px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
  margin: 2px 0;
`;

const PulsingButton = styled(Button)`
  background: ${({ theme }) => theme.colors.gold};
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(229, 9, 20, 0.4);
  
  &:hover {
    box-shadow: 0 15px 30px rgba(229, 9, 20, 0.5);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.15) 1%) center/15000%;
  }
  
  &:active:before {
    background-size: 0%;
    transition: background 0s;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(229, 9, 20, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(229, 9, 20, 0);
    }
  }
  
  animation: pulse 2s infinite;
`;

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <main>
      <HeroSection>
        <HeroContent
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <HeroTitle variants={itemVariants}>
            Welcome to EEEFLIX
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            Your ultimate entertainment platform with all your favorite movies and shows
          </HeroSubtitle>
          <ButtonGroup variants={itemVariants}>
            <Link href="/students" passHref legacyBehavior>
              <PrimaryButton>
                <FaFilm />
                Browse Students
                <FaArrowRight />
              </PrimaryButton>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <SecondaryButton>
                <FaBookOpen />
                Learn More
                <FaArrowRight />
              </SecondaryButton>
            </Link>
          </ButtonGroup>
          
          <ResourcesButton variants={pulseVariants}>
            <Link href="/resources" passHref legacyBehavior>
              <PulsingButton>
                <VerticalDots>
                  <Dot />
                  <Dot />
                  <Dot />
                </VerticalDots>
                Access Resources
                <FaArrowRight />
              </PulsingButton>
            </Link>
          </ResourcesButton>
        </HeroContent>
      </HeroSection>
      
      {/* Additional sections will be added here */}
    </main>
  );
} 