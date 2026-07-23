import Student from "../models/student.model.js";

const getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate(
      "user"
    );
    if (!student) {
      return res.status(404).json({
        message: "Student not found !!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "student profile found",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Student profile not found",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { phone, cgpa, skills, about, linkedin, github , name } = req.body;

  try {
    const student = await Student.findOne({ user: req.user.id }).populate("user")
    if (!student) {
      return res.status(404).json({
        message: "Student profile not found !!",
      });
    }
    if(name){
      student.user.name= name
       await student.user.save(); 
    }

    if (phone) {
      student.phone = phone;
    }
    if (cgpa) {
      student.cgpa = cgpa;
    }
    if (skills) {
      student.skills = skills;
    }
    if (about) {
      student.about = about;
    }
    if (linkedin) {
      student.linkedin = linkedin;
    }
    if (github) {
      student.github = github;
    }

    await student.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: student,
    });
  } catch (error) {
   return res.status(500).json({
      success : false,
      message : "Internal Server Error",
      error : error.message
   })
  }
};

export { getProfile, updateProfile };
