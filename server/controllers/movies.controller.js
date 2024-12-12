import axios from "axios";
import { filterByGenre } from "../utils/filterByGenre.util.js";

export const getMovieGenres = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

    console.log("getting movie genres");

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: 'application/json',
            },
            params: {
                api_key: API_KEY,
            } 
        });
        // console.log(response.data)
        res.json(response.data.genres);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
      }
}

export const searchMoviesByGenre = async (req, res) => {
    const { query, genre } = req.body;
    const API_KEY = process.env.TMDB_API_KEY;
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

    // console.log(req.body);

    console.log("Searching movie");

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: 'application/json',
            },
            params: {
                api_key: API_KEY,
                query,
            }
        });

        // console.log(response.data);
        console.log(`genre id: ${Number(genre)}`);
        const matchingSeriesIngGenre = filterByGenre(Number(genre), response.data.results);

        res.json(matchingSeriesIngGenre);

    } catch (error) {
        console.log('error searching series' + error.errors)
        res.status(500).json({error: error.message});
    }
}

export const getTrendingMovies = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const media_type = 'movie'; // get trending movies only
    const time_window = 'week'; // series trending in the current week
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

    // console.log(req);
    console.log("getting trending movies");

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}`, {
            params: { api_key: API_KEY },
        });
        
        console.log(response.data)
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trending data:', error.message);
        res.status(500).json({ error: 'Failed to fetch trending data' });
    }
}

export const getMoviesByGenre = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const { id: genreId } = req.params;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

    console.log("inside getMovieByGenre");

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        // console.log(response.data);

        console.log("inside getMovieByGenre");

        console.log('filtered by genre' + genreId);
        const filteredMovies = filterByGenre(Number(genreId), response.data.results)
        // console.log(filteredMovies);

        res.json(filteredMovies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}