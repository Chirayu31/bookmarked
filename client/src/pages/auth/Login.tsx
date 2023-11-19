import userState from "@/atoms/UserAtom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useLocalStorage from "@/hooks/useLocalStorage"
import userLogin from "@/services/auth/login"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"

const initialState = {
    username: '',
    password: ''
}

const Login = () => {
    const [formData, setFormData] = useState(initialState)
    const [token, setToken] = useLocalStorage('token', '')
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await userLogin(formData)
            setFormData(initialState)
            setToken(data.token)
            setUser(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [token])

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription className="text-sm font-semibold">
                    Welcome back! Enter your login details to continue
                </CardDescription>
            </CardHeader>
            <CardContent >
                <form className="grid gap-4" onSubmit={handleFormSubmit}>
                    <Input
                        type="text"
                        onChange={onChangeHandler}
                        value={formData.username}
                        name="username"
                        required
                        placeholder="Enter your username" />

                    <Input
                        type="password"
                        onChange={onChangeHandler}
                        value={formData.password}
                        name="password"
                        required
                        placeholder="Enter your password" />
                    <Button type="submit">Login </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login