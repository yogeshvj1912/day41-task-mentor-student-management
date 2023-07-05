const MentorRouter = require("express").Router();
const MentorModel = require("../Models/Mentor.model");
const StudentModel = require("../Models/Student.model");
MentorRouter.get("/", function (req, res, next) {
  return res.status(200).json({
    message: "Teacher router working",
  });
});

//API to create Mentor
MentorRouter.post("/createMentor",async (req, res) => {


  try {
    const {
      mentorName,
      mentorEmail,
      mentorContactNumber,
      skills,
      primaryLanguage,
      secondaryLanguage,
      studentIds,
    } = req.body;
  
    const newMentor = new MentorModel({
      mentorName,
      mentorEmail,
      mentorContactNumber,
      skills,
      primaryLanguage,
      secondaryLanguage,
      studentIds,
    });
 
   await newMentor.save()
   if(newMentor._id){
   
      res.status(200).json({message:"Mentor created successfully!!!"})
   }
      
  } catch (error) {
     
      res.status(500).json({ message: "Somthing went wrong" })
  }
})


// API to Assign a student to Mentor
//Select one mentor and Add multiple Student 
MentorRouter.put('/add-students/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Remove duplicate student IDs from the provided array
    const uniqueStudentIds = [...new Set(studentIds)];

    // Filter out any duplicate student IDs already present in the mentor's studentIds array
    const filteredStudentIds = uniqueStudentIds.filter((studentId) => !mentor.studentIds.includes(studentId));

    // Push the filtered student IDs to the mentor's studentIds array
    mentor.studentIds.push(...filteredStudentIds);

    await mentor.save();

    res.status(200).json({ message: 'Students assigned to mentor successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign students to mentor' });
  }
});





//Write API to show all students for a particular mentor

MentorRouter.get('/mentors/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await MentorModel.findById(mentorId).select('studentIds');

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const studentIds = mentor.studentIds;

    const students = await StudentModel.find({ _id: { $in: studentIds } });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
});












module.exports = MentorRouter;
