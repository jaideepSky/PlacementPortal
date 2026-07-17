import Application from "../models/application.model.js";
import Company from "../models/company.model.js";
import Student from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getStudentDashboard = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user.id }).populate("user");
  if (!student) {
    throw new ApiError(401, "Student not find");
  }
  const totalApplications = await Application.countDocuments({
    student: student._id,
  });
  const totalSelectedApplications = await Application.countDocuments({
    student: student._id,
    status: "Selected",
  });
  const totalSortlistedApplications = await Application.countDocuments({
    student: student._id,
    status: "Shortlisted",
  });
  const totalRejectedApplications = await Application.countDocuments({
    student: student._id,
    status: "Rejected",
  });
  const totalPendingApplications = await Application.countDocuments({
    student: student._id,
    status: "Applied",
  });
  const recentApplications = await Application.find({ student: student._id })
    .populate("company")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        student: {
          name: student.user.name,
          email: student.user.email,
          rollNo: student.rollNo,
          department: student.department,
          cgpa: student.cgpa,
        },
        stats: {
          totalApplications: totalApplications,
          selected: totalSelectedApplications,
          shortlisted: totalSortlistedApplications,
          rejected: totalRejectedApplications,
          pending: totalPendingApplications,
        },
        recentApplications: recentApplications,
      },
      "Data fetched Successfully"
    )
  );
});
const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalCompanies = await Company.countDocuments();
  const activeCompanies = await Company.countDocuments({ status: "Active" });
  const totalApplications = await Application.countDocuments();
  const selectedApplications = await Application.countDocuments({
    status: "Selected",
  });
  const recentApplications = await Application.find()

    .populate("company")
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .sort({ createdAt: -1 })
    .limit(8);
});
return res.status(200).json(
    new ApiResponse(
        200,
        {
            stats: {
                totalStudents,
                totalCompanies,
                activeCompanies,
                totalApplications,
                selectedStudents,
            },
            recentApplications,
        },
        "Dashboard data fetched successfully"
    )
);
export { getStudentDashboard, getAdminDashboard };
