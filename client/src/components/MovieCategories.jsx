import { useState, useEffect, React } from "react";
// List of movie categories to choose from

function MovieCategories () {
    const [movieGenres, setMovieGenres] = useState([]);

    useEffect(() => {
        fetchMovieGenres();
      }, []);

    const fetchMovieGenres = () => {
        fetch('http://127.0.0.1:5000/api/movies/genres', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMovieGenres(data);
        });
    }

    return (
        <div className="movie-categories">
            {/* movie genres */}
            {movieGenres && (movieGenres.map((genre) => (
                <div className="movie-category" id={genre.id} key={genre.id}>
                    <p>{genre.name}</p>
                </div>
            )))}
        </div>
    )
}

export default MovieCategories;