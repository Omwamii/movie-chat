import express from "express"
import guardRoute from "../middleware/route.guard.js";
import { getAllChannels, getMyChannels } from "../controllers/channel.controller.js";

const router = express.Router();

router.get("/all", guardRoute, getAllChannels)
router.get("/mine", guardRoute, getMyChannels)

export default router;