// src/viewmodels/useGreqiHotels.ts
import { useEffect, useState } from "react";
import { GreqiHotel } from "../models/GreqiHotel";
import {
    addGreqiHotel,
    deleteGreqiHotel,
    fetchGreqiHotels,
    updateGreqiHotel,
} from "../services/GreqiHotelService";

export function useGreqiHotels() {
    const [hotels, setHotels] = useState<GreqiHotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadHotels = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const data = await fetchGreqiHotels();
            setHotels(data);
        } catch {
            setError("Failed to load hotels");
        } finally {
            setLoading(false);
        }
    };

    const addHotel = async (
        name: string,
        location: string,
        price: number,
        base64: string
    ) => {
        setError(null);
        setMessage(null);
        try {
            await addGreqiHotel(name, location, price, base64);
            setMessage("Hotel added successfully");
            await loadHotels();
        } catch {
            setError("Failed to add hotel");
        }
    };

    const updateHotel = async (
        id: string,
        name: string,
        location: string,
        price: number,
        base64?: string
    ) => {
        setError(null);
        setMessage(null);
        try {
            await updateGreqiHotel(id, name, location, price, base64);
            setMessage("Hotel updated successfully");
            await loadHotels();
        } catch {
            setError("Failed to update hotel");
        }
    };

    const deleteHotel = async (id: string) => {
        setError(null);
        setMessage(null);
        try {
            await deleteGreqiHotel(id);
            setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
            setMessage("Hotel deleted successfully");
        } catch {
            setError("Failed to delete hotel");
        }
    };

    useEffect(() => {
        loadHotels();
    }, []);

    return {
        hotels,
        loading,
        error,
        message,
        addHotel,
        updateHotel,
        deleteHotel,
        reloadHotels: loadHotels,
    };
}
