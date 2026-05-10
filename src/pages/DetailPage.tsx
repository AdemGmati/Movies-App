import { ArrowLeft, Play, Star, MessageSquare, MoreHorizontal, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './DetailPage.css';
import poster from '../assets/film1.png';


function DetailPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <main className="detail-container">
                {/* detail container */}
                <div className="border-2 border-red-500 mb-20">
                    {/* back to home page */}
                    <div className="text-white flex justify-start items-center gap-2 cursor-pointer mb-25"
                        onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                        <span>Back Home</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-10">
                        <div className="movie-poster w-full md:w-auto flex justify-center shrink-0">
                            <img src={poster} className="object-cover" />
                        </div>
                        <div className="movie-info w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                                <div>
                                    <span className="text-2xl sm:text-4xl font-bold font-serif">The Matrix</span>
                                    <span className="text-xs sm:text-sm font-light ml-2">2016-2023</span>
                                </div>
                                <div className="flex items-center gap-1 self-start sm:self-auto">
                                    <span className="text-xs sm:text-sm">28 Comments</span>
                                    <Star size={16} />
                                </div>
                            </div>
                            <div className="font-light text-sm sm:text-base flex flex-col justify-start items-start gap-2 my-4">
                                <p><span className="font-medium text-gray-400">Genre:</span> Historical drama</p>
                                <p><span className="font-medium text-gray-400">Time:</span> 58m</p>
                                <p><span className="font-medium text-gray-400">Stars:</span> Claire Foy, Olivia Colman, Matt Smith, Tobias Menzies</p>
                                <p><span className="font-medium text-gray-400">Created by:</span> Peter Morgan</p>
                                <p><span className="font-medium text-gray-400">Network:</span> Netflix</p>
                                <p className="flex items-center gap-1 font-medium"><Star size={16} className="text-yellow-400 fill-yellow-400"/> 8.5</p>
                                <p className="mt-2 text-gray-300 leading-relaxed">After the king's sudden death, Elizabeth's seemingly quiet life is rattled with personal
                                    trials and tribulations and the affairs of the state as she succeeds to
                                    the throne of the British monarchy.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mt-6">
                                <button className="play-btn bg-brand w-full sm:w-auto"><span><Play size={20} /></span>Watch Now </button>
                                <button className="play-btn bg-elevated w-full sm:w-auto">+ Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* comments container */}
                <div className="border-2 border-green-500 mb-20">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="text-brand" />
                            <span className="text-2xl font-medium font-serif">Comments</span>
                            <span className="text-xs">28 Comments</span>
                        </div>
                        <select className="bg-elevated px-3 py-2 rounded-md text-xs">
                            <option>Latest</option>
                            <option>Popular</option>
                        </select>
                    </div>
                    {/* comments card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={`comment-${i}`} className="bg-elevated p-6 rounded-2xl flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={`c1-star-${i}`} className="fill-yellow-500 text-yellow-500" size={16} />
                                        ))}
                                    </div>
                                    <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-lg">Samantha D.</span>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        "The Crown" is seriously addictive! The drama, the history, the scandals—it's all so captivating. And the cast? Absolutely brilliant! Can't get enough of this royal rollercoaster!"
                                    </p>
                                </div>
                                <div className="mt-auto pt-2">
                                    <span className="text-xs text-gray-400">Posted on August 14, 2023</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 mb-4">
                        <button className="seemore-btn">See more</button>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mb-20 border-2 border-blue-500">
                    <div className="flex items-center gap-3 mb-6">
                        <LayoutGrid className="text-brand fill-brand" size={28} />
                        <span className="text-3xl font-medium font-serif text-gray-200">Related movies</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={`related-${i}`} className="bg-elevated p-4 rounded-2xl flex flex-col gap-3">
                                <div className="relative">
                                    <img src={poster} className="w-full h-auto rounded-xl object-cover aspect-[4/5]" alt="Related Movie" />
                                    <div className="absolute top-0 right-0 bg-[#0A0A0A] text-gray-400 text-[11px] px-3 py-1 rounded-tr-xl rounded-bl-xl border-l border-b border-[#1A1A1A]">
                                        Fantasy
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-medium text-[#F9F9F9] text-[15px] truncate">SpiderMan: Across The Spider...</h3>
                                        <span className="bg-[#F5C518] text-black text-xs font-bold px-1.5 py-0.5 rounded">8.7</span>
                                    </div>
                                    <span className="text-xs text-gray-400">June 2, 2023</span>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                                        In an attempt to curb the Spot, a scientist, from harnessing the power of the multiverse...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    )
}

export default DetailPage;
