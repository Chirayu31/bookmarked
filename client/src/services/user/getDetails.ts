import axios from 'axios'

export default async function userDetails(token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.get(`http://localhost:3000/user`, { headers: headers })
    console.log(data)
    return data
}