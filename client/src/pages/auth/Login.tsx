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
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        message: ''
    });
    const [token, setToken] = useLocalStorage('token', '')
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setErrors({
            username: '',
            password: '',
            message: ''
        })
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formErrors = {
            username: formData.username.trim() === '' ? 'This field is required' : '',
            password: formData.password.trim() === '' ? 'This field is required' : '',
            message: ''
        };

        setErrors(formErrors);

        if (Object.values(formErrors).some((error) => error !== '')) {
            return;
        }

        try {
            const data = await userLogin(formData)
            setFormData(initialState)
            setToken(data.token)
            setUser(data)
        } catch (error: any) {
            if (error.response && error.response.status !== 500) {
                const serverErrors = error.response.data;
                setErrors({
                    username: '',
                    password: '',
                    message: serverErrors.message
                });
            } else {
                console.error(error);
            }
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
                    {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}

                    <span className="text-red-500 text-sm">{errors.username}</span>

                    <Input
                        type="text"
                        onChange={onChangeHandler}
                        value={formData.username}
                        name="username"
                        placeholder="Enter your username" />

                    <span className="text-red-500 text-sm">{errors.password}</span>
                    <Input
                        type="password"
                        onChange={onChangeHandler}
                        value={formData.password}
                        name="password"
                        placeholder="Enter your password" />
                    <Button type="submit">Login </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login