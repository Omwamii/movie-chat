import { useState, useEffect, React } from "react";
// List of series categories to choose from

function SeriesCategories () {
    const [seriesGenres, setSeriesGenres] = useState([]);

    useEffect(() => {
        fetchSeriesGenres();
      }, []);

    const fetchSeriesGenres = () => {
        fetch('http://127.0.0.1:5000/api/series/genres', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setSeriesGenres(data);
        });
    }

    const fetchSeriesByGenre = (event) => {
        // console.log(event.target);
    }

    return (
        <div className="movie-categories">
            {/* Series genres */}
            {seriesGenres && (seriesGenres.map((genre) => (
                <div className="movie-category" id={genre.id} key={genre.id} onClick={fetchSeriesByGenre}>
                    <p>{genre.name}</p>
                </div>
            )))}
        </div>
    )
}

export default SeriesCategories;