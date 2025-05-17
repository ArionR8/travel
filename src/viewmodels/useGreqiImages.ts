// src/viewmodels/useGreqiImages.ts
import { useEffect, useState } from 'react';
import { GreqiImage } from '../models/GreqiImage';
import { fetchGreqiImages } from '../services/GreqiImageService';

export function useGreqiImages() {
    const [images, setImages] = useState<GreqiImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchGreqiImages();
                setImages(data);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { images, loading, error };
}
