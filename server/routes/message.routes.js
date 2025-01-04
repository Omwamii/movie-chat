import express from "express"
import { deleteMessage, getMessages, sendMessage } from "../controllers/message.controller.js";
import guardRoute from "../middleware/route.guard.js";

const router = express.Router();

router.get("/:id", guardRoute, getMessages)

router.post("/send/:id", guardRoute, sendMessage)

router.delete("/delete/:id", guardRoute, deleteMessage)

export default router