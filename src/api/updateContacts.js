import fs from 'fs';
import path from 'path';

/**
 * API handler to update student contact information
 * 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
  // Only allow POST method for updates
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentId, contactNo, fbLink, updateAll, allStudents } = req.body;
    
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'assets', 'contacts_2301001_to_2301060.json');
    
    // Read the existing file
    const fileData = fs.readFileSync(filePath, 'utf8');
    let students = JSON.parse(fileData);
    
    if (updateAll && Array.isArray(allStudents)) {
      // Update the entire student list
      students = allStudents;
    } else if (studentId) {
      // Update a single student
      students = students.map(student => {
        if (student.No === studentId) {
          return {
            ...student,
            'Contact No': contactNo,
            'FB ID Link': fbLink
          };
        }
        return student;
      });
    } else {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
    
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(students, null, 4), 'utf8');
    
    return res.status(200).json({ 
      success: true, 
      message: updateAll ? 'All students updated successfully' : `Student ${studentId} updated successfully` 
    });
    
  } catch (error) {
    console.error('Error updating contacts:', error);
    return res.status(500).json({ 
      error: 'Failed to update contacts',
      message: error.message 
    });
  }
} 