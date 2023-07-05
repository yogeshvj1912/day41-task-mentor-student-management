const mongoose = require("mongoose");

/**
 * WHAT IS MONGOOSE SCHEMA?
 * MONGOOSE SCHEMAS ARE BLUE PRINT FOR WHAT A DOCUMENT OR RECORD OF A SINGLE STUDENT WILL LOOK LIKE
 */
const StudentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentContactNumber: {
    type: String, // +917010678976
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  primaryLanguage: {
    type: String,
    required: true,
  },
  secondaryLanguage: {
    type: String,
    required: false,
    default: null,
  },
  mentors:{
    type:Array,
    default:null
  }
});

module.exports = mongoose.model("student", StudentSchema,"students");
