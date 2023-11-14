import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import addCategory from "@/services/category/addCategory"
import useLocalStorage from "@/hooks/useLocalStorage"
import categoriesState from "@/atoms/CategoryAtom"
import { useSetRecoilState } from "recoil"
import { useToast } from "../ui/use-toast"

const AddCategory = () => {
    const [title, setTitle] = useState('')
    const [token, setToken] = useLocalStorage('token', '')
    const setCategories = useSetRecoilState(categoriesState)
    const { toast } = useToast()

    const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {

        try {
            const newCategory = await addCategory(title, token)

            setCategories((oldCategories) => [...oldCategories, {
                _id: newCategory.category._id,
                title: newCategory.category.title
            }]);

            setTitle('')

            toast({
                title: newCategory.message
            })

        } catch (error) {

        }

    }

    return (
        <Dialog>
            <DialogTrigger>
                <div>
                    <PlusIcon className="h-4 w-4 text-white" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle className="dark:text-white">
                        Add a new Category
                    </DialogTitle>

                    <DialogDescription className="flex gap-2">

                        <Input
                            type="text"
                            placeholder="Category Title"
                            onChange={(e) => setTitle(e.target.value)} />

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

export default AddCategory