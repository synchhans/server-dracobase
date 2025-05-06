import express from "express";
import passport from "passport";
import authLimiter from "../middlewares/rateLimitMiddleware.js";
import { getMe, updateProfile, logout } from "../controllers/authController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import { fetchDataUser } from "../controllers/userController.js";
import dotenv from "dotenv";
import { updateUserStatus } from "../services/authService.js";
import setReqUserFromJwt from "../middlewares/setReqUserFromJwt.js";

dotenv.config();

const authRouter = express.Router();

authRouter.get(
  "/google",
  authLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  authLimiter,
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  async (req, res) => {
    try {
      await updateUserStatus(req.user.user._id, "active");

      const { isProfileComplete } = req.user.user.isProfileComplete;

      if (!isProfileComplete) {
        res.send(`
          <script>
            window.opener.postMessage({ type: 'AUTH_SUCCESS', token: '${req.user.token}' }, '${process.env.FRONTEND_URL}');
            window.close();
          </script>
        `);
      } else {
        res.send(`
          <script>
            window.opener.postMessage({ type: 'REDIRECT_DASHBOARD', token: '${req.user.token}' }, '${process.env.FRONTEND_URL}');
            window.close();
          </script>
        `);
      }
    } catch (error) {
      console.error("Error saat login:", error.message);
      res.send(`
        <script>
          alert("Terjadi kesalahan saat login.");
          window.close();
        </script>
      `);
    }
  }
);

authRouter.get(
  "/github",
  authLimiter,
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  authLimiter,
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  async (req, res) => {
    try {
      await updateUserStatus(req.user.user._id, "active");

      const { isProfileComplete } = req.user.user;

      if (!isProfileComplete) {
        res.send(`
          <script>
            window.opener.postMessage({ type: 'AUTH_SUCCESS', token: '${req.user.token}' }, '${process.env.FRONTEND_URL}');
            window.close();
          </script>
        `);
      } else {
        res.send(`
          <script>
            window.opener.postMessage({ type: 'REDIRECT_DASHBOARD', token: '${req.user.token}' }, '${process.env.FRONTEND_URL}');
            window.close();
          </script>
        `);
      }
    } catch (error) {
      console.error("Error saat login:", error.message);
      res.send(`
        <script>
          alert("Terjadi kesalahan saat login.");
          window.close();
        </script>
      `);
    }
  }
);

authRouter.get("/me", passport.authenticate("jwt", { session: false }), getMe);
authRouter.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  setReqUserFromJwt,
  isProfileCompleted,
  fetchDataUser
);
authRouter.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
authRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

export default authRouter;
