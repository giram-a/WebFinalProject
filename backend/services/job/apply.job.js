import { Job } from "../../model/Jobs.model.js";
import { User } from "../../model/User.model.js";

export const applyJob = async (req, res) => {
  try {
    const { _id, userId } = req.body;
    const job = await Job.findById(_id);
    const user = await User.findOne({ userId });
    job.applicants.push(userId);
    await job.save();
    user.appliedJob.push({
      jobId: _id,
      details: {
        state: "applied",
        date: new Date(),
        jobTitle: job.jobTitle,
        companyName: job.companyName,
      },
    });
    await user.save();
    res.send({
      message: "Job applied successfully",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.send({ status: 500, error: e.message });
  }
};
