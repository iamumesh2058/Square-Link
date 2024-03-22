import { Router } from 'express';
const router = Router();

import {
    createHistory,
    getAllHistory,
    showStats
} from "../controllers/historyController.js";

router.post("/createhistory", createHistory);
router.get("/getallhistory", getAllHistory);
router.route("/stats").get(showStats);


export default router;