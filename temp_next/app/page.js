'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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
`;

const PrimaryButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.gradientButton};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.buttonGlow};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accentSoft};
  }
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
            <Link href="/students" passHref>
              <PrimaryButton as="a">Browse Students</PrimaryButton>
            </Link>
            <Link href="/about" passHref>
              <SecondaryButton as="a">Learn More</SecondaryButton>
            </Link>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
      
      {/* Additional sections will be added here */}
    </main>
  );
} 