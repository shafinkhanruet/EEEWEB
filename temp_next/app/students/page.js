'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FaStar, FaGraduationCap, FaFilm, FaHeart } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 5rem 1rem 1.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2.5rem;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
`;

const StudentCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  // Regular hover effect for desktop
  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: ${({ theme }) => theme.shadows.large};
    }
  }
  
  // Touch-friendly mobile interactions
  @media (max-width: 768px) {
    transform-origin: center;
    will-change: transform, box-shadow;
    
    &:active {
      transform: scale(0.98);
      box-shadow: ${({ theme }) => theme.shadows.small};
    }
  }
`;

const StudentBanner = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(229, 9, 20, 0.3);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const StudentImage = styled(motion.div)`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  ${StudentCard}:hover & img {
    transform: scale(1.08);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  ${StudentCard}:hover &::after {
    opacity: 1;
  }
  
  // Special effect for mobile tap
  @media (max-width: 768px) {
    &::after {
      opacity: 0.5;
    }
  }
`;

const StudentInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const StudentName = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StudentDetails = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ViewButton = styled(motion.a)`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.7rem 1rem;
    border-radius: 50px;
    
    &:active {
      transform: scale(0.95);
    }
  }
`;

const LikeButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ liked, theme }) => liked ? theme.colors.accent : theme.colors.textSecondary};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    
    &:active {
      transform: scale(1.2);
    }
  }
`;

// Placeholder student data
const studentsData = [
  {
    id: 1,
    name: 'Emma Thompson',
    major: 'Film Production',
    year: 'Senior',
    image: 'https://via.placeholder.com/300x250?text=Student+1',
    featured: true,
  },
  {
    id: 2,
    name: 'James Wilson',
    major: 'Screenwriting',
    year: 'Junior',
    image: 'https://via.placeholder.com/300x250?text=Student+2',
    featured: false,
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    major: 'Acting',
    year: 'Sophomore',
    image: 'https://via.placeholder.com/300x250?text=Student+3',
    featured: true,
  },
  {
    id: 4,
    name: 'Noah Johnson',
    major: 'Film Studies',
    year: 'Freshman',
    image: 'https://via.placeholder.com/300x250?text=Student+4',
    featured: false,
  },
  {
    id: 5,
    name: 'Olivia Brown',
    major: 'Cinematography',
    year: 'Senior',
    image: 'https://via.placeholder.com/300x250?text=Student+5',
    featured: false,
  },
  {
    id: 6,
    name: 'Liam Davis',
    major: 'Film Direction',
    year: 'Junior',
    image: 'https://via.placeholder.com/300x250?text=Student+6',
    featured: true,
  },
];

const Students = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [likedStudents, setLikedStudents] = useState({});
  
  const handleLike = (id, e) => {
    e.preventDefault();
    setLikedStudents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Add haptic feedback on mobile if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Our Talented Students</Title>
        <Subtitle>
          Discover the next generation of filmmakers, actors, and creative talents who are shaping the future of entertainment.
        </Subtitle>
      </PageHeader>
      
      <StudentsGrid
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {studentsData.map((student) => (
          <StudentCard 
            key={student.id} 
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {student.featured && (
              <StudentBanner>
                <FaStar />
                Featured
              </StudentBanner>
            )}
            <StudentImage variants={imageVariants}>
              <img src={student.image} alt={student.name} />
            </StudentImage>
            <StudentInfo>
              <StudentName>{student.name}</StudentName>
              <StudentDetails>
                <FaGraduationCap />
                {student.major}
              </StudentDetails>
              <StudentDetails>
                <FaFilm />
                {student.year}
              </StudentDetails>
              <ActionBar>
                <ViewButton 
                  href={`/student/${student.id}`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Profile
                </ViewButton>
                <LikeButton 
                  onClick={(e) => handleLike(student.id, e)}
                  liked={likedStudents[student.id]}
                  whileTap={{ scale: 1.2 }}
                >
                  <FaHeart />
                </LikeButton>
              </ActionBar>
            </StudentInfo>
          </StudentCard>
        ))}
      </StudentsGrid>
    </PageContainer>
  );
};

export default Students;