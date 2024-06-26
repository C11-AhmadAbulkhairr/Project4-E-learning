import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box,Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

const Grades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/grades/allGrades`)
      .then((result) => {
        setGrades(result.data.grades);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom >
        Grades
      </Typography>
      <Grid container spacing={4}>
        {grades.map((grade) => (
          <Grid item key={grade._id} xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: 20 }}>
            <Card component={Link} to={`/grades/${grade._id}/subjects`} style={{ textDecoration: 'none' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <SchoolIcon style={{ fontSize: 40, marginRight: 10 }} />
                  <Typography variant="h5">
                    {grade.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
           </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Grades;
