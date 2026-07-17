import Student from "../models/student.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js";

const uploadResume = asyncHandler(async (req,res)=>{
    const student = await Student.findOne({user:req.user.id})
    if (!student) {
    throw new ApiError(404,"Student Not found");
}
   if (!req.file) {
    throw new ApiError(400, "Resume is required");
    
    if (student.resume.publicId) {
    await cloudinary.uploader.destroy(student.resume.publicId, {
        resource_type: "raw",
    });
}
}
const uploadedResume = await uploadOnCloudinary(
    req.file.path
);
student.resume.url = uploadedResume.url;

student.resume.publicId = uploadedResume.public_id;
await student.save();

return  new ApiResponse(200 , {
    resume:{
        url:uploadedResume.url,
        publicId:uploadedResume.public_id
    }
} ,"Resume uploaded successfully")
})
export {uploadResume}