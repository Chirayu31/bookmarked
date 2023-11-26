import axios from "axios";

export default async function removeBookmark(id: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/bookmark/${id}`, { headers: headers });

    return data
}