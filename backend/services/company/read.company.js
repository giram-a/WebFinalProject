import Company from "../../model/Company.model.js";

export const getCompany = async (req, res) => {
  try {
    const { id } = req.body;
    let companies;
    if (!id) {
      companies = await Company.find({});
    } else {
      companies = await Company.findOne(id);
    }
    return res.json(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};