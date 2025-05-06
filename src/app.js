import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import passport from "passport";

import authRouter from "./routes/authRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import masterRouter from "./routes/masterRouter.js";
import languageRouter from "./routes/languageRouter.js";
import accountRouter from "./routes/accountRouter.js";
import workspaceRouter from "./routes/workspaceRouter.js";
import recentRouter from "./routes/recentRouter.js";
import progressRouter from "./routes/progressRouter.js";
import aiRouter from "./routes/aiRouter.js";
import notificationRouter from "./routes/notificationRouter.js";
import maintenanceRouter from "./routes/maintenanceRouter.js";
import pengamatRouter from "./routes/pengamatRouter.js";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());

import "./config/passport.js";

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/master", masterRouter);
app.use("/api/language", languageRouter);
app.use("/api/account", accountRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/recent", recentRouter);
app.use("/api/progress", progressRouter);
app.use("/api/ai", aiRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/pengamat", pengamatRouter);

app.use(errorHandler);

export default app;
