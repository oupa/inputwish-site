import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { NewsPost } from '../types';
import { renderBlock } from '../components/Blocks';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function NewsIndex() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => { fetch('/data/news.json').then(r => r.json()).then(setNews); }, []);

  return (
    <div className="page fade-in">
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Updates</p>
          <h1>News</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="news-list">
            {news.map(post => (
              <div key={post.slug} className="news-item" onClick={() => navigate(`/news/${post.slug}`)}>
                <p className="news-item-date">{formatDate(post.date)}</p>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.content.slice(0, 180)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



export function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/news.json')
      .then(r => r.json())
      .then((ps: NewsPost[]) => setPost(ps.find(p => p.slug === slug) || null));
  }, [slug]);

  if (!post) return <div className="page" style={{ padding: '120px 24px', color: 'var(--text-muted)' }}>Loading…</div>;

  return (
    <div className="page fade-in">
      <div className="container">
        <div className="project-detail">
          <a className="project-detail-back" onClick={() => navigate('/news')} style={{ cursor: 'pointer' }}>
            ← Back to news
          </a>
          <p className="project-detail-year">{formatDate(post.date)}</p>
          <h1 style={{ marginTop: '12px' }}>{post.title}</h1>
          <div className="news-blocks">
            {(post.blocks ?? [{ type: 'paragraph' as const, text: post.content }]).map((block, i) =>
              renderBlock(block, i)
            )}
          </div>
          {post.images.length > 0 && (
            <div className="project-gallery">
              {post.images.map((src, i) => (
                <img key={i} src={src} alt={`${post.title} ${i + 1}`} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
