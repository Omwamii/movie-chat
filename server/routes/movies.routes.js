import express from "express"
import { getMovieGenres, getTrendingMovies, searchMoviesByGenre } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/genres", getMovieGenres)
router.post("/search", searchMoviesByGenre)
router.get("/trending", getTrendingMovies)

// router.post("/send/:id", guardRoute, sendMessage)

export default router