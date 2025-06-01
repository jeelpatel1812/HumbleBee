import { Router } from "express";
import {createHiveLog, getHiveLog, getHiveLogCSV} from "../controllers/hive.controller.js";
import {verifyJWT, verifyAdminRole} from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post(verifyJWT, verifyAdminRole, (req, res)=>{
    createHiveLog(req, res);
})

router.route("/").get(verifyJWT, getHiveLog);
router.route("/export-csv").get(verifyJWT, getHiveLogCSV)

export default router
