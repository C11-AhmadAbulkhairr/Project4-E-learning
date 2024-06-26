import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import CreateTeacher from '../components/Admin/CreateTeacher';
import {createContext } from 'react'
import AddNewGrade from '../components/Admin/AddNewGrade';
import AddNewSubject from '../components/Admin/AddNewSubject';
import DeleteSubject from '../components/Admin/DeleteSubject';
import DeleteGrade from '../components/Admin/DeleteGrade';
import DeleteTeacher from '../components/Admin/DeleteTeacher';
import UpdateTeacher from '../components/Admin/UpdateTeacher';

export const AdminContext = createContext();


const AdminDashboard = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    grade: '',
    subject: '',
    phoneNumber:"+962",
    image: null,
  });

  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState({ name: '', grade: '' });
  const [deletedSubject, setDeletedSubject] = useState("");

const handleDeleteSubjectGrade =  (e) => {
  axios.get(`${process.env.REACT_APP_API_URL}/subjects/allSubjects/${e.target.value}`)
        .then(response => {
          console.log("result grade:",response.data.subjects);
          setSubjects(response.data.subjects);
        })
        .catch(error => {
          console.error('Error getting subjects:', error);
          setSubjects([]);
        });
}
  const handleDeleteSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/subjects/deleteSubject/${deletedSubject}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  }

  //getting all grades in drop list
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Grades/allGrades`)
      .then(response => {
        setGrades(response.data.grades);
      })
      .catch(error => {
        console.error('Error getting grades:', error);
      });
  }, []);


  //adding new grade and updating the grade array
  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/grades/addGrade`,
        { name: newGrade },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
      setGrades([...grades, response.data.grade]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  // add new subject and update 
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/subjects/addSubject`,
        newSubject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
     // setSubjects([...subjects, response.data.subject]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };

  const handleNewSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
    if (name === 'grade') {
      axios.get(`${process.env.REACT_APP_API_URL}/subjects/allSubjects/${value}`)
        .then(response => {
          setSubjects(response.data.subjects);
        })
        .catch(error => {
          console.error('Error getting subjects:', error);
          setSubjects([]);
        });
    }
  };

  const handleFileChange = (e) => {
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      image: e.target.files[0],
    }));
  };


  //creating teacher with form including
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(formData);
    console.log(teacher);
    Object.keys(teacher).forEach((key) => {
      formData.append(key, teacher[key]);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/teachers/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
      console.log(formData);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server Error');
    }
  };


  
  return (

    <AdminContext.Provider value={{teacher,
      grades,
      subjects,handleInputChange,
      handleFileChange,
      handleRegister,newGrade,
      setNewGrade,handleAddGrade,handleNewSubjectChange,handleAddSubject,newSubject,deletedSubject,
      setDeletedSubject,
      handleDeleteSubjectGrade,
      handleDeleteSubject,setMessage,setSubjects}}>

    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
</Box>
      <CreateTeacher/>
      <AddNewGrade/>
<AddNewSubject/>
   <DeleteSubject/>
<DeleteGrade/>
<DeleteTeacher/>
<UpdateTeacher/>
    </Container>
    </AdminContext.Provider>

  );
};

export default AdminDashboard;
