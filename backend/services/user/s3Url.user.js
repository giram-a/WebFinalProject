import { User } from "../../model/User.model.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const getPreSignedUrl = async (req, res) => {
    try {
        const { fileName, userId, file_type } = req.query;

        const s3 = new S3Client({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${userId}/${fileName}`,
            ContentType: file_type,
        });

        const presigned = await getSignedUrl(s3, command, {
            signableHeaders: new Set(["content-type"]),
            expiresIn: 60,
        });

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${userId}/${fileName}`;
        await User.findOneAndUpdate({ userId: userId }, { resumeLink: fileUrl })
        res.status(200).json({ status: true, presigned, fileUrl });


    } catch (error) {
        console.log("Error creating Presigned Url", error);
        return res.status(200).json({ status: false, message: "Something went Wrong in creation of presigned URL", data: error })
    }
};
