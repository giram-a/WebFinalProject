import { clerkClient } from "@clerk/express"

export const updatePublicMetadataAndUserToDB = async (req, res) => {
    const { userId, metadata } = req.body;

    try {
        const updatedUser = await clerkClient.users.updateUser(userId, {
            publicMetadata: metadata,
        });

        return res.status(200).json({ message: 'Public metadata updated successfully!', updatedUser });
    } catch (error) {
        console.error('Error updating public metadata:', error);
        return res.status(500).json({ error: 'Failed to update metadata' });
    }
}
