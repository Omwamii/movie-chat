// modal popup that shows movie information, when the movie is clicked on a movie list
import useMovieModal from "../z-store/useMovieModal";
import { movieCardStyles } from "../assets/styles/modal.styles";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { React } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function MovieModal ({ channels }) {
    const { open, setOpen } = useMovieModal();
    const { selectedMovie } = useMovieModal();
    const { authUser } = useAuthContext();

    // check to provide default movie cover incase movie doesn't have a cover & not assignn when !selectedMovie
    const selectedMovieCover = selectedMovie ?  (selectedMovie.backdrop_path ? 'https://image.tmdb.org/t/p/original' + selectedMovie.backdrop_path : '') : ''

    const handleClose = () => setOpen(false);

    const createMovieChannel = async (movie) => {
        try {
            const type = 'movie'
            const body = {
                title: movie.title,
                filmId: movie.id,
                type: type,
                creatorId: authUser._id
            }
            console.log('creating channel', body)

            const response = await fetch('api/channels/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json();
            console.log(data);
    
            if (data.error) {
                throw new Error(data.error);
            } else {
                toast.success(`New ${type} channel ${movie.title} created`)
            }
        } catch (error) {
            toast.error(error.message)  
            console.error(error)
        }
    }

    const joinMovieChannel = async (movie) => {
        try {
            const body = {
                channelId: movie.id,
                userId: authUser._id
            }

            const response = await fetch('api/channels/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json();
            console.log(data);
    
            if (data.error) {
                throw new Error(data.error);
            } else {
                toast.success(`You joined ${movie.title} channel`)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }
    
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
                                {selectedMovie ? ((channels.includes(selectedMovie.id) ? (
                                    <button className='join-chat-btn' onClick={() => joinMovieChannel(selectedMovie)}>Join chat</button>
                                ) : (
                                    <button className='join-chat-btn' onClick={() => createMovieChannel(selectedMovie)}>Create chat</button>
                                ))) : <></>}
                            </div>
                </Box>
            </Modal>
        </div>
    )
}