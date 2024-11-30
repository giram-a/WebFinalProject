import { Job } from '../../model/jobs.model.js'

export const createJob = async (req, res) => {
    const { companyName, jobTitle, description, salary, location, skills, applyLink } = req.body;
    if (!companyName || !jobTitle || !description || !salary) {
        return res.status(400).json({
            message: "Company Name, Job Title, Description, and Salary are mandatory fields.",
        });
    }
    try {
        const newJob = new Job({
            companyName,
            jobTitle,
            description,
            salary,
            location: location || null,
            skills: skills || null,
            applyLink: applyLink || null,
        });

        await newJob.save();

        res.status(201).json({
            message: "Job successfully created.",
            job: newJob,
        });
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
}