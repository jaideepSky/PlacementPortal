
import Student from "../models/student.model.js"

const getProfile = async(req , res)=>{
   try {
     const student  = await Student.findOne({ user:req.user.id}).populate('user')
     if(!student){
        return res.status(404).json({
            message : "Student not found !!"
        })
     }
     return res.status(200).json({
        success: true,
        message: "student profile found",
        data : student
     })
    
   } catch (error) {
        return res.status(500).json({
    success: false,
    message: "Student profile not found",
    error : error.message
});
   }
}


const updateProfile = async()=>{
    
}

export {getProfile,updateProfile}