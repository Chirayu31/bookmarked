import axios from "axios";

export default async function getCategoryById(token: string, categoryId: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.get(`http://localhost:3000/category/${categoryId}`, { headers: headers })
    return data.category
}