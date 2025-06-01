import { Router } from "express";
import {createCropCalendarEntry, getNearByCrop, getNearByCropCSV} from "../controllers/crop.controller.js";
import {verifyJWT, verifyAdminRole} from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post(verifyJWT, verifyAdminRole, createCropCalendarEntry)
router.route("/").get(verifyJWT, getNearByCrop)
router.route("/export-csv").get(verifyJWT, getNearByCropCSV)

export default router
