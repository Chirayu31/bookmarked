import axios from "axios";

export default async function addCategory(title: string, token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.post('http://localhost:3000/category/', { title }, { headers: headers })

    return data
}