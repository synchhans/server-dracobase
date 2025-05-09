import express from "express";
import {
  deleteAccountController,
  editAccountController,
  getAccountController,
} from "../controllers/accountController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const accountRouter = express.Router();

accountRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  getAccountController
);

accountRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  editAccountController
);

accountRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  deleteAccountController
);

export default accountRouter;
