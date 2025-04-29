'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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

const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 0.25rem;
`;

const InfoContent = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundDark};
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentSoft};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundDark};
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentSoft};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.gradientButton};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Alert = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  text-align: center;
  background: ${({ success, theme }) => success ? theme.colors.success : theme.colors.error};
  color: white;
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });
  const [showAlert, setShowAlert] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
      });
      setShowAlert(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Contact Us</Title>
        <Subtitle>
          Have questions or feedback? We'd love to hear from you. Reach out to us using the information below.
        </Subtitle>
      </PageHeader>
      
      <ContactSection>
        <ContactInfo>
          <InfoItem>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <InfoContent>
              <h3>Email Us</h3>
              <p>info@eeeflix.com</p>
              <p>support@eeeflix.com</p>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <InfoContent>
              <h3>Call Us</h3>
              <p>+1 (123) 456-7890</p>
              <p>+1 (098) 765-4321</p>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <IconWrapper>
              <FaMapMarkerAlt />
            </IconWrapper>
            <InfoContent>
              <h3>Visit Us</h3>
              <p>123 Streaming Street</p>
              <p>Entertainment City, EC 12345</p>
              <p>United States</p>
            </InfoContent>
          </InfoItem>
        </ContactInfo>
        
        <ContactForm onSubmit={handleSubmit}>
          {showAlert && (
            <Alert success={submitResult.success}>
              {submitResult.message}
            </Alert>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </ContactSection>
    </PageContainer>
  );
} 