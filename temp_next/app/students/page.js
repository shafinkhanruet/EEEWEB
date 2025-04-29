'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const PageContainer = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const StudentCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const StudentImage = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${StudentCard}:hover & img {
    transform: scale(1.05);
  }
`;

const StudentInfo = styled.div`
  padding: 1.5rem;
`;

const StudentName = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const StudentDetails = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ViewButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
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
  },
  {
    id: 2,
    name: 'James Wilson',
    major: 'Screenwriting',
    year: 'Junior',
    image: 'https://via.placeholder.com/300x250?text=Student+2',
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    major: 'Acting',
    year: 'Sophomore',
    image: 'https://via.placeholder.com/300x250?text=Student+3',
  },
  {
    id: 4,
    name: 'Noah Johnson',
    major: 'Film Studies',
    year: 'Freshman',
    image: 'https://via.placeholder.com/300x250?text=Student+4',
  },
  {
    id: 5,
    name: 'Olivia Brown',
    major: 'Cinematography',
    year: 'Senior',
    image: 'https://via.placeholder.com/300x250?text=Student+5',
  },
  {
    id: 6,
    name: 'Liam Davis',
    major: 'Film Direction',
    year: 'Junior',
    image: 'https://via.placeholder.com/300x250?text=Student+6',
  },
];

const Students = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          <StudentCard key={student.id} variants={itemVariants}>
            <StudentImage>
              <img src={student.image} alt={student.name} />
            </StudentImage>
            <StudentInfo>
              <StudentName>{student.name}</StudentName>
              <StudentDetails>
                {student.major} | {student.year}
              </StudentDetails>
              <Link href={`/student/${student.id}`} passHref>
                <ViewButton as="a">View Profile</ViewButton>
              </Link>
            </StudentInfo>
          </StudentCard>
        ))}
      </StudentsGrid>
    </PageContainer>
  );
};

export default Students; 