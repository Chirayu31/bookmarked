import { Dispatch, FC, SetStateAction, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import editCategory from "@/services/category/editCategory"
import useLocalStorage from "@/hooks/useLocalStorage"
import { Pencil1Icon } from "@radix-ui/react-icons"

interface ICategory {
    _id: string;
    title: string;
}

interface IBookMarksProps {
    id: string, setCategory: Dispatch<SetStateAction<ICategory | null>>;
}

const EditCategory: FC<IBookMarksProps> = ({ id, setCategory }) => {
    const [categoryName, setCategoryName] = useState('')
    const [token, setToken] = useLocalStorage('token', '')

    const handleFormSubmit = async () => {
        try {
            const updateData = await editCategory(token, { id: id, title: categoryName })
            setCategory(updateData.category)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div>
                    <Pencil1Icon className="h-6 w-6 text-white" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle className="dark:text-white">
                        Edit Category Name
                    </DialogTitle>

                    <DialogDescription className="flex gap-2">

                        <Input
                            type="text"
                            placeholder="Category Name"
                            onChange={(e) => setCategoryName(e.target.value)}
                        />


                        <DialogClose asChild>
                            <Button
                                variant='outline'
                                onClick={handleFormSubmit}
                            >
                                Submit
                            </Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCategory