import { User } from "../../model/User.model.js";
import { Job } from "../../model/Jobs.model.js";
import Company from "../../model/Company.model.js";

const getAdminStats = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" },
    });
    const jobs = await Job.find({});
    const companies = await Company.find({});
    const resume = await User.find({
      resumeLink: { $ne: null },
    });

    const data = {
      userCount: users.length,
      jobCount: jobs.length,
      employerCount: companies.length,
      resumeCount: resume.length,
    };

    return res.json({ message: "Stats fetched successfully", data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
};

export default getAdminStats;
