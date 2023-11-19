import axios from "axios";

export default async function editCategory(token: string, updateData: { title: string, id: string }) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.put(`http://localhost:3000/category/${updateData.id}`, { title: updateData.title }, { headers })

    return data
}