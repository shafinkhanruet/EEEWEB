import React, { useEffect, useState, useRef, useMemo, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaPhone, FaFacebook, FaStar, FaGraduationCap, 
  FaLinkedin, FaGithub, FaEnvelope, FaPlus, FaComment, FaWhatsapp, FaExclamationTriangle, 
  FaUserSlash, FaAddressCard, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, 
  FaUserGraduate, FaChartLine, FaAward, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { allStudents } from '../data/students';
import { NavbarContext } from '../contexts/NavbarContext';

// Overlay for premium effect
const PageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  z-index: -1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 15% 50%, rgba(229, 9, 20, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(229, 9, 20, 0.05) 0%, transparent 50%);
    z-index: -1;
    opacity: 0.7;
  }
`;

const ProfileContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 auto;
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(18, 18, 18, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  
  &:hover {
    background: rgba(229, 9, 20, 0.9);
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 5px 20px rgba(229, 9, 20, 0.4);
  }
  
  svg {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const ProfileCard = styled(motion.div)`
  background: #141414;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(40, 40, 40, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  z-index: 2;
  backdrop-filter: blur(10px);
  
  /* Netflix reflective shimmer */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.08), transparent);
    background-size: 200% 100%;
    animation: netflixShimmer 8s infinite linear;
    pointer-events: none;
    opacity: 0.9;
    z-index: 0;
  }
  
  /* Netflix signature top border */
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.9), transparent);
    z-index: 3;
    animation: netflixBorderPulse 4s infinite ease-in-out;
    opacity: 0.9;
    filter: blur(0.5px);
  }
  
  /* Netflix card border effect */
  .netflix-card-border {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1.5px;
    background: linear-gradient(90deg, rgba(229, 9, 20, 0.6), rgba(255, 255, 255, 0.15), rgba(229, 9, 20, 0.6));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 1;
    pointer-events: none;
    animation: netflixBorderRotate 8s linear infinite;
    opacity: 0.9;
  }
  
  /* Netflix outer glow effect */
  .netflix-outer-glow {
    position: absolute;
    inset: -3px;
    border-radius: 14px;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(229, 9, 20, 0.5),
      transparent 70%
    );
    filter: blur(10px);
    opacity: 0.6;
    z-index: -1;
    animation: netflixOuterGlow 4s ease-in-out infinite;
    pointer-events: none;
  }
  
  /* Netflix background pattern */
  .netflix-bg-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(229, 9, 20, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 80% 30%, rgba(229, 9, 20, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 30% 60%, rgba(229, 9, 20, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 70% 80%, rgba(229, 9, 20, 0.05) 0%, transparent 25%);
    background-size: 200% 200%;
    z-index: -1;
    opacity: 0.9;
    animation: netflixBgPattern 15s ease infinite alternate;
    mix-blend-mode: soft-light;
  }
  
  /* Netflix particles */
  .netflix-particles {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 90% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 1%),
      radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.1) 0%, transparent 1%);
    background-size: 150% 150%;
    z-index: -1;
    opacity: 0.9;
    animation: netflixParticles 20s linear infinite;
  }
  
  /* Netflix bottom glow */
  .netflix-bottom-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: radial-gradient(ellipse at center bottom, rgba(229, 9, 20, 0.25), transparent 70%);
    opacity: 0.7;
    z-index: -1;
    animation: netflixGlowPulse 4s ease-in-out infinite;
  }
  
  /* Netflix light beam effect */
  .netflix-light-beams {
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(130deg, transparent 0%, rgba(229, 9, 20, 0.05) 40%, transparent 60%),
      linear-gradient(220deg, transparent 10%, rgba(229, 9, 20, 0.05) 50%, transparent 90%);
    background-size: 200% 200%, 250% 250%;
    mix-blend-mode: lighten;
    z-index: -1;
    opacity: 0.6;
    animation: netflixLightBeams 10s ease-in-out infinite alternate;
  }
  
  /* Netflix scanline effect */
  .netflix-scanline {
    position: absolute;
    width: 120%;
    height: 8px;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(229, 9, 20, 0.1) 10%,
      rgba(229, 9, 20, 0.5) 50%,
      rgba(229, 9, 20, 0.1) 90%,
      transparent 100%
    );
    opacity: 0.3;
    filter: blur(1px);
    z-index: 4;
    left: -10%;
    top: -20%;
    animation: netflixScanline 6s linear infinite;
    pointer-events: none;
  }
  
  @keyframes netflixShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes netflixBorderRotate {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes netflixBorderPulse {
    0%, 100% { opacity: 0.6; filter: blur(0.5px); }
    50% { opacity: 1; filter: blur(1px); }
  }
  
  @keyframes netflixGlowPulse {
    0%, 100% { opacity: 0.5; transform: translateY(5px); }
    50% { opacity: 0.8; transform: translateY(0); }
  }
  
  @keyframes netflixOuterGlow {
    0%, 100% { opacity: 0.4; filter: blur(8px); }
    50% { opacity: 0.7; filter: blur(12px); }
  }
  
  @keyframes netflixBgPattern {
    0% { background-position: 0% 0%; }
    25% { background-position: 50% 25%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 75%; }
    100% { background-position: 0% 100%; }
  }
  
  @keyframes netflixParticles {
    0% { background-position: 0% 0%; }
    25% { background-position: 25% 25%; }
    50% { background-position: 50% 50%; }
    75% { background-position: 75% 75%; }
    100% { background-position: 100% 100%; }
  }
  
  @keyframes netflixLightBeams {
    0% { 
      background-position: 0% 0%, 0% 0%; 
      opacity: 0.4;
    }
    50% { 
      background-position: 100% 100%, 100% 0%; 
      opacity: 0.8;
    }
    100% { 
      background-position: 0% 0%, 0% 100%; 
      opacity: 0.6;
    }
  }
  
  @keyframes netflixScanline {
    0% {
      top: -20%;
    }
    100% {
      top: 120%;
    }
  }
`;

const AvatarOuterContainer = styled(motion.div)`
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

const AvatarGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.5) 0%, rgba(0, 0, 0, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  filter: blur(10px);
`;

const AvatarContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid #E50914;
  z-index: 1;
  background-color: #181818;
  box-shadow: 0 0 25px rgba(229, 9, 20, 0.6);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 0 35px rgba(229, 9, 20, 0.8);
    border-color: #FF0A16;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }
  
  img {
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const StatusBadge = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(135deg, #E50914, #B20710);
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform-origin: bottom right;
  letter-spacing: 1px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StudentName = styled(motion.h1)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0.5rem 0;
  text-align: center;
  background: linear-gradient(to right, #FFFFFF, #E5E5E5, #FFFFFF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StudentId = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0.5rem 0 1.5rem;
  color: #B3B3B3;
  text-align: center;
  letter-spacing: 1px;
  background: linear-gradient(to right, #B3B3B3, #FFFFFF, #B3B3B3);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    width: 60px;
    background: linear-gradient(to right, transparent, rgba(229, 9, 20, 0.5), transparent);
  }
`;

const ProfileSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  margin: 2rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoSection = styled(motion.div)`
  background: rgba(25, 25, 25, 0.9);
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(80, 80, 80, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(30, 30, 30, 0.95);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(229, 9, 20, 0.3);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #E50914, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(229, 9, 20, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover:after {
    opacity: 1;
  }
`;

const SectionTitle = styled.h3`
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(229, 9, 20, 0.3);
  position: relative;
  
  svg {
    color: #E50914;
    font-size: 1.3rem;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 30%;
    height: 2px;
    background: #E50914;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  ${InfoSection}:hover &:after {
    transform: scaleX(1);
  }
`;

const InfoSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #E0E0E0;
  font-size: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: #FFFFFF;
    transform: translateX(8px);
    border-bottom-color: rgba(229, 9, 20, 0.4);
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: #E50914;
    transition: transform 0.3s ease;
    transform: translateX(0);
  }
  
  &:hover:before {
    transform: translateX(20px);
  }
  
  svg {
    color: #E50914;
    font-size: 1.2rem;
    min-width: 20px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.2);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: #E0E0E0;
  font-size: 1.8rem;
  background: linear-gradient(135deg, rgba(229, 9, 20, 0.2), rgba(229, 9, 20, 0.4));
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(229, 9, 20, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    color: #FFFFFF;
    transform: translateY(-8px) scale(1.15);
    box-shadow: 0 15px 25px rgba(229, 9, 20, 0.5);
    background: linear-gradient(135deg, rgba(229, 9, 20, 0.5), rgba(229, 9, 20, 0.7));
    
    &:before {
      transform: translateX(100%) rotate(45deg);
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    transform: skewX(-25deg);
    transition: transform 0.6s ease;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #E50914, #B20710)' : 
    'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))'};
  color: #FFFFFF;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  min-width: 180px;
  
  &:hover {
    box-shadow: 0 8px 25px ${props => props.primary ? 
      'rgba(229, 9, 20, 0.4)' : 
      'rgba(0, 0, 0, 0.5)'};
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
  color: #E5E5E5;
  font-size: 1.2rem;
  background-color: rgba(18, 18, 18, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// Animation Variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8,
      ease: "easeInOut"
    } 
  }
};
  
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};
  
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(8px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 15px rgba(229, 9, 20, 0.4)", 
      "0 0 25px rgba(229, 9, 20, 0.7)", 
      "0 0 15px rgba(229, 9, 20, 0.4)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  }
};

const cardHoverVariants = {
  initial: { 
    y: 0,
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  hover: { 
    y: -15, 
    boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9)",
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  }
};

const QuoteContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.9), rgba(229, 9, 20, 0.15), rgba(25, 25, 25, 0.9));
  padding: 2rem 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0 2.5rem;
  text-align: center;
  font-family: 'Hind Siliguri', sans-serif !important;
  font-style: normal;
  color: #FFFFFF;
  position: relative;
  line-height: 1.6;
  font-size: 1rem;
  width: 100%;
  max-width: 450px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(229, 9, 20, 0.25);
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;
  letter-spacing: 0.02em;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: translateZ(0);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, rgba(229, 9, 20, 0.2), transparent, rgba(229, 9, 20, 0.2));
    border-radius: 11px;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.7;
    animation: glowPulse 3s infinite alternate;
  }
  
  @keyframes glowPulse {
    0% { opacity: 0.4; filter: blur(8px); }
    100% { opacity: 0.7; filter: blur(10px); }
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 1.5rem;
    min-height: 150px;
    max-width: 90%;
  }
  
  /* Add specific styling for Bengali text */
  &:lang(bn), & *:lang(bn) {
    font-family: 'Hind Siliguri', sans-serif !important;
    direction: ltr;
    unicode-bidi: embed;
    line-height: 1.8;
    text-align: center;
    display: block;
    margin: 0.5rem auto;
    font-weight: 500;
    font-size: 1.4rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const QuoteIcon = styled(motion.span)`
  color: #E50914;
  font-size: 2rem;
  display: inline-block;
  margin: 0 0.4rem;
  vertical-align: text-top;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 0 5px rgba(229, 9, 20, 0.5));
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetailsCard = styled(motion.div)`
  background: rgba(18, 18, 18, 0.9);
  border-radius: 12px;
  padding: 1.8rem;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(70, 70, 70, 0.4);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    background: rgba(25, 25, 25, 0.95);
    border-color: rgba(100, 100, 100, 0.5);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to left, #E50914, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const ParticlesBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.5;
`;

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  padding: 2rem;
`;

const LoadingCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid rgba(229, 9, 20, 0.3);
  border-top: 3px solid #E50914;
  border-radius: 50%;
  margin-bottom: 2rem;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const LoadingSubText = styled.p`
  font-size: 1rem;
  color: #E5E5E5;
  text-align: center;
  opacity: 0.8;
`;

// Error components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #E50914;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease infinite;

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const ErrorText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

// After SocialLink styled component, add this new styled component for edit button
const EditContactButton = styled(motion.button)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(18, 18, 18, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    background: rgba(229, 9, 20, 0.9);
    transform: scale(1.1);
    box-shadow: 0 5px 12px rgba(229, 9, 20, 0.4);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const EditModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  backdrop-filter: blur(5px);
`;

const EditForm = styled(motion.div)`
  background: linear-gradient(to bottom, rgba(30, 30, 30, 0.95), rgba(15, 15, 15, 0.98));
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(229, 9, 20, 0.3);
  position: relative;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    
    svg {
      color: #E50914;
    }
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.9rem;
    color: #E0E0E0;
  }
  
  input {
    padding: 0.8rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #E50914;
      box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.25);
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const FormButton = styled(motion.button)`
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #E50914, #B20710)' : 
    'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))'};
  color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  
  &:hover {
    box-shadow: 0 6px 15px ${props => props.primary ? 
      'rgba(229, 9, 20, 0.4)' : 
      'rgba(0, 0, 0, 0.5)'};
    transform: translateY(-2px);
  }
`;

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { setShowNavbar } = useContext(NavbarContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    phone: '',
    fbLink: ''
  });
  const [isContactUpdated, setIsContactUpdated] = useState(false);
  
  // Hide the navbar when component mounts
  useEffect(() => {
    setShowNavbar(false);
    
    // Restore navbar when component unmounts
    return () => {
      setShowNavbar(true);
    };
  }, [setShowNavbar]);
  
  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 50
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.7
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };
  
  const overlayVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const cardHoverVariants = {
    initial: {
      y: 0
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  // Audio setup for interactions
  const [hoverSound] = useState(new Audio('/sounds/hover.mp3'));
  const [clickSound] = useState(new Audio('/sounds/click.mp3'));
  
  const playHoverSound = () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(err => console.log('Audio play error:', err));
  };
  
  const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.log('Audio play error:', err));
  };
  
  // Generate mock data for development
  const mockPhone = useMemo(() => {
    const numberBase = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+880 ${numberBase.toString().substring(0, 5)}-${numberBase.toString().substring(5, 10)}`;
  }, []);
  
  const facebookProfileUrl = useMemo(() => {
    return `https://facebook.com/${id.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  }, [id]);
  
  // Function to fetch FB link and contact number from JSON
  const fetchContactInfo = async (studentId) => {
    try {
      const response = await fetch('/assets/contacts_2301001_to_2301060.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contact data');
      }
      const data = await response.json();
      const contactData = data.find(s => s.No === parseInt(studentId));
      
      if (contactData) {
        return {
          phone: contactData['Contact No'] || '',
          fbLink: contactData['FB ID Link'] || ''
        };
      }
      return null;
    } catch (err) {
      console.error("Error fetching contact data:", err);
      return null;
    }
  };
  
  // Load student data
  useEffect(() => {
    setIsMounted(true);
    
    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
    
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd fetch from an API
        // For demo purposes, simulate API call delay and create mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get student ID from URL parameter
        const studentId = id || '2301019';
        
        // Try to find the student in allStudents first
        let foundStudent = allStudents.find(s => s.id === studentId || s.id.includes(studentId));
        
        // If no matching student, create a mock student
        if (!foundStudent) {
          const studentIndex = parseInt(studentId.slice(-2)) || 0;
          const avatarPath = `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-${studentIndex + 1}.jpg`;
          
          foundStudent = {
            id: studentId,
            name: `Student ${studentId}`,
            image: avatarPath
          };
        }
        
        // Try to get real contact info from JSON
        const contactInfo = await fetchContactInfo(studentId);
        
        // Create enriched student data
        const enrichedStudent = {
          ...foundStudent,
          department: 'Electrical & Electronic Engineering',
          series: '23',
          section: 'A',
          status: 'Active',
          phone: contactInfo?.phone || mockPhone,
          address: 'University Campus, Building C',
          facebook: contactInfo?.fbLink || facebookProfileUrl,
        };
        
        // Set up form with current values
        setContactForm({
          phone: enrichedStudent.phone,
          fbLink: enrichedStudent.facebook
        });
        
        console.log("Student data:", enrichedStudent);
        setStudent(enrichedStudent);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student profile");
        setLoading(false);
      }
    };
    
    fetchStudentData();
    
    return () => {
      setIsMounted(false);
    };
  }, [id, mockPhone, allStudents, facebookProfileUrl]);
  
  // Add function to handle saving contact info
  const handleSaveContact = async () => {
    try {
      playClickSound();
      setIsContactUpdated(true);
      
      // Send update to the API
      const response = await fetch('/api/updateContacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: parseInt(student.id),
          contactNo: contactForm.phone,
          fbLink: contactForm.fbLink
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contact');
      }
      
      // Update student data locally
      setStudent({
        ...student,
        phone: contactForm.phone,
        facebook: contactForm.fbLink
      });
      
      // Success message
      setIsContactUpdated(true);
      
      // Close edit modal after a delay
      setTimeout(() => {
        setIsEditModalOpen(false);
        setIsContactUpdated(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error saving contact:', error);
      setIsContactUpdated(false);
    }
  };
  
  // Add handler for form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };
  
  // Initialize particles once student data is loaded
  useEffect(() => {
    if (isMounted && !loading && student) {
      try {
        // Initialize any background effects or animations here
        const particles = document.getElementById('tsparticles');
        if (particles) {
          // Configure particle animation (if you have a particle library)
          console.log('Particles initialized');
        }
      } catch (error) {
        console.error('Error initializing effects:', error);
      }
    }
  }, [isMounted, loading, student]);
  
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingCircle />
        <LoadingText>Loading Student Profile...</LoadingText>
        <LoadingSubText>Please wait...</LoadingSubText>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon><FaExclamationTriangle /></ErrorIcon>
        <ErrorText>{error}</ErrorText>
        <BackButton 
          onClick={() => {
            playClickSound();
            navigate('/students');
          }}
          onMouseEnter={playHoverSound}
          variants={itemVariants}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 9, 20, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Students
        </BackButton>
      </ErrorContainer>
    );
  }
  
  if (!student) {
    return (
      <ErrorContainer>
        <ErrorIcon><FaUserSlash /></ErrorIcon>
        <ErrorText>Student not found</ErrorText>
        <BackButton 
          onClick={() => {
            playClickSound();
            navigate('/students');
          }}
          onMouseEnter={playHoverSound}
          variants={itemVariants}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 9, 20, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Students
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
    >
      <ProfileContainer
        className="student-profile-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        ref={containerRef}
      >
        <PageOverlay 
          initial="hidden"
          animate="visible"
          variants={overlayVariants}
        />
        
        <BackButton 
          className="back-button"
          onClick={() => {
            playClickSound();
            navigate('/students');
          }}
          onMouseEnter={playHoverSound}
          variants={itemVariants}
          whileHover={{ scale: 1.25, rotate: -10, backgroundColor: "rgba(229, 9, 20, 0.9)" }}
          whileTap={{ scale: 0.85, rotate: 0 }}
          animate={{ 
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <FaArrowLeft />
        </BackButton>
        
        <ProfileCard 
          initial="initial"
          whileHover="hover"
          variants={cardHoverVariants}
          animate={{ 
            boxShadow: ["0 20px 50px rgba(0, 0, 0, 0.8)", "0 25px 60px rgba(229, 9, 20, 0.2), 0 25px 60px rgba(0, 0, 0, 0.8)", "0 20px 50px rgba(0, 0, 0, 0.8)"],
            transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <div className="netflix-outer-glow" />
          <div className="netflix-card-border" />
          <div className="netflix-bg-pattern" />
          <div className="netflix-particles" />
          <div className="netflix-bottom-glow" />
          <div className="netflix-light-beams" />
          <div className="netflix-scanline" />
          <AvatarOuterContainer 
            variants={itemVariants}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.4
              }
            }}
            {...floatAnimation}
          >
            <AvatarGlow 
              animate={{ 
                opacity: [0.5, 0.9, 0.5], 
                scale: [1, 1.15, 1],
                filter: ["blur(10px)", "blur(15px)", "blur(10px)"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
            <AvatarContainer
              whileHover={{ scale: 1.12, boxShadow: "0 0 40px rgba(229, 9, 20, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 25px rgba(229, 9, 20, 0.4)", "0 0 35px rgba(229, 9, 20, 0.7)", "0 0 25px rgba(229, 9, 20, 0.4)"],
                transition: { duration: 3, repeat: Infinity, repeatType: "mirror" }
              }}
            >
              {student && student.image ? (
                <img 
                  src={student.image} 
                  alt={student.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }} 
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: '#E5E5E5',
                  backgroundColor: '#181818',
                  borderRadius: '50%'
                }}>
                  {student && student.name ? student.name.charAt(0) : 'S'}
                </div>
              )}
            </AvatarContainer>
            <StatusBadge
              initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateZ: 0,
                transition: {
                  delay: 0.9,
                  type: "spring",
                  stiffness: 500,
                  damping: 15
                }
              }}
              whileHover={{ 
                scale: 1.2, 
                rotateZ: 5,
                boxShadow: "0 8px 20px rgba(229, 9, 20, 0.6)"
              }}
            >
              EEE
            </StatusBadge>
          </AvatarOuterContainer>
          
          <StudentName 
            variants={itemVariants}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 0.6,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1.0]
              }
            }}
            whileHover={{ scale: 1.05, letterSpacing: "1.5px", textShadow: "0 0 15px rgba(229, 9, 20, 0.5)" }}
          >
            {student.name}
          </StudentName>
          
          <StudentId 
            variants={itemVariants}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 0.7,
                duration: 0.7
              }
            }}
            whileHover={{ letterSpacing: "2px" }}
          >
            ID: {student.id}
          </StudentId>
          
          <QuoteContainer 
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9, rotateX: 20, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              y: 0,
              transition: {
                delay: 0.8,
                duration: 0.7,
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(229, 9, 20, 0.4)",
              rotateX: 8,
              border: "1px solid rgba(229, 9, 20, 0.5)" 
            }}
          >
            <QuoteIcon
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.8, duration: 0.3 }
              }}
            >❝</QuoteIcon>
            <span lang="bn" style={{ 
              display: 'block', 
              padding: '1rem 0.5rem', 
              textAlign: 'center', 
              width: '100%',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textShadow: '0 2px 3px rgba(0, 0, 0, 0.4)',
              margin: '0.5rem auto',
              lineHeight: 1.8,
              background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.05), transparent, rgba(229, 9, 20, 0.05))',
              borderRadius: '8px'
            }}>
              {student.quote || "Electricity is the power that fuels our future"}
            </span>
            <QuoteIcon
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.9, duration: 0.3 }
              }}
            >❞</QuoteIcon>
            <div style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.8rem', 
              opacity: 0.9,
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}>
              — Student of RUET EEE Section A
            </div>
          </QuoteContainer>
          
          <ProfileSections>
            <InfoSection 
              variants={itemVariants}
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              animate={{ 
                opacity: 1, 
                x: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.9,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
              whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)" }}
            >
              <EditContactButton
                onClick={() => {
                  playClickSound();
                  setIsEditModalOpen(true);
                }}
                onMouseEnter={playHoverSound}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlus />
              </EditContactButton>
              <SectionTitle>
                <FaAddressCard /> Contact Information
              </SectionTitle>
              <InfoSectionContent>
                <InfoItem>
                  <FaPhone /> {student ? student.phone : '+880 1234-567-890'}
                </InfoItem>
                <InfoItem>
                  <FaMapMarkerAlt /> University Campus, Building C
                </InfoItem>
                <SocialLinks
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 1.0,
                      duration: 0.5
                    }
                  }}
                >
                  <SocialLink 
                    href={student.facebook} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        delay: 1.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                  >
                    <FaFacebookF />
                  </SocialLink>
                </SocialLinks>
              </InfoSectionContent>
            </InfoSection>
            
            <DetailsCard
              variants={itemVariants}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ 
                opacity: 1, 
                x: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.9,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
              whileHover={{ y: -12, scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)" }}
            >
              <SectionTitle>
                <FaUserGraduate /> Academic Profile
              </SectionTitle>
              <InfoSectionContent>
                <InfoItem>
                  <FaUniversity /> Department: {student ? student.department : 'Electrical & Electronic Engineering'}
                </InfoItem>
                <InfoItem>
                  <FaCalendarAlt /> Series: {student ? student.series : '23'}
                </InfoItem>
                <InfoItem>
                  <FaAward /> Section: {student ? student.section : 'A'}
                </InfoItem>
                <InfoItem>
                  <FaChartLine /> Status: Active
                </InfoItem>
              </InfoSectionContent>
            </DetailsCard>
          </ProfileSections>
        </ProfileCard>
        
        {/* Contact Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <EditModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
            >
              <EditForm
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2><FaAddressCard /> Edit Contact Information</h2>
                
                {isContactUpdated && (
                  <div style={{ 
                    padding: '0.8rem', 
                    borderRadius: '4px',
                    background: 'rgba(40, 167, 69, 0.2)',
                    color: '#28a745',
                    marginBottom: '1rem'
                  }}>
                    Contact information updated successfully!
                  </div>
                )}
                
                <FormField>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="text"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleFormChange}
                    placeholder="Enter phone number"
                  />
                </FormField>
                
                <FormField>
                  <label htmlFor="fbLink">Facebook Profile Link</label>
                  <input 
                    type="text"
                    id="fbLink"
                    name="fbLink"
                    value={contactForm.fbLink}
                    onChange={handleFormChange}
                    placeholder="Enter Facebook profile URL"
                  />
                </FormField>
                
                <FormActions>
                  <FormButton 
                    onClick={() => setIsEditModalOpen(false)}
                    onMouseEnter={playHoverSound}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </FormButton>
                  <FormButton 
                    primary
                    onClick={handleSaveContact}
                    onMouseEnter={playHoverSound}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Changes
                  </FormButton>
                </FormActions>
              </EditForm>
            </EditModal>
          )}
        </AnimatePresence>
      </ProfileContainer>
    </motion.div>
  );
};

export default StudentProfile; 