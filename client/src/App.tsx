import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Auth from "./pages/auth/Auth";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSetRecoilState } from "recoil";
import userState from "./atoms/UserAtom";
import userDetails from "./services/user/getDetails";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/auth',
    element: <Auth />
  }
]);

function App() {
  const [token, setToken] = useLocalStorage('token', '')
  const setUser = useSetRecoilState(userState)

  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {

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
    }
  }, [isLoggedIn, token, setUser]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
