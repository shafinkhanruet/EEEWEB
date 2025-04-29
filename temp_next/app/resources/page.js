'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDownload, FaBook, FaVideo, FaLightbulb, FaUsers, FaClipboard } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 120px 3rem 5rem;
  
  @media (max-width: 768px) {
    padding: 100px 1.5rem 3rem;
  }
`;

const HeroSection = styled.section`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const PageDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResourceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-color: rgba(229, 9, 20, 0.3);
    
    .icon-container {
      transform: scale(1.1);
      background: ${({ theme }) => theme.colors.gradientGold};
    }
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  transition: all 0.3s ease;
`;

const ResourceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ResourceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ResourceLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradientGold};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    
    &:after {
      width: 100%;
    }
  }
`;

const ResourcesPage = () => {
  const resources = [
    {
      id: 1,
      title: 'Filmmaking Guides',
      description: 'Access comprehensive guides covering all aspects of filmmaking, from pre-production to post.',
      icon: <FaBook />,
      link: '/resources/guides'
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Watch expert tutorials on camera work, lighting, editing, and other essential film techniques.',
      icon: <FaVideo />,
      link: '/resources/tutorials'
    },
    {
      id: 3,
      title: 'Equipment Tips',
      description: 'Learn about the best equipment for your budget and how to use it effectively.',
      icon: <FaLightbulb />,
      link: '/resources/equipment'
    },
    {
      id: 4,
      title: 'Templates & Assets',
      description: 'Download free templates, assets, and resources to enhance your film projects.',
      icon: <FaDownload />,
      link: '/resources/templates'
    },
    {
      id: 5,
      title: 'Community Forums',
      description: 'Connect with fellow filmmakers, share ideas, and get feedback on your work.',
      icon: <FaUsers />,
      link: '/resources/community'
    },
    {
      id: 6,
      title: 'Career Resources',
      description: 'Access job listings, internship opportunities, and career development resources.',
      icon: <FaClipboard />,
      link: '/resources/career'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Resources
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover a wealth of resources designed to help you develop your filmmaking skills, 
          enhance your projects, and advance your career in the entertainment industry.
        </PageDescription>
      </HeroSection>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ResourceGrid>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} variants={itemVariants}>
              <IconContainer className="icon-container">
                {resource.icon}
              </IconContainer>
              <ResourceTitle>{resource.title}</ResourceTitle>
              <ResourceDescription>
                {resource.description}
              </ResourceDescription>
              <ResourceLink href={resource.link}>
                Explore {resource.title}
              </ResourceLink>
            </ResourceCard>
          ))}
        </ResourceGrid>
      </motion.div>
    </PageContainer>
  );
};

export default ResourcesPage; 