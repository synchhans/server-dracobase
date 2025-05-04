import express from "express";
import { createWorkspace, getWorkspace } from "../controllers/workspaceController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", isProfileCompleted, createWorkspace);
workspaceRouter.get("/:id", isProfileCompleted, getWorkspace);

export default workspaceRouter;
