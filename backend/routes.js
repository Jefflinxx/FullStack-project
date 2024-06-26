import express from "express";
import apiController from "./controllers/apiController.js";

const router = express.Router();

router.get("/api/:id", apiController.getData);
router.post("/api/clock-in", apiController.clockIn);
router.get("/api/fortest", apiController.getHTML);

export default router;
