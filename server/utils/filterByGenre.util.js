export function filterByGenre(targetGenreId, seriesList) {
    const filteredSeries = seriesList.filter(series => {
        for (const genreId of series.genre_ids) {
            if (genreId === targetGenreId) {
                return true;
            }
        }
        return false;
    });

    return filteredSeries;
}