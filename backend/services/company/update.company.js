import Company from "../../model/Company.model.js";

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.body;
    const company = await Company.findByIdAndUpdate(id, req.body);
    res.send(company);
  } catch (e) {
    console.log(e);
    res.send(500).send({ error: e.message });
  }
};
