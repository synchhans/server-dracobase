import express from "express";
import {
  createProgressController,
  deleteProgressController,
  getProgressController,
  updateProgressController,
} from "../controllers/progressController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const progressRouter = express.Router();

progressRouter.get(
  "/:userId/:workspaceId",
  isProfileCompleted,
  getProgressController
);

progressRouter.post("/", isProfileCompleted, createProgressController);

progressRouter.put(
  "/:userId/:workspaceId",
  isProfileCompleted,
  updateProgressController
);

progressRouter.delete(
  "/:userId/:workspaceId",
  isProfileCompleted,
  deleteProgressController
);

export default progressRouter;
