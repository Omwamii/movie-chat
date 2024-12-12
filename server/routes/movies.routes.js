import express from "express"
import { getMovieGenres, getMoviesByGenre, getTrendingMovies, searchMoviesByGenre } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/genres", getMovieGenres)
router.get("/trending", getTrendingMovies)
router.get("/:id", getMoviesByGenre) // !!

router.post("/search", searchMoviesByGenre)

// router.post("/send/:id", guardRoute, sendMessage)

export default router