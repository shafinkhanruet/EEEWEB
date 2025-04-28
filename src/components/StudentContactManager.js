import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #e50914;
      box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.25);
    }
  }
  
  button {
    padding: 0.75rem 1.5rem;
    background: #e50914;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover {
      background: #f40612;
    }
  }
`;

const Table = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 200px 1fr 120px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 80px 140px 1fr 100px;
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 200px 1fr 120px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 80px 140px 1fr 100px;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    
    &:focus {
      outline: none;
      border-color: #e50914;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 0.75rem;
  background: ${props => props.secondary ? 'rgba(0, 0, 0, 0.3)' : '#e50914'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.secondary ? 'rgba(0, 0, 0, 0.5)' : '#f40612'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  
  select {
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    cursor: pointer;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  background: ${props => props.error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)'};
  color: ${props => props.error ? '#dc3545' : '#28a745'};
  border-left: 4px solid ${props => props.error ? '#dc3545' : '#28a745'};
`;

const StudentContactManager = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setStatus] = useState({ message: '', error: false });

  // Fetch students data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/assets/contacts_2301001_to_2301060.json');
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setStatus({ message: 'Failed to load student data: ' + error.message, error: true });
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        String(student.No).includes(searchTerm) || 
        (student['Contact No'] && student['Contact No'].includes(searchTerm)) ||
        (student['FB ID Link'] && student['FB ID Link'].toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredStudents(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, students]);
  
  // Handle search
  const handleSearch = () => {
    // Search is already handled in the useEffect above
  };
  
  // Start editing a student
  const handleEdit = (student) => {
    setEditingId(student.No);
    setEditData({
      contactNo: student['Contact No'],
      fbLink: student['FB ID Link']
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };
  
  // Handle save changes
  const handleSave = async () => {
    try {
      setStatus({ message: 'Saving changes...', error: false });
      
      // Send update to the API
      const response = await fetch('/api/updateContacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: editingId,
          contactNo: editData.contactNo,
          fbLink: editData.fbLink
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contact');
      }
      
      // Update local state
      const updatedStudents = students.map(student => {
        if (student.No === editingId) {
          return {
            ...student,
            'Contact No': editData.contactNo,
            'FB ID Link': editData.fbLink
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      setStatus({
        message: `Successfully updated student ${editingId}`,
        error: false
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus({ message: '', error: false });
      }, 3000);
      
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Error saving changes:', error);
      setStatus({
        message: 'Failed to save changes: ' + error.message,
        error: true
      });
    }
  };
  
  // Handle input change in edit mode
  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    });
  };
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Function to save all changes
  const handleSaveAll = async () => {
    try {
      setStatus({ message: 'Saving all changes...', error: false });
      
      // Send all students data to the API
      const response = await fetch('/api/updateContacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updateAll: true,
          allStudents: students
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contacts');
      }
      
      const result = await response.json();
      
      setStatus({ 
        message: result.message || 'All changes saved successfully!', 
        error: false 
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus({ message: '', error: false });
      }, 3000);
    } catch (error) {
      console.error('Error saving all changes:', error);
      setStatus({
        message: 'Failed to save changes: ' + error.message,
        error: true
      });
    }
  };
  
  if (loading) {
    return <Container>Loading student data...</Container>;
  }
  
  return (
    <Container>
      <Header>
        <h1>Student Contact Manager</h1>
        <p>Update student contact information and Facebook links</p>
      </Header>
      
      <SearchBar>
        <input 
          type="text"
          placeholder="Search by ID, phone number, or FB link..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchBar>
      
      {status.message && (
        <StatusMessage error={status.error}>
          {status.message}
        </StatusMessage>
      )}
      
      <Table>
        <TableHeader>
          <div>ID</div>
          <div>Contact No</div>
          <div>Facebook Link</div>
          <div>Actions</div>
        </TableHeader>
        
        {currentItems.map(student => (
          <TableRow
            key={student.No}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div>{student.No}</div>
            
            {editingId === student.No ? (
              <>
                <div>
                  <input 
                    type="text"
                    value={editData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    value={editData.fbLink}
                    onChange={(e) => handleInputChange('fbLink', e.target.value)}
                  />
                </div>
                <ButtonGroup>
                  <ActionButton onClick={handleSave}>Save</ActionButton>
                  <ActionButton secondary onClick={handleCancel}>Cancel</ActionButton>
                </ButtonGroup>
              </>
            ) : (
              <>
                <div>{student['Contact No']}</div>
                <div style={{ wordBreak: 'break-all' }}>
                  <a 
                    href={student['FB ID Link']} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#4267B2', textDecoration: 'none' }}
                  >
                    {student['FB ID Link']}
                  </a>
                </div>
                <ButtonGroup>
                  <ActionButton onClick={() => handleEdit(student)}>Edit</ActionButton>
                </ButtonGroup>
              </>
            )}
          </TableRow>
        ))}
      </Table>
      
      <Pagination>
        <div>
          <select 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        
        <PaginationButtons>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </PaginationButtons>
        
        <ActionButton onClick={handleSaveAll}>
          Save All Changes
        </ActionButton>
      </Pagination>
    </Container>
  );
};

export default StudentContactManager; 