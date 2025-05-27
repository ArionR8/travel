// src/viewmodels/useBullgariImages.ts
import { useEffect, useState } from "react";
import { BullgariImage } from "../models/BulgariImage";
import {
    addBullgariImage,
    deleteBullgariImage,
    fetchBullgariImages,
    updateBullgariImage,
} from "../services/BulgariImageService";

export function useBullgariImages() {
    const [images, setImages] = useState<BullgariImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadImages = async () => {
        setLoading(true);
        try {
            const imgs = await fetchBullgariImages();
            setImages(imgs);
        } catch {
            setError("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    const addImage = async (title: string, base64: string) => {
        try {
            await addBullgariImage(title, base64);
            setMessage("Image added successfully");
            await loadImages();
        } catch {
            setError("Failed to add image");
        }
    };

    const deleteImage = async (id: string) => {
        try {
            await deleteBullgariImage(id);
            setImages((imgs) => imgs.filter((img) => img.id !== id));
            setMessage("Image deleted successfully");
        } catch {
            setError("Failed to delete image");
        }
    };

    const updateImage = async (id: string, title: string, base64?: string) => {
        try {
            await updateBullgariImage(id, title, base64);
            setMessage("Image updated successfully");
            await loadImages();
        } catch {
            setError("Failed to update image");
        }
    };

    return { images, loading, error, message, addImage, deleteImage, updateImage, reload: loadImages };
}
