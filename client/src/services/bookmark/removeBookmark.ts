import axios from "axios";

export default async function removeBookmark(id: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.delete(`http://localhost:3000/bookmark/${id}`, { headers: headers });

    return data
}