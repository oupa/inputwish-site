import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Project } from '../types';
import { renderBlock } from '../components/Blocks';

export function ProjectsIndex() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => { fetch('/data/projects.json').then(r => r.json()).then(setProjects); }, []);

  return (
    <div className="page fade-in">
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Work</p>
          <h1>Projects</h1>
          <p className="hero-sub">Games and interactive experiences made since 2003.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="projects-grid">
            {projects.map(p => (
              <div className="project-card" key={p.slug} onClick={() => navigate(`/projects/${p.slug}`)}>
                {p.images[0] && (
                  <div className="project-card-thumb">
                    <img src={p.images[0]} alt={p.title} loading="lazy" />
                  </div>
                )}
                <p className="project-card-year">{p.year}</p>
                <p className="project-card-title">{p.title}</p>
                {p.client && <p className="project-card-client">for {p.client}</p>}
                <div className="project-card-tags">
                  {p.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/projects.json')
      .then(r => r.json())
      .then((ps: Project[]) => setProject(ps.find(p => p.slug === slug) || null));
  }, [slug]);

  if (!project) return <div className="page" style={{ padding: '120px 24px', color: 'var(--text-muted)' }}>Loading…</div>;

  return (
    <div className="page fade-in">
      <div className="container">
        <div className="project-detail">
          <a className="project-detail-back" onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>
            ← Back to projects
          </a>
          <div className="project-detail-meta">
            <span className="project-detail-year">{project.year}</span>
            <span className="project-detail-platforms">{project.platforms.join(' · ')}</span>
            {project.client && <span className="project-detail-platforms">Client: {project.client}</span>}
          </div>
          <h1>{project.title}</h1>
          <div className="news-blocks" style={{ marginBottom: '32px' }}>
            {(project.blocks ?? [{ type: 'paragraph' as const, text: project.description }]).map((b, i) => renderBlock(b, i))}
          </div>
          <div className="project-card-tags" style={{ marginBottom: '48px' }}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          {project.images.length > 0 && (
            <div className="project-gallery">
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
