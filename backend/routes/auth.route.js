import express from 'express'
import { updatePublicMetadataAndUserToDB } from '../services/auth/authenticate.js';
const router = express.Router();

router.post("/", updatePublicMetadataAndUserToDB);

export default router;
