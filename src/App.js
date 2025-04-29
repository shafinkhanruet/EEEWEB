import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Theme
import { darkTheme } from './theme';

// Context
import { SoundContext } from './contexts/SoundContext';

// Components - Import synchronously for faster initial load
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loaded components
const SplashScreen = lazy(() => import('./components/SplashScreen'));
const ParallaxBackground = lazy(() => import('./components/ParallaxBackground'));
const Home = lazy(() => import('./pages/Home'));
const Students = lazy(() => import('./pages/Students'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const StudentProfile = lazy(() => import('./pages/StudentProfile'));
const Resources = lazy(() => import('./pages/Resources'));
const StudentContactManager = lazy(() => import('./components/StudentContactManager'));

// Add page transition styles
const TransitionStyle = createGlobalStyle`
  .page-transition-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms, transform 400ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  position: relative;
  z-index: 1;
`;

// Page Transition Wrapper
const PageTransition = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

// Create a component for the background to improve performance
const BackgroundContainer = React.memo(() => (
  <Suspense fallback={null}>
    <ParallaxBackground />
  </Suspense>
));

function App() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false); 
  const [contentReady, setContentReady] = useState(false);
  const [splashError, setSplashError] = useState(false);
  
  // Control when to show the navbar and other elements
  const [showUI, setShowUI] = useState(false);
  
  useEffect(() => {
    // Immediately start loading the main content
    setContentReady(true);
    
    // Safety timeout - ensure content is shown quickly
    const safetyTimer = setTimeout(() => {
      if (!showUI) {
        console.log('Safety timeout triggered - forcing app to show UI');
        setSplashError(true);
        setShowSplash(false);
        setShowUI(true);
      }
    }, 5000);

    // Skip splash screen on Vercel production to avoid loading issues
    const isVercelProduction = window.location.hostname.includes('vercel.app');
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash || isVercelProduction) {
      // Skip splash if already seen or on Vercel
      setShowSplash(false);
      setShowUI(true);
    } else {
      // Show splash only if not seen before and not on Vercel
      setTimeout(() => setShowSplash(true), 100);
    }
    
    return () => clearTimeout(safetyTimer);
  }, []);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    try {
      // Mark that user has seen the splash screen in this session
      sessionStorage.setItem('hasSeenSplash', 'true');
      
      setShowSplash(false);
      setShowUI(true);
    } catch (error) {
      console.error('Error in splash completion:', error);
      // Ensure the app continues to function even if there's an error
      setShowSplash(false);
      setShowUI(true);
    }
  };

  // Handle errors in the splash screen
  const handleSplashError = () => {
    console.error('Splash screen encountered an error');
    setSplashError(true);
    setShowSplash(false);
    setShowUI(true);
  };

  // Create a simple sound context value with disabled functionality
  const soundContextValue = {
    soundEnabled: false,
    setSoundEnabled: () => {},
    playSound: () => {}
  };

  // Animation variants for main content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <TransitionStyle />
      <SoundContext.Provider value={soundContextValue}>
        <AppContainer>
          {showSplash && (
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary onError={handleSplashError}>
                <SplashScreen onComplete={handleSplashComplete} />
              </ErrorBoundary>
            </Suspense>
          )}
          
          <Suspense fallback={null}>
            <BackgroundContainer />
          </Suspense>
          
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>
          
          <MainContent
            initial="hidden"
            animate={contentReady && showUI ? "visible" : "hidden"}
            exit="exit"
            variants={contentVariants}
          >
            <AnimatePresence mode="wait">
              {contentReady && (
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Routes location={location}>
                      <Route path="/" element={<Home />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/student/:id" element={<StudentProfile />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/admin/contacts" element={<StudentContactManager />} />
                    </Routes>
                  </PageTransition>
                </Suspense>
              )}
            </AnimatePresence>
          </MainContent>
          
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </AppContainer>
      </SoundContext.Provider>
    </ThemeProvider>
  );
}

// Simple error boundary for handling splash screen errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError && this.props.onError();
  }
  
  render() {
    if (this.state.hasError) {
      return null; // Render nothing if there's an error
    }
    return this.props.children;
  }
}

export default App;
