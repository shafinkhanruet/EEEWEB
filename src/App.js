import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Theme
import { darkTheme } from './theme';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import SplashScreen from './components/SplashScreen';

// Context
import { SoundContext, SoundProvider } from './contexts/SoundContext';

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

// Lazy load ParallaxBackground for faster initial paint
const ParallaxBackground = lazy(() => import('./components/ParallaxBackground'));

// Lazy load pages with improved loading
const Home = lazy(() => 
  import('./pages/Home').then(module => {
    // Add a slight delay to ensure loading spinner shows and doesn't flash
    return new Promise(resolve => setTimeout(() => resolve(module), 500));
  })
);
const Students = lazy(() => import('./pages/Students'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const StudentProfile = lazy(() => import('./pages/StudentProfile'));
const Resources = lazy(() => import('./pages/Resources'));
const StudentContactManager = lazy(() => import('./components/StudentContactManager'));

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
  const [showSplash, setShowSplash] = useState(false); // Start with splash disabled by default
  const [contentReady, setContentReady] = useState(false);
  const [splashError, setSplashError] = useState(false);
  
  // Control when to show the navbar and other elements
  const [showUI, setShowUI] = useState(false);
  
  useEffect(() => {
    // Safety timeout - ensure content is shown after 8 seconds regardless of splash screen
    const safetyTimer = setTimeout(() => {
      if (!contentReady) {
        console.log('Safety timeout triggered - forcing app to show content');
        setSplashError(true);
        setShowSplash(false);
        setShowUI(true);
        setContentReady(true);
      }
    }, 8000);

    // Check if user has seen the splash screen before
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      // Skip splash if already seen
      setShowSplash(false);
      setShowUI(true);
      setContentReady(true);
    } else {
      // Show splash only if not seen before
      setShowSplash(true);
    }
    
    return () => clearTimeout(safetyTimer);
  }, []);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    try {
      // Mark that user has seen the splash screen in this session
      sessionStorage.setItem('hasSeenSplash', 'true');
      
      setShowSplash(false);
      
      // Slight delay before showing UI elements
      setTimeout(() => {
        setShowUI(true);
      }, 300);
      
      // Delay before showing content to ensure smooth transition
      setTimeout(() => {
        setContentReady(true);
      }, 500);
    } catch (error) {
      console.error('Error in splash completion:', error);
      // Ensure the app continues to function even if there's an error
      setShowSplash(false);
      setShowUI(true);
      setContentReady(true);
    }
  };

  // Handle errors in the splash screen
  const handleSplashError = () => {
    console.error('Splash screen encountered an error');
    setSplashError(true);
    setShowSplash(false);
    setShowUI(true);
    setContentReady(true);
  };

  // Create a simple sound context value with disabled functionality
  const soundContextValue = {
    soundEnabled: false,
    setSoundEnabled: () => {},
    playSound: () => {}
  };

  // Animation variants for main content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <TransitionStyle />
      <SoundContext.Provider value={soundContextValue}>
        <AppContainer>
          {showSplash && (
            <ErrorBoundary onError={handleSplashError}>
              <SplashScreen onComplete={handleSplashComplete} />
            </ErrorBoundary>
          )}
          
          <BackgroundContainer />
          
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>
          
          <MainContent
            initial="hidden"
            animate={contentReady ? "visible" : "hidden"}
            exit="exit"
            variants={contentVariants}
          >
            <AnimatePresence mode="wait">
              {contentReady ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
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
              ) : (
                // Show a loading spinner while waiting for content
                <LoadingSpinner />
              )}
            </AnimatePresence>
          </MainContent>
          
          <AnimatePresence>
            {showUI && contentReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
