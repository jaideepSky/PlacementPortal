import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
     
    },
    rollNo: {
      type: String,
      unique: true,
      required: true,
    },
    department: {
      type: String,
    enum: ["CSE", "IT", "ECE", "ME", "CE"],
      required: true,
    },
    year: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    skills: {
      type: [{
        type:String
      }],
      required: true,
    },
    about: {
      type: String,
      unique: true,
    },
    linkedin: {
      type: String,
      
    
    },
    github: {
      type: String,
      
    
    },
    resume: {
    url: {
        type: String,
        default: ""
    },
    publicId: {
        type: String,
        default: ""
    }
}
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
export default Student;
