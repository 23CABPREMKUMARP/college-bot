import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 flex items-center justify-center min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-tight leading-tight"
                    >
                        Find Your Dream College <br /> With AI Precision
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover top colleges, compare fee structures, and get instant answers from our AI admission assistant. Your future starts here.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onSubmit={handleSearch}
                        className="relative max-w-3xl mx-auto glass rounded-full shadow-2xl p-2 flex items-center focus-within:ring-4 ring-primary/20 transition-all border border-white/40"
                    >
                        <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none">
                            <Search className="w-7 h-7 text-primary/70" />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-transparent border-none py-5 ps-16 pe-4 text-gray-800 text-lg md:text-xl focus:ring-0 focus:outline-none placeholder-gray-400 font-medium outline-none"
                            placeholder="Search by college name, course, or location..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 text-lg">
                            Search
                        </button>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-16 flex justify-center gap-6 flex-wrap"
                    >
                        <div className="flex items-center gap-3 text-gray-700 font-semibold bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/50 hover:bg-white transition-colors cursor-pointer">
                            <div className="bg-primary/10 p-2 rounded-full"><MapPin className="text-primary w-5 h-5" /></div>
                            Location Based
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 font-semibold bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/50 hover:bg-white transition-colors cursor-pointer">
                            <div className="bg-secondary/10 p-2 rounded-full"><BookOpen className="text-secondary w-5 h-5" /></div>
                            10k+ Courses
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 font-semibold bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/50 hover:bg-white transition-colors cursor-pointer">
                            <div className="bg-indigo-500/10 p-2 rounded-full"><Award className="text-indigo-500 w-5 h-5" /></div>
                            Top Rankings
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
