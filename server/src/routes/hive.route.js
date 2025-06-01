import { Router } from "express";
import {createHiveLog, getHiveLog} from "../controllers/hive.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post((req, res)=>{
    createHiveLog(req, res);
})

router.route("/").get(getHiveLog)

export default router
