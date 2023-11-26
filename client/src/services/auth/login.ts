import axios from 'axios'

interface Iuser {
    username: string,
    password: string
}

export default async function userLogin(formData: Iuser) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)
    // console.log(data)
    return data
}