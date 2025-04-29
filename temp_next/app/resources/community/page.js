'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  padding: 120px 3rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 1.5rem 3rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: translateX(-5px);
  }
`;

const CommunityPage = () => {
  return (
    <Container>
      <BackLink href="/resources">← Back to Resources</BackLink>
      <Title>Community Forums</Title>
      <p>Community forums and discussion boards will be available soon.</p>
    </Container>
  );
};

export default CommunityPage; 