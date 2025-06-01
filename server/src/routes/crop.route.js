import { Router } from "express";
import {createCropCalendarEntry, getNearByCrop} from "../controllers/crop.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post(createCropCalendarEntry)
router.route("/").get(getNearByCrop)

export default router
