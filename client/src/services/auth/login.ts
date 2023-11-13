import axios from 'axios'

interface Iuser {
    username: string,
    password: string
}

export default async function userLogin(formData: Iuser) {
    const { data } = await axios.post(`http://localhost:3000/auth/login`, formData)
    // console.log(data)
    return data
}