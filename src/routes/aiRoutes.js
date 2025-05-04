import express from "express";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import { getDataAi, handleAi } from "../controllers/aiController.js";

const aiRoutes = express.Router();

aiRoutes.get("/", isProfileCompleted, getDataAi);

aiRoutes.post("/", isProfileCompleted, handleAi);

export default aiRoutes;
