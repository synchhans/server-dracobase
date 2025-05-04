import express from "express";
import {
  deleteAccountController,
  editAccountController,
  getAccountController,
} from "../controllers/accountController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";

const accountRouter = express.Router();

accountRouter.get("/", isProfileCompleted, isAdmin, getAccountController);

accountRouter.put("/:id", isProfileCompleted, isAdmin, editAccountController);

accountRouter.delete(
  "/:id",
  isProfileCompleted,
  isAdmin,
  deleteAccountController
);

export default accountRouter;
