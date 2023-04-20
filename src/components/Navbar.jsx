import { NavLink } from 'react-router-dom';

//  React router
import { useNavigate } from "react-router-dom";

import { AiFillHome, AiFillHeart, AiFillQuestionCircle, AiOutlineSearch } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { Button } from './Button';
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, registerUser, loginUser, logoutUser } from '../features/user/userSlice';

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser[0]);
    const userInfo = useSelector(state => {
        return state.user.users.filter(u => u.id === user?.id)[0];
    })
    const logout = () => {
        dispatch(logoutUser());
        navigate("/");
    }
    return (
        <div className="navbar fixed p-1 top-0 left-0 right-0 bg-primary/50 backdrop-blur drop-shadow-xl shadow-xl z-50">

            {/* navbar collapse for smaller screens */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to="/" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex  p-1 gap-1 md:mx-2">
                                <span><AiFillHome /></span>
                                <span className="font-['Croissant_One']" >Home</span>
                            </div>
                        </NavLink></li>
                        <li><NavLink to="/dishes" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex  p-1 gap-1 md:mx-2">
                                <span><BiFoodMenu /></span>
                                <span className="font-['Croissant_One']" >Dishes</span>
                            </div>
                        </NavLink></li>
                        <li><NavLink to="/favorites" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex  p-1 gap-1 md:mx-2">
                                <span><AiFillHeart /></span>
                                <span className="font-['Croissant_One']" >My Favorites</span>
                            </div>
                        </NavLink></li>
                        <li><NavLink to="/search" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex  p-1 gap-1 md:mx-2">
                                <span><AiOutlineSearch /></span>
                                <span className="font-['Croissant_One']" >Search</span>
                            </div>
                        </NavLink></li>
                        <li><NavLink to="/about" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex  p-1 gap-1 md:mx-2">
                                <span><AiFillQuestionCircle /></span>
                                <span className="font-['Croissant_One']" >About</span>
                            </div>
                        </NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-2xl font-['Croissant_One'] text-base-100 drop-shadow">NextDish</a>
            </div>
            {/* Navbar for larger screens */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/" className={({ isActive, isPending }) =>
                        isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                        <div className="flex justify-center items-center p-1 gap-1 mx-auto  p-1 gap-1 md:mx-2">
                            <span><AiFillHome /></span>
                            <span className="font-['Croissant_One']" >Home</span>
                        </div>
                    </NavLink></li>
                    <li><NavLink to="/dishes" className={({ isActive, isPending }) =>
                        isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                        <div className="flex justify-center items-center p-1 gap-1 mx-auto  p-1 gap-1 md:mx-2">
                            <span><BiFoodMenu /></span>
                            <span className="font-['Croissant_One']" >Dishes</span>
                        </div>
                    </NavLink></li>
                    <li><NavLink to="/favorites" className={({ isActive, isPending }) =>
                        isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                        <div className="flex justify-center items-center p-1 gap-1 mx-auto  p-1 gap-1 md:mx-2">
                            <span><AiFillHeart /></span>
                            <span className="font-['Croissant_One']" >Favorites</span>
                        </div>
                    </NavLink></li>
                    <li><NavLink to="/search" className={({ isActive, isPending }) =>
                            isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                            <div className="flex justify-center items-center p-1 gap-1 md:mx-2">
                                <span><AiOutlineSearch /></span>
                                <span className="font-['Croissant_One']" >Search</span>
                            </div>
                        </NavLink></li>
                    <li><NavLink to="/about" className={({ isActive, isPending }) =>
                        isPending ? "text-zinc-600" : isActive ? "text-base-100" : ""}>
                        <div className="flex justify-center items-center p-1 gap-1 mx-auto p-1 gap-1 md:mx-2">
                            <span><AiFillQuestionCircle /></span>
                            <span className="font-['Croissant_One']" >About</span>
                        </div>
                    </NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <div className="dropdown dropdown-left">
                        {userInfo.picture ?
                            (
                                <div className="avatar" tabIndex={0}>
                                    <div className="w-12 rounded-full">
                                        <img src={userInfo.picture} />
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="avatar placeholder" tabIndex={0}>
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                        <span>{user.firstName[0] + user.lastName[0]}</span>
                                    </div>
                                </div>
                            )
                        }
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            <li onClick={() => logout()}><a>Logout</a></li>
                        </ul>
                    </div> :
                    <NavLink to="/login"><Button>Login</Button></NavLink>}
            </div>
        </div >
    )
}