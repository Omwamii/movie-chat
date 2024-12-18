import { create } from 'zustand';

const useSeriesModal = create((set) => ({
    open: false,
    setOpen: (open) => set({open}),
    selectedMovie: null,
    setSelectedSeries: (selectedSeries) => set({selectedSeries}),
}))

export default useSeriesModal;