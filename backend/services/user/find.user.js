import { User } from "../../model/User.model.js";

export const findUser = async (req, res) => {
  try {
    const { id } = req.query;
    let users;
    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }
    users = await User.findOne({ userId: id });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
