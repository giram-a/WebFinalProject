import Company from "../../model/Company.model.js";

export const updateCompany = async (req, res) => {
  try {
    const { id, accessStatus } = req.body;
    const company = await Company.findByIdAndUpdate(id, { accessStatus });
    res.send(company);
  } catch (e) {
    console.log(e);
    res.send(500).send({ error: e.message });
  }
};
