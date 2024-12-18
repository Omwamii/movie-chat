import { create } from 'zustand';

const useMovieModal = create((set) => ({
    open: false,
    setOpen: (open) => set({open}),
    selectedMovie: null,
    setSelectedMovie: (selectedMovie) => set({selectedMovie}),
}))

export default useMovieModal;