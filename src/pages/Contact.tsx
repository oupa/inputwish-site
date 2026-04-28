import { useEffect, useState } from 'react';
import type { Contact } from '../types';

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => { fetch('/data/contact.json').then(r => r.json()).then(setContact); }, []);

  return (
    <div className="page fade-in">
      <div className="container">
        <div className="contact-page">
          <p className="hero-eyebrow" style={{ marginBottom: '40px' }}>Get in touch</p>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 300, letterSpacing: '-.03em', marginBottom: '16px' }}>
            Let's talk.
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '64px', lineHeight: 1.6 }}>
            Got a project in mind, a question, or just want to say hi — we're easy to reach.
          </p>
          {contact && (
            <>
              <div className="contact-group">
                <p className="contact-label">Address</p>
                <p className="contact-value">
                  <strong>{contact.company}</strong><br />
                  {contact.address.map((line, i) => <span key={i}>{line}<br /></span>)}
                </p>
              </div>
              <div className="contact-group">
                <p className="contact-label">Email</p>
                <p className="contact-value">
                  Business: <a href={`mailto:${contact.email.business}`}>{contact.email.business}</a><br />
                  Support: <a href={`mailto:${contact.email.support}`}>{contact.email.support}</a>
                </p>
              </div>
              <div className="contact-group">
                <p className="contact-label">Company details</p>
                <p className="contact-value">
                  ID: {contact.legal.id}<br />
                  VAT: {contact.legal.vatId}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
