import express from "express";
import {
  postNotification,
  getNotificationsByUser,
  patchMarkAsRead,
} from "../controllers/notificationController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";

const notificationRouter = express.Router();

notificationRouter.post("/", isProfileCompleted, isAdmin, postNotification);
notificationRouter.get("/", isProfileCompleted, getNotificationsByUser);
notificationRouter.patch(
  "/:notificationId/read",
  isProfileCompleted,
  patchMarkAsRead
);

export default notificationRouter;
