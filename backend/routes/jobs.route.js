import express from "express";
import { createJob } from "../services/job/create.job.js";
import { getAllJobs } from "../services/job/fetch.job.js";
import { getJobsByCompany } from "../services/job/getJobsByCompany.job.js";
import { updateJob } from "../services/job/update.job.js";

const router = express.Router();

router.post("/create", createJob);
router.get("/get", getAllJobs);
router.get("/find", getJobsByCompany);
router.put("/update", updateJob);

export default router;
