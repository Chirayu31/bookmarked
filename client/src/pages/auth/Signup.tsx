import userState from "@/atoms/UserAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";
import userSignup from "@/services/auth/signup";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const initialState = {
    username: "",
    email: "",
    password: "",
};

const Signup = () => {
    const [token, setToken] = useLocalStorage("token", "");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        message: "",
    });

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = {
            username: formData.username.length < 4 ? 'Username should be of 4 or more characters' : '',
            password: formData.password.length < 6 ? 'Passoword should be of 6 or more characters' : '',
            email: formData.email.trim() === '' ? 'This field is required' : '',
            message: ''
        };

        setErrors(formErrors);

        if (Object.values(formErrors).some((error) => error !== '')) {
            return;
        }

        try {
            const userData = await userSignup(formData);
            setUser(userData);
            setFormData(initialState);
            setToken(userData.token);
        } catch (error: any) {
            if (error.response && error.response.status !== 500) {
                const serverErrors = error.response.data;
                setErrors({
                    ...errors,
                    message: serverErrors.message || "",
                });
            } else {

                console.error("Error during signup:", error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            username: "",
            email: "",
            password: "",
            message: "",
        });
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl ">Signup</CardTitle>
                <CardDescription className="text-sm font-semibold">
                    Sign up to enjoy a seamless bookmarking experience.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="grid gap-4" onSubmit={formSubmitHandler}>
                    {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}

                    {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                    <Input
                        type="text"
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="Enter your username"
                        name="username"
                    />

                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    <Input
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Enter your email"
                        name="email"
                    />

                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    <Input
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Enter your password"
                        name="password"
                    />

                    <Button type="submit">Signup</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default Signup;
