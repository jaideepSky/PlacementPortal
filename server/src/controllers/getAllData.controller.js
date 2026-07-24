import Application from "../models/application.model.js"
import Student from "../models/student.model.js"

const getAllStudents = async(req,res)=>{
    try {
        const students = await Student.find().populate("user")
        return res.status(200).json({
            success:true,
            data:students,
            message:"All Students fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error:error.message,
            message:"Internal Server Error"
        })
        
    }
}

const getAllApplications = async(req,res)=>{
    try {
        const applications = await Application.find().populate({
            path:"student",
            populate:{
                path:"user",
                select:"name email"
            }
        }).populate("company")
        console.log(JSON.stringify(applications[0], null, 2));
        return res.status(200).json({
            success:true,
            data:applications,
            message:"All Students fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error:error.message,
            message:"Internal Server Error"
        })
        
    }
}
export {getAllStudents,getAllApplications}