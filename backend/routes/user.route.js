import express from 'express';
import { createUser } from '../services/user/create.user.js';

const router = express.Router();

router.post("/create", createUser);

export default router;
