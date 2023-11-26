import { FC, useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { addBookmark } from "@/services/bookmark/addBookmark";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useToast } from "../ui/use-toast";
import BookmarkAtom from "@/atoms/BookmarkAtom";
import { useSetRecoilState } from "recoil";
import { PlusIcon } from "@radix-ui/react-icons";

interface IBookMarksProps { id: string }

const AddBookmark: FC<IBookMarksProps> = ({ id }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const setBookmarks = useSetRecoilState(BookmarkAtom)
    const [token, _] = useLocalStorage('token', '')
    const { toast } = useToast()

    const handleFormSubmit = async () => {
        try {
            const newBookmark = await addBookmark({ title, url, categoryId: id }, token)


            setBookmarks((prevBookmarks) => ({
                ...prevBookmarks,
                data: [
                    ...prevBookmarks.data,
                    {
                        _id: newBookmark.bookmark._id,
                        title: newBookmark.bookmark.title,
                        url: newBookmark.bookmark.url,
                        date: newBookmark.bookmark.createdAt,
                    },
                ],
            }));

            setTitle('')
            setUrl('')

        } catch (error) {
            console.log(error)
            toast({
                title: 'Error Occured'
            })
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div>
                    <PlusIcon className="h-8 w-8 text-white" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle className="dark:text-white">
                        Add a new Bookmark
                    </DialogTitle>

                    <DialogDescription className="flex gap-2">

                        <Input
                            type="text"
                            placeholder="BookMark Title"
                            onChange={(e) => setTitle(e.target.value)} />

                        <Input
                            type="text"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)} />

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

export default AddBookmark