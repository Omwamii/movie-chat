import express from "express";
import { getSeriesGenres, getTrendingSeries, searchSeriesByGenre } from "../controllers/series.controller.js";

const router = express.Router();

router.get("/genres", getSeriesGenres)
router.post("/search", searchSeriesByGenre)
router.get("/trending", getTrendingSeries)

// router.post("/send/:id", guardRoute, sendMessage)

export default router