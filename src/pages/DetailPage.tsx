import { ArrowLeft, Play, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './DetailPage.css';
import poster from '../assets/film1.png';


function DetailPage() {
    return (
        <div>
            <Navbar />
            <main>
                <div className="detail-container">
                    <div className="text-white flex justify-start items-center gap-2 cursor-pointer mb-25">
                        <ArrowLeft size={20} />
                        <span>Back Home</span>
                    </div>
                    <div className="flex justify-start items-start gap-10">
                        <div className="movie-poster">
                            <img src={poster} />
                        </div>
                        <div className="movie-info">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <span className="text-4xl font-bold font-serif">The Matrix</span>
                                    <span className="text-xs font-light ml-2">2016-2023</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">28 Comments</span>
                                    <Star />
                                </div>
                            </div>
                            <div className="font-light text-xs flex flex-col justify-start items-start gap-2 my-4">
                                <p>Genre: Historical drama</p>
                                <p>Time: 58m</p>
                                <p>Stars: Claire Foy, Olivia Colman, Matt Smith, Tobias Menzies</p>
                                <p>Created by: Peter Morgan</p>
                                <p>Network: Netflix</p>
                                <p>8.5</p>
                                <p>After the king's sudden death, Elizabeth's seemingly quiet life is rattled with personal
                                    trials and tribulations and the affairs of the state as she succeeds to
                                    the throne of the British monarchy.</p>
                            </div>
                            <div className="flex justify-start items-center gap-5">
                                <button className="flex justify-center items-center gap-2 bg-brand px-3 py-2 rounded-md text-base"><span><Play /></span>Watch Now </button>
                                <button className="flex justify-center items-center gap-2 bg-elevated px-3 py-2 rounded-md text-base">+ Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default DetailPage;
