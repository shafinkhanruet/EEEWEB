import React, { createContext, useContext } from 'react';

// Create the context with default no-op values
export const SoundContext = createContext({
  soundEnabled: false,
  setSoundEnabled: () => {},
  playSound: () => {},
});

// Custom hook to use the sound context
export const useSoundContext = () => useContext(SoundContext);

// Provider component that disables all sound functionality
export const SoundProvider = ({ children }) => {
  // Empty function that does nothing when sound events are triggered
  const playSound = () => {};
  
  // Context value with disabled sound
  const contextValue = {
    soundEnabled: false,
    setSoundEnabled: () => {},
    playSound,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
}; 