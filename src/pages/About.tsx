import { useEffect, useState } from 'react';
import type { About } from '../types';

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  useEffect(() => { fetch('/data/about.json').then(r => r.json()).then(setAbout); }, []);

  return (
    <div className="page fade-in">
      <div className="container">
        <div className="about-page">
          <p className="hero-eyebrow" style={{ marginBottom: '40px' }}>Who we are</p>
          {about && (
            <>
              <blockquote>{about.headline}</blockquote>
              <p>{about.body}</p>
              <p>
                We are an independent studio based in <strong>{about.location}</strong>, operating
                since <strong>{about.founded}</strong>. Small team, big ambitions.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
