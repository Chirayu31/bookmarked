import { atom } from "recoil";

interface BookmarkData {
    data: {
        url: string;
        _id: string;
        date: string;
        title: string;
    }[];
    categoryId: string;
}

const BookmarkAtom = atom<BookmarkData>({
    key: 'bookmarkAtom',
    default: {
        data: [],
        categoryId: ''
    }
})

export default BookmarkAtom