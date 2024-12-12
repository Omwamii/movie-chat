import express from "express";
import { getSeriesByGenre, getSeriesGenres, getTrendingSeries, searchSeriesByGenre } from "../controllers/series.controller.js";

const router = express.Router();

router.get("/genres", getSeriesGenres)
router.get("/trending", getTrendingSeries)
router.get("/:id", getSeriesByGenre) // !! 

router.post("/search", searchSeriesByGenre)

// router.post("/send/:id", guardRoute, sendMessage)

export default router