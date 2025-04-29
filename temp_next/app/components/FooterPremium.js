'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95));
  padding: 5rem 3rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradientGold};
    border-radius: 2px;
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  width: fit-content;
  
  svg {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    margin-left: 5px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(5px);
    
    svg {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.cardBackground};
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
    background: ${({ theme }) => theme.colors.gradientGold};
  }
`;

const BottomBar = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    color: ${({ theme }) => theme.colors.textTertiary};
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const Newsletter = styled.div`
  margin-top: 1.5rem;
`;

const NewsletterTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  width: 100%;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NewsletterInput = styled.input`
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px 0 0 4px;
  color: ${({ theme }) => theme.colors.textPrimary};
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.gradientGold};
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
    padding: 0.8rem 1.5rem;
  }
`;

const FooterPremium = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <Logo>EEEFLIX</Logo>
          <Description>
            Your premier destination for entertainment, showcasing the best in film production, acting, and creative talent. Discover tomorrow's stars today.
          </Description>
          <SocialContainer>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </SocialIcon>
          </SocialContainer>
          
          <Newsletter>
            <NewsletterTitle>Subscribe to our newsletter</NewsletterTitle>
            <NewsletterForm onSubmit={(e) => e.preventDefault()}>
              <NewsletterInput type="email" placeholder="Your email address" />
              <SubmitButton type="submit">Subscribe</SubmitButton>
            </NewsletterForm>
          </Newsletter>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <Link href="/" passHref>
            <FooterLink>
              Home <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/students" passHref>
            <FooterLink>
              Students <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/about" passHref>
            <FooterLink>
              About <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/resources" passHref>
            <FooterLink>
              Resources <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/contact" passHref>
            <FooterLink>
              Contact <FaArrowRight size={12} />
            </FooterLink>
          </Link>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Support</FooterTitle>
          <Link href="/faq" passHref>
            <FooterLink>
              FAQ <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/terms" passHref>
            <FooterLink>
              Terms of Service <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/privacy" passHref>
            <FooterLink>
              Privacy Policy <FaArrowRight size={12} />
            </FooterLink>
          </Link>
          <Link href="/contact" passHref>
            <FooterLink>
              Help Center <FaArrowRight size={12} />
            </FooterLink>
          </Link>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Email: info@eeeflix.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p style={{ marginTop: '1rem' }}>
            123 Streaming Street<br />
            Entertainment City, EC 12345<br />
            United States
          </p>
          <SocialIcon 
            href="mailto:info@eeeflix.com" 
            style={{ marginTop: '1rem', width: 'auto', background: 'transparent', justifyContent: 'flex-start' }}
          >
            <FaEnvelope />
            <span style={{ marginLeft: '0.5rem' }}>info@eeeflix.com</span>
          </SocialIcon>
        </FooterColumn>
      </FooterContent>
      
      <BottomBar>
        <Copyright>&copy; {new Date().getFullYear()} EEEFLIX. All rights reserved.</Copyright>
        <BottomLinks>
          <Link href="/terms" passHref>
            <a>Terms</a>
          </Link>
          <Link href="/privacy" passHref>
            <a>Privacy</a>
          </Link>
          <Link href="/cookies" passHref>
            <a>Cookies</a>
          </Link>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default FooterPremium; 