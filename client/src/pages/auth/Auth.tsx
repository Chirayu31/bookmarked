import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "./Login"
import Signup from "./Signup"

const Auth = () => {
    return (
        <div className="flex font-[Montserrat] justify-center mt-20 mx-4">
            <Tabs defaultValue="login" className=" flex flex-col justify-center w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Login /></TabsContent>
                <TabsContent value="signup"><Signup /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth