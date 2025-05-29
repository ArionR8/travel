import { GreqiImage } from "../models/GreqiImage";
import api from "./api";

interface ApiRow {
  id: string;
  title: string;
  imageBase64: string;
}

export async function fetchGreqiImages(): Promise<GreqiImage[]> {
  try {
    const { data } = await api.get<ApiRow[]>("/api/greqi-images"); // path stays the same
    return data.map((row) => ({
      id: row.id,
      title: row.title,
      dataUri: `data:image/jpeg;base64,${row.imageBase64}`,
    }));
  } catch (err: any) {
    console.error("fetchGreqiImages error:", err.response?.data || err.message);
    throw err;
  }
}

export async function addGreqiImage(
  title: string,
  imageBase64: string
): Promise<void> {
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    await api.post("/api/add-greqi-image", {
      title,
      imageBase64: cleanBase64,
    });
  } catch (err: any) {
    console.error("addGreqiImage error:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteGreqiImage(id: string): Promise<void> {
  try {
    await api.delete(`/api/greqi-image-delete/${id}`);
  } catch (err: any) {
    console.error("deleteGreqiImage error:", err.response?.data || err.message);
    throw err;
  }
}

export async function updateGreqiImage(
  id: string,
  title: string,
  imageBase64?: string
): Promise<void> {
  try {
    const payload: any = { title };
    if (imageBase64) {
      payload.imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    }
    await api.put(`/api/update-greqi-image/${id}`, payload);
  } catch (err: any) {
    console.error("updateGreqiImage error:", err.response?.data || err.message);
    throw err;
  }
}
