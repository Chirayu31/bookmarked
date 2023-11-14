import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useRecoilValue } from 'recoil';
import userState from '@/atoms/UserAtom';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const user = useRecoilValue(userState)

    return (
        <nav className="border border-slate-800 dark:border-b-gray-800 p-1 sm:p-2 md:p-4 dark:bg-black">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/'>
                    <div className="text-base sm:text-lg md:text-2xl font-[Outfit] font-semibold bg-gradient-to-r from-[#2980B9] to-[#6DD5FA] text-transparent bg-clip-text">
                        bookmarked
                    </div>
                </Link>
                <div className="flex md:space-x-4">
                    {user.username ? (
                        <>
                            <Link to={`/dashboard`}>
                                <Button
                                    className='text-xs font-[Outfit] md:text-base'
                                    variant="link" >
                                    Dashboard
                                </Button>
                            </Link>
                            <Link to={`/dashboard`}>
                                <Button
                                    className='text-xs font-[Outfit] md:text-base '
                                    variant="link">
                                    Recents
                                </Button>
                            </Link>
                            <div>
                                <Link to={`/account`}>
                                    <Avatar>
                                        <AvatarFallback className='dark:text-white dark:bg-gray-700'>
                                            {user.username.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                        </>

                    ) : (<>
                        <Link to="/auth">
                            <Button
                                className='text-xs font-[Outfit] md:text-base '
                                variant="link" >
                                Login
                            </Button>
                        </Link>
                    </>)}
                </div>

            </div>
        </nav>
    );
};

export default NavBar;
