import userState from "@/atoms/UserAtom"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useLocalStorage from "@/hooks/useLocalStorage";
import userDetails from "@/services/user/getDetails";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"

const Account = () => {
    const [user, setUser] = useRecoilState(userState);
    const [token, _] = useLocalStorage('token', '')
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            try {
                const data = await userDetails(token);
                data.token = token
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        getUserData();

    }, [setUser]);

    const logoutHandler = () => {
        localStorage.removeItem('token')
        navigate('/auth')
    }

    return (
        <div className="mt-10 flex justify-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>
                        User Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>username: {user.username}</p>
                    <p>email: {user.email}</p>
                    <Button className="mt-4" onClick={logoutHandler}>Signout</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Account