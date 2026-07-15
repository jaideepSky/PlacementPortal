import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,

      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    packageLPA: {
      type: Number,
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    minCGPA: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Closed", "Upcoming"],
    },
    jobRole: {
      type: String,
      required: true,
    },
    eligibleBranches: {
      type: [
        {
          type: String,
        },
      ],
    },
    requirements: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", companySchema);

export default Company;
