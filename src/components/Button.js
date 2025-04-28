import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ButtonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.8rem 1.8rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  letter-spacing: 0.5px;
  will-change: transform;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
`;

const ButtonGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  z-index: 0;
  opacity: 0;
  box-shadow: ${props => props.theme.shadows.buttonGlow};
  transition: opacity 0.3s ease;
  background: radial-gradient(circle at center, rgba(229, 9, 20, 0.15) 0%, rgba(229, 9, 20, 0) 70%);
`;

const StyledButton = styled(motion.button)`
  ${ButtonStyles}
  background: ${props => 
    props.variant === 'outline' 
      ? 'transparent' 
      : props.variant === 'secondary' 
        ? 'rgba(109, 109, 110, 0.7)' 
        : props.variant === 'premium'
          ? props.theme.colors.gradientPrimary
          : '#E50914'};
  color: ${props => props.variant === 'outline' ? '#B3B3B3' : '#FFFFFF'};
  border: ${props => 
    props.variant === 'outline' 
      ? `1px solid #B3B3B3` 
      : props.variant === 'gold'
        ? `1px solid #E50914`
        : 'none'};
  
  &:hover {
    background: ${props => 
      props.variant === 'outline' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : props.variant === 'secondary' 
          ? 'rgba(109, 109, 110, 0.5)' 
          : props.variant === 'premium'
            ? props.theme.colors.gradientRoyal
            : props.variant === 'gold'
              ? 'rgba(229, 9, 20, 0.9)'
              : '#F40612'};
    transform: translateY(-2px);
    box-shadow: ${props => 
      props.variant === 'premium' 
        ? props.theme.shadows.premium 
        : props.variant === 'gold'
          ? props.theme.shadows.goldGlow
          : props.theme.shadows.medium};
    
    ${ButtonGlow} {
      opacity: ${props => (props.variant === 'premium' || props.variant === 'gold') ? 0.8 : 0.4};
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &:before {
      display: none;
    }
  }
`;

const StyledLinkButton = styled(motion(Link))`
  ${ButtonStyles}
  background: ${props => 
    props.variant === 'outline' 
      ? 'transparent' 
      : props.variant === 'secondary' 
        ? 'rgba(109, 109, 110, 0.7)' 
        : props.variant === 'premium'
          ? '#E50914'
          : '#E50914'};
  color: #FFFFFF;
  border: ${props => 
    props.variant === 'outline' 
      ? `1px solid #B3B3B3` 
      : 'none'};
  
  &:hover {
    background: ${props => 
      props.variant === 'outline' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : props.variant === 'secondary' 
          ? 'rgba(109, 109, 110, 0.5)' 
          : props.variant === 'premium'
            ? '#F40612'
            : '#F40612'};
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'premium' ? props.theme.shadows.premium : props.theme.shadows.medium};
    
    ${ButtonGlow} {
      opacity: ${props => props.variant === 'premium' ? 0.8 : 0.4};
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Ripple effect component
const Ripple = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transform: scale(0);
  z-index: 1;
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  disabled = false,
  onMouseEnter,
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };
  
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples([...ripples, newRipple]);
    
    // Clean up ripples after animation completes
    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
    }, 600);
  };
  
  const handleClick = (e) => {
    handleRipple(e);
    if (onClick) onClick(e);
  };
  
  const renderContent = () => (
    <>
      <span>
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </span>
      <ButtonGlow />
      <AnimatePresence>
        {ripples.map(ripple => (
          <Ripple
            key={ripple.id}
            style={{ 
              left: ripple.x, 
              top: ripple.y, 
              width: ripple.size, 
              height: ripple.size 
            }}
            initial={{ transform: 'scale(0)', opacity: 0.8 }}
            animate={{ transform: 'scale(1)', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (to) {
    return (
      <StyledLinkButton
        to={to}
        variant={variant}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        {...props}
      >
        {renderContent()}
      </StyledLinkButton>
    );
  }

  return (
    <StyledButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      {...props}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default Button;
