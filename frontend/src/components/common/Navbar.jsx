import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="sticky top-0 w-full border-b border-border/40 bg-background/95 z-10 ">
                <div className="flex justify-between items-center lg:px-14 py-0  xs:px-2">
                    <img src={logo} alt="logo" className="w-28 h-auto" />

                    <div className="lg:hidden">
                        <button
                            className="text-gray-500 hover:text-foreground focus:outline-none px-6"
                            onClick={toggleMenu}
                        >
                            <svg className="w-5 h-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    {/* Desktop menu */}
                    <ul className="hidden lg:flex gap-5 text-sm text-gray-500 px-8 cursor-pointer items-center">
                        <li className="hover:text-foreground">
                            <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={'/jobseeker'}>Job Listing</NavLink>
                        </li>
                        <li className="hover:text-foreground">
                            <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={'/jobseeker/applications'}>Applications</NavLink>
                        </li>
                        <li>
                            <UserButton />
                        </li>
                    </ul>
                </div>

                {/* Mobile menu */}
                <div className={`lg:hidden ${isMenuOpen ? 'fixed' : 'hidden'} top-12 left-0 w-full bg-background/95 border-t border-border/40`}>
                    <ul className="flex flex-col items-start p-5 space-y-4 text-gray-500">
                        <li className="hover:text-foreground">
                            <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={'/jobseeker'}>Job Listing</NavLink>
                        </li>
                        <li className="hover:text-foreground">
                            <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={'/jobseeker/applications'}>Applications</NavLink>
                        </li>
                        <li>
                            <UserButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;