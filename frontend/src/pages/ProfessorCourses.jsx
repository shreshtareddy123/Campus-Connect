import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";

const ProfessorCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Machine Learning", description: "Intro to ML algorithms", link: "#", type: "current" },
    { id: 2, title: "Operating Systems", description: "Process management & concurrency", link: "#", type: "past" },
  ]);

  const [newCourse, setNewCourse] = useState({ title: "", description: "", link: "", type: "current" });
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description) {
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
      setNewCourse({ title: "", description: "", link: "", type: "current" });
      setOpenDrawer(false);
    }
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <Box sx={{
      padding: '4rem',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#2c3e50' }}>
        Your Courses
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        {courses.map((course) => (
          <Card key={course.id} sx={{
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: '#ffffff',
            transition: 'transform 0.2s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              transform: 'scale(1.03)'
            }
          }}>
            <Chip
              label={course.type === "past" ? "Completed" : "Ongoing"}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontSize: 14,
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '20px',
                color: 'white',
                backgroundColor: course.type === "past" ? '#e74c3c' : '#27ae60'
              }}
            />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {course.type === "past" ? (
                  <HistoryIcon sx={{ color: "#e74c3c" }} />
                ) : (
                  <SchoolIcon sx={{ color: "#27ae60" }} />
                )}
                <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>{course.title}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>{course.description}</Typography>

              {/* Course Actions */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography
                  component="a"
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#2980b9',
                    textDecoration: 'underline',
                    fontSize: 14
                  }}
                >
                  View Course
                </Typography>
                <Button
                  onClick={() => handleRemoveCourse(course.id)}
                  sx={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '6px',
                    width: '36px',
                    height: '36px',
                    minWidth: 'unset',
                    borderRadius: '50%',
                    marginTop: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#c0392b',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Floating Add Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDrawer(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#3498db',
          padding: '12px 20px',
          fontSize: 16,
          fontWeight: 'bold',
          borderRadius: '24px',
          color: 'white',
          gap: 1,
          boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            backgroundColor: '#2980b9',
            transform: 'scale(1.05)'
          }
        }}
      >
        Add Course
      </Button>

      {/* Drawer Form */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 350, padding: '2rem' }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Add a New Course</Typography>
          <TextField
            label="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Short Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Course Link (optional)"
            value={newCourse.link}
            onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Course Type</InputLabel>
            <Select
              value={newCourse.type}
              onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
              variant="outlined"
            >
              <MenuItem value="current">Ongoing Course</MenuItem>
              <MenuItem value="past">Completed Course</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setOpenDrawer(false)} color="error">Cancel</Button>
            <Button onClick={handleAddCourse} variant="contained" color="primary">Add Course</Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProfessorCourses;
