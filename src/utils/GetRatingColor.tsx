export const getRatingColor = (rating: number): string => {
    if (rating >= 8) return '#1db954';
    if (rating >= 7) return '#26a8c4';
    if (rating >= 6) return '#f5a623';
    return '#e05c2a';
}