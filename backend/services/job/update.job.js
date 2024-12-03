import { Job } from "../../model/Jobs.model.js";
export const updateJob = async (req, res) => {
  try {
    const { id } = req.body;
    const job = await Job.findByIdAndUpdate(id, req.body);
    res.send(job);
  } catch (e) {
    console.log(e);
    res.send(500).send({ error: e.message });
  }
};