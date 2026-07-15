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
      createdBy: req.user.id,
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

const getAllCompany = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({
      success: true,
      message: "",
      data: companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
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

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    logo,
    industry,
    location,
    packageLPA,
    positions,
    minCGPA,
    deadline,
    description,
    status,
    jobRole,
    requirements
  } = req.body;
  try {
    const company = await Company.findById(id);
   
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    if(name){
        company.name = name
    }
      if(logo){
        company.logo = logo
    }
      if(industry){
        company.industry = industry
    }
      if(location){
        company.location = location
    }
      if(packageLPA){
        company.packageLPA = packageLPA
    }
      if(positions){
        company.positions = positions
    }
      if(minCGPA){
        company.minCGPA = minCGPA
    }
      if(deadline){
        company.deadline = deadline
    }
      if(description){
        company.description = description
    }
      if(status){
        company.status = status
    }
      if(jobRole){
        company.jobRole = jobRole
    }
      if(requirements){
        company.requirements = requirements
    }
     await company.save()

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
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

const deleteCompany = async (req ,res) =>{
const {id} = req.params
try {
    const company = await Company.findById(id)
     if (!company) {
      return res.status(404).json({
        
        message: "Company not found",
      });
    }
    await company.deleteOne()
    return res.status(201).json({
      success:true,
      message: "Company remove successfully",
      

    })

    
} catch (error) {
        return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
}
}

export { createCompany, getAllCompany, getCompanyById, updateCompany, deleteCompany };
