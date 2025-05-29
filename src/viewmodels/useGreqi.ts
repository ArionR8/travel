// src/viewmodels/useGreqi.ts
import { useEffect, useState } from "react";
//import { GreqiHotel } from "../models/GreqiHotel";
import { GreqiImage } from "../models/GreqiImage";
import {
    addGreqiHotel,
    deleteGreqiHotel,
    fetchGreqiHotels,
    updateGreqiHotel,
} from "../services/GreqiHotelService";
import {
    addGreqiImage,
    deleteGreqiImage,
    fetchGreqiImages,
    updateGreqiImage,
} from "../services/GreqiImageService";

export function useGreqi() {
    // Images state
    const [images, setImages] = useState<GreqiImage[]>([]);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);
    const [imagesError, setImagesError] = useState<string | null>(null);
    const [imagesMessage, setImagesMessage] = useState<string | null>(null);

    // Hotels state
    //const [hotels, setHotels] = useState<GreqiHotel[]>([]);
    const [hotelsLoading, setHotelsLoading] = useState<boolean>(true);
    const [hotelsError, setHotelsError] = useState<string | null>(null);
    const [hotelsMessage, setHotelsMessage] = useState<string | null>(null);

    // --- Images loading ---
    const loadImages = async () => {
        setImagesLoading(true);
        setImagesError(null);
        setImagesMessage(null);
        try {
            const imgs = await fetchGreqiImages();
            setImages(imgs);
        } catch {
            setImagesError("Failed to load images");
        } finally {
            setImagesLoading(false);
        }
    };

    // --- Hotels loading ---
    const loadHotels = async () => {
        setHotelsLoading(true);
        setHotelsError(null);
        setHotelsMessage(null);
        try {
            const data = await fetchGreqiHotels();
            //setHotels(data);
        } catch {
            setHotelsError("Failed to load hotels");
        } finally {
            setHotelsLoading(false);
        }
    };

    // Load both on mount
    useEffect(() => {
        loadImages();
        loadHotels();
    }, []);

    // --- Images CRUD ---
    const addImage = async (title: string, base64: string) => {
        setImagesError(null);
        setImagesMessage(null);
        try {
            await addGreqiImage(title, base64);
            setImagesMessage("Image added successfully");
            await loadImages();
        } catch (err) {
            setImagesError("Failed to add image");
            console.error("addImage error:", err);
        }
    };

    const deleteImage = async (id: string) => {
        setImagesError(null);
        setImagesMessage(null);
        try {
            await deleteGreqiImage(id);
            setImages((imgs) => imgs.filter((img) => img.id !== id));
            setImagesMessage("Image deleted successfully");
        } catch {
            setImagesError("Failed to delete image");
        }
    };

    const updateImage = async (id: string, title: string, base64?: string) => {
        setImagesError(null);
        setImagesMessage(null);
        try {
            await updateGreqiImage(id, title, base64);
            setImagesMessage("Image updated successfully");
            await loadImages();
        } catch (err) {
            setImagesError("Failed to update image");
            console.error("updateImage error:", err);
        }
    };

    // --- Hotels CRUD ---
    // Note: rating is not passed here since backend does not support it on add
    const addHotel = async (
        name: string,
        location: string,
        price: number,
        base64: string
    ) => {
        setHotelsError(null);
        setHotelsMessage(null);
        try {
            await addGreqiHotel(name, location, price, base64);
            setHotelsMessage("Hotel added successfully");
            await loadHotels();
        } catch (err) {
            setHotelsError("Failed to add hotel");
            console.error("addHotel error:", err);
        }
    };

    // Note: rating is not passed here since backend does not support it on update
    const updateHotel = async (
        id: string,
        name: string,
        location: string,
        price: number,
        base64?: string
    ) => {
        setHotelsError(null);
        setHotelsMessage(null);
        try {
            await updateGreqiHotel(id, name, location, price, base64);
            setHotelsMessage("Hotel updated successfully");
            await loadHotels();
        } catch (err) {
            setHotelsError("Failed to update hotel");
            console.error("updateHotel error:", err);
        }
    };

    const deleteHotel = async (id: string) => {
        setHotelsError(null);
        setHotelsMessage(null);
        try {
            await deleteGreqiHotel(id);
            //setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
            setHotelsMessage("Hotel deleted successfully");
        } catch {
            setHotelsError("Failed to delete hotel");
        }
    };

    return {
        // Images
        images,
        imagesLoading,
        imagesError,
        imagesMessage,
        addImage,
        deleteImage,
        updateImage,
        reloadImages: loadImages,

        // Hotels
        //hotels,
        hotelsLoading,
        hotelsError,
        hotelsMessage,
        addHotel,
        deleteHotel,
        updateHotel,
        reloadHotels: loadHotels,
    };
}
