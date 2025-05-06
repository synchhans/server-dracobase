import express from "express";
import {
  createProgressController,
  deleteProgressController,
  getProgressController,
  updateProgressController,
} from "../controllers/progressController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const progressRouter = express.Router();

progressRouter.get(
  "/:userId/:workspaceId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getProgressController
);

progressRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  createProgressController
);

progressRouter.put(
  "/:userId/:workspaceId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  updateProgressController
);

progressRouter.delete(
  "/:userId/:workspaceId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  deleteProgressController
);

export default progressRouter;
