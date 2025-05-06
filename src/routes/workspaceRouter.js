import express from "express";
import {
  createWorkspace,
  getWorkspace,
} from "../controllers/workspaceController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const workspaceRouter = express.Router();

workspaceRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  createWorkspace
);
workspaceRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getWorkspace
);

export default workspaceRouter;
