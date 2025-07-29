import express from "express";
import {
  addLanguageController,
  deleteLanguageController,
  getAllLanguagesController,
  updateLanguageController,
} from "../controllers/languageController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";
import isDosen from "../middlewares/isDosen.js";

const languageRouter = express.Router();

languageRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  addLanguageController
);

languageRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getAllLanguagesController
);

languageRouter.put(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isDosen,
  updateLanguageController
);

languageRouter.delete(
  "/:languageId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  deleteLanguageController
);

export default languageRouter;
