const StudentRouter = require("express").Router();
const StudentModel = require("../Models/Student.model");
const MentorModel = require("../Models/Mentor.model");
const { response } = require("../app");

StudentRouter.get("/",(req,res)=>{
    res.json("hello world")
})

//API to create Student
 StudentRouter.post("/createStudent",async (req, res) => {


  try {
    const {  
      studentName,
      studentEmail,
      studentContactNumber,
      course,
      primaryLanguage,
      secondaryLanguage,
      mentors,
    } = req.body;
 
    const newStudent = new StudentModel({
      studentName,
      studentEmail,
      studentContactNumber,
      course,
      primaryLanguage,
      secondaryLanguage,
      mentors,
    });
 
   await newStudent.save()
   if(newStudent._id){
   
      res.status(200).json({message:"data successfully created!!"})
   }
      
  } catch (error) {
     
      res.status(500).json({ message: "Somthing went wrong" })
  }
})








// API to Assign or Change Mentor for particular Student
//Select One Student and Assign one Mentor
StudentRouter.put('/students/:studentId/assign/:mentorId', async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;

    // Find the student by their ID
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the mentor ID already exists in the mentors array
    if (student.mentors.includes(mentorId)) {
      return res.status(400).json({ error: 'Mentor already assigned to the student' });
    }

    // Retrieve the previous mentor data
    const previousMentor = student.mentors;

    // Update the student's mentors array by pushing the new mentor ID
    student.mentors.push(mentorId);

    // Save the updated student document
    await student.save();

    res.status(200).json({updatedStudent: student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign student to mentor' });
  }
});








// API to Assign a student to a Mentor
StudentRouter.put('/add-mentors/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const studentsToAdd = await StudentModel.find({
      _id: { $in: studentIds },
    });

    await Promise.all(studentsToAdd.map(student => {
      if (!student.mentors.includes(mentorId)) {
        student.mentors.push(mentorId);
      }
      return student.save();
    }));

    res.status(200).json({ message: 'mentor assigned to students successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign mentor to students' });
  }
});




//API to show the previously assigned mentor for a particular student.
StudentRouter.get('/particular-student/:studentId/mentor', async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await StudentModel.findById(studentId).select('mentors');

    if (!student) {
      return res.status(404).json({ error: 'student not found' });
    }

    const mentors = student.mentors;

    const lastMentorId = mentors[mentors.length - 2];

    const mentor = await MentorModel.find({ _id: { $in: lastMentorId} });

    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
});


module.exports = StudentRouter;
