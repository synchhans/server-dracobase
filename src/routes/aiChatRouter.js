import express from "express";
import passport from "passport";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";
import { initAiChat, chatAi } from "../controllers/aiChatController.js";

const aiChatRouter = express.Router();

aiChatRouter.post(
  "/init",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  initAiChat
);

aiChatRouter.post(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  chatAi
);

export default aiChatRouter;
