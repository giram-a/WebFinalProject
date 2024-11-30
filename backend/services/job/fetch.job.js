import { Job } from '../../model/jobs.model.js'

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        if (jobs) {
            return res.status(200).json({ status: true, message: "Jobs fetched successfully", totalJobs:jobs.length, data: jobs });
        }
        else {
            return res.status(400).json({ status: false, message: "Jobs not found", data: jobs });
        }
    } catch (error) {
        console.error('Error fetching the jobs:', error);
        return res.status(500).json({ status: false, message: 'An error occurred while fetching the jobs.' });
    }
}