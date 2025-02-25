// modal popup that shows movie information, when the movie is clicked on a movie list
import { seriesCardStyles } from "../assets/styles/modal.styles";
import useSeriesModal from "../z-store/useSeriesModal";
import { useAuthContext } from "../context/AuthContext";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';    
import { React, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import useJoinedChannels from "../z-store/useJoinedChannels";
import useCreatedChannels from "../z-store/useCreatedChannels";

export default function SeriesModal () {
    const { open, setOpen } = useSeriesModal();
    const { selectedSeries } = useSeriesModal();
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
    const selectedSeriesCover = selectedSeries ?  (selectedSeries.backdrop_path ? 'https://image.tmdb.org/t/p/original' + selectedSeries.backdrop_path : '') : ''

    const handleClose = () => setOpen(false);

    const createSeriesChannel = async (series) => {
        try {
            const type = 'series'
            const body = {
                title: series.name,
                filmId: series.id,
                type: type,
                creatorId: authUser._id,
                icon: series.backdrop_path ? `https://image.tmdb.org/t/p/original/${series.backdrop_path}` : null,
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
                toast.success(`New ${type} channel ${series.name} created`)
            }
        } catch (error) {
            toast.error(error.message)  
            console.error(error)
        }
    }

    const joinSeriesChannel = async (series) => {
        try {
            const body = {
                channelId: series.id,
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
                toast.success(`You joined ${series.name} channel`)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    const viewSeriesChannel = (series) => {
        console.log('join series channel')
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
                            {selectedSeries ? ((localCreatedChannels.includes(selectedSeries.id) ? (
                                    localJoinedChannels.includes(selectedSeries.id) ? (
                                        <button className='join-chat-btn' onClick={() => viewSeriesChannel(selectedSeries)}>View chat</button>
                                    ) : (
                                        <button className='join-chat-btn' onClick={() => joinSeriesChannel(selectedSeries)}>Join chat</button>
                                    )
                                   
                                ) : (
                                    <button className='join-chat-btn' onClick={() => createSeriesChannel(selectedSeries)}>Create chat</button>
                                ))) : <></>}
                            </div>
                </Box>
            </Modal>
        </div>
    )
}