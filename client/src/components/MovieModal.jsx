// modal popup that shows movie information, when the movie is clicked on a movie list
import { movieCardStyles } from "../assets/styles/modal.styles";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";

import useJoinedChannels from "../z-store/useJoinedChannels";
import useCreatedChannels from "../z-store/useCreatedChannels";
import useMovieModal from "../z-store/useMovieModal";

export default function MovieModal () {
    const { open, setOpen } = useMovieModal();
    const { selectedMovie } = useMovieModal();
    const { authUser } = useAuthContext();
    const { addJoinedChannel } = useJoinedChannels();
    const { addCreatedChannel } = useCreatedChannels();
    const createdChannels = useCreatedChannels((state) => state.createdChannels);
    const joinedChannels = useJoinedChannels((state) => state.joinedChannels);
    const [localCreatedChannels, setLocalCreatedChannels] = useState([]);
    const [localJoinedChannels, setLocalJoinedChannels] = useState([]);

    useEffect(() => {
        // Sync local state with global state
        setLocalCreatedChannels(createdChannels);
        setLocalJoinedChannels(joinedChannels);
    }, [createdChannels, joinedChannels]);

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
                creatorId: authUser._id,
                icon: movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : null,
            }
            // console.log('creating channel', body)

            const response = await fetch('api/channels/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json();
            // console.log(data);
    
            if (data.error) {
                throw new Error(data.error);
            } else {
                await addCreatedChannel(data.filmId)
                setLocalCreatedChannels((prev) => [...prev, data.filmId])
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
            // console.log(data);
    
            if (data.error) {
                throw new Error(data.error);
            } else {
                addJoinedChannel(data.filmId);
                setLocalJoinedChannels((prev) => [...prev, data.filmId])
                toast.success(`You joined ${movie.title} channel`)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    const viewMovieChannel = async (movie) => {
        console.log('view channel in movie modal')
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
                                {selectedMovie ? ((localCreatedChannels.includes(selectedMovie.id) ? (
                                    localJoinedChannels.includes(selectedMovie.id) ? (
                                        <button className='join-chat-btn' onClick={() => viewMovieChannel(selectedMovie)}>View chat</button>
                                    ) : (
                                        <button className='join-chat-btn' onClick={() => joinMovieChannel(selectedMovie)}>Join chat</button>
                                    )
                                   
                                ) : (
                                    <button className='join-chat-btn' onClick={() => createMovieChannel(selectedMovie)}>Create chat</button>
                                ))) : <></>}
                            </div>
                </Box>
            </Modal>
        </div>
    )
}