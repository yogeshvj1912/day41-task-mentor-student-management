const express = require("express");
const bodyparser = require("body-parser");
const APP_SERVER = require("./app");
const ENV = require("dotenv");

/**
 * CONFIGURING ENVIRONMENT VARIABLES
 */
ENV.config();
const NODE_SERVER = express();

/**
 * ADDING MIDDLEWARES TO NODE_SERVER
 */
NODE_SERVER.use(bodyparser.json());
NODE_SERVER.use(bodyparser.urlencoded({ extended: true }));

/**
 * CONNECTING MONGO DATABASE WITH NODE APPLICATION
 */
require("./dbconfig");

/**
 * ATTACHING APP_SERVER TO NODE_SERVER
 */
NODE_SERVER.use("/api", APP_SERVER);

/**
 * CONFIGURE NODE SERVER
 * PORT TO ACCEPT/SEND REQUEST/RESPONSE = 5000
 */
NODE_SERVER.listen(process.env.NODE_DEVELOPMENT_PORT, "localhost", () => {
  console.log("SERVER STARTED ON PORT", process.env.NODE_DEVELOPMENT_PORT);
});


// const express = require('express');
// const mongoose = require('mongoose');

// // Create Express app
// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/zenclone', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// // Define Mentor and Student schemas and models
// const mentorSchema = new mongoose.Schema({
//   name: String
// });

// const studentSchema = new mongoose.Schema({
//   name: String,
//   mentor: Array
// });

// const Mentor = mongoose.model('Mentor', mentorSchema);
// const Student = mongoose.model('Student', studentSchema);

// // API to create a Mentor
// app.post('/mentors', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const mentor = await Mentor.create({ name });
//     res.status(201).json(mentor);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create mentor' });
//   }
// });

// // API to create a Student
// app.post('/students', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const student = await Student.create({ name });
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create student' });
//   }
// });

// // API to Assign a student to a Mentor
// app.put('/mentors/:mentorId/addStudents', async (req, res) => {
//   try {
//     const { mentorId } = req.params;
//     const { studentIds } = req.body;

//     const mentor = await Mentor.findById(mentorId);
//     if (!mentor) {
//       return res.status(404).json({ error: 'Mentor not found' });
//     }

//     const studentsToAdd = await Student.find({
//       _id: { $in: studentIds },
      
//     });

//     await Promise.all(studentsToAdd.map(student => {
//       student.mentor = mentorId;
//       return student.save();
//     }));

//     res.status(200).json({ message: 'Students assigned to mentor successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to assign students to mentor' });
//   }
// });

// // API to Assign or Change Mentor for a particular Student
// app.put('/students/:studentId/changeMentor/:mentorId', async (req, res) => {
//   try {
//     const { studentId, mentorId } = req.params;

//     const student = await Student.findByIdAndUpdate(
//       studentId,
//       { mentor: mentorId },
//       { new: true }
//     );

//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to assign/change mentor for student' });
//   }
// });

// // API to show all students for a particular mentor
// app.get('/mentors/:mentorId/students', async (req, res) => {
//   try {
//     const { mentorId } = req.params;

//     const students = await Student.find({ mentor: mentorId });

//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch students' });
//   }
// });

// // API to show the previously assigned mentor for a particular student
// app.get('/students/:studentId/mentor', async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const student = await Student.findById(studentId).populate('mentor');

//     if (!student) {
//       res.status(404).json({ error: 'Student not found' });
//       return;
//     }

//     const previousMentor = student.mentor;

//     res.status(200).json(previousMentor);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch previous mentor' });
//   }
// });

// // Start the server
// app.listen(8000, () => {
//   console.log('Server is running on port 3000');
// });
