import categoriesState from "@/atoms/CategoryAtom"
import AddCategory from "@/components/category/AddCategory"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import useLocalStorage from "@/hooks/useLocalStorage"
import fetchUserCategories from "@/services/category/fetchUserCategories"
import removeCategory from "@/services/category/removeCategory"
import { TrashIcon } from "@radix-ui/react-icons"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"

const Dashboard = () => {
    const [token, _] = useLocalStorage('token', '')
    const categories = useRecoilValue(categoriesState)
    const setCategories = useSetRecoilState(categoriesState)
    const navigate = useNavigate()
    const { toast } = useToast()

    useEffect(() => {
        if (!token) {
            navigate('/auth')
        }
    }, [token])

    useEffect(() => {
        async function fetch() {
            const data = await fetchUserCategories(token)
            setCategories(data)
        }
        if (token)
            fetch()
    }, [])

    const trimText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleRemoveCategory = async (id: string) => {
        try {
            const removeData = await removeCategory(id, token);
            // console.log(removeData);

            const newData = categories.filter((category) => category._id != id)

            setCategories(newData)

            toast({
                title: removeData.message
            })

        } catch (error) {
            console.log(error)
            toast({ title: 'Error Occured', variant: 'destructive' })
        }
    }

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

                    <Card key={category._id} className="dark:bg-black dark:hover:bg-gray-950 cursor-pointer	flex items-center justify-between sm:px-10 px-4">
                        <Link to={`/category/${category._id}`}>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle className="sm:hidden">{trimText(category.title, 10)}</CardTitle>
                                <CardTitle className="max-sm:hidden">{trimText(category.title, 15)}</CardTitle>
                            </CardHeader>
                        </Link>

                        <TrashIcon className='text-red-400' onClick={() => { handleRemoveCategory(category._id) }} />

                    </Card>

                ))}
            </div>
        </>
    )
}

export default Dashboard