import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProfessorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    description: '',
    status: 'Ongoing',
    link: '',  // Link for the course
  });
  const [user, setUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false); // For Dialog visibility
  const navigate = useNavigate();

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch courses belonging to the logged-in professor
  useEffect(() => {
    if (user) {
      const fetchCourses = async () => {
        try {
          const q = query(collection(db, 'courses'), where('professorId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedCourses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCourses(fetchedCourses);
        } catch (err) {
          console.error('Error fetching courses:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    }
  }, [user]);

  // Handle removing a course
  const handleRemoveCourse = async (id) => {
    try {
      // Delete the course from Firestore
      await deleteDoc(doc(db, 'courses', id));
      
      // Update the UI by removing the course from state
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  // Add new course to Firestore
  const handleAddCourse = async () => {
    if (!newCourse.courseName || !newCourse.description || !newCourse.link) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      const courseId = generateCourseId(newCourse.courseName);  // Generate the courseId dynamically

      await addDoc(collection(db, 'courses'), {
        courseName: newCourse.courseName,
        description: newCourse.description,
        status: newCourse.status,
        courseId: courseId,  // Automatically generated courseId
        link: newCourse.link,
        professorId: user.uid,
      });

      // Clear form and reload the course list
      setNewCourse({ courseName: '', description: '', status: 'Ongoing', link: '' });
      const q = query(collection(db, 'courses'), where('professorId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(fetchedCourses);
      setFormVisible(false); // Close the dialog after adding course
    } catch (err) {
      console.error('Error adding course:', err);
    }
  };

  // Generate courseId based on course name and random numbers
  const generateCourseId = (courseName) => {
    const deptPrefix = courseName.slice(0, 2).toUpperCase();  // Get first two letters
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate 4 random digits
    return deptPrefix + randomNumber;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Display loading or error message
  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} style={{ position: 'relative' }}>
        {courses.map((course) => (
          <Card key={course.id} style={{ width: '250px', marginBottom: '20px' }}>
            <CardContent>
              <Chip
                label={course.status === 'Ongoing' ? 'Ongoing' : 'Completed'}
                color={course.status === 'Ongoing' ? 'primary' : 'secondary'}
              />
              <Typography variant="h6">{course.courseName}</Typography>
              <Typography variant="body2">{course.description}</Typography>

              {/* Display the link as a clickable hyperlink */}
              {course.link && (
                <Typography variant="body2" color="primary">
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    Go to Course
                  </a>
                </Typography>
              )}

              <Button
                onClick={() => handleRemoveCourse(course.id)}
                startIcon={<DeleteIcon />}
                color="error"
                style={{ marginTop: '10px' }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Add Course Button in the bottom-right of the box */}
        <Button
          variant="contained"
          onClick={() => setFormVisible(true)}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            borderRadius: '8px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
          }}
          startIcon={<AddIcon />}
        >
          Add Course
        </Button>
      </Box>

      {/* Dialog for Adding Course */}
      <Dialog open={isFormVisible} onClose={() => setFormVisible(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Course Name"
            fullWidth
            margin="normal"
            name="courseName"
            value={newCourse.courseName}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Course Link"
            fullWidth
            margin="normal"
            name="link"
            value={newCourse.link}
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={newCourse.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormVisible(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} color="primary">
            Add Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfessorCourses;