import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaHome, 
  FaUsers, 
  FaInfoCircle, 
  FaEnvelope, 
  FaFileAlt, 
  FaLaptopCode, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelopeOpenText
} from 'react-icons/fa';
import { SoundContext } from '../contexts/SoundContext';

const FooterContainer = styled.footer`
  background: #0A0A0A;
  backdrop-filter: blur(12px);
  padding: 4.5rem 0 2rem;
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -5px 35px rgba(0, 0, 0, 0.25);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  position: relative;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #E50914, #FF5F6D);
  }
`;

const FooterLink = styled.a`
  color: #B3B3B3;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  
  svg {
    color: #E50914;
    font-size: 1rem;
  }
  
  &:hover {
    color: #FFFFFF;
    transform: translateX(5px);
    
    svg {
      transform: scale(1.2);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const SocialIcon = styled(motion.a)`
  color: #FFFFFF;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #FFFFFF;
    background: linear-gradient(90deg, #E50914, #FF5F6D);
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.5);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2.5rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #B3B3B3;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
  }
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.2rem;
  
  span {
    color: #E50914;
  }
`;

const FooterText = styled.p`
  color: #B3B3B3;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  svg {
    color: #E50914;
    font-size: 1.1rem;
    margin-top: 0.25rem;
  }
  
  p {
    color: #B3B3B3;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const ContactForm = styled.div`
  margin-top: 1.5rem;
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #E50914, #FF5F6D);
  color: #FFFFFF;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  
  svg {
    font-size: 1rem;
  }
  
  &:hover {
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
  
  a {
    color: #8C8C8C;
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FFFFFF;
    }
  }
`;

const Footer = () => {
  const { playSound } = useContext(SoundContext);
  
  const handleMouseEnter = () => {
    try {
      if (playSound && typeof playSound === 'function') {
        playSound('hover');
      }
    } catch (error) {
      console.error('Error playing hover sound:', error);
    }
  };
  
  const handleClick = () => {
    try {
      if (playSound && typeof playSound === 'function') {
        playSound('click');
      }
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>EEE<span>Flix</span></Logo>
          <FooterText>
            A premium platform for Electrical & Electronic Engineering students and faculty, designed to showcase excellence and innovation.
          </FooterText>
          <SocialIcons>
            <SocialIcon 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink 
            href="/" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaHome /> Home
          </FooterLink>
          <FooterLink 
            href="/students" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaUsers /> Students
          </FooterLink>
          <FooterLink 
            href="/about" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaInfoCircle /> About Us
          </FooterLink>
          <FooterLink 
            href="/contact" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaEnvelope /> Contact
          </FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaFileAlt /> Research Papers
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaLaptopCode /> Projects
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaBookOpen /> Publications
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <FaCalendarAlt /> Events
          </FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <p>
                Department of Electrical & Electronic Engineering<br />
                Rajshahi University of Engineering & Technology<br />
                Rajshahi-6204, Bangladesh
              </p>
            </ContactItem>
            <ContactItem>
              <FaEnvelopeOpenText />
              <p>head_eee@ruet.ac.bd</p>
            </ContactItem>
            <ContactItem>
              <FaPhoneAlt />
              <p>+880-721-750742</p>
            </ContactItem>
          </ContactInfo>
          <ContactForm>
            <ContactButton 
              href="mailto:head_eee@ruet.ac.bd"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaEnvelope /> Contact Us
            </ContactButton>
          </ContactForm>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} EEEFlix. All rights reserved.
        <LegalLinks>
          <a 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Cookie Policy
          </a>
        </LegalLinks>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
