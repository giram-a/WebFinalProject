import { User } from "../../model/User.model.js";

export const updateAppliedJobState = async (req, res) => {
  try {
    const { userId, jobId, state } = req.query;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const appliedJob = user.appliedJob.find((job) => job.jobId === jobId);

    if (!appliedJob) {
      return res
        .status(404)
        .send({ message: "Job not found in user's applied jobs" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId, "appliedJob.jobId": jobId },
      { $set: { "appliedJob.$.details.state": state } },
      { new: true }
    );

    res.json({
      message: "Job state updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.message });
  }
};
