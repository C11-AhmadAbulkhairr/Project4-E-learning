const Teacher = require("../models/teacher");
const User = require('../models/UserSchema')



const teacherRegister = async (req, res) => {
    const { name, email, password, phoneNumber, age, subjectId } = req.body;
  
    try {
      // Find the teacher role
      // on the same way I will find the subject and grade 
      //or I will add it from db
      const teacherRole = await Role.findOne({ role: 'Teacher' });
      if (!teacherRole) {
        return res.status(404).json({
          success: false,
          message: 'Teacher role not found',
        });
      }
  
      // Create the user
      const user = new User({
        name,
        email,
        password,
        role: teacherRole._id,
      });
  
      await user.save();
  
      // Create the teacher
      const teacher = new Teacher({
        user: user._id,
        phoneNumber,
        age,
        subject: subjectId,
        materials: [],
        //grade
      });
  
      await teacher.save();
  
      res.status(201).json({
        success: true,
        message: 'Teacher registered successfully',
        teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };



const getAllTeachers = async (req,res) => {
    try {
        const allTeachers = await Teacher.find().populate('materials',"-_id -__v").populate('subject',"-_id -__v").populate('grade',"-_id -__v").populate("user","-_id -__v")

        
    if(!allTeachers){
        return res.status(404).json({
            success: false,
            message: "Teachers not found"
        })
    }
    res.status(200).json({
        success:true,
        allTeachers
    })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
          });
    }
}

const getTeacher = async (req, res) => {
    const { id } = req.params;
  
    try {
      const teacher = await Teacher.findById(id).populate('user',"-_id -__v").populate('subject',"-_id -__v").populate('grade',"-_id -__v").populate('materials',"-_id -__v")
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
  
      res.status(200).json({
        success: true,
        teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };

  const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true }).populate('user',"-_id -__v").populate('subject',"-_id -__v").populate('grade',"-_id -__v").populate('materials',"-_id -__v")
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Teacher updated successfully',
        teacher,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };

  const deleteTeacher = async (req, res) => {
    const { id } = req.params;
  
    try {
      const teacher = await Teacher.findByIdAndDelete(id);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Teacher deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  



module.exports = {
    teacherRegister,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher,
  };