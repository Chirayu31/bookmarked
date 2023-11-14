import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Auth from "./pages/auth/Auth";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSetRecoilState } from "recoil";
import userState from "./atoms/UserAtom";
import userDetails from "./services/user/getDetails";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
