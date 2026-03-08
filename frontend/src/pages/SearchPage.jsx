import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchColleges, getColleges } from '../services/api';
import { MapPin, IndianRupee, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('query') || '';

    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                let data = [];
                if (initialQuery) {
                    data = await searchColleges(initialQuery);
                } else {
                    data = await getColleges(); // fetch all if no query
                }
                setColleges(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch colleges. Is the backend running?');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [initialQuery]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                {initialQuery ? `Search Results for "${initialQuery}"` : "All Colleges"}
            </h2>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((skel) => (
                        <div key={skel} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-red-50 rounded-2xl">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                </div>
            ) : colleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {colleges.map((college, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={college._id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group"
                        >
                            <div className="h-48 relative overflow-hidden group">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(college.name + " " + college.location)}&output=embed&z=15&t=m&iwloc=near`}
                                    allowFullScreen
                                    className="absolute inset-0 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 contrast-[1.1] scale-[1.02] group-hover:scale-110"
                                    title={college.name}
                                ></iframe>
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none"></div>
                                {college.featured && <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">★ Featured</div>}
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{college.name}</h3>
                                <div className="flex items-center text-gray-500 mb-3 text-sm font-medium">
                                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                                    {college.location}
                                </div>

                                <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                            <IndianRupee className="w-4 h-4 mr-2 text-green-600" />
                                            <span className="font-semibold">{college.fees || 'Fees specific to courses'}</span>
                                        </div>
                                    </div>
                                    <Link to={`/college/${encodeURIComponent(college._id)}`} className="mt-4 block w-full text-center bg-gray-50 hover:bg-primary text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-xl transition-colors border border-gray-200 hover:border-transparent">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-xl font-medium">No colleges found matching "{initialQuery}"</p>
                    <Link to="/search" className="mt-4 inline-block text-primary font-semibold hover:underline">Clear Search</Link>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
