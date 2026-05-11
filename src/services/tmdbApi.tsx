import axios from 'axios';


const TMDB_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWUxYTBhMWY2MGFhNGNlYjdhNjgxZDAzNjg5MzQwMCIsIm5iZiI6MTc3NDk4MTIxNS40ODg5OTk4LCJzdWIiOiI2OWNjMTA1ZmNiNTY0OGEwZDI0YzAzYjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bSDJFCPvSW8GwbN8haZ_CYEvjKSi6qPucsckQA-ai9A';


export const fetchTrendingTV = async (page: number) => {
    const res = await axios.request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/tv/day',
        params: {
            language: 'en-US',
            page,
        },
        headers: {
            accept: 'application/json',
            Authorization: TMDB_TOKEN,
        },
    });

    return res.data;
};

export const searchTVShows = async (
    query: string,
    page: number
) => {
    const res = await axios.request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/tv',
        params: {
            query,
            language: 'en-US',
            page,
        },
        headers: {
            accept: 'application/json',
            Authorization: TMDB_TOKEN,
        },
    });

    return res.data;
};

export const fetchTVDetails = async (id: string) => {
    const res = await axios.request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}`,
        params: {
            language: 'en-US',
        },
        headers: {
            accept: 'application/json',
            Authorization: TMDB_TOKEN,
        },
    });

    return res.data;
};

export const fetchTVReviews = async (id: string) => {
    const res = await axios.request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/reviews`,
        params: { language: 'en-US' },
        headers: {
            accept: 'application/json',
            Authorization: TMDB_TOKEN,
        },
    });
    return res.data;
};

export const fetchTVRecommendations = async (id: string) => {
    const res = await axios.request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/recommendations`,
        params: { language: 'en-US' },
        headers: {
            accept: 'application/json',
            Authorization: TMDB_TOKEN,
        },
    });
    return res.data;
};