import AddBookmark from "@/components/bookmark/AddBookmark";
import ViewBookmarks from "@/components/bookmark/ViewBookmarks";
import useLocalStorage from "@/hooks/useLocalStorage";
import getCategoryById from "@/services/category/getCategoryById";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('');
  const [token, setToken] = useLocalStorage('token', '')

  useEffect(() => {
    async function categoryConfirm() {
      if (!id) return;
      const category = await getCategoryById(token, id);
      setCategoryTitle(category.title)
    }

    categoryConfirm()
  }, []);

  if (!id || !categoryTitle) {
    return (<>
      <p className="text-center mt-10 text-xl text-red-500">Invalid Category Id</p>
    </>);
  }


  return (
    <div className="flex flex-col items-center mt-10 justify-center">
      <AddBookmark id={id} />
      <ViewBookmarks id={id} />

    </div>
  )
}

export default Category