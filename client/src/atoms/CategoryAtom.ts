import { atom } from "recoil";

interface Category {
    _id: string;
    title: string;
}

const categoriesState = atom<Category[]>({
    key: 'categoriesState',
    default: []
});

export default categoriesState;
