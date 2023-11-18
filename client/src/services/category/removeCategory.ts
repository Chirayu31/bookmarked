import axios from "axios";

export default async function removeCategory(id: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.delete(`http://localhost:3000/category/${id}`, { headers: headers })

    return data;
}