import axios from "axios";

export async function getBookmarks(categoryId: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.get(`http://localhost:3000/bookmark/${categoryId}`, { headers })

    return data
}