import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as stampController from "../controllers/stamp.controller";

const router = Router();

router.get("/", authenticate, stampController.getMyStamps);
router.get("/summary", authenticate, stampController.getMyStampSummary);

export default router;