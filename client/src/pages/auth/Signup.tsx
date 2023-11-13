import userState from "@/atoms/UserAtom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useLocalStorage from "@/hooks/useLocalStorage"
import userSignup from "@/services/auth/signup"
import { FormEvent, useState } from "react"
import { useSetRecoilState } from "recoil"

const initialState = {
    username: '',
    email: '',
    password: '',
}

const Signup = () => {
    const [token, setToken] = useLocalStorage('token', '');
    const setUser = useSetRecoilState(userState);

    const [formData, setFormData] = useState(initialState);

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData = await userSignup(formData)
            setUser(userData)
            setFormData(initialState)
            setToken(userData.token)
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl ">Signup</CardTitle>
                <CardDescription className="text-sm font-semibold">
                    Sign up to enjoy a seamless bookmarking experience.
                </CardDescription>
            </CardHeader>

            <CardContent >

                <form className="grid gap-4" onSubmit={formSubmitHandler}>

                    <Input
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="Enter your username"
                        name="username"
                    />

                    <Input
                        type="email"
                        required
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Enter your email"
                        name="email"
                    />

                    <Input
                        type="password"
                        required
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Enter your password"
                        name="password"
                    />

                    <Button type="submit">
                        Signup
                    </Button>
                </form>

            </CardContent>
        </Card>
    )
}

export default Signup