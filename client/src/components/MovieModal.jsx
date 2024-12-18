// modal popup that shows movie information, when the movie is clicked on a movie list
import useMovieModal from "../z-store/useMovieModal";
import { movieCardStyles } from "../assets/styles/modal.styles";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { React } from "react";

export default function MovieModal () {
    const { open, setOpen } = useMovieModal();
    const { selectedMovie } = useMovieModal();
    // check to provide default movie cover incase movie doesn't have a cover & not assignn when !selectedMovie
    const selectedMovieCover = selectedMovie ?  (selectedMovie.backdrop_path ? 'https://image.tmdb.org/t/p/original' + selectedMovie.backdrop_path : '') : ''



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
                <Box sx={movieCardStyles}
                    style={{
                        backgroundImage: `url(${selectedMovieCover})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "700px",
                        }}>
                            <div className='modal-movie-info'>
                                <h1 style={{ color: 'white'}}>{selectedMovie ? selectedMovie.title : ''}</h1>
                                <div className='modal-movie-description'>
                                    <p>
                                       {selectedMovie ? selectedMovie.overview : ''}
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