import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import guardRoute from "../middleware/route.guard.js";

const router = express.Router();

router.get("/:id", guardRoute, getMessages)
router.post("/send/:id", guardRoute, sendMessage)

export default router