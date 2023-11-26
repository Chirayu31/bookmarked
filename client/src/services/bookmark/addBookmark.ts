import axios from "axios";

export async function addBookmark(postData: { title: string, url: string, categoryId: string }, token: string) {
    // console.log(postData)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/bookmark/`, { ...postData }, { headers: headers })

    return data
}