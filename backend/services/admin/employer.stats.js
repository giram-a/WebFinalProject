import { User } from "../../model/User.model.js";
import { Job } from "../../model/Jobs.model.js";
import Company from "../../model/Company.model.js";

const getEmployerStats = async (req, res) => {
  try {
    // const applicants = await Job.find({});
    // const jobs = await Job.find({});
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Company ID is required." });
    }
    const company = await Company.findOne({ user: id });
    const jobs = await Job.find({ companyName: company.name });
    const resumeCount = await User.find({
      resumeLink: { $ne: null },
    });
    const applicants = jobs.reduce(
      (total, job) => total + job.applicants.length,
      1
    );
    const publishedJobs = jobs.filter(
      (job) => job.publishStatus === "PUBLISHED"
    );
    const data = {
      jobCount: jobs.length,
      applicants,
      resumeCount: resumeCount.length,
      activeJobs: publishedJobs.length,
    };
    return res.json({ message: "Stats fetched successfully", data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
};

export default getEmployerStats;
