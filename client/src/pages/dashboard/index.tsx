import categoriesState from "@/atoms/CategoryAtom"
import AddCategory from "@/components/category/AddCategory"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import useLocalStorage from "@/hooks/useLocalStorage"
import fetchUserCategories from "@/services/category/fetchUserCategories"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"

const Dashboard = () => {
    const [token, setToken] = useLocalStorage('token', '')
    const categories = useRecoilValue(categoriesState)
    const setCategories = useSetRecoilState(categoriesState)

    useEffect(() => {
        async function fetch() {
            const data = await fetchUserCategories(token)
            setCategories(data)
        }
        fetch()
    }, [])

    return (
        <>
            <div className="flex mt-10 mx-10 gap-6">
                <h2 className=" text-2xl dark:text-white font-semibold">
                    Category
                </h2>

                <AddCategory />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-4 mx-10">

                {categories && categories.map((category: { _id: string, title: string }) => (

                    <Card key={category._id} className="dark:bg-black dark:hover:bg-gray-950 cursor-pointer	">
                        <Link to={`/category/${category._id}`}>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>{category.title}</CardTitle>
                            </CardHeader>
                        </Link>
                    </Card>

                ))}
            </div>
        </>
    )
}

export default Dashboard