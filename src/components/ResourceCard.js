import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGoogleDrive, FaArrowRight } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      rgba(229, 9, 20, 0.1),
      rgba(20, 20, 20, 0.1)
    );
    z-index: 0;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 65%,
      rgba(229, 9, 20, 0.1) 75%,
      rgba(229, 9, 20, 0.2) 100%
    );
    transform: translateX(-50%) translateY(-50%);
    animation: lightMove 5s infinite;
  }

  &:hover {
    &:before {
      opacity: 1;
    }

    &:after {
      animation: lightMove 3s infinite;
    }
  }

  @keyframes lightMove {
    0% {
      transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateX(-50%) translateY(-50%) rotate(360deg);
    }
  }
`;

const IconContainer = styled.div`
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
  
  svg {
    font-size: 24px;
    color: rgb(229, 9, 20);
    filter: drop-shadow(0 0 8px rgba(229, 9, 20, 0.3));
    transition: all 0.3s ease;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: white;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 20px rgba(229, 9, 20, 0.1);
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  position: relative;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  background: rgb(229, 9, 20);
  color: white;
  border: none;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.2);

  &:hover {
    background: rgb(193, 17, 25);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.3);
  }

  svg {
    font-size: 12px;
  }
`;

const FileType = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  position: relative;
  z-index: 1;
`;

const ResourceCard = ({ resource }) => {
  if (!resource) return null;

  return (
    <Card
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <IconContainer>
        <FaGoogleDrive />
      </IconContainer>
      <Title>{resource.title}</Title>
      <Description>{resource.description}</Description>
      <ButtonContainer>
        <Button 
          href={resource.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Drive
          <FaArrowRight />
        </Button>
        <FileType>{resource.fileType}</FileType>
      </ButtonContainer>
    </Card>
  );
};

export default ResourceCard; 