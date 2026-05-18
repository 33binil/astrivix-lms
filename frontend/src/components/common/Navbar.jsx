import React, { useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavbarLinks } from "../../../data/navbar-links"
import studyNotionLogo from '../../assets/Logo/logo.jpg'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"
import { useTheme } from '../../context/ThemeContext'




const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    // console.log("Printing base url: ", import.meta.env.VITE_APP_BASE_URL);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log('USER data from Navbar (store) = ', user)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const fetchSublinks = async () => {
        try {
            setLoading(true);
            console.log("Fetching course categories...");
            const res = await fetchCourseCategories();
            console.log("Fetched categories:", res);
            if (Array.isArray(res)) {
                setSubLinks(res);
            } else {
                console.error("Expected categories to be an array, got:", res);
                setSubLinks([]);
            }
        } catch (error) {
            console.error("Could not fetch the category list:", error);
            setSubLinks([]);
        } finally {
            setLoading(false);
        }
    }

    // console.log('data of store  = ', useSelector((state)=> state))


    useEffect(() => {
        fetchSublinks();
    }, [])


    // when user click Navbar link then it will hold yellow color
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar 
    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    },)

    // control Navbar
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY)
                setShowNavbar('hide')

            else setShowNavbar('show')
        }

        else setShowNavbar('top')

        setLastScrollY(window.scrollY);
    }



    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${showNavbar === 'hide' ? '-translate-y-full' : 'translate-y-0'
            } ${lastScrollY > 20 ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-slate-800' : 'bg-transparent border-b border-transparent'
            }`}>
            <div className='flex w-11/12 max-w-maxContent mx-auto items-center justify-between h-16 md:h-20'>
                {/* logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={studyNotionLogo} className="w-[45px] md:w-[60px] h-auto transition-transform duration-300 group-hover:scale-105" loading='lazy' alt="Logo" />
                    <span className="text-slate-800 dark:text-white text-sm md:text-base font-bold tracking-tight hidden sm:block delay-150 transition-colors">Astrivix <span className="text-[#2A86F7]">{"."}</span> in</span>
                </Link>

                {/* Nav Links - visible for only large devices*/}
                <ul className='hidden md:flex gap-x-8 text-slate-600 dark:text-slate-300 font-medium text-sm'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index} className="flex items-center">
                                {
                                    link.title === "Catalog" ? (
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 transition-colors duration-200 ${matchRoute("/catalog/:catalogName") || location.pathname === '/catalog'
                                                ? "text-[#2A86F7]"
                                                : "hover:text-[#2A86F7]"
                                                }`}
                                        >
                                            <p>{link.title}</p>
                                            <MdKeyboardArrowDown className="transition-transform duration-300 group-hover:rotate-180" size={18} />
                                            {/* drop down menu */}
                                            <div className="invisible absolute top-[150%] left-1/2 -translate-x-1/2 z-[1000] flex w-[260px]
                                                    flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-slate-100 dark:border-slate-700 p-3 text-slate-800 dark:text-gray-200 opacity-0 transition-all duration-300 group-hover:visible 
                                                    group-hover:translate-y-2 group-hover:opacity-100"
                                            >
                                                <div className="absolute left-[50%] -top-2 z-[100] h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white dark:bg-slate-800 border-l border-t border-slate-100 dark:border-slate-700"></div>
                                                <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 dark:bg-slate-800"></div>
                                                {loading ? (
                                                    <p className="text-center py-2">Loading categories...</p>
                                                ) : Array.isArray(subLinks) && subLinks.length > 0 ? (
                                                    <>
                                                        {subLinks.map((subLink, i) => (
                                                            <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="rounded-xl bg-transparent py-3 px-4 hover:bg-slate-50 hover:text-[#2A86F7] dark:hover:bg-slate-700/50 transition-colors duration-200"
                                                                key={i}
                                                            >
                                                                <p>{subLink.name}</p>
                                                            </Link>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <p className="text-center py-4 text-sm text-slate-500">No categories found</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`transition-colors duration-200 ${matchRoute(link?.path) ? "text-[#2A86F7] font-semibold" : "hover:text-[#2A86F7]"}`}>
                                                {link.title}
                                            </p>
                                        </Link>)
                                }
                            </li>
                        ))}
                </ul>




                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-2 md:gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative text-slate-600 dark:text-slate-300 hover:text-[#2A86F7] transition-colors duration-200">
                                <AiOutlineShoppingCart className="text-[1.6rem] md:text-[1.8rem]" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-[#FA5B5B] text-[9px] md:text-[10px] font-bold text-white shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <div className="hidden sm:flex items-center gap-x-3">
                                <Link to="/login">
                                    <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${matchRoute('/login') ? 'text-[#2A86F7] bg-blue-50 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300 hover:text-[#2A86F7] hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="px-5 py-2 rounded-full text-sm font-medium text-white bg-[#2A86F7] hover:bg-[#1f73db] shadow-md shadow-[#2A86F7]/25 hover:shadow-[#2A86F7]/40 transition-all duration-300 transform hover:-translate-y-[1px]">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )
                    }

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 ml-1 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-300 focus:outline-none flex items-center justify-center"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <FiSun size={20} className="hover:text-yellow-400 transition-colors" /> : <FiMoon size={20} className="hover:text-blue-500 transition-colors" />}
                    </button>

                    {/* for large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* for small devices */}
                    {token !== null && <MobileProfileDropDown />}

                    {/* Mobile Menu Toggle for logged out users */}
                    {token === null && (
                        <button
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    )}

                </div>
            </div>

            {/* Mobile Menu Panel */}
            {token === null && mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl z-[90] py-4 px-6 animate-in slide-in-from-top-4 duration-300">
                    <ul className="flex flex-col gap-y-4 text-slate-700 dark:text-slate-300 font-medium">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="border-b border-slate-50 dark:border-slate-800/50 pb-2">
                                {link.title === "Catalog" ? (
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-[#2A86F7] text-xs font-bold uppercase tracking-wider">Catalog</p>
                                        <div className="flex flex-col gap-y-3 pl-2">
                                            {loading ? (
                                                <p className="text-xs">Loading...</p>
                                            ) : subLinks.length > 0 ? (
                                                subLinks.map((sub, i) => (
                                                    <Link
                                                        key={i}
                                                        to={`/catalog/${sub.name.split(" ").join("-").toLowerCase()}`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="text-sm hover:text-[#2A86F7]"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-xs">No categories found</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link.path} onClick={() => setMobileMenuOpen(false)} className="flex justify-between items-center">
                                        {link.title}
                                        <span className="text-slate-400">→</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                        <div className="flex flex-col gap-y-3 pt-4">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full py-3 rounded-xl bg-[#2A86F7] text-white font-semibold shadow-lg shadow-blue-500/20">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
