import express from 'express';
import { createJob } from '../services/job/create.job.js';
import { getAllJobs } from '../services/job/fetch.job.js';

const router = express.Router();

router.post("/create", createJob);
router.get("/get", getAllJobs)

export default router;
