import BookmarkAtom from "@/atoms/BookmarkAtom";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { useToast } from "../ui/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getBookmarks } from "@/services/bookmark/getBookmarks";
import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { TrashIcon } from "@radix-ui/react-icons";
import removeBookmark from "@/services/bookmark/removeBookmark";

interface IviewBookMarks { id: string }

const ViewBookmarks: FC<IviewBookMarks> = ({ id }): JSX.Element => {
    const [token, setToken] = useLocalStorage('token', '')
    const [bookmarks, setBookmarks] = useRecoilState(BookmarkAtom)

    const { toast } = useToast()

    useEffect(() => {
        async function fetchBookMarks() {
            if (id) {
                try {
                    const fetchedBookmarks = await getBookmarks(id, token)
                    setBookmarks({ data: fetchedBookmarks.bookmarks, categoryId: id })
                } catch (error) {
                    toast({
                        title: 'Invalid Data'
                    })
                }
            }
        }
        fetchBookMarks()
    }, [id, token])

    const removeBookmarkHandler = async (id: string) => {
        try {
            const data = await removeBookmark(id, token);
            // console.log(data)

            setBookmarks((prevBookmarks) => ({
                ...prevBookmarks,
                data: prevBookmarks.data.filter((bookmark) => bookmark._id !== id),
            }));

            toast({
                title: 'Deleted Successfully',
                variant: 'destructive'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const trimText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <>
            {bookmarks.data.length > 0 ? (
                <Table className="table-auto w-full">
                    <TableCaption>List of bookmarks</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>URL</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {bookmarks && bookmarks.data.map((bookmark) => (

                            <TableRow key={bookmark._id}>
                                <TableHead className="w-1/2">
                                    {trimText(bookmark.title, 20)}
                                </TableHead>
                                <TableHead className="w-1/2 max-w-[200px]">
                                    <a href={bookmark.url} target="_blank">
                                        {trimText(bookmark.url, 20)}
                                    </a>
                                </TableHead>
                                <TableHead>
                                    <TrashIcon className="text-red-500 cursor-pointer" onClick={() => { removeBookmarkHandler(bookmark._id) }} />
                                </TableHead>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            ) : (
                <>
                    <p className="dark:text-white mt-10">No Bookmarks to Display</p>
                </>
            )}
        </>
    )
}

export default ViewBookmarks