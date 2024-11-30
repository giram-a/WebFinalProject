import { User } from '../../model/User.model.js'

export const createUser = async (req, res) => {
    const { userId, firstName, lastName, dateOfBirth, gender, emailAddress, password, profilePicture, role, isPremiumUser, appliedJobs } = req.body;

    if (!userId || !firstName || !lastName || !emailAddress || !role) {
        return res.status(400).json({
            message: "UserID, firstName, lastName, emailAddress, and role are mandatory fields.",
        });
    }
    try {
        const newUser = new User({
            userId,
            firstName,
            lastName,
            dateOfBirth: dateOfBirth || null,
            gender: gender || null,
            emailAddress,
            password: password || null,
            profilePicture: profilePicture || null,
            role: role || "JOB_SEEKER",
            isPremiumUser: isPremiumUser || false,
            appliedJob: appliedJobs || [],
        });

        await newUser.save();

        res.status(201).json({
            message: "User successfully created.",
            data: newUser,
        });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
}
