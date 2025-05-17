import axios from 'axios';
import { useEffect, useState } from 'react';

export function useGreqiImages() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://your-server-ip:5000/api/greqi-images');
                setSlides(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return { slides, loading };
}
