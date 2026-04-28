import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TvShows.css';

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

/* ─── Helpers ────────────────────────────────────────── */
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG = 'https://via.placeholder.com/300x450?text=No+Image';
const TMDB_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWUxYTBhMWY2MGFhNGNlYjdhNjgxZDAzNjg5MzQwMCIsIm5iZiI6MTc3NDk4MTIxNS40ODg5OTk4LCJzdWIiOiI2OWNjMTA1ZmNiNTY0OGEwZDI0YzAzYjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bSDJFCPvSW8GwbN8haZ_CYEvjKSi6qPucsckQA-ai9A';

const getRatingColor = (rating: number): string => {
    if (rating >= 8) return '#1db954';
    if (rating >= 7) return '#26a8c4';
    if (rating >= 6) return '#f5a623';
    return '#e05c2a';
};

const formatDate = (dateStr: string): string => {
    if (!dateStr) return 'Unknown';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

/* ─── Pagination helper ──────────────────────────────── */
/**
 * Returns the page numbers / ellipsis items to render.
 * Always shows: first 7, then "…", then last 3  (matching the screenshot).
 * When on a page near the end the window shifts.
 */
const getPageItems = (current: number, total: number): (number | '…')[] => {
    if (total <= 10) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const left: (number | '…')[] = [1, 2, 3, 4, 5, 6, 7];
    const right: (number | '…')[] = [total - 2, total - 1, total];

    // If current page is in the "right tail" area, show a continuous block
    if (current >= total - 4) {
        const merged = Array.from(new Set([...left, current - 1, current, current + 1, ...right].filter(n => n >= 1 && n <= total)));
        const result: (number | '…')[] = [];
        merged.sort((a, b) => a - b).forEach((n, i, arr) => {
            if (i > 0 && n - (arr[i - 1] as number) > 1) result.push('…');
            result.push(n);
        });
        return result;
    }

    return [...left, '…', ...right];
};

/* ─── Component ──────────────────────────────────────── */
const TvShows: React.FC = () => {
    const [shows, setShows] = useState<TvShow[]>([]);
    const [filtered, setFiltered] = useState<TvShow[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    /* Fetch on page change */
    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .request({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/trending/tv/day',
                params: { language: 'en-US', page: currentPage },
                headers: { accept: 'application/json', Authorization: TMDB_TOKEN },
            })
            .then((res) => {
                const results: TvShow[] = res.data.results ?? [];
                setShows(results);
                setFiltered(results);
                setTotalPages(res.data.total_pages ?? 1);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load TV shows. Please try again later.');
            })
            .finally(() => setLoading(false));
    }, [currentPage]);

    /* Live search filter (client-side within the current page) */
    useEffect(() => {
        const q = query.toLowerCase().trim();
        setFiltered(q ? shows.filter((s) => s.name.toLowerCase().includes(q)) : shows);
    }, [query, shows]);

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
                {!loading && !error && filtered.length === 0 && (
                    <p className="state-msg">No results found for "{query}".</p>
                )}

                {/* TV Show Grid */}
                {!loading && !error && filtered.length > 0 && (
                    <section className="movies-section">
                        <div className="movies-grid">
                            {filtered.map((show) => (
                                <div key={show.id} className="movie-card">
                                    {/* Poster */}
                                    <div className="card-poster-wrapper">
                                        <img
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