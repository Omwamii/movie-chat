// get all movie channels that have been created
import { useState } from "react"
import { toast } from "react-hot-toast";

const useSearchSeries = () => {
    const [loading, setLoading] = useState(false);

    const searchSeriesFn = async (query, genre, setSeries) => {
        setLoading(true);
        try {
            const response = await fetch('/api/series/search', {
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

            console.log(`searched series : ${genre}`, data)
            
            setSeries(data);
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, searchSeriesFn };
}

export default useSearchSeries;