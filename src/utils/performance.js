/**
 * Performance utility functions for EEEFlix
 */

// Debounce function to limit how often a function can be called
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function to ensure a function is called at most once in a specified time period
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image preloading function with timeout to prevent hanging requests
export const preloadImage = (src, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let timer;
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // Set timeout to avoid hanging on slow connections
    timer = setTimeout(() => {
      img.src = ''; // Cancel the request
      reject(new Error(`Image load timeout: ${src}`));
    }, timeout);
    
    img.src = src;
  });
};

// Batch preload multiple images with priority and chunking
export const preloadImages = async (sources, chunkSize = 5) => {
  // Process images in chunks to avoid overwhelming the browser
  const results = [];
  
  for (let i = 0; i < sources.length; i += chunkSize) {
    const chunk = sources.slice(i, i + chunkSize);
    try {
      // Process each chunk in parallel, but chunks sequentially
      const chunkResults = await Promise.allSettled(
        chunk.map(src => preloadImage(src))
      );
      results.push(...chunkResults);
    } catch (error) {
      console.error('Error preloading image chunk:', error);
    }
  }
  
  return results;
};

// Check if the browser supports WebP format
export const supportsWebP = () => {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

// Get optimized image path based on device capabilities and screen size
export const getOptimizedImagePath = (path, supportsWebP) => {
  if (!path) return `${process.env.PUBLIC_URL}/assets/images/avatar/default-avatar.jpg`;
  
  // If path already contains PUBLIC_URL, don't add it again
  if (path.includes(process.env.PUBLIC_URL)) {
    return path;
  }
  
  // Extract the base path and extension
  const basePath = path.substring(0, path.lastIndexOf('.')) || path;
  const extension = path.substring(path.lastIndexOf('.')) || '';
  
  // For avatar images, always use jpg format directly
  if (path.includes('/avatar/') || path.includes('avatar/')) {
    return path;
  }
  
  // For other images, use WebP if supported
  if (supportsWebP && ['.jpg', '.jpeg', '.png'].some(ext => extension.toLowerCase() === ext)) {
    return `${basePath}.webp`;
  }
  
  // Check if we should use a smaller image based on screen size
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  if (screenWidth <= 768 && (path.includes('/avatar/') || path.includes('avatar/'))) {
    // For mobile devices, use smaller images if available
    if (path.includes('/avatar/')) {
      return path.replace('/avatar/', '/avatar/small/');
    } else {
      return path.replace('avatar/', 'avatar/small/');
    }
  }
  
  return path;
};

// Intersection Observer utility for lazy loading with enhanced options
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '200px', // Increased rootMargin to start loading earlier
    threshold: 0.01     // Lower threshold to trigger loading sooner
  };
  
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Measure component render time (development only)
export const measureRenderTime = (Component) => {
  return (props) => {
    const start = performance.now();
    const result = Component(props);
    const end = performance.now();
    console.log(`Render time for ${Component.name}: ${end - start}ms`);
    return result;
  };
};
