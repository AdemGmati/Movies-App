import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TvShows.css';
import { fetchTrendingTV } from '../services/tmdbApi';
import { searchTVShows } from '../services/tmdbApi';
import { formatDate } from '../utils/FormatDate';
import { getPageItems } from '../utils/GetPageItems';
import { getRatingColor } from '../utils/GetRatingColor';

/* ─── Helpers ────────────────────────────────────────── */
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/300x450?text=No+Image';

/* ─── TMDB types ─────────────────────────────────────── */
interface TvShow {
    id: number;
    name: string;
    genre_ids: number[];
    vote_average: number;
    first_air_date: string;
    overview: string;
    poster_path: string | null;
}

const TvShows: React.FC = () => {
    const [shows, setShows] = useState<TvShow[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    /* Fetch on page change */
    useEffect(() => {
        setLoading(true);
        setError(null);

        const request = query.trim()
            ? searchTVShows(query, currentPage)
            : fetchTrendingTV(currentPage);

        request
            .then((data) => {
                const results: TvShow[] = data.results ?? [];
                setShows(results);
                setTotalPages(data.total_pages ?? 1);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load TV shows. Please try again later.');
            })
            .finally(() => setLoading(false));
    }, [currentPage, query]);


    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const pageItems = getPageItems(currentPage, totalPages);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="container">
                    <h1 className="hero-title">
                        Your Gateway to Movie <span className="hero-highlight">Magic</span>
                    </h1>
                    <p className="hero-subtitle">
                        Dive into the world of cinema with MovieWatch, where you can search and find
                        everything you want to watch. Your ultimate movie destination awaits!
                    </p>

                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search TV show you want..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="search-btn" aria-label="Search">
                            <Search className="search-icon" />
                        </button>
                    </div>
                </section>

                {/* States */}
                {loading && (
                    <p className="state-msg">Loading trending TV shows…</p>
                )}
                {error && (
                    <p className="state-msg state-error">{error}</p>
                )}
                {!loading && !error && shows.length === 0 && (
                    <p className="state-msg">No results found for "{query}".</p>
                )}

                {/* TV Show Grid */}
                {!loading && !error && shows.length > 0 && (
                    <section className="movies-section">
                        <div className="movies-grid">
                            {shows.map((show) => (
                                <div key={show.id} className="movie-card" onClick={() => navigate(`/tv/${show.id}`)}>
                                    {/* Poster */}
                                    <div className="card-poster-wrapper">
                                        <img
                                            // src/pages/TvShows.tsx
                                            src={
                                                show.poster_path
                                                    ? `${TMDB_IMAGE_BASE}${show.poster_path}`
                                                    : PLACEHOLDER_IMG
                                            }
                                            alt={show.name}
                                            className="card-poster"
                                        />
                                        <span className="genre-badge">TV Show</span>
                                    </div>

                                    {/* Info */}
                                    <div className="card-info">
                                        <div className="card-title-row">
                                            <h3 className="card-title">{show.name}</h3>
                                            <span
                                                className="rating-badge"
                                                style={{
                                                    backgroundColor: getRatingColor(
                                                        parseFloat(show.vote_average.toFixed(1))
                                                    ),
                                                }}
                                            >
                                                {show.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                        <p className="card-date">{formatDate(show.first_air_date)}</p>
                                        <p className="card-desc">
                                            {show.overview
                                                ? show.overview.length > 120
                                                    ? show.overview.slice(0, 120) + '…'
                                                    : show.overview
                                                : 'No description available.'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── Pagination ── */}
                        {!query && totalPages > 1 && (
                            <nav className="pagination-bar" aria-label="Page navigation">
                                {pageItems.map((item, idx) =>
                                    item === '…' ? (
                                        <span key={`ellipsis-${idx}`} className="page-ellipsis">
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={item}
                                            className={`page-btn${item === currentPage ? ' page-btn--active' : ''}`}
                                            onClick={() => goToPage(item as number)}
                                            aria-label={`Go to page ${item}`}
                                            aria-current={item === currentPage ? 'page' : undefined}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            </nav>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default TvShows;