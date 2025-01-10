import axios from "axios";
import { filterByGenre } from "../utils/filterByGenre.util.js";

export const getSeriesGenres = async (req, res) => {
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: 'application/json',
            }   
        });
        res.json(response.data.genres);
      } catch (error) {
        console.error("error getting genres" + error);
        res.status(500).json({ message: error.message });
      }
}

export const searchSeriesByGenre = async (req, res) => {
    const { query, genre } = req.body;
    const API_KEY = process.env.TMDB_API_KEY;
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: 'application/json',
            },
            params: { 
                api_key: API_KEY,
                query,
            }
        });

        // console.log(response.data)
        // console.log(filterSeriesByGenre(Number(genre), response.data.results))
        const matchingSeriesIngGenre = filterByGenre(Number(genre), response.data.results);

        res.json(matchingSeriesIngGenre);

    } catch (error) {

        console.log('error searching series' + error.errors)
        // console.error(error.message);
        res.status(500).json({error: error.message});
    }
}

export const getTrendingSeries = async (req, res) => {
    const media_type = 'tv'; // get trending tv series only
    const time_window = 'week'; // series trending in the current week
    const API_KEY = process.env.TMDB_API_KEY;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}`, {
            params: { api_key: API_KEY },
        });
        
        // console.log(response.data)

        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching trending data:', error.message);
        res.status(500).json({ error: 'Failed to fetch trending data' });
    }
}

export const getSeriesByGenre = async (req, res) => {
    const { id: genreId } = req.params;
    const API_KEY = process.env.TMDB_API_KEY;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
        // console.log(response.data);

        // console.log('filtered by genre' + genreId);
        const filteredSeries = filterByGenre(Number(genreId), response.data.results);
        // console.log(filteredMovies);

        // console.log()
        res.json(filteredSeries);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}