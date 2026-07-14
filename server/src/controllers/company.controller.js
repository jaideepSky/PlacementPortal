import Company from "../models/company.model.js";

const createCompany = async (req, res) => {
  const {
    name,
    logo,
    industry,
    status,
    jobRole,
    location,
    packageLPA,
    positions,
    minCGPA,
    deadline,
    description,
    requirements,
  } = req.body;

  if (
    !name ||
    !logo ||
    !industry ||
    !status ||
    !jobRole ||
    !location ||
    !packageLPA ||
    !positions ||
    !minCGPA ||
    !deadline ||
    !description ||
    !requirements
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      name,
      logo,
      industry,
      status,
      jobRole,
      location,
      packageLPA,
      positions,
      minCGPA,
      deadline,
      description,
      requirements,
      createdBy:req.user.id
    });
   
    return res.status(201).json({
      success: true,
      message: "Company Created",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { createCompany };
