// modal popup that shows movie information, when the movie is clicked on a movie list
import { seriesCardStyles } from "../assets/styles/modal.styles";
import useSeriesModal from "../z-store/useSeriesModal";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';    
import { React } from "react";

export default function SeriesModal () {
    const { open, setOpen } = useSeriesModal();
    const { selectedSeries } = useSeriesModal();
    // check to provide default movie cover incase movie doesn't have a cover & not assignn when !selectedMovie
    const selectedSeriesCover = selectedSeries ?  (selectedSeries.backdrop_path ? 'https://image.tmdb.org/t/p/original' + selectedSeries.backdrop_path : '') : ''

    const handleClose = () => setOpen(false);
    return (
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
    )
}