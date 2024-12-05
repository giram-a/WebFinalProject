import express from "express";
import getAdminStats from "../services/admin/admin.stats.js";
import getEmployerStats from "../services/admin/employer.stats.js";

const statsRouter = express.Router();

statsRouter.get("/admin", getAdminStats);
statsRouter.get("/employer", getEmployerStats);

export default statsRouter;
