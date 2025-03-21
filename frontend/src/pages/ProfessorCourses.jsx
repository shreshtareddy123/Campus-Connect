import React, { useState } from "react";
import {
  Card, CardContent, Button, TextField, Box, Typography,
  FormControl, InputLabel, Select, MenuItem, Drawer, Chip, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";
import "../css/ProfessorCourses.css"

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
    <Box className="container">
      <Typography variant="h4" className="title">My Courses</Typography>

      {/* Course List */}
      <Box className="course-grid">
        {courses.map((course) => (
          <Card key={course.id} className="course-card">
            {/* Status Badge */}
            <Chip
              label={course.type === "past" ? "Completed" : "Ongoing"}
              className={`status-badge ${course.type === "past" ? "completed" : "ongoing"}`}
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
              {course.link && (
                <Typography
                  component="a"
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#2980b9", textDecoration: "none", display: "block", mt: 1 }}
                >
                  View Course
                </Typography>
              )}
            </CardContent>

            {/* Rounded Delete Button */}
            <IconButton
              className="remove-button"
              onClick={() => handleRemoveCourse(course.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </Box>

      {/* Floating Delete Button */}
      <IconButton
        className="floating-delete"
        onClick={() => alert("Delete button pressed")}
      >
        <DeleteIcon sx={{ color: "white" }} />
      </IconButton>

      {/* Floating "Add Course" Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDrawer(true)}
        className="add-button"
      >
        Add Course
      </Button>

      {/* Right Drawer for Adding Course */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box className="drawer">
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
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProfessorCourses;
