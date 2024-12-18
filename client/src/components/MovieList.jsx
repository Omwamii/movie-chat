// Page with movies in a certain category
import * as React from 'react';
import Search from "./Search";
import useMovieModal from '../z-store/useMovieModal';
import MovieModal from './MovieModal';

export default function MovieList(props) {
    const { setOpen } = useMovieModal();
    const { setSelectedMovie } = useMovieModal();

    const handleOpen = (movie) => {
        setSelectedMovie(movie)
        console.log('selected movie', movie);
        setOpen(true);
    }

    return (
        <div className="movie-list">
            <MovieModal />
            <div className="movie-list-header">
                <Search />
            </div>
            <div className="movie-list-items">
                {props.movies.length === 0 ? (<h2 className='no-results'>No results 😕 </h2>) : (props.movies.map((movie) => (
                    <div className="movie-card" onClick={() => handleOpen(movie)} key={movie.id}>
                        <img src={'https://image.tmdb.org/t/p/original' + movie.backdrop_path} className="movie-card-cover" />
                        <div className='overlay'> 
                            {movie.title}
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}