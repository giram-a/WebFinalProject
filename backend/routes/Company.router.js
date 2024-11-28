import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompany,
  updateCompany,
} from "../services/company/index.js";

const CompanyRouter = express.Router();

CompanyRouter.post("/create", createCompany);
CompanyRouter.get("/read", getCompany);
CompanyRouter.put("/update", updateCompany);
CompanyRouter.delete("/delete", deleteCompany);

export default CompanyRouter;
