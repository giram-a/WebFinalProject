export const updateJob = async (req, res) => {
  try {
    const { id, publishStatus } = req.body;
    const job = await Job.findByIdAndUpdate(id, { publishStatus });
    res.send(job);
  } catch (e) {
    console.log(e);
    res.send(500).send({ error: e.message });
  }
};
