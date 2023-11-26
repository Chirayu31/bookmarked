import axios from "axios";

type categoryT = {
    _id: string,
    title: string,
    userId: string
}

export default async function fetchUserCategories(token: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/category/`, { headers: headers })

    const categories = data.categories.map((category: categoryT) => {
        return { title: category.title, _id: category._id }
    })

    return categories
}