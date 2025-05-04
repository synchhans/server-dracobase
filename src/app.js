import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import passport from "passport";

import authRoutes from "./routes/authRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import "./config/passport.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import masterRouter from "./routes/masterRouter.js";
import languageRoutes from "./routes/languageRoutes.js";
import accountRouter from "./routes/accountRouter.js";
import workspaceRouter from "./routes/workspaceRouter.js";
import recentRouter from "./routes/recentRouter.js";
import progressRouter from "./routes/progressRouter.js";
import aiRoutes from "./routes/aiRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRouter.js";
import pengamatRouter from "./routes/pengamatRouter.js";

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/master", masterRouter);
app.use("/api/language", languageRoutes);
app.use("/api/account", accountRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/recent", recentRouter);
app.use("/api/progress", progressRouter);
app.use("/api/ai", aiRoutes);
app.use("/api/notification", notificationRouter);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/pengamat", pengamatRouter);

app.use(errorHandler);

export default app;
