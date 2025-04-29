'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 3rem;
  background: ${({ scrolled, theme }) => 
    scrolled 
      ? 'rgba(0, 0, 0, 0.85)'
      : 'transparent'
  };
  box-shadow: ${({ scrolled, theme }) => 
    scrolled 
      ? '0 5px 20px rgba(0, 0, 0, 0.5)'
      : 'none'
  };
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: ${({ scrolled }) => 
    scrolled 
      ? 'blur(15px)'
      : 'none'
  };
  border-bottom: ${({ scrolled, theme }) => 
    scrolled 
      ? `1px solid rgba(229, 9, 20, 0.2)`
      : 'none'
  };

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: ${({ theme }) => theme.fonts.heading};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradientGold};
    border-radius: 4px;
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
    transform: translateY(2px);
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2.5rem;
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
        ? theme.colors.textPrimary
        : theme.colors.textSecondary
    };
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
    letter-spacing: 0.5px;
    
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
    
    &::after {
      content: '';
      position: absolute;
      width: ${({ active }) => (active ? '100%' : '0')};
      height: 2px;
      bottom: 0;
      left: 0;
      background: ${({ theme }) => theme.colors.gradientGold};
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: ${({ active }) => (active ? 1 : 0)};
    }
    
    &:hover::after {
      width: 100%;
      opacity: 1;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: scale(1.1);
  }
`;

const PremiumButton = styled.button`
  background: ${({ theme }) => theme.colors.gradientGold};
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(229, 9, 20, 0.4);
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 2rem;
  backdrop-filter: blur(10px);
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  overscroll-behavior: contain; /* Prevent scroll chain */
  
  /* Support for notched phones */
  padding-top: max(2rem, env(safe-area-inset-top));
  padding-bottom: max(2rem, env(safe-area-inset-bottom));
  padding-left: max(2rem, env(safe-area-inset-left));
  padding-right: max(2rem, env(safe-area-inset-right));
`;

const MobileMenuItem = styled(motion.div)`
  a {
    color: ${({ theme, active }) => 
      active 
        ? theme.colors.accent
        : theme.colors.textPrimary
    };
    font-size: 1.8rem;
    font-weight: 600;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    position: relative;
    padding: 0.5rem 1rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.gradientGold};
      transform: translateX(-50%);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      
      &::after {
        width: 80%;
      }
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
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: rotate(90deg);
  }
`;

const MobilePremiumButton = styled(PremiumButton)`
  display: flex;
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  font-size: 1rem;
`;

const NavbarPremium = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Fix for 100vh in mobile browsers
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', appHeight);
    appHeight();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Prevent background scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

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
        <NavContent>
          <LogoContainer>
            <Link href="/" passHref>
              <Logo>EEEFLIX</Logo>
            </Link>
          </LogoContainer>
          
          <MenuItems>
            {navItems.map((item) => (
              <MenuItem key={item.name} active={pathname === item.path}>
                <Link href={item.path}>
                  {item.name}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
          
          <NavActions>
            <SearchButton aria-label="Search">
              <FaSearch />
            </SearchButton>
            <PremiumButton>
              Premium Access
            </PremiumButton>
            <MobileMenuButton onClick={toggleMobileMenu} aria-label="Menu">
              <FaBars />
            </MobileMenuButton>
          </NavActions>
        </NavContent>
      </Nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={toggleMobileMenu} aria-label="Close menu">
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
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navItems.length * 0.1 + 0.1 }}
            >
              <MobilePremiumButton>
                Premium Access
              </MobilePremiumButton>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarPremium; 