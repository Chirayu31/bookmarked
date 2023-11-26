import AddBookmark from "@/components/bookmark/AddBookmark";
import ViewBookmarks from "@/components/bookmark/ViewBookmarks";
import EditCategory from "@/components/category/EditCategory";
import useLocalStorage from "@/hooks/useLocalStorage";
import getCategoryById from "@/services/category/getCategoryById";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ICategory {
  _id: string;
  title: string;
}

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [token, _] = useLocalStorage('token', '')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  }, [token])

  useEffect(() => {
    async function categoryConfirm() {
      if (!id) return;
      const category = await getCategoryById(token, id);
      setCategory(category)
    }
    if (token)
      categoryConfirm()
  }, []);

  if (!id || !category) {
    return (<>
      <p className="text-center mt-10 text-xl text-red-500">Invalid Category Id</p>
    </>);
  }

  return (
    <>
      <div className="flex mx-10 gap-4 mt-4 justify-around">
        <div className="flex gap-4">
          <h2 className="text-white text-xl sm:text-2xl">{category.title}</h2>

          <EditCategory id={id} setCategory={setCategory} />
        </div>

        <AddBookmark id={id} />
      </div>


      <div className="flex flex-col items-center mt-10 justify-center">
        <ViewBookmarks id={id} />
      </div>
    </>
  )
}

export default Category