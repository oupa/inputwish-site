import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project, NewsPost } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/projects.json').then(r => r.json()).then(setProjects);
    fetch('/data/news.json').then(r => r.json()).then(setNews);
  }, []);

  const featured = projects.slice(0, 6);

  return (
    <div className="page fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Independent Game Studio · Prague</p>
          <h1>
            Twenty years of games.<br />
            <em>Zero plans to stop.</em>
          </h1>
          <p className="hero-sub">
            We're a small studio in Prague making games we'd actually want to play —
            from award-winning advergames to arcade racers on Nintendo Switch and iOS.
          </p>
          <div className="hero-meta">
            <div>
              <p className="hero-stat-label">Founded</p>
              <p className="hero-stat-value">2003</p>
            </div>
            <div>
              <p className="hero-stat-label">Projects</p>
              <p className="hero-stat-value">{projects.length || '11'}+</p>
            </div>
            <div>
              <p className="hero-stat-label">Location</p>
              <p className="hero-stat-value" style={{ fontSize: '18px', paddingTop: '6px' }}>Prague</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">Selected Projects</span>
            <a className="section-link" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>
              All projects →
            </a>
          </div>
          <div className="projects-grid">
            {featured.map(p => (
              <ProjectCard key={p.slug} project={p} onClick={() => navigate(`/projects/${p.slug}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">Latest News</span>
            <a className="section-link" onClick={() => navigate('/news')} style={{ cursor: 'pointer' }}>
              All news →
            </a>
          </div>
          <div className="news-list">
            {news.slice(0, 4).map(post => (
              <div key={post.slug} className="news-item" onClick={() => navigate(`/news/${post.slug}`)}>
                <p className="news-item-date">{formatDate(post.date)}</p>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.content.slice(0, 160)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project: p, onClick }: { project: Project; onClick: () => void }) {
  const thumb = p.images[0];
  return (
    <div className="project-card" onClick={onClick}>
      {thumb && (
        <div className="project-card-thumb">
          <img src={thumb} alt={p.title} loading="lazy" />
        </div>
      )}
      <p className="project-card-year">{p.year}</p>
      <p className="project-card-title">{p.title}</p>
      {p.client && <p className="project-card-client">for {p.client}</p>}
      <div className="project-card-tags">
        {p.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
