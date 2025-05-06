import express from "express";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import { getDataAi, handleAi } from "../controllers/aiController.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const aiRoutes = express.Router();

aiRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getDataAi
);

aiRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  handleAi
);

export default aiRoutes;
