import express from "express";
import {
  deleteRecentController,
  getAllRecentController,
  updateRecentController,
} from "../controllers/recentController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const recentRouter = express.Router();

recentRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getAllRecentController
);

recentRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  deleteRecentController
);

recentRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  updateRecentController
);

export default recentRouter;
