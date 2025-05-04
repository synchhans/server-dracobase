import express from "express";
import isPengamat from "../middlewares/isPengamat.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createFeedbackPengamat,
  getFeedbackByUserId,
  getFeedbackCountByUserId,
} from "../controllers/pengamatController.js";

const pengamatRouter = express.Router();

pengamatRouter.get("/:userId", isAdmin, getFeedbackByUserId);
pengamatRouter.get("/count/:userId", isAdmin, getFeedbackCountByUserId);
pengamatRouter.post("/", isPengamat, createFeedbackPengamat);

export default pengamatRouter;
