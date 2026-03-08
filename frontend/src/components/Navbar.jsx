import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 glass">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap text-primary">EduBot</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-white focus:ring-primary focus:border-primary shadow-sm"
                            placeholder="Search colleges, courses..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 md:flex-row md:mt-0">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-gray-600 rounded hover:text-primary md:p-0 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link to="/search" className="block py-2 px-3 text-gray-600 rounded hover:text-primary md:p-0 transition-colors">Find Colleges</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
