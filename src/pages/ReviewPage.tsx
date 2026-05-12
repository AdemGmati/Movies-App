import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchTVReviews, fetchTVDetails } from '../services/tmdbApi';

function ReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<any[]>([]);
    const [showTitle, setShowTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        Promise.all([fetchTVReviews(id), fetchTVDetails(id)])
            .then(([reviewsData, details]) => {
                setReviews(reviewsData.results ?? []);
                setShowTitle(details?.name ?? '');
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-text">
            <Navbar />

            <main className="mx-auto px-4 max-w-[1200px] w-full pt-6">

                {/* Go Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text bg-transparent border-none cursor-pointer text-sm mb-10 hover:text-muted transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Go Back</span>
                </button>

                {/* Heading */}
                <div className="flex items-center gap-3 mb-8">
                    <MessageSquare size={22} className="text-brand" />
                    <h1 className="text-2xl sm:text-3xl font-semibold font-serif m-0">
                        {showTitle ? `${showTitle} — Reviews` : 'Reviews'}
                    </h1>
                    {!loading && (
                        <span className="text-xs text-muted">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </span>
                    )}
                </div>

                {/* Content */}
                {loading ? (
                    <p className="text-muted text-sm">Loading reviews…</p>
                ) : reviews.length === 0 ? (
                    <p className="text-muted text-sm">No reviews available for this title.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {reviews.map((review: any) => {
                            const starCount = Math.round((review.author_details?.rating ?? 0) / 2);
                            const date = review.created_at
                                ? new Date(review.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : '';
                            const rawAvatarPath = review.author_details?.avatar_path;
                            const normalizedAvatarPath = rawAvatarPath?.startsWith('/http')
                                ? rawAvatarPath.slice(1)
                                : rawAvatarPath;
                            const avatarUrl = normalizedAvatarPath
                                ? normalizedAvatarPath.startsWith('http')
                                    ? normalizedAvatarPath
                                    : `https://image.tmdb.org/t/p/w45${normalizedAvatarPath}`
                                : null;

                            return (
                                <div
                                    key={review.id}
                                    className="bg-elevated rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
                                >
                                    {/* Author row */}
                                    <div className="flex items-center gap-3">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={review.author}
                                                className="w-10 h-10 rounded-full object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-bold text-base shrink-0 text-text">
                                                {review.author?.[0]?.toUpperCase() ?? '?'}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base m-0">{review.author}</p>
                                            {date && (
                                                <p className="text-xs text-muted m-0">Posted on {date}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={15}
                                                className={i < starCount ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}
                                            />
                                        ))}
                                    </div>

                                    {/* Review content */}
                                    <p className="text-sm sm:text-base text-muted leading-relaxed m-0">
                                        {review.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default ReviewPage;
