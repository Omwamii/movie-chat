import axios from "axios";
import { filterByGenre } from "../utils/filterByGenre.util.js";

export const getSeriesGenres = async (req, res) => {
    const API_KEY = process.env.TMDB_API_KEY;
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
    const API_KEY = process.env.TMDB_API_KEY;
    const API_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;
    const { query, genre } = req.body;

    // console.log(query);
    console.log(req.body);

    // console.log("Searching movie");

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
    const API_KEY = process.env.TMDB_API_KEY
    const media_type = 'tv'; // get trending tv series only
    const time_window = 'week'; // series trending in the current week

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
// 10764