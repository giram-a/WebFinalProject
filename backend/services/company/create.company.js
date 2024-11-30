import Company from "../../model/Company.model.js";
// import User from "../../model/User.model.js";

export const createCompany = async (req, res) => {
  try {
    const { name, address, email, profilePic, user } = req.body;
    const userObj = await User.findOne({ user });
    const company = await Company.create({
      name,
      address,
      email,
      profilePic,
      users: [userObj._id],
    });
    res.json({
      message:
        "Company created successfully, Please wait for admin approval for users.",
    });
  } catch (e) {
    console.log(e);
    res.send({ status: 500, error: e.message });
  }
};
