// Company:
// Id: ObjetID,
// name: String,
// users: [User],
// address: String,
// email: String,
// profilePic: String
// accessStatus: [“APPROVED”, “REJECTED”, “PENDING”]

import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  accessStatus: {
    type: String,
    required: true,
    default: "PENDING",
  },
  jobs: {
    type: [String],
  },
});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
