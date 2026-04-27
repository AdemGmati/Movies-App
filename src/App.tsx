import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Contact from "./pages/Contact"
import Subscription from "./pages/Subscription"
import TvShows from "./pages/TvShows"


const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="subscription" element={<Subscription />} />
      <Route path="/" element={<TvShows />} />
    </Routes>
  );
};

export default App
