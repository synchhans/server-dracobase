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

const languageRoutes = express.Router();

languageRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  addLanguageController
);

languageRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getAllLanguagesController
);

languageRoutes.put(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  updateLanguageController
);

languageRoutes.delete(
  "/:languageId",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  deleteLanguageController
);

export default languageRoutes;
