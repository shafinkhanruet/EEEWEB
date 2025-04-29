'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundDark};
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(5px);
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const BottomBar = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <Logo>EEEFLIX</Logo>
          <p>Your ultimate entertainment platform with all your favorite movies and shows.</p>
          <SocialContainer>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
          </SocialContainer>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <Link href="/" passHref>
            <FooterLink>Home</FooterLink>
          </Link>
          <Link href="/students" passHref>
            <FooterLink>Students</FooterLink>
          </Link>
          <Link href="/about" passHref>
            <FooterLink>About</FooterLink>
          </Link>
          <Link href="/resources" passHref>
            <FooterLink>Resources</FooterLink>
          </Link>
          <Link href="/contact" passHref>
            <FooterLink>Contact</FooterLink>
          </Link>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Support</FooterTitle>
          <Link href="/faq" passHref>
            <FooterLink>FAQ</FooterLink>
          </Link>
          <Link href="/terms" passHref>
            <FooterLink>Terms of Service</FooterLink>
          </Link>
          <Link href="/privacy" passHref>
            <FooterLink>Privacy Policy</FooterLink>
          </Link>
          <Link href="/contact" passHref>
            <FooterLink>Help Center</FooterLink>
          </Link>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Email: info@eeeflix.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Streaming St, Entertainment City, EC 12345</p>
          <SocialIcon href="mailto:info@eeeflix.com">
            <FaEnvelope />
          </SocialIcon>
        </FooterColumn>
      </FooterContent>
      
      <BottomBar>
        <p>&copy; {new Date().getFullYear()} EEEFLIX. All rights reserved.</p>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer; 