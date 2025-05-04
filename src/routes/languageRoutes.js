import express from "express";
import {
  addLanguageController,
  deleteLanguageController,
  getAllLanguagesController,
  updateLanguageController,
} from "../controllers/languageController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";

const languageRoutes = express.Router();

languageRoutes.post("/", isProfileCompleted, isAdmin, addLanguageController);

languageRoutes.get("/", isProfileCompleted, getAllLanguagesController);

languageRoutes.put(
  "/:name",
  isProfileCompleted,
  isAdmin,
  updateLanguageController
);

languageRoutes.delete(
  "/:languageId",
  isProfileCompleted,
  isAdmin,
  deleteLanguageController
);

export default languageRoutes;
