import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollegeById } from '../services/api';
import { MapPin, IndianRupee, Globe, Phone, Mail, Award, CheckCircle } from 'lucide-react';

const CollegeDetails = () => {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollege = async () => {
            try {
                const data = await getCollegeById(id);
                setCollege(data);
                setError(null);
            } catch (err) {
                setError('Failed to load college details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCollege();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse">
                <div className="h-64 bg-gray-200 rounded-3xl mb-8"></div>
                <div className="h-10 w-1/2 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 w-1/4 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    if (error || !college) {
        return (
            <div className="text-center py-20 bg-red-50 rounded-2xl max-w-4xl mx-auto mt-20 border border-red-100">
                <p className="text-red-500 text-lg font-medium">{error || 'College not found'}</p>
                <Link to="/search" className="mt-6 inline-block text-primary font-bold hover:underline">Back to Search</Link>
            </div>
        );
    }

    const getHeroImage = (name) => {
        const images = [
            "1541339907198-e08756ebafe3",
            "1523050853558-c77243c9744f",
            "1562774053-701939374585",
            "1592280771190-3e2e4d571952",
            "1523580494863-6f3031224c94"
        ];
        const index = name.length % images.length;
        return `https://images.unsplash.com/photo-${images[index]}?auto=format&fit=crop&w=1200&q=80`;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 mt-12 bg-gray-50">
            {/* Header / Hero */}
            <div
                className="relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-end mb-12 border-4 border-white"
                style={{
                    backgroundImage: `url(${getHeroImage(college.name)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                {college.featured && <span className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 font-extrabold tracking-wide px-5 py-2.5 rounded-full shadow-lg text-sm z-20">★ Featured Institution</span>}
                <div className="relative z-10 p-8 md:p-14 w-full text-white">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-2xl">{college.name}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-semibold">
                        <span className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-200" /> {college.location}</span>
                        {college.ranking && <span className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-md"><Award className="w-5 h-5 mr-2 text-yellow-400" /> Rank: #{college.ranking}</span>}
                        {college.website && <span className="flex items-center"><Globe className="w-5 h-5 mr-2 text-green-300" /> <a href={college.website.startsWith('http') ? college.website : `https://${college.website}`} target="_blank" rel="noreferrer" className="hover:underline">{college.website}</a></span>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 bg-blue-50 w-40 h-40 rounded-full blur-3xl opacity-50"></div>
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3"><CheckCircle className="text-primary w-7 h-7" /> About Institution</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{college.description || "A premier institution dedicated to academic excellence and holistic development. Offering state-of-the-art facilities and a dynamic learning environment."}</p>
                    </section>

                    <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-8 flex items-center gap-3"><Award className="text-primary w-7 h-7" /> Courses Offered</h2>
                        {college.courses && college.courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {college.courses.map(course => (
                                    <div key={course._id} className="p-6 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                                        <h3 className="font-extrabold text-lg text-gray-800 group-hover:text-primary transition-colors mb-4">{course.course_name}</h3>
                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center bg-white p-2 rounded-lg border border-gray-100"><span className="font-bold text-gray-800 w-24">Duration:</span> {course.duration}</div>
                                            <div className="flex items-center bg-white p-2 rounded-lg border border-gray-100"><span className="font-bold text-gray-800 w-24">Fees:</span> {typeof course.fees === 'number' ? `₹${course.fees.toLocaleString()}/yr` : course.fees}</div>
                                            <div className="flex items-start bg-white p-2 rounded-lg border border-gray-100"><span className="font-bold text-gray-800 w-24 shrink-0">Eligibility:</span> <span className="line-clamp-2">{course.eligibility}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium text-lg">Detailed course info will be updated soon.</p>
                            </div>
                        )}
                    </section>

                    <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 overflow-hidden group">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3"><MapPin className="text-primary w-7 h-7" /> Campus Location</h2>
                        <div className="h-96 w-full rounded-3xl overflow-hidden border-4 border-gray-50 shadow-inner relative">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(college.name + " " + college.location)}&output=embed&z=16&t=m&iwloc=near`}
                                allowFullScreen
                                title="Campus Map"
                                className="grayscale-[0.1] contrast-[1.05]"
                            ></iframe>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50 animate-bounce-slow">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-gray-700 pr-2">Visit Campus</span>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 font-medium px-2">
                            <span>Interactive Map Preview</span>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(college.name + " " + college.location)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                            >
                                Open in Google Maps <MapPin className="w-3 h-3" />
                            </a>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-[2rem] p-8 shadow-xl relative overflow-hidden text-white">
                        <div className="absolute -bottom-10 -right-10 opacity-20"><IndianRupee className="w-48 h-48" /></div>
                        <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">Fee Structure Highlight</h3>
                        <div className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl backdrop-blur-md relative z-10 border border-white/20">
                            <div className="bg-green-400 p-3 rounded-xl shadow-inner">
                                <IndianRupee className="text-green-900 w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-100 uppercase font-bold tracking-widest mb-1">Average Range</p>
                                <p className="text-2xl font-black">{college.fees || 'TBD'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">Contact Admission</h3>
                        <div className="space-y-4">
                            <a href={`tel:${college.contact || '+910000000000'}`} className="flex items-center gap-4 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                                <div className="bg-white p-2 rounded-full shadow-sm group-hover:text-primary"><Phone className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" /></div>
                                <span className="font-semibold text-lg">{college.contact || '+91 99999 88888'}</span>
                            </a>
                            <a href={`mailto:contact@${college.website ? college.website.replace('www.', '') : 'college.edu'}`} className="flex items-center gap-4 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                                <div className="bg-white p-2 rounded-full shadow-sm group-hover:text-primary"><Mail className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" /></div>
                                <span className="font-semibold truncate">admin@{college.website ? college.website.replace('www.', '') : 'college.edu'}</span>
                            </a>
                        </div>
                        <button className="w-full mt-8 bg-gray-900 hover:bg-primary text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg flex justify-center items-center gap-2">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;
