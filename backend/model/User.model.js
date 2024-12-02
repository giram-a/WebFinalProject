import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    gender: String,
    emailAddress: String,
    password: String,
    profilePicture: String,
    role: String,
    isPremiumUser: Boolean,
    resumeLink: String,
    appliedJob: []
}, { timestamps: true });

export const User = mongoose.model('user', userSchema);
