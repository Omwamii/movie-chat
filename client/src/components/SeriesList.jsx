// Page with movies in a certain category
import * as React from 'react';
import SeriesModal from './SeriesModal';
import useSeriesModal from '../z-store/useSeriesModal';

export default function SeriesList({ series }) {
    const { setOpen } = useSeriesModal();
    const { setSelectedSeries } = useSeriesModal();

    const handleOpen = (series) => {
        setSelectedSeries(series)
        // console.log('selected series', series);
        setOpen(true);
    }

    return (
            <div className="movie-list-items">
                {series.length === 0 ?  (<h2 className='no-results'>No results 😕 </h2>)  : (
                    series.map((item) => (
                    <div className="movie-card" onClick={() => handleOpen(item)} key={item.id}>
                        <img src={'https://image.tmdb.org/t/p/original' + item.backdrop_path} className="movie-card-cover" />
                        <div className='overlay'> 
                            {item.name}
                        </div>
                    </div>
                )))}
            </div>
    )
}