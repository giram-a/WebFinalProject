import { User } from "../../model/User.model.js";

export const udpateUser = async (req, res) => {
  try {
    const { id, isPremiumUser } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: id },
      {
        isPremiumUser,
      }
    );
    res.json({
      message: "User updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
};
