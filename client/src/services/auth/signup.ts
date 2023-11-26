import axios from 'axios'

interface Iuser {
    username: string,
    email: string,
    password: string
}

export default async function userSignup(formData: Iuser) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
    // console.log(data)
    return data
}