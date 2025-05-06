import express from "express";
import isPengamat from "../middlewares/isPengamat.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createFeedbackPengamat,
  getFeedbackByUserId,
  getFeedbackCountByUserId,
} from "../controllers/pengamatController.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const pengamatRouter = express.Router();

pengamatRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isAdmin,
  getFeedbackByUserId
);
pengamatRouter.get(
  "/count/:userId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isAdmin,
  getFeedbackCountByUserId
);
pengamatRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isPengamat,
  createFeedbackPengamat
);

export default pengamatRouter;
