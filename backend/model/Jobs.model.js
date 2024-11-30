import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    companyName: String,
    jobTitle: String,
    description: String,
    salary: String,
    location: String,
    skills: String,
    applyLink: String,
}, { timestamps: true });

export const Job = mongoose.model('job', jobSchema);
