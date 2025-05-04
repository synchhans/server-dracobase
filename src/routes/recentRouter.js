import express from "express";
import { deleteRecentController, getAllRecentController, updateRecentController } from "../controllers/recentController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const recentRouter = express.Router();

recentRouter.get("/", isProfileCompleted, getAllRecentController);

recentRouter.delete("/:id", isProfileCompleted, deleteRecentController);

recentRouter.put("/:id", isProfileCompleted, updateRecentController);

export default recentRouter;
