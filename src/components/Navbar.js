import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { SoundContext } from '../contexts/SoundContext';
import { NavbarContext } from '../contexts/NavbarContext';

// Import the logo directly
import eeeflixLogo from '../assets/images/logos/eeeflix-logo.png';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${props => props.scrolled 
    ? 'rgba(0, 0, 0, 0.75)' 
    : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)'
  };
  backdrop-filter: ${props => props.scrolled ? 'blur(15px)' : 'blur(8px)'};
  box-shadow: ${props => props.scrolled 
    ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)' 
    : 'none'
  };
  border-bottom: ${props => props.scrolled 
    ? '1px solid rgba(255, 255, 255, 0.08)' 
    : 'none'
  };
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.scrolled ? '2px' : '0'};
    background: linear-gradient(90deg, transparent, #E50914, transparent);
    opacity: 0.8;
    transition: all 0.4s ease;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.scrolled ? '0.7rem 4rem' : '1rem 4rem'};
  max-width: 1800px;
  margin: 0 auto;
  transition: all 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.scrolled ? '0.7rem 2rem' : '1rem 2rem'};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  text-decoration: none;
  z-index: 2;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #E50914, transparent);
    transition: width 0.3s ease;
    opacity: 0;
  }
  
  &:hover:after {
    width: 100%;
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  height: 48px;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5));
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: scale(1.08);
    filter: drop-shadow(0 4px 12px rgba(229, 9, 20, 0.5));
  }
`;

const LogoText = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #E50914;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  text-shadow: 0 2px 10px rgba(229, 9, 20, 0.5);
  
  span {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)'};
  font-weight: ${props => props.active ? '600' : '500'};
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  letter-spacing: 0.6px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 30px;
  background: ${props => props.active ? 'rgba(229, 9, 20, 0.15)' : 'transparent'};
  backdrop-filter: ${props => props.active ? 'blur(8px)' : 'none'};
  box-shadow: ${props => props.active 
    ? 'inset 0 0 0 1px rgba(229, 9, 20, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)' 
    : 'none'
  };
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(229, 9, 20, 0.1), transparent);
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    
    &:before {
      opacity: 0.5;
    }
  }
  
  ${props => props.active && `
    font-weight: 700;
    text-shadow: 0 0 15px rgba(229, 9, 20, 0.5);
  `}
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${props => props.active ? '40%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, transparent, ${props => props.active ? '#E50914' : 'rgba(255, 255, 255, 0.5)'}, transparent);
    transform: translateX(-50%);
    transition: width 0.3s ease;
    border-radius: 2px;
    opacity: ${props => props.active ? '1' : '0'};
  }
  
  &:hover:after {
    width: 50%;
    opacity: 1;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: rgba(229, 9, 20, 0.15);
  border: 1px solid rgba(229, 9, 20, 0.3);
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(229, 9, 20, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(229, 9, 20, 0.25);
    transform: scale(1.08);
    box-shadow: 0 10px 25px rgba(229, 9, 20, 0.2);
    
    &:before {
      opacity: 1;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(229, 9, 20, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(to right, rgba(229, 9, 20, 0.1) 0px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(to bottom, rgba(229, 9, 20, 0.1) 0px, transparent 1px) 0 0 / 20px 20px;
    opacity: 0.3;
    pointer-events: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  position: relative; 
  z-index: 1;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  background: ${props => props.active ? 'rgba(229, 9, 20, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 16px;
  box-shadow: ${props => props.active 
    ? '0 10px 25px rgba(229, 9, 20, 0.2), inset 0 0 0 1px rgba(229, 9, 20, 0.3)' 
    : '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
  };
  backdrop-filter: blur(15px);
  
  &:hover {
    transform: translateY(-5px) scale(1.03);
    background: ${props => props.active 
      ? 'rgba(229, 9, 20, 0.2)' 
      : 'rgba(255, 255, 255, 0.1)'
    };
  }
`;

const NavButton = styled(motion.button)`
  background: linear-gradient(135deg, #E50914, #FF6B81);
  border: none;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(229, 9, 20, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  margin-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(229, 9, 20, 0.4);
    
    &:before {
      left: 100%;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Navbar = ({ scrolled: propScrolled }) => {
  const [scrolled, setScrolled] = useState(propScrolled || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);
  const { showNavbar } = useContext(NavbarContext);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogoError = () => {
    setLogoLoaded(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 23px) 23px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 23px) 23px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  // Don't render if showNavbar is false
  if (!showNavbar) return null;
  
  return (
    <NavContainer
      scrolled={scrolled}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <NavContent scrolled={scrolled}>
        <Logo 
          to="/" 
          onClick={() => setSoundEnabled(true)}
          onMouseEnter={() => setSoundEnabled(true)}
        >
          {!logoLoaded ? (
            <LogoText>
              EEE<span>FLIX</span>
            </LogoText>
          ) : (
            <LogoImage 
              src={eeeflixLogo}
              alt="EEEFlix Logo" 
              onError={handleLogoError}
            />
          )}
        </Logo>
        
        <NavLinks>
          <motion.div variants={childVariants}>
            <NavLink 
              to="/" 
              active={location.pathname === '/'}
              onClick={handleLinkClick}
              onMouseEnter={() => setSoundEnabled(true)}
            >
              Home
            </NavLink>
          </motion.div>
          
          <motion.div variants={childVariants}>
            <NavLink 
              to="/students" 
              active={location.pathname === '/students'}
              onClick={handleLinkClick}
              onMouseEnter={() => setSoundEnabled(true)}
            >
              Students
            </NavLink>
          </motion.div>
          
          <motion.div variants={childVariants}>
            <NavLink 
              to="/about" 
              active={location.pathname === '/about'}
              onClick={handleLinkClick}
              onMouseEnter={() => setSoundEnabled(true)}
            >
              About
            </NavLink>
          </motion.div>
          
          <motion.div variants={childVariants}>
            <NavLink 
              to="/contact" 
              active={location.pathname === '/contact'}
              onClick={handleLinkClick}
              onMouseEnter={() => setSoundEnabled(true)}
            >
              Contact
            </NavLink>
          </motion.div>
          
          <motion.div variants={childVariants}>
            <NavLink 
              to="/resources" 
              active={location.pathname === '/resources'}
              onClick={handleLinkClick}
              onMouseEnter={() => setSoundEnabled(true)}
            >
              Resources
            </NavLink>
          </motion.div>
        </NavLinks>
        
        <MobileMenuButton 
          onClick={handleMenuToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <MobileNavLinks>
                <motion.div variants={mobileItemVariants}>
                  <MobileNavLink 
                    to="/" 
                    active={location.pathname === '/'}
                    onClick={handleLinkClick}
                  >
                    Home
                  </MobileNavLink>
                </motion.div>
                
                <motion.div variants={mobileItemVariants}>
                  <MobileNavLink 
                    to="/students" 
                    active={location.pathname === '/students'}
                    onClick={handleLinkClick}
                  >
                    Students
                  </MobileNavLink>
                </motion.div>
                
                <motion.div variants={mobileItemVariants}>
                  <MobileNavLink 
                    to="/about" 
                    active={location.pathname === '/about'}
                    onClick={handleLinkClick}
                  >
                    About
                  </MobileNavLink>
                </motion.div>
                
                <motion.div variants={mobileItemVariants}>
                  <MobileNavLink 
                    to="/contact" 
                    active={location.pathname === '/contact'}
                    onClick={handleLinkClick}
                  >
                    Contact
                  </MobileNavLink>
                </motion.div>
                
                <motion.div variants={mobileItemVariants}>
                  <MobileNavLink 
                    to="/resources" 
                    active={location.pathname === '/resources'}
                    onClick={handleLinkClick}
                  >
                    Resources
                  </MobileNavLink>
                </motion.div>
              </MobileNavLinks>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
