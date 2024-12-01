import { Job } from "../../model/jobs.model.js";
import Company from "../../model/Company.model.js";

export const getJobsByCompany = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    let jobs = [];
    let company;
    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }
    company = await Company.findOne({ user: id });
    // console.log(company.jobs);

    for (const jobId of company.jobs) {
      const job = await Job.findOne({ _id: jobId });
      if (job) jobs.push(job);
    }
    console.log(jobs);
    return res.json(jobs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
