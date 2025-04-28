import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaAngleRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// Components
import Section from '../components/Section';
import ParallaxBackground from '../components/ParallaxBackground';

const PageContainer = styled.div`
  position: relative;
  background: ${props => props.theme.colors.backgroundPrimary || 'linear-gradient(to bottom, #0f0f0f, #000000)'};
  min-height: 100vh;
  padding-bottom: 5rem;
  font-family: ${props => props.theme.fonts.main || "'Montserrat', sans-serif"};
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.4;
`;

const FloatingGradient = styled(motion.div)`
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.05) 0%, rgba(229, 9, 20, 0) 70%);
  filter: blur(60px);
  opacity: 0.4;
  pointer-events: none;
`;

const PageHeader = styled.div`
  padding: 10rem 0 8rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
              url('/assets/images/eee-background.jpg') center/cover no-repeat;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #E50914, transparent);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
    z-index: 1;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background-color: #E50914;
    margin: 0.8rem auto 0;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  background: ${props => props.theme.effects?.glass?.background || 'rgba(20, 20, 20, 0.8)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  box-shadow: ${props => props.theme.shadows?.glass || '0 15px 35px rgba(0, 0, 0, 0.5)'};
  padding: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    order: 2;
  }
`;

const ContactForm = styled(motion.div)`
  background: ${props => props.theme.effects?.glass?.background || 'rgba(20, 20, 20, 0.8)'};
  backdrop-filter: ${props => props.theme.effects?.glass?.backdropFilter || 'blur(15px)'};
  border-radius: 10px;
  border: ${props => props.theme.effects?.glass?.border || '1px solid rgba(70, 70, 70, 0.3)'};
  box-shadow: ${props => props.theme.shadows?.glass || '0 15px 35px rgba(0, 0, 0, 0.5)'};
  padding: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    order: 1;
  }
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  position: relative;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #E50914;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(8px);
  }
`;

const InfoIcon = styled.div`
  font-size: 1.8rem;
  color: #E50914;
  margin-right: 1.5rem;
  min-width: 2rem;
`;

const InfoContent = styled.div`
  color: ${props => props.theme.colors.textSecondary || '#E5E5E5'};
  
  h3 {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  position: relative;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #E50914;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1.2rem;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(70, 70, 70, 0.3);
  border-radius: 6px;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  font-family: ${props => props.theme.fonts.main || "'Montserrat', sans-serif"};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #E50914;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 1.2rem;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(70, 70, 70, 0.3);
  border-radius: 6px;
  color: ${props => props.theme.colors.textPrimary || '#FFFFFF'};
  font-family: ${props => props.theme.fonts.main || "'Montserrat', sans-serif"};
  font-size: 1.1rem;
  min-height: 180px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #E50914;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: #E50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.7s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 6px;
  padding: 1.2rem;
  margin-top: 1.5rem;
  color: #4CAF50;
  font-size: 1.1rem;
`;

const MapContainer = styled(motion.div)`
  margin: 5rem auto 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  height: 500px;
  max-width: 1200px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #E50914, transparent);
    z-index: 1;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Contact = ({ soundContext }) => {
  // Add fallback for soundContext
  const playSound = useMemo(() => {
    return soundContext?.playSound || (() => {});
  }, [soundContext]);
  
  // Animation controls
  const infoControls = useAnimation();
  const formControls = useAnimation();
  const mapControls = useAnimation();
  
  const [infoRef, infoInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [formRef, formInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [mapRef, mapInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Use effect to trigger animations when sections come into view
  React.useEffect(() => {
    if (infoInView) infoControls.start('visible');
    if (formInView) formControls.start('visible');
    if (mapInView) mapControls.start('visible');
  }, [infoInView, formInView, mapInView, infoControls, formControls, mapControls]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    playSound('click');
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <PageContainer>
      {/* Background Elements */}
      <BackgroundWrapper>
        <ParallaxBackground />
        {/* Floating gradient elements */}
        <FloatingGradient 
          initial={{ x: '-10%', y: '10%' }}
          animate={{ 
            x: ['0%', '10%', '0%'],
            y: ['10%', '15%', '10%'],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <FloatingGradient 
          initial={{ x: '80%', y: '30%' }}
          animate={{ 
            x: ['80%', '70%', '80%'],
            y: ['30%', '40%', '30%'],
            scale: [1.2, 0.9, 1.2],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </BackgroundWrapper>
      
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          Connect With Us
        </PageTitle>
        <PageDescription
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          Get in touch with our team for inquiries, feedback, or collaboration opportunities.
        </PageDescription>
      </PageHeader>
      
      <Section>
        <ContactContainer>
          <ContactInfo
            ref={infoRef}
            initial="hidden"
            animate={infoControls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <InfoTitle>Get In Touch</InfoTitle>
            </motion.div>
            
            <InfoItem variants={itemVariants}>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoContent>
                <h3>Our Location</h3>
                <p>Rajshahi University of Engineering & Technology (RUET)<br />Rajshahi-6204, Bangladesh</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem variants={itemVariants}>
              <InfoIcon>
                <FaPhone />
              </InfoIcon>
              <InfoContent>
                <h3>Contact Information</h3>
                <p>Phone: +880-2588866356<br />Fax: +880-2588866356</p>
                <p>PABX: 403 (Head)<br />Intercom: 401 (Office)</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem variants={itemVariants}>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoContent>
                <h3>Email Address</h3>
                <p>head@eee.ruet.ac.bd</p>
                <p><a href="https://www.eee.ruet.ac.bd/" target="_blank" rel="noopener noreferrer" style={{color: '#E50914'}}>www.eee.ruet.ac.bd</a></p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem variants={itemVariants}>
              <InfoIcon>
                <FaClock />
              </InfoIcon>
              <InfoContent>
                <h3>Head of Department</h3>
                <p>Professor Dr. Md. Masud Rana<br />Mobile: +8801788122226</p>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
          
          <ContactForm
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <FormTitle>Send Us a Message</FormTitle>
            </motion.div>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup variants={itemVariants}>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  onFocus={() => playSound('hover')}
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="email">Your Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  onFocus={() => playSound('hover')}
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  onFocus={() => playSound('hover')}
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="message">Your Message</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  onFocus={() => playSound('hover')}
                />
              </FormGroup>
              
              <motion.div variants={itemVariants}>
                <SubmitButton 
                  type="submit"
                  onMouseEnter={() => playSound('hover')}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(229, 9, 20, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <FaAngleRight />
                </SubmitButton>
              </motion.div>
            </Form>
            
            {submitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Thank you for your message! We'll get back to you soon.
              </SuccessMessage>
            )}
          </ContactForm>
        </ContactContainer>
        
        <MapContainer
          ref={mapRef}
          initial={{ opacity: 0, y: 50 }}
          animate={mapControls}
          variants={itemVariants}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.3183272259903!2d88.62595571505097!3d24.36343548429498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefac3135d631%3A0x9532d36cd04e5382!2sRajshahi%20University%20of%20Engineering%20%26%20Technology%20(RUET)!5e0!3m2!1sen!2sus!4v1635175822548!5m2!1sen!2sus" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="RUET EEE Location"
          ></iframe>
        </MapContainer>
      </Section>
    </PageContainer>
  );
};

export default Contact;
