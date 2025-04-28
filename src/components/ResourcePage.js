import React, { useState } from 'react';
import styled from 'styled-components';
import ResourceCard from './ResourceCard';
import { FaSearch } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: rgb(10, 10, 10);
  padding: 60px 40px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(229, 9, 20, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(229, 9, 20, 0.1) 0%, transparent 25%),
      linear-gradient(to bottom, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 1) 100%);
    pointer-events: none;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent 0%,
        rgba(0, 0, 0, 0.3) 50%,
        transparent 100%
      );
    background-size: 100% 8px;
    opacity: 0.4;
    pointer-events: none;
    animation: scanlines 8s linear infinite;
  }

  @keyframes scanlines {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SearchContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  padding-left: 45px;
  background: rgba(40, 40, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(50, 50, 50, 0.8);
    border-color: rgba(229, 9, 20, 0.5);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(229, 9, 20);
  font-size: 16px;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResourcePage = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources?.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <ContentWrapper>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <ResourcesGrid>
          {filteredResources?.map(resource => (
            <ResourceCard 
              key={resource.id}
              resource={resource}
            />
          ))}
        </ResourcesGrid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ResourcePage; 