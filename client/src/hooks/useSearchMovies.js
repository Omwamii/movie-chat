// get all movie channels that have been created
import { useState } from "react"
import { toast } from "react-hot-toast";

const useSearchMovies = () => {
    const [loading, setLoading] = useState(false);

    const searchMoviesFn = async (query, genre, setMovies) => {
        setLoading(true);
        try {
            const response = await fetch('/api/movies/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.parse({
                    query,
                    genre
                })
            });
            const data = await response.json();

            if (data.error) {        
                throw new Error(data.error);
            }

            console.log(`Movies searched : ${genre} -> `, data)
            
            setMovies(data);
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, searchMoviesFn };
}

export default useSearchMovies;