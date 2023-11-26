import axios from "axios";

export default async function removeCategory(id: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`, { headers: headers })

    return data;
}