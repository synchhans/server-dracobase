import express from "express";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";
import isDosen from "../middlewares/isDosen.js";
import { getWorkspaceProgressController, getRecentWorkspacesController } from "../controllers/dosenController.js";

const dosenRouter = express.Router();

dosenRouter.get(
  "/workspaces",
  getWorkspaceProgressController
);

dosenRouter.get(
  "/recent",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isDosen,
  getRecentWorkspacesController
);

export default dosenRouter;