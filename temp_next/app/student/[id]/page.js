'use client';

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaStar, FaFilm, FaAward } from 'react-icons/fa';
import { useNavbar } from '../../contexts/NavbarContext';

// Add global style for smooth scrolling
const GlobalScrollStyle = createGlobalStyle`
  html, body {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    font-size: 16px;
    touch-action: manipulation;
  }

  @media (max-width: 480px) {
    html, body {
      font-size: 14px;
    }
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    padding: 4rem 1rem 1rem;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};
  }
`;

const ProfileContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  padding: 2rem;
  background: #141414;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(229, 9, 20, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(40, 40, 40, 0.5);
  
  /* Netflix background pattern */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(229, 9, 20, 0.06) 0%, transparent 25%),
      radial-gradient(circle at 80% 30%, rgba(229, 9, 20, 0.06) 0%, transparent 25%),
      radial-gradient(circle at 30% 60%, rgba(229, 9, 20, 0.06) 0%, transparent 25%),
      radial-gradient(circle at 70% 80%, rgba(229, 9, 20, 0.06) 0%, transparent 25%);
    background-size: 200% 200%;
    z-index: -1;
    opacity: 0.9;
    animation: netflixBgPattern 15s ease infinite alternate;
    mix-blend-mode: soft-light;
  }
  
  /* Netflix top border */
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
  
  /* Netflix outer glow */
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
  
  /* Netflix border effect */
  .netflix-border {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(90deg, rgba(229, 9, 20, 0.6), rgba(255, 255, 255, 0.15), rgba(229, 9, 20, 0.6));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 1;
    pointer-events: none;
    opacity: 0.9;
    animation: netflixBorderRotate 8s linear infinite;
  }
  
  /* Netflix particles effect */
  .netflix-particles {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 90% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
      radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.12) 0%, transparent 1%);
    background-size: 150% 150%;
    z-index: -1;
    opacity: 0.9;
    animation: netflixParticles 20s linear infinite;
    pointer-events: none;
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
    pointer-events: none;
    animation: netflixGlowPulse 4s ease-in-out infinite;
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
  
  @keyframes netflixBorderPulse {
    0%, 100% { opacity: 0.6; filter: blur(0.5px); }
    50% { opacity: 1; filter: blur(1px); }
  }
  
  @keyframes netflixBorderRotate {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes netflixGlowPulse {
    0%, 100% { opacity: 0.5; transform: translateY(5px); }
    50% { opacity: 0.9; transform: translateY(0); }
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
  
  @keyframes netflixScanline {
    0% { top: -20%; }
    100% { top: 120%; }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const ImageContainer = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background: ${({ theme }) => theme.colors.cardBackground};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Name = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Details = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

const DetailItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }
`;

const Bio = styled(motion.p)`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    line-height: 1.5;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  position: relative;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent};
    
    @media (max-width: 480px) {
      width: 40px;
      height: 2px;
      bottom: -6px;
    }
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
`;

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    clipPath: "circle(0% at center)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    clipPath: "circle(100% at center)",
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const containerVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3
    }
  }
};

// Placeholder student data
const studentsData = {
  1: {
    id: 1,
    name: 'Emma Thompson',
    major: 'Film Production',
    year: 'Senior',
    gpa: '3.9',
    bio: 'Emma is a talented filmmaker with a passion for documentary storytelling. She has worked on numerous short films and has been recognized for her unique visual style and compelling narrative approach.',
    specialization: 'Documentary Filmmaking',
    image: 'https://via.placeholder.com/400x500?text=Emma+Thompson',
    awards: ['Best Student Film 2023', 'Documentary Excellence Award'],
    projects: [
      {
        id: 1,
        title: 'Urban Stories',
        description: 'A documentary series exploring urban life across different cities.',
        image: 'https://via.placeholder.com/300x180?text=Urban+Stories',
      },
      {
        id: 2,
        title: 'The Forgotten Ones',
        description: 'A touching documentary about homeless veterans in America.',
        image: 'https://via.placeholder.com/300x180?text=The+Forgotten+Ones',
      },
      {
        id: 3,
        title: 'Nature\'s Voice',
        description: 'An environmental documentary highlighting climate change impacts.',
        image: 'https://via.placeholder.com/300x180?text=Nature\'s+Voice',
      }
    ]
  },
  2: {
    id: 2,
    name: 'James Wilson',
    major: 'Screenwriting',
    year: 'Junior',
    gpa: '3.7',
    bio: 'James is a creative screenwriter with a knack for dialogue and character development. His scripts have been praised for their originality and emotional depth, earning him recognition in several student screenwriting competitions.',
    specialization: 'Drama & Thriller',
    image: 'https://via.placeholder.com/400x500?text=James+Wilson',
    awards: ['Outstanding Screenplay 2022', 'Rising Talent Award'],
    projects: [
      {
        id: 1,
        title: 'Echoes of Yesterday',
        description: 'A psychological thriller about memory and identity.',
        image: 'https://via.placeholder.com/300x180?text=Echoes+of+Yesterday',
      },
      {
        id: 2,
        title: 'Family Ties',
        description: 'A drama exploring complex family relationships and secrets.',
        image: 'https://via.placeholder.com/300x180?text=Family+Ties',
      }
    ]
  }
};

export default function StudentProfile() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setShowNavbar } = useNavbar();

  // Hide navbar when component mounts, restore when it unmounts
  useEffect(() => {
    setShowNavbar(false);
    
    // Add a class to the body to hide navbar
    document.body.classList.add('hide-navbar');
    
    return () => {
      // Show navbar when component unmounts
      setShowNavbar(true);
      
      // Remove the class from body
      document.body.classList.remove('hide-navbar');
    };
  }, [setShowNavbar]);

  useEffect(() => {
    // Simulate fetch from API
    if (params.id) {
      // Get student data based on ID
      const studentData = studentsData[params.id];
      if (studentData) {
        setStudent(studentData);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  if (!student) {
    return (
      <PageContainer>
        <div>Student not found</div>
      </PageContainer>
    );
  }

  return (
    <>
    <GlobalScrollStyle />
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="student-profile-container"
    >
      <PageContainer>
        <Link href="/students" passHref>
          <BackButton 
            className="back-button"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(229, 9, 20, 0.1)",
              borderColor: "rgba(229, 9, 20, 0.8)",
              color: "rgba(229, 9, 20, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Students
          </BackButton>
        </Link>
        
        <ProfileContainer
          variants={containerVariants}
        >
          <div className="netflix-outer-glow" />
          <div className="netflix-border" />
          <div className="netflix-particles" />
          <div className="netflix-bottom-glow" />
          <div className="netflix-scanline" />
          <ImageContainer
            variants={imageVariants}
          >
            <img src={student.image} alt={student.name} />
          </ImageContainer>
          
          <InfoContainer
            variants={itemVariants}
          >
            <div>
              <Name
                variants={itemVariants}
              >{student.name}</Name>
              <Details
                variants={itemVariants}
              >
                <DetailItem
                  variants={itemVariants}
                >
                  <FaStar /> {student.major}
                </DetailItem>
                <DetailItem
                  variants={itemVariants}
                >
                  <FaFilm /> {student.specialization}
                </DetailItem>
                <DetailItem
                  variants={itemVariants}
                >
                  <FaAward /> GPA: {student.gpa}
                </DetailItem>
                <DetailItem
                  variants={itemVariants}
                >{student.year} Year</DetailItem>
              </Details>
              <Bio
                variants={itemVariants}
              >{student.bio}</Bio>
            </div>
            
            {student.awards && student.awards.length > 0 && (
              <motion.div
                variants={itemVariants}
              >
                <SectionTitle
                  variants={itemVariants}
                >Awards & Recognition</SectionTitle>
                <motion.ul>
                  {student.awards.map((award, index) => (
                    <motion.li 
                      key={index}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >{award}</motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
            
            {student.projects && student.projects.length > 0 && (
              <motion.div
                variants={itemVariants}
              >
                <SectionTitle
                  variants={itemVariants}
                >Projects</SectionTitle>
                <ProjectsGrid
                  variants={itemVariants}
                >
                  {student.projects.map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <ProjectImage>
                        <img src={project.image} alt={project.title} />
                      </ProjectImage>
                      <ProjectInfo>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                      </ProjectInfo>
                    </ProjectCard>
                  ))}
                </ProjectsGrid>
              </motion.div>
            )}
          </InfoContainer>
        </ProfileContainer>
      </PageContainer>
    </motion.div>
    </>
  );
} 