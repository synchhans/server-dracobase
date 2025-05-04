import express from "express";
import passport from "passport";
import authLimiter from "../middlewares/rateLimitMiddleware.js";
import { getMe, updateProfile, logout } from "../controllers/authController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import { fetchDataUser } from "../controllers/userController.js";
import dotenv from "dotenv";
import { updateUserStatus } from "../services/authService.js";

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
  }),
  async (req, res) => {
    try {
      await updateUserStatus(req.user._id, "active");

      const { isProfileComplete } = req.user;

      if (!isProfileComplete) {
        res.send(`
          <script>
            window.opener.postMessage('AUTH_SUCCESS', '${process.env.FRONTEND_URL}/login');
            window.close();
          </script>
        `);
      } else {
        res.send(`
          <script>
            window.opener.postMessage('REDIRECT_DASHBOARD', '${process.env.FRONTEND_URL}/dashboard');
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
  }),
  async (req, res) => {
    try {
      await updateUserStatus(req.user._id, "active");

      const { isProfileComplete } = req.user;

      if (!isProfileComplete) {
        res.send(`
          <script>
            window.opener.postMessage('AUTH_SUCCESS', '${process.env.FRONTEND_URL}/login');
            window.close();
          </script>
        `);
      } else {
        res.send(`
          <script>
            window.opener.postMessage('REDIRECT_DASHBOARD', '${process.env.FRONTEND_URL}/dashboard');
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

authRouter.get("/me", getMe);
authRouter.get("/dashboard", isProfileCompleted, fetchDataUser);
authRouter.post("/update", updateProfile);
authRouter.post("/logout", logout);

export default authRouter;
