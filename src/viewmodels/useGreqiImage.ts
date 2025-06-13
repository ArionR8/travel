// src/viewmodels/useGreqiImages.ts
import { useEffect, useState } from "react";
import { GreqiImage } from "../models/GreqiImage";
import {
    addGreqiImage,
    deleteGreqiImage,
    fetchGreqiImages,
    updateGreqiImage,
} from "../services/GreqiImageService";

export function useGreqiImages() {
    const [images, setImages] = useState<GreqiImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadImages = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const data = await fetchGreqiImages();
            setImages(data);
        } catch {
            setError("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const addImage = async (title: string, base64: string) => {
        setError(null);
        setMessage(null);
        try {
            await addGreqiImage(title, base64);
            setMessage("Image added successfully");
            await loadImages();
        } catch {
            setError("Failed to add image");
        }
    };

    const updateImage = async (
        id: string,
        title: string,
        base64?: string
    ) => {
        setError(null);
        setMessage(null);
        try {
            await updateGreqiImage(id, title, base64);
            setMessage("Image updated successfully");
            await loadImages();
        } catch {
            setError("Failed to update image");
        }
    };

    const deleteImage = async (id: string) => {
        setError(null);
        setMessage(null);
        try {
            await deleteGreqiImage(id);
            setImages((prev) => prev.filter((img) => img.id !== id));
            setMessage("Image deleted successfully");
        } catch {
            setError("Failed to delete image");
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return {
        images,
        loading,
        error,
        message,
        addImage,
        updateImage,
        deleteImage,
        reloadImages: loadImages,
    };
}
