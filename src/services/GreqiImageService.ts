// src/services/GreqiImageService.ts
import axios from 'axios';
import { GreqiImage } from '../models/GreqiImage';


const api = axios.create({
    baseURL: 'http://192.168.100.90:5000/api',
});


interface ApiRow {
    id: string;
    title: string;
    imageBase64: string;
}

export async function fetchGreqiImages(): Promise<GreqiImage[]> {
    const { data } = await api.get<ApiRow[]>('/greqi-images');

    return data.map((row): GreqiImage => ({
        id: row.id,
        title: row.title,
        dataUri: `data:image/jpeg;base64,${row.imageBase64}`,
    }));
}
