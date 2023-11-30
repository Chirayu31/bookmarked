import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="flex flex-center flex-col gap-10 items-center">
            <div className="text-base sm:text-2xl md:text-4xl font-[Outfit] font-semibold bg-gradient-to-r from-[#2980B9] to-[#6DD5FA] text-transparent bg-clip-text text-center mt-10">
                welcome to bookmarked
            </div>

            <p className="text-gray-300 font-semibold text-center text-lg w-1/2">
                Bookmarked is a web application that empowers users to efficiently manage and organize their online content, including tweets, blogs, and articles. With Bookmarked, you can seamlessly categorize, sort, and access your favorite online resources.
            </p>

            <Link to='/auth'>
                <Button className="min-w-[200px] font-semibold text-base">
                    Sign in!
                </Button>
            </Link>
        </div>
    )
}

export default Home