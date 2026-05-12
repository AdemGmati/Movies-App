import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Contact from "./pages/Contact"
import Subscription from "./pages/Subscription"
import TvShows from "./pages/TvShows"
import DetailPage from "./pages/DetailPage"
import ReviewPage from "./pages/ReviewPage"


const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="subscription" element={<Subscription />} />
      <Route path="/" element={<TvShows />} />
      <Route path="tv/:id" element={<DetailPage />} />
      <Route path="tv/:id/reviews" element={<ReviewPage />} />
    </Routes>
  );
};

export default App
