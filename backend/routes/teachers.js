// teacherRouter.js
const express = require('express');
const teacherRouter = express.Router();
const {
  teacherRegister,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,teacherInfo,getAllTeachersBySubject
} = require('../controllers/teachers');

const authentication = require("../middleware/authen");
const authorization = require("../middleware/author");
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

teacherRouter.post("/register", authentication, authorization("Admin") ,multipartyMiddleware,teacherRegister);
teacherRouter.get("/allTeachers", getAllTeachers);
teacherRouter.get("/Teacher/:id", getTeacher);
teacherRouter.put("/Teacher/:id", authentication, authorization("Admin"),multipartyMiddleware, updateTeacher);
teacherRouter.delete("/Teacher/:id", authentication, authorization("Admin"), deleteTeacher);
teacherRouter.get("/teacherinfo",authentication ,authorization("Teacher"),teacherInfo);
teacherRouter.get("/allTeachers/:id", getAllTeachersBySubject);

getAllTeachersBySubject
/* 

teacherRouter.put("/Teacher/:id/subjects", authentication, authorization("Admin"), assignSubjectsToTeacher);

teacherRouter.put("/Teacher/:id/grades", authentication, authorization("Admin"), assignGradesToTeacher);

teacherRouter.put("/Teacher/:id/materials", authentication, authorization("Admin"), assignMaterialsToTeacher);

teacherRouter.put("/Teacher/:id/profile-picture", authentication, authorization("Admin"), 

updateProfilePicture);
teacherRouter.get("/subject/:subjectId", getTeachersBySubject);

teacherRouter.get("/grade/:gradeId", getTeachersByGrade);

*/

module.exports = teacherRouter;
