import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Contact from "./pages/Contact"


const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
};

export default App
