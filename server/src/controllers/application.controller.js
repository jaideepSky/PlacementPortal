import Application from "../models/application.model.js";
import Student from "../models/student.model.js";
import Company from "../models/company.model.js";

const applyCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ user: req.user.id });
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }
    if (company.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Applications for this company are closed.",
      });
    }
    if (student.cgpa < company.minCGPA) {
      return res.status(400).json({
        success: false,
        message: "You are not eligible due to CGPA criteria.",
      });
    }

    if (!company.eligibleBranches.includes(student.department)) {
      return res.status(400).json({
        success: false,
        message: "Your department is not eligible.",
      });
    }
    const existingApplication = await Application.findOne({
      student: student._id,
      company: company._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this company.",
      });
    }
    const application = await Application.create({
      student: student._id,
      company: company._id,
    });
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getApplication = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const applications = await Application.find({
      student: student._id,
    }).populate("company");
    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Applications not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllApplication = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    const applications = await Application.find({ company: companyId })
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("company");
    if (applications.length === 0) {
      return res.json({
        message: "No applicants found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: error.message
});
  }
};
const updateApplication = async (req,res)=>{
  const {applicationId} = req.params
  const {status} = req.body
 try {
   const application = await Application.findById(applicationId)
   if(!application){
     return res.status(404).json({
        message: "Application not found",
        success: false,
      });
   }
  const validStatus = [
    "Applied",
    "Shortlisted",
    "Rejected",
    "Selected"
];

if (!validStatus.includes(status)) {
    return res.status(400).json({
        success: false,
        message: "Invalid status"
    });
}
   application.status = status;
    await application.save();

   return res.status(200).json({
    success: true,
    message: "Application status updated successfully",
    data: application
});
  

 } catch (error) {
     return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: error.message
});
 }
}

export { applyCompany, getApplication, getAllApplication , updateApplication };
