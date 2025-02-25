import axios from "axios";
import { filterByGenre } from "../utils/filterByGenre.util.js";

export const getMovieGenres = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

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

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}`, {
            params: { api_key: API_KEY },
        });
        
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching trending data:', error.message);
        res.status(500).json({ error: 'Failed to fetch trending data' });
    }
}

export const getMoviesByGenre = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
    const { id: genreId } = req.params;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const filteredMovies = filterByGenre(Number(genreId), response.data.results)

        res.json(filteredMovies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}