import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from '../utils/performance';
import { FaChevronLeft, FaChevronRight, FaSearch, FaUsers, FaCode, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Components
import Section from '../components/Section';
import StudentCard from '../components/StudentCard';

// Mock data
import { allStudents } from '../data/students';

const PageContainer = styled.div`
  padding-top: 70px;
  background: linear-gradient(to bottom, #141414, #0a0a0a);
  min-height: 100vh;
`;

const PageHeader = styled.div`
  padding: 2.5rem 4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 4rem;
    right: 4rem;
    height: 1px;
    background: linear-gradient(to right, rgba(229, 9, 20, 0), rgba(229, 9, 20, 0.5), rgba(229, 9, 20, 0));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem 1.5rem;
    
    &:after {
      left: 1.5rem;
      right: 1.5rem;
    }
  }
`;

const PageTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.8rem;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const SearchContainer = styled(motion.div)`
  max-width: 550px;
  position: relative;
  margin: 2rem 0 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(80, 80, 80, 0.3);
  border-radius: 6px;
  color: #FFFFFF;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  &:focus {
    outline: none;
    border-color: rgba(229, 9, 20, 0.7);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(229, 9, 20, 0.8);
  font-size: 1.2rem;
`;

const ContentSection = styled.div`
  padding: 2rem 0;
`;

const CategoryTitle = styled.h2`
  color: #FFFFFF;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 4rem 1.5rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #E50914;
    border-radius: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0 1.5rem 1.2rem;
    font-size: 1.4rem;
  }
`;

const RowContainer = styled.div`
  position: relative;
  padding: 0 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
    margin-bottom: 3rem;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  padding: 1rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const FeaturedRow = styled(Row)`
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

const LoadingSkeleton = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 4px;
  height: 160px;
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16/9;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`;

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 5rem 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin: 2rem 4rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 2rem 1.5rem;
    padding: 3rem 1.5rem;
  }
`;

const SliderButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${RowContainer}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

// Replace the Key People section with these styled components
const KeyPeopleFloatingSection = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const KeyPeopleList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const KeyPersonItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(229, 9, 20, 0.1);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    opacity: 0;
  }
`;

const KeyPersonAvatar = styled(motion.div)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${props => props.borderColor || '#E50914'};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const KeyPersonDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeyPersonName = styled.h4`
  color: #FFFFFF;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
`;

const KeyPersonRole = styled.div`
  font-size: 0.6rem;
  color: ${props => props.color || '#E50914'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    font-size: 0.6rem;
  }
`;

const ExpandedInfo = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 8px 8px;
  z-index: 5;
`;

const KeyPersonQuote = styled.p`
  font-size: 0.75rem;
  color: #B3B3B3;
  font-style: italic;
  margin: 0;
  padding: 0.3rem 0.5rem;
  border-left: 2px solid #E50914;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0 4px 4px 0;
  text-align: left;
`;

const Students = ({ soundContext }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Add fallback for soundContext
  const playSound = useMemo(() => {
    return soundContext?.playSound || (() => {});
  }, [soundContext]);
  
  useEffect(() => {
    // Load student data with proper error handling
    const loadStudents = async () => {
      try {
        // Simulate network delay for loading animation
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if allStudents exists and has data
        if (!allStudents || allStudents.length === 0) {
          throw new Error('No student data available');
        }
        
        console.log('Loaded students data:', allStudents.length, 'students');
        
        // Initialize with all students
        setFilteredStudents(allStudents);
        setLoading(false);
      } catch (err) {
        console.error('Error loading students:', err);
        setError(err.message || 'Failed to load student data');
        setLoading(false);
      }
    };
    
    loadStudents();
  }, []);
  
  // Memoize the full student list to avoid recreating it on each render
  const studentsList = useMemo(() => {
    // Filter to only include series 23 students (those with IDs starting with 2301)
    return allStudents.filter(student => student.id && student.id.startsWith('2301')) || [];
  }, []);

  // Group students - only showing series 23 now, but displaying all of them
  const recentBatch = useMemo(() => 
    studentsList, // Remove the slice(0, 20) to show all Series 23 students
    [studentsList]
  );
  
  // Remove sections for other batches since we're only showing series 23
  
  // Optimize search with throttle and useCallback
  const filterStudents = useCallback(
    throttle((query) => {
      // Start with all students
      let result = [...studentsList];
      
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        result = result.filter(student => 
          (student.name && student.name.toLowerCase().includes(lowercaseQuery)) ||
          (student.id && student.id.toLowerCase().includes(lowercaseQuery))
        );
      }
      
      setFilteredStudents(result);
    }, 300), // Throttle to avoid excessive filtering on rapid typing
    [studentsList]
  );
  
  // Apply filtering when search query changes
  useEffect(() => {
    filterStudents(searchQuery);
  }, [searchQuery, filterStudents]);
  
  // Optimize search input handling
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  const handleSoundHover = useCallback(() => {
    playSound('hover');
  }, [playSound]);
  
  // Scroll row horizontally
  const scrollRow = useCallback((ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);
  
  const searchResultsRef = React.useRef(null);
  const recentRef = React.useRef(null);

  // Filter out special role students (CRs and Developer)
  const keyPeople = useMemo(() => {
    return allStudents.filter(student => student.role === 'CR' || student.role === 'Developer');
  }, []);
  
  // Replace tooltip state with expanded info state
  const [expandedPerson, setExpandedPerson] = useState(null);
  
  // Toggle expanded person info
  const togglePersonInfo = useCallback((personId) => {
    setExpandedPerson(expandedPerson === personId ? null : personId);
  }, [expandedPerson]);
  
  // Get role-specific styling
  const getRoleStyles = useCallback((role) => {
    switch(role) {
      case 'CR':
        return { 
          icon: <FaUsers />, 
          text: 'Class Representative',
          color: '#4CAF50', // Green for CR
          borderColor: '#4CAF50'
        };
      case 'Developer':
        return { 
          icon: <FaCode />, 
          text: 'Developer',
          color: '#2196F3', // Blue for Developer
          borderColor: '#2196F3'
        };
      default:
        return { 
          icon: <FaStar />, 
          text: role,
          color: '#E50914', // Default red
          borderColor: '#E50914'
        };
    }
  }, []);

  // Handle navigation to student profile
  const handleProfileClick = useCallback((studentId) => {
    playSound('click');
    navigate(`/student/${studentId}`);
  }, [navigate, playSound]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitleRow>
          <PageTitle 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Browse Students
          </PageTitle>
          
          {/* Key People Section - Moved here */}
          {!loading && !error && (
            <KeyPeopleFloatingSection
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <KeyPeopleList>
                {keyPeople.map((person, index) => {
                  const roleStyle = getRoleStyles(person.role);
                  return (
                    <KeyPersonItem
                      key={person.id}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        boxShadow: [
                          "0px 0px 0px rgba(0,0,0,0)",
                          `0px 0px 8px rgba(${roleStyle.color === '#4CAF50' ? '76,175,80' : roleStyle.color === '#2196F3' ? '33,150,243' : '229,9,20'},0.3)`,
                          "0px 0px 0px rgba(0,0,0,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + (index * 0.1),
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `rgba(${roleStyle.color === '#4CAF50' ? '76,175,80' : roleStyle.color === '#2196F3' ? '33,150,243' : '229,9,20'},0.15)`
                      }}
                      onClick={() => handleProfileClick(person.id)}
                      onMouseEnter={() => playSound('hover')}
                    >
                      <KeyPersonAvatar 
                        borderColor={roleStyle.borderColor}
                        animate={{ 
                          borderWidth: ["2px", "3px", "2px"],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5
                        }}
                      >
                        <img src={person.image} alt={person.name} />
                      </KeyPersonAvatar>
                      <KeyPersonDetails>
                        <KeyPersonName>{person.name}</KeyPersonName>
                        <KeyPersonRole color={roleStyle.color}>
                          {roleStyle.icon} {roleStyle.text}
                        </KeyPersonRole>
                      </KeyPersonDetails>
                    </KeyPersonItem>
                  );
                })}
              </KeyPeopleList>
            </KeyPeopleFloatingSection>
          )}
        </PageTitleRow>
        
        <SearchContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchInput 
            type="text" 
            placeholder="Search series 23 students by name or ID..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon><FaSearch /></SearchIcon>
        </SearchContainer>
      </PageHeader>
      
      <AnimatePresence mode="wait">
        {loading ? (
          <ContentSection key="loading">
            <CategoryTitle>Series 23 Students</CategoryTitle>
            <RowContainer>
              <Row>
                {[...Array(8)].map((_, index) => (
                  <LoadingSkeleton 
                    key={index} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </Row>
            </RowContainer>
          </ContentSection>
        ) : error ? (
          <NoResults 
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}. Please try refreshing the page.
          </NoResults>
        ) : searchQuery && filteredStudents.length === 0 ? (
          <NoResults 
            key="no-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            No students found matching "{searchQuery}". Try adjusting your search.
          </NoResults>
        ) : searchQuery ? (
          <ContentSection 
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CategoryTitle>Search Results for "{searchQuery}"</CategoryTitle>
            <RowContainer>
              <Row>
                {filteredStudents.map((student, index) => (
                  <StudentCard 
                    key={student.id} 
                    student={student} 
                    playSound={playSound}
                    delay={index}
                  />
                ))}
              </Row>
            </RowContainer>
          </ContentSection>
        ) : (
          <ContentSection 
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CategoryTitle>Series 23 Students</CategoryTitle>
            <RowContainer>
              <Row>
                {recentBatch.map((student, index) => (
                  <StudentCard 
                    key={student.id} 
                    student={student} 
                    playSound={playSound}
                    delay={index % 8} // Stagger animation for better performance
                  />
                ))}
              </Row>
            </RowContainer>
          </ContentSection>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Students;
