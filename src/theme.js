export const darkTheme = {
  colors: {
    // Main colors - Netflix theme
    primary: '#141414',
    secondary: '#000000',
    accent: '#E50914',
    accentHover: '#F40612',
    accentGradient: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    accentSoft: 'rgba(229, 9, 20, 0.2)',
    accentGlow: 'rgba(229, 9, 20, 0.6)',
    
    // Premium accent colors - Netflix red for all accent elements
    gold: '#E50914',
    goldLight: '#FF5F5F',
    goldGradient: 'linear-gradient(135deg, #E50914 0%, #FF5F5F 100%)',
    goldSoft: 'rgba(229, 9, 20, 0.2)',
    goldGlow: 'rgba(229, 9, 20, 0.6)',
    
    // Text colors - Netflix style
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#999999',
    textHighlight: '#E50914',
    
    // Background colors - Netflix dark tones
    backgroundDark: '#000000',
    backgroundLight: '#141414',
    cardBackground: '#181818',
    cardHover: '#232323',
    
    // UI colors - Netflix palette
    success: '#2DD385',
    warning: '#F2A93B',
    error: '#E50914',
    info: '#B3B3B3',
    
    // Enhanced gradients for Netflix look
    gradientPrimary: 'linear-gradient(135deg, #000000 0%, #141414 100%)',
    gradientAccent: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    gradientGold: 'linear-gradient(135deg, #E50914 0%, #FF5F5F 100%)',
    gradientRoyal: 'linear-gradient(135deg, #B20710 0%, #E50914 100%)',
    gradientCard: 'linear-gradient(180deg, rgba(24, 24, 24, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)',
    gradientOverlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
    gradientHero: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
    gradientButton: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    gradientButtonHover: 'linear-gradient(135deg, #F40612 0%, #E50914 100%)',
    gradientGlass: 'linear-gradient(135deg, rgba(24, 24, 24, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)',
    gradientShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
    gradientDarkBlue: 'linear-gradient(135deg, #000000 0%, #141414 100%)',
    gradientPremium: 'linear-gradient(135deg, #141414 0%, #E50914 50%, #FF5F5F 100%)',
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Poppins', sans-serif",
    accent: "'Roboto Slab', serif",
    mono: "'Roboto Mono', monospace"
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
    hero: '3.5rem',
    display: '4.5rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '24px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.25)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.35)',
    large: '0 8px 30px rgba(0, 0, 0, 0.45)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.55)',
    glow: '0 0 20px rgba(229, 9, 20, 0.6)',
    goldGlow: '0 0 20px rgba(229, 9, 20, 0.4)',
    cardHover: '0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 6px rgba(0, 0, 0, 0.15)',
    accentGlow: '0 0 25px rgba(229, 9, 20, 0.5)',
    textGlow: '0 0 10px rgba(229, 9, 20, 0.6)',
    buttonGlow: '0 0 20px rgba(229, 9, 20, 0.5)',
    premium: '0 15px 35px -5px rgba(0, 0, 0, 0.4), 0 10px 15px -6px rgba(0, 0, 0, 0.3)',
    glass: '0 10px 40px 0 rgba(0, 0, 0, 0.4)',
    highlight: '0 0 0 2px rgba(229, 9, 20, 0.3)'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px',
  },
  animation: {
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideUp: 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    slideDown: 'slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    slideLeft: 'slideLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    slideRight: 'slideRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
    typewriter: 'typewriter 2.5s steps(40, end)',
    shimmer: 'shimmer 2s infinite linear',
    float: 'float 6s ease-in-out infinite',
    rotate: 'rotate 20s linear infinite',
    scale: 'scale 3s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite alternate'
  },
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600
  },
  
  // Netflix UI effects
  effects: {
    // Glass morphism
    glass: {
      background: 'rgba(20, 20, 20, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    // Neumorphism
    neumorphic: {
      background: '#141414',
      boxShadow: '8px 8px 16px #0D0D0D, -8px -8px 16px #1B1B1B'
    },
    // Text effects
    textGradient: {
      background: 'linear-gradient(135deg, #E50914 0%, #FF5F5F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(229, 9, 20, 0.3)'
    },
    // Red text effect
    goldText: {
      background: 'linear-gradient(135deg, #E50914 0%, #FF5F5F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(229, 9, 20, 0.3)'
    },
    // 3D effects
    perspective: {
      perspective: '1200px',
      transformStyle: 'preserve-3d'
    },
    // Card hover effects
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    // Button hover effects
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(229, 9, 20, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};
