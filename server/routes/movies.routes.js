import express from "express";
import guardRoute from "../middleware/route.guard.js";
import { getMovieGenres, getMoviesByGenre, getTrendingMovies, searchMoviesByGenre } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/genres", guardRoute, getMovieGenres)
router.get("/trending",  guardRoute, getTrendingMovies)
router.get("/:id",  guardRoute, getMoviesByGenre) // !!

router.post("/search",  guardRoute, searchMoviesByGenre)

export default router