import express from "express";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  getMaintenanceStatus,
  toggleMaintenance,
} from "../controllers/maintenanceController.js";

const maintenanceRoutes = express.Router();

maintenanceRoutes.get("/", getMaintenanceStatus);

maintenanceRoutes.post("/", isProfileCompleted, isAdmin, toggleMaintenance);

export default maintenanceRoutes;
