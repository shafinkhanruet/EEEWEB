import React, { useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { getOptimizedImagePath, supportsWebP } from '../utils/performance';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.backgroundLight};
  will-change: transform; /* Performance optimization */
  transform: translateZ(0); /* Force GPU acceleration */
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => (props.isLoaded ? 1 : 0)};
  transform: translateZ(0); /* Force GPU acceleration */
  backface-visibility: hidden; /* Prevent flickering */
  -webkit-backface-visibility: hidden;
  will-change: opacity; /* Performance hint */
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundLight};
  display: ${props => (props.isLoaded ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
`;

// Use a simpler loading indicator to reduce DOM elements
const LoadingIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4361ee;
  opacity: 0.7;
`;

const OptimizedImage = memo(({ src, alt, className, width, height, loading = 'lazy' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const [webpSupported, setWebpSupported] = useState(null);
  const observerRef = useRef(null);

  // Check WebP support once when component mounts
  useEffect(() => {
    async function checkWebpSupport() {
      try {
        const isSupported = await supportsWebP();
        setWebpSupported(isSupported);
      } catch (err) {
        console.error('Error checking WebP support:', err);
        setWebpSupported(false);
      }
    }
    checkWebpSupport();

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Reset loading state when src changes
    if (src !== imageSrc) {
      setIsLoaded(false);
      setHasError(false);
    }
    
    // Don't proceed if WebP support hasn't been determined yet
    if (webpSupported === null) return;
    
    // Check if the src is a valid URL or path
    if (!src) {
      console.error('Image source is missing');
      setHasError(true);
      return;
    }
    
    // For avatar images, use a simpler loading approach
    if (src.includes('/avatar/') || src.includes('avatar/')) {
      setImageSrc(src);
      return;
    }
    
    // Get optimized image path based on device capabilities
    const optimizedSrc = getOptimizedImagePath(src, webpSupported);
    setImageSrc(optimizedSrc);

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [src, webpSupported, imageSrc]);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    setHasError(true);
    
    // Set flag that we're using fallback image
    setIsLoaded(true);
  };

  // Prepare the image source based on state
  const displaySrc = hasError 
    ? `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-1.jpg?t=${Date.now()}`
    : imageSrc;

  return (
    <ImageContainer className={className}>
      {imageSrc && (
        <StyledImage 
          ref={imgRef}
          src={displaySrc}
          alt={alt || 'Image'} 
          isLoaded={isLoaded || hasError}
          width={width}
          height={height}
          loading={loading}
          decoding="async" /* Performance optimization */
          fetchpriority={loading === 'eager' ? 'high' : 'auto'} /* Priority hint */
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      <Placeholder isLoaded={isLoaded || hasError}>
        <LoadingIndicator />
      </Placeholder>
    </ImageContainer>
  );
});

// Add display name for better debugging
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
