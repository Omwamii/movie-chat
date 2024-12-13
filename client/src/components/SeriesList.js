// Page with movies in a certain category
import * as React from 'react';
import Search from "./Search";
import Movie from "./Movie";
import movieIcon from '../assets/images/from-cover.jpg';
import NopeMovieIcon from '../assets/images/Nope 2022 Movie Poster 4k UHD.jpeg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const seriesCardStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'transparent',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

export default function SeriesList(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedSeriesCover, setSelectedSeriesCover] = React.useState(null);
    const [selectedSeries, setSelectedSeries] = React.useState(null);
    const handleOpen = (series) => {
        setSelectedSeries(series)
        console.log('selected series', series);
        setSelectedSeriesCover('https://image.tmdb.org/t/p/original' + series.backdrop_path);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div className="movie-list">
        <div className='custom-modal'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='custom-modal'
            >
                <Box sx={seriesCardStyles}
                    style={{
                        backgroundImage: `url(${selectedSeriesCover})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "700px",
                        }}>
                            <div className='modal-movie-info'>
                                <h1 style={{ color: 'white'}}>{selectedSeries ? selectedSeries.name : ''}</h1>
                                <div className='modal-movie-description'>
                                    <p>
                                        {selectedSeries ? selectedSeries.overview : ''}
                                    </p>
                                </div>
                            </div>
                            <div className='modal-movie-action'>
                                <button className='join-chat-btn'>Join chat</button>
                            </div>
                </Box>
            </Modal>
        </div>
            <div className="movie-list-header">
                <Search />
            </div>
            <div className="movie-list-items">
                {props.series.map((series) => (
                    <div className="movie-card" onClick={() => handleOpen(series)} key={series.id}>
                        <img src={'https://image.tmdb.org/t/p/original' + series.backdrop_path} className="movie-card-cover" />
                        <div className='overlay'> 
                            {series.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}