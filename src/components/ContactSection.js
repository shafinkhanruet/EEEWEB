import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiMail, FiPhone, FiSend, FiCheck, FiMapPin, FiUser, FiGlobe } from 'react-icons/fi';
import { FaFax, FaPhoneAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const ContactContainer = styled.section`
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

const GlowEffect = styled.div`
  position: absolute;
  width: 50%;
  height: 40%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, rgba(229, 9, 20, 0) 70%);
  border-radius: 50%;
  top: 20%;
  left: 0;
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
`;

const FloatingGradient = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(229, 9, 20, 0.15) 0%, 
    rgba(229, 9, 20, 0) 70%
  );
  filter: blur(30px);
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  color: white;
`;

const Title = styled(motion.h2)`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #FFFFFF 0%, #E50914 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(229, 9, 20, 0.1);
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #e5e5e5;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(20, 20, 20, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
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
    z-index: 0;
  }

  &:hover {
    background: rgba(30, 30, 30, 0.7);
    transform: translateX(5px);
    border-color: rgba(229, 9, 20, 0.3);
    
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

  svg {
    font-size: 1.5rem;
    color: #E50914;
    filter: drop-shadow(0 0 8px rgba(229, 9, 20, 0.3));
    margin-top: 0.2rem;
    position: relative;
    z-index: 1;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    position: relative;
    z-index: 1;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }

  p {
    font-size: 1rem;
    color: #e5e5e5;
    line-height: 1.5;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #E50914;
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 0 0 20px rgba(229, 9, 20, 0.1);
`;

const FormContainer = styled(motion.form)`
  background: rgba(20, 20, 20, 0.7);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
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
  }
`;

const InputGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: #E50914;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #E50914;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.2);
  position: relative;
  z-index: 1;

  &:hover {
    background: #F40612;
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.3);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(21, 87, 36, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Animation controls
  const infoControls = useAnimation();
  const formControls = useAnimation();
  
  const [infoRef, infoInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [formRef, formInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Trigger animations when sections come into view
  useEffect(() => {
    if (infoInView) infoControls.start('visible');
    if (formInView) formControls.start('visible');
  }, [infoInView, formInView, infoControls, formControls]);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer id="contact">
      <GlowEffect />
      <FloatingGradient 
        initial={{ x: '10%', y: '10%' }}
        animate={{ 
          x: ['10%', '60%', '10%'],
          y: ['10%', '40%', '10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: 'reverse'
        }}
      />
      <FloatingGradient 
        initial={{ x: '70%', y: '70%' }}
        animate={{ 
          x: ['70%', '20%', '70%'],
          y: ['70%', '30%', '70%'],
          scale: [1.2, 0.9, 1.2],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          repeatType: 'reverse'
        }}
      />
      <ContentWrapper>
        <ContactInfo
          ref={infoRef}
          initial="hidden"
          animate={infoControls}
          variants={containerVariants}
        >
          <Title
            variants={itemVariants}
          >
            Get in Touch
          </Title>
          <Description
            variants={itemVariants}
          >
            Have questions about the EEE department or want to connect with us? 
            We're here to help and would love to hear from you.
          </Description>

          <motion.div
            variants={itemVariants}
          >
            <SectionTitle>Department Information</SectionTitle>
            
            <ContactMethod 
              variants={itemVariants}
              whileHover={{ 
                x: 5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 9, 20, 0.1)'
              }}
            >
              <FiGlobe />
              <div>
                <h4>Department</h4>
                <p>Electrical & Electronic Engineering (EEE)</p>
                <p><a href="https://www.eee.ruet.ac.bd/" target="_blank" rel="noopener noreferrer" style={{ color: '#E50914' }}>www.eee.ruet.ac.bd</a></p>
              </div>
            </ContactMethod>

            <ContactMethod 
              variants={itemVariants}
              whileHover={{ 
                x: 5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 9, 20, 0.1)'
              }}
            >
              <FiMail />
              <div>
                <h4>Email</h4>
                <p>head@eee.ruet.ac.bd</p>
              </div>
            </ContactMethod>

            <ContactMethod 
              variants={itemVariants}
              whileHover={{ 
                x: 5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 9, 20, 0.1)'
              }}
            >
              <FiPhone />
              <div>
                <h4>Contact Numbers</h4>
                <p>Phone: +880-2588866356</p>
                <p>Fax: +880-2588866356</p>
                <p>PABX: 403 (Head)</p>
                <p>Intercom: 401 (Office)</p>
              </div>
            </ContactMethod>
            
            <SectionTitle>Head of Department</SectionTitle>
            
            <ContactMethod 
              variants={itemVariants}
              whileHover={{ 
                x: 5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 9, 20, 0.1)'
              }}
            >
              <FiUser />
              <div>
                <h4>Professor Dr. Md. Masud Rana</h4>
                <p>Position: Head</p>
                <p>Mobile: +8801788122226</p>
                <p>Email: head@eee.ruet.ac.bd</p>
              </div>
            </ContactMethod>
            
            <ContactMethod 
              variants={itemVariants}
              whileHover={{ 
                x: 5, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(229, 9, 20, 0.1)'
              }}
            >
              <FiMapPin />
              <div>
                <h4>Address</h4>
                <p>Rajshahi University of Engineering & Technology (RUET)</p>
                <p>Rajshahi-6204, Bangladesh</p>
              </div>
            </ContactMethod>
          </motion.div>
        </ContactInfo>

        <FormContainer
          ref={formRef}
          initial="hidden"
          animate={formControls}
          variants={containerVariants}
          onSubmit={handleSubmit}
        >
          <InputGroup variants={itemVariants}>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup variants={itemVariants}>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup variants={itemVariants}>
            <Label>Subject</Label>
            <Input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={formState.subject}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup variants={itemVariants}>
            <Label>Message</Label>
            <TextArea
              name="message"
              placeholder="Your message here..."
              value={formState.message}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <motion.div variants={itemVariants}>
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(229, 9, 20, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send Message
                  <FiSend />
                </>
              )}
            </SubmitButton>
          </motion.div>
        </FormContainer>
      </ContentWrapper>

      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FiCheck /> Message sent successfully!
          </SuccessMessage>
        )}
      </AnimatePresence>
    </ContactContainer>
  );
};

export default ContactSection; 