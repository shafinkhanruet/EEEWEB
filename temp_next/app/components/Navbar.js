'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavbar } from '../contexts/NavbarContext';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ scrolled, theme }) => 
    scrolled 
      ? theme.colors.cardBackground
      : 'transparent'
  };
  box-shadow: ${({ scrolled, theme }) => 
    scrolled 
      ? theme.shadows.medium
      : 'none'
  };
  transition: all 0.3s ease;
  backdrop-filter: ${({ scrolled }) => 
    scrolled 
      ? 'blur(10px)'
      : 'none'
  };
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  position: relative;
  
  a {
    color: ${({ theme, active }) => 
      active 
        ? theme.colors.accent
        : theme.colors.textPrimary
    };
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
    
    &::after {
      content: '';
      position: absolute;
      width: ${({ active }) => (active ? '100%' : '0')};
      height: 2px;
      bottom: -6px;
      left: 0;
      background-color: ${({ theme }) => theme.colors.accent};
      transition: all 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.backgroundDark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 2rem;
`;

const MobileMenuItem = styled(motion.div)`
  a {
    color: ${({ theme, active }) => 
      active 
        ? theme.colors.accent
        : theme.colors.textPrimary
    };
    font-size: 1.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { showNavbar } = useNavbar();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Don't render navbar if showNavbar is false
  if (!showNavbar) return null;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Students', path: '/students' },
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <Nav 
        scrolled={scrolled}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" passHref>
          <Logo>EEEFLIX</Logo>
        </Link>
        
        <MenuItems>
          {navItems.map((item) => (
            <MenuItem key={item.name} active={pathname === item.path}>
              <Link href={item.path}>
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <FaBars />
        </MobileMenuButton>
      </Nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={toggleMobileMenu}>
              <FaTimes />
            </CloseButton>
            
            {navItems.map((item, index) => (
              <MobileMenuItem 
                key={item.name}
                active={pathname === item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.path} onClick={toggleMobileMenu}>
                  {item.name}
                </Link>
              </MobileMenuItem>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 