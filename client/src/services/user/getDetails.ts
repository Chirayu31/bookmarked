import axios from 'axios'

export default async function userDetails(token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`, { headers: headers })
    // console.log(data)
    return data
}