const QuoteContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.9), rgba(229, 9, 20, 0.15), rgba(25, 25, 25, 0.9));
  padding: 2rem 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0 2.5rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  color: #FFFFFF;
  position: relative;
  line-height: 1.6;
  font-size: 1.1rem;
  width: 100%;
  max-width: 450px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(229, 9, 20, 0.25);
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;
  letter-spacing: 0.02em;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: translateZ(0);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, rgba(229, 9, 20, 0.2), transparent, rgba(229, 9, 20, 0.2));
    border-radius: 11px;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.7;
    animation: glowPulse 3s infinite alternate;
  }
  
  @keyframes glowPulse {
    0% { opacity: 0.4; filter: blur(8px); }
    100% { opacity: 0.7; filter: blur(10px); }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.5rem;
    min-height: 150px;
    max-width: 90%;
  }
`;

const StatusBadge = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  right: -20px;
  z-index: 10;
  background: linear-gradient(
    135deg,
    rgba(229, 9, 20, 0.95) 0%,
    rgba(178, 7, 16, 0.95) 50%,
    rgba(229, 9, 20, 0.95) 100%
  );
  color: #FFFFFF;
  font-size: 1.1rem;
  padding: 0.6rem 1.4rem;
  border-radius: 16px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transform-origin: center;
  border: 2px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 
    0 4px 20px rgba(229, 9, 20, 0.6),
    0 2px 10px rgba(0, 0, 0, 0.5),
    inset 0 2px 3px rgba(255, 255, 255, 0.5),
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  isolation: isolate;
  animation: floatBadge 3s ease-in-out infinite;

  @keyframes floatBadge {
    0%, 100% {
      transform: translateY(0) scale(1) rotate(0deg);
    }
    25% {
      transform: translateY(-8px) scale(1.03) rotate(-2deg);
    }
    75% {
      transform: translateY(-4px) scale(1.02) rotate(2deg);
    }
  }

  &:before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      45deg,
      #FF0A16,
      #E50914,
      #B20710,
      #E50914,
      #FF0A16
    );
    z-index: -2;
    animation: borderRotate 4s linear infinite;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      165deg,
      rgba(255, 255, 255, 0.6) 0%,
      transparent 20%,
      transparent 80%,
      rgba(255, 255, 255, 0.4) 100%
    );
    border-radius: 14px;
    z-index: -1;
    animation: shimmerEffect 2s linear infinite;
  }

  @keyframes borderRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes shimmerEffect {
    0% {
      opacity: 0.5;
      transform: translateX(-100%) skewX(-15deg);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
      transform: translateX(100%) skewX(-15deg);
    }
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 10, 22, 0.95) 0%,
      rgba(229, 9, 20, 0.95) 50%,
      rgba(255, 10, 22, 0.95) 100%
    );
    box-shadow: 
      0 6px 25px rgba(229, 9, 20, 0.8),
      0 2px 15px rgba(0, 0, 0, 0.6),
      inset 0 2px 5px rgba(255, 255, 255, 0.7),
      inset 0 -2px 5px rgba(0, 0, 0, 0.5);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    animation: none;
    transform: translateY(-2px) scale(1.05);
  }
`;

const ProfileContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(165deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95));
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 100px rgba(229, 9, 20, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent,
      rgba(229, 9, 20, 0.3),
      rgba(255, 255, 255, 0.2),
      rgba(229, 9, 20, 0.3),
      transparent
    );
  }
`;

const ProfileHeader = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(229, 9, 20, 0.1),
    rgba(20, 20, 20, 0.2),
    rgba(229, 9, 20, 0.1)
  );
  border-radius: 16px;
  border: 1px solid rgba(229, 9, 20, 0.2);
`;

const ProfileImage = styled(motion.div)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: 1rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 0 2px rgba(229, 9, 20, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, 
      rgba(255, 255, 255, 0.2),
      transparent 70%
    );
    z-index: 2;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(229, 9, 20, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
`;

const InfoRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  background: linear-gradient(
    90deg,
    rgba(229, 9, 20, 0.1),
    rgba(20, 20, 20, 0.2)
  );
  border-radius: 12px;
  border-left: 3px solid rgba(229, 9, 20, 0.5);

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(229, 9, 20, 0.15),
      rgba(20, 20, 20, 0.25)
    );
    transform: translateX(5px);
    transition: all 0.3s ease;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  min-width: 120px;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #FFFFFF;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

// ... rest of the styled components ...

// In the StudentProfile component, update the structure:
return (
  <ProfileContainer
    initial={{ opacity: 0, y: 50 }}
    animate={{ 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }}
  >
    <ProfileHeader
      initial={{ opacity: 0, x: -50 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: 0.3, duration: 0.5 }
      }}
    >
      <ProfileImage
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={student.image} alt={student.name} />
      </ProfileImage>
      <StatusBadge>EEE</StatusBadge>
    </ProfileHeader>

    <ProfileInfo
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { delay: 0.4, duration: 0.5 }
      }}
    >
      <InfoRow>
        <InfoLabel>Name</InfoLabel>
        <InfoValue>{student.name}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Student ID</InfoLabel>
        <InfoValue>{student.id}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Email</InfoLabel>
        <InfoValue>{student.email}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Phone</InfoLabel>
        <InfoValue>{student.phone}</InfoValue>
      </InfoRow>
    </ProfileInfo>

    <QuoteContainer 
      variants={itemVariants}
      initial={{ opacity: 0, scale: 0.9, rotateX: 20, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        y: 0,
        transition: {
          delay: 0.8,
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(229, 9, 20, 0.4)",
        rotateX: 8,
        border: "1px solid rgba(229, 9, 20, 0.5)" 
      }}
    >
      <QuoteIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { delay: 0.8, duration: 0.3 }
        }}
      >❝</QuoteIcon>
      <span style={{ 
        display: 'block', 
        padding: '1rem 0.5rem', 
        textAlign: 'center', 
        width: '100%',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textShadow: '0 2px 3px rgba(0, 0, 0, 0.4)',
        margin: '0.5rem auto',
        lineHeight: 1.6,
        background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.05), transparent, rgba(229, 9, 20, 0.05))',
        borderRadius: '8px'
      }}>
        {student.quote || "EEE is the power that drives innovation forward."}
      </span>
      <QuoteIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { delay: 0.9, duration: 0.3 }
        }}
      >❞</QuoteIcon>
      <div style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.8rem', 
        opacity: 0.9,
        fontStyle: 'italic',
        letterSpacing: '0.5px'
      }}>
        — Student of RUET EEE Section A
      </div>
    </QuoteContainer>
  </ProfileContainer>
); 