'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaStar, FaFilm, FaAward } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Bio = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ProjectCard = styled.div`
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
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

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
        <Link href="/students" passHref>
          <BackButton>
            <FaArrowLeft /> Back to Students
          </BackButton>
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link href="/students" passHref>
        <BackButton>
          <FaArrowLeft /> Back to Students
        </BackButton>
      </Link>
      
      <ProfileContainer>
        <ImageContainer>
          <img src={student.image} alt={student.name} />
        </ImageContainer>
        
        <InfoContainer>
          <div>
            <Name>{student.name}</Name>
            <Details>
              <DetailItem>
                <FaStar /> {student.major}
              </DetailItem>
              <DetailItem>
                <FaFilm /> {student.specialization}
              </DetailItem>
              <DetailItem>
                <FaAward /> GPA: {student.gpa}
              </DetailItem>
              <DetailItem>{student.year} Year</DetailItem>
            </Details>
            <Bio>{student.bio}</Bio>
          </div>
          
          {student.awards && student.awards.length > 0 && (
            <div>
              <SectionTitle>Awards & Recognition</SectionTitle>
              <ul>
                {student.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          )}
          
          {student.projects && student.projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              <ProjectsGrid>
                {student.projects.map((project) => (
                  <ProjectCard key={project.id}>
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
            </div>
          )}
        </InfoContainer>
      </ProfileContainer>
    </PageContainer>
  );
} 