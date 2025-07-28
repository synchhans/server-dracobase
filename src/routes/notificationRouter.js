import express from "express";
import {
  postNotification,
  getNotificationsByUser,
  patchMarkAsRead,
} from "../controllers/notificationController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import canSendNotifications from "../middlewares/canSendNotifications.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const notificationRouter = express.Router();

notificationRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  canSendNotifications,
  postNotification
);
notificationRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  getNotificationsByUser
);
notificationRouter.patch(
  "/:notificationId/read",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  patchMarkAsRead
);

export default notificationRouter;
