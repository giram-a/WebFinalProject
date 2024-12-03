import Company from "../../model/Company.model.js";

export const findCompany = async (req, res) => {
  try {
    const { id } = req.query;
    let companies = [];
    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }
    companies = await Company.findOne({ user: id });
    return res.json(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
