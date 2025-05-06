import express from "express";
import {
  postNotification,
  getNotificationsByUser,
  patchMarkAsRead,
} from "../controllers/notificationController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import isAdmin from "../middlewares/isAdmin.js";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

const notificationRouter = express.Router();

notificationRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isAdmin,
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
