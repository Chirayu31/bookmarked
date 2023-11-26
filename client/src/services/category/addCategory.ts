import axios from "axios";

export default async function addCategory(title: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/category/`, { title }, { headers: headers })

    return data
}