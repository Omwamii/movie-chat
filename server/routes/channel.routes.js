import express from "express"
import guardRoute from "../middleware/route.guard.js";
import { createChannel, deleteChannel, getAllChannels, getChannelIds, getMyChannels, getUserJoinedChannelsIds, joinChannel, getCreatedChannelsIds, searchChannels } from "../controllers/channel.controller.js";

const router = express.Router();

router.get("/all", guardRoute, getAllChannels)
router.get("/mine", guardRoute, getMyChannels)
router.get("/ids/:type", guardRoute, getChannelIds)
router.get("/created", guardRoute, getCreatedChannelsIds)

router.post("/create", guardRoute, createChannel)
router.post("/delete/:id", guardRoute, deleteChannel)
router.post("/join", guardRoute, joinChannel)
router.post("/joined", guardRoute, getUserJoinedChannelsIds)
router.post("/search", guardRoute, searchChannels)

export default router;
