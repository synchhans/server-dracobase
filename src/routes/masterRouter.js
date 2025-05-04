import express from "express";
import { fetchDataMaster } from "../controllers/masterController.js";

const masterRouter = express.Router();

masterRouter.get("/", fetchDataMaster);

export default masterRouter;
