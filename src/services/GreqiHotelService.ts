import { GreqiHotel } from "../models/GreqiHotel";
import api from "./api";

interface ApiHotelRow {
    id: string;
    name: string;
    location: string;
    rating?: string | null;
    price?: string | null;
    imageBase64: string;
    createdAt: string;
    updatedAt: string;
}

function parseNumber(value?: string | null): number {
    if (!value) return 0;
    const n = Number(value);
    return isNaN(n) ? 0 : n;
}

// ✅ Fetch all hotels (auth handled by interceptor)
export async function fetchGreqiHotels(): Promise<GreqiHotel[]> {
    try {
        const { data } = await api.get<ApiHotelRow[]>("/api/hurghada/cards");
        return data.map((row) => ({
            id: row.id,
            name: row.name,
            location: row.location,
            rating: parseNumber(row.rating),
            price: parseNumber(row.price),
            imageBase64: `data:image/jpeg;base64,${row.imageBase64}`,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }));
    } catch (err: any) {
        console.error("fetchGreqiHotels error:", err.response?.data || err.message);
        throw err;
    }
}

// ✅ Add new hotel
export async function addGreqiHotel(
    title: string,
    description: string,
    price: number,
    imageBase64: string
): Promise<void> {
    try {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        await api.post("/api/hurghada/add-cards", {
            title,
            description,
            price,
            imageBase64: cleanBase64,
        });
    } catch (err: any) {
        console.error("addGreqiHotel error:", err.response?.data || err.message);
        throw err;
    }
}

// ✅ Delete hotel by id
export async function deleteGreqiHotel(id: string): Promise<void> {
    try {
        await api.delete(`/api/hurghada/cards-delete/${id}`);
    } catch (err: any) {
        console.error("deleteGreqiHotel error:", err.response?.data || err.message);
        throw err;
    }
}

// ✅ Update hotel info by id
export async function updateGreqiHotel(
    id: string,
    name: string,
    location: string,
    price: number,
    imageBase64?: string
): Promise<void> {
    try {
        const payload: any = { name, location, price };
        if (imageBase64) {
            payload.imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        }
        await api.put(`/api/hurghada/cards-update/${id}`, payload);
    } catch (err: any) {
        console.error("updateGreqiHotel error:", err.response?.data || err.message);
        throw err;
    }
}
