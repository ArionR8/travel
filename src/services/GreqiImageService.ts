import axios from "axios";
import { GreqiImage } from "../models/GreqiImage";

const api = axios.create({
  baseURL: "http://172.22.32.1:5000/api",
});

interface ApiRow {
  id: string;
  title: string;
  imageBase64: string;
}

// Fetch all images
export async function fetchGreqiImages(): Promise<GreqiImage[]> {
  const { data } = await api.get<ApiRow[]>("/greqi-images");
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    dataUri: `data:image/jpeg;base64,${row.imageBase64}`,
  }));
}

// Add new image
export async function addGreqiImage(
  title: string,
  imageBase64: string
): Promise<void> {
  try {
    // Strip prefix if exists before sending to backend
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    await api.post("/add-greqi-image", {
      title,
      imageBase64: cleanBase64,
    });
  } catch (err: any) {
    console.error("addGreqiImage error:", err.response?.data || err.message);
    throw err;
  }
}

// Delete image by id
export async function deleteGreqiImage(id: string): Promise<void> {
  await api.delete(`/greqi-image-delete/${id}`);
}

// Update image (title or imageBase64) by id
export async function updateGreqiImage(
  id: string,
  title: string,
  imageBase64?: string
): Promise<void> {
  try {
    const payload: any = { title };
    if (imageBase64) {
      // Strip prefix if exists before sending to backend
      payload.imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    }
    await api.put(`/update-greqi-image/${id}`, payload);
  } catch (err: any) {
    console.error("updateGreqiImage error:", err.response?.data || err.message);
    throw err;
  }
}
