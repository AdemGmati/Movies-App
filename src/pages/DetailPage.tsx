import { ArrowLeft, Play, Star, MessageSquare, MoreHorizontal, LayoutGrid } from "lucide-react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './DetailPage.css';
import poster from '../assets/film1.png';
import { fetchTVDetails, fetchTVReviews, fetchTVRecommendations } from '../services/tmdbApi';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tvData, setTvData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        Promise.all([
            fetchTVDetails(id),
            fetchTVReviews(id),
            fetchTVRecommendations(id),
        ]).then(([details, reviewsData, recsData]) => {
            setTvData(details);
            setReviews(reviewsData.results?.slice(0, 4) ?? []);
            setRecommendations(recsData.results?.slice(0, 4) ?? []);
        }).finally(() => setLoading(false));
    }, [id]);

    const posterSrc = tvData?.poster_path
        ? `${TMDB_IMAGE_BASE}${tvData.poster_path}`
        : poster;

    const title = tvData?.name ?? '—';
    const firstYear = tvData?.first_air_date?.slice(0, 4) ?? '';
    const lastYear = tvData?.last_air_date?.slice(0, 4) ?? '';
    const yearRange = firstYear ? (lastYear && lastYear !== firstYear ? `${firstYear}–${lastYear}` : firstYear) : '';
    const genres = tvData?.genres?.map((g: any) => g.name).join(', ') ?? '—';
    const runtime = tvData?.episode_run_time?.[0] ? `${tvData.episode_run_time[0]}m` : '—';
    const createdBy = tvData?.created_by?.map((c: any) => c.name).join(', ') || '—';
    const network = tvData?.networks?.[0]?.name ?? '—';
    const rating = tvData?.vote_average != null ? tvData.vote_average.toFixed(1) : '—';
    const overview = tvData?.overview ?? '';

    return (
        <div>
            <Navbar />
            <main className="detail-container">
                {/* detail container */}
                <div className="mb-20">
                    {/* back to home page */}
                    <div className="text-white flex justify-start items-center gap-2 cursor-pointer mb-18"
                        onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                        <span>Back Home</span>
                    </div>

                    {loading ? (
                        <p className="text-gray-400 text-sm">Loading...</p>
                    ) : (
                    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-10">
                        <div className="movie-poster">
                            <img src={posterSrc} alt={title} />
                        </div>
                        <div className="movie-info w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                                <div>
                                    <span className="text-2xl sm:text-4xl font-bold font-serif">{title}</span>
                                    {yearRange && (
                                        <span className="text-xs sm:text-sm font-light ml-2">{yearRange}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 self-start sm:self-auto">
                                    <span className="text-xs sm:text-sm">{tvData?.vote_count ?? 0} Votes</span>
                                    <Star size={16} />
                                </div>
                            </div>
                            <div className="font-light text-sm sm:text-base flex flex-col justify-start items-start gap-2 my-4">
                                <p><span className="font-medium text-gray-400">Genre:</span> {genres}</p>
                                <p><span className="font-medium text-gray-400">Time:</span> {runtime}</p>
                                {createdBy !== '—' && (
                                    <p><span className="font-medium text-gray-400">Created by:</span> {createdBy}</p>
                                )}
                                <p><span className="font-medium text-gray-400">Network:</span> {network}</p>
                                <p className="flex items-center gap-1 font-medium">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400"/> {rating}
                                </p>
                                {overview && (
                                    <p className="mt-2 text-gray-300 leading-relaxed">{overview}</p>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mt-6">
                                <button className="play-btn bg-brand w-full sm:w-auto"><span><Play size={20} /></span>Watch Now </button>
                                <button className="play-btn bg-elevated w-full sm:w-auto">+ Wishlist</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* reviews container */}
                <div className="mb-20">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="text-brand" />
                            <span className="text-2xl font-medium font-serif">Reviews</span>
                            <span className="text-xs">{reviews.length} Reviews</span>
                        </div>
                        <select className="bg-elevated px-3 py-2 rounded-md text-xs">
                            <option>Latest</option>
                            <option>Popular</option>
                        </select>
                    </div>
                    {/* review cards */}
                    {reviews.length === 0 ? (
                        <p className="text-gray-500 text-sm mt-8">No reviews yet.</p>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {reviews.map((review: any) => {
                            const starCount = Math.round((review.author_details?.rating ?? 0) / 2);
                            const date = review.created_at
                                ? new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : '';
                            return (
                            <div key={review.id} className="bg-elevated p-6 rounded-2xl flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={`star-${review.id}-${i}`}
                                                size={16}
                                                className={i < starCount ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}
                                            />
                                        ))}
                                    </div>
                                    <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-lg">{review.author}</span>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                                        {review.content}
                                    </p>
                                </div>
                                <div className="mt-auto pt-2">
                                    <span className="text-xs text-gray-400">{date && `Posted on ${date}`}</span>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    )}
                    <div className="flex justify-center mt-8 mb-4">
                        <button className="seemore-btn">See more</button>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <LayoutGrid className="text-brand fill-brand" size={28} />
                        <span className="text-3xl font-medium font-serif text-gray-200">Related Shows</span>
                    </div>
                    {recommendations.length === 0 ? (
                        <p className="text-gray-500 text-sm">No recommendations available.</p>
                    ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {recommendations.map((rec: any) => {
                            const recPoster = rec.poster_path
                                ? `${TMDB_IMAGE_BASE}${rec.poster_path}`
                                : poster;
                            const recGenre = rec.genre_ids?.[0] ? '' : '';
                            const recRating = rec.vote_average != null ? rec.vote_average.toFixed(1) : '—';
                            const recYear = rec.first_air_date?.slice(0, 4) ?? '';
                            return (
                            <div key={rec.id} className="bg-elevated p-4 rounded-2xl flex flex-col gap-3">
                                <div className="relative">
                                    <img src={recPoster} className="w-full h-auto rounded-xl object-cover aspect-[4/5]" alt={rec.name} />
                                    {recGenre && (
                                    <div className="absolute top-0 right-0 bg-[#0A0A0A] text-gray-400 text-[11px] px-3 py-1 rounded-tr-xl rounded-bl-xl border-l border-b border-[#1A1A1A]">
                                        {recGenre}
                                    </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-medium text-[#F9F9F9] text-[15px] truncate">{rec.name}</h3>
                                        <span className="bg-[#F5C518] text-black text-xs font-bold px-1.5 py-0.5 rounded">{recRating}</span>
                                    </div>
                                    {recYear && <span className="text-xs text-gray-400">{recYear}</span>}
                                    {rec.overview && (
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                                        {rec.overview}
                                    </p>
                                    )}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    )
}

export default DetailPage;
