import express from "express";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  getMaintenanceStatus,
  toggleMaintenance,
} from "../controllers/maintenanceController.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const maintenanceRoutes = express.Router();

maintenanceRoutes.get("/", getMaintenanceStatus);

maintenanceRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  isAdmin,
  toggleMaintenance
);

export default maintenanceRoutes;
