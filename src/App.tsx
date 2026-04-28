import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Nav';
import Home from './pages/Home';
import { ProjectsIndex, ProjectDetail } from './pages/Projects';
import { NewsIndex, NewsDetail } from './pages/News';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} Inputwish s.r.o. — Prague</p>
        <p className="footer-copy">Independent game studio since 2003</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/news" element={<NewsIndex />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
