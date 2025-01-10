import express from "express";
import guardRoute from "../middleware/route.guard.js";
import { getSeriesByGenre, getSeriesGenres, getTrendingSeries, searchSeriesByGenre } from "../controllers/series.controller.js";

const router = express.Router();

router.get("/genres", guardRoute, getSeriesGenres)
router.get("/trending",  guardRoute, getTrendingSeries)
router.get("/:id",  guardRoute, getSeriesByGenre) // !! 

router.post("/search",  guardRoute, searchSeriesByGenre)

// router.post("/send/:id", guardRoute, sendMessage)

export default router