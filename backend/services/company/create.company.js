import Company from "../../model/Company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { name, address, email, profilePic, user } = req.body;
    const company = await Company.create({
      name,
      address,
      email,
      profilePic,
      user,
    });
    res.json({
      message:
        "Company created successfully, Please wait for admin approval for users.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
};
