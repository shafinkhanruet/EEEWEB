import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const ToggleContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 90;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1.2rem;
`;

const SoundToggle = ({ soundEnabled, setSoundEnabled }) => {
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <ToggleContainer
      onClick={toggleSound}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <IconWrapper>
        {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
      </IconWrapper>
    </ToggleContainer>
  );
};

export default SoundToggle;
