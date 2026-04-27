import React from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TvShows.css';
import film1 from '../assets/film1.png';
import film2 from '../assets/film2.png';
import film3 from '../assets/film3.png';
import film4 from '../assets/film4.png';

const movies = [
    {
        id: 1,
        title: 'SpiderMan: Across The Spider...',
        genre: 'Fantasy',
        rating: 8.7,
        date: 'June 2, 2023',
        description: 'In an attempt to curb this Spot, a scientist from harnessing the power of the multiverse...',
        poster: film1,
    },
    {
        id: 2,
        title: 'Guardians of the Galaxy Vol. 3',
        genre: 'Fantasy',
        rating: 7.9,
        date: 'May 5, 2023',
        description: 'Still reeling from the loss of Gamora, Peter Quill rally his team to defend the universe and...',
        poster: film2,
    },
    {
        id: 3,
        title: 'Avatar: The Way of Water',
        genre: 'Fantasy',
        rating: 7.6,
        date: 'December 14, 2022',
        description: 'Jake Sully and Ney\'ti have formed a family and are doing everything to stay together...',
        poster: film3,
    },
    {
        id: 4,
        title: 'Venom: Let There Be Carnage',
        genre: 'Fantasy',
        rating: 5.9,
        date: 'October 1, 2021',
        description: 'Eddie Brock tries to reignite his failing career by interviewing a serial killer Cletus Kasod...',
        poster: film4,
    },
];

const getRatingColor = (rating: number): string => {
    if (rating >= 8) return '#1db954';
    if (rating >= 7) return '#26a8c4';
    if (rating >= 6) return '#f5a623';
    return '#e05c2a';
};

const TvShows: React.FC = () => {
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
                        Dive into the world of cinema with MovieWatch, where you can search and find everything you want to watch. Your ultimate movie destination awaits!
                    </p>

                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search movie you want..."
                        />
                        <button className="search-btn" aria-label="Search">
                            <Search className="search-icon" />
                        </button>
                    </div>
                </section>

                {/* Movie Grid */}
                <section className="movies-section">
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie-card">
                                {/* Poster */}
                                <div className="card-poster-wrapper">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="card-poster"
                                    />
                                    <span className="genre-badge">{movie.genre}</span>
                                </div>

                                {/* Info */}
                                <div className="card-info">
                                    <div className="card-title-row">
                                        <h3 className="card-title">{movie.title}</h3>
                                        <span
                                            className="rating-badge"
                                            style={{ backgroundColor: getRatingColor(movie.rating) }}
                                        >
                                            {movie.rating}
                                        </span>
                                    </div>
                                    <p className="card-date">{movie.date}</p>
                                    <p className="card-desc">{movie.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default TvShows;