import React, { useState, useEffect } from 'react';
import './App.css';

// ── API Hook ────────────────────────────────────────────────────
function usePortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}

// ── Nav ─────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const links = ['Home', 'Skills', 'Projects', 'Experience', 'Contact'];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => setActive('Home')}>IA</span>
      <button className="nav-burger" onClick={() => setMenuOpen(m => !m)}>
        <span /><span /><span />
      </button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <button
              className={active === l ? 'active' : ''}
              onClick={() => { setActive(l); setMenuOpen(false); }}
            >{l}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero({ personal, setActive }) {
  if (!personal) return null;
  return (
    <section className="hero">
      <div className="hero-bg">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="hero-particle" style={{ '--i': i }} />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">{personal.name}</h1>
        <h2 className="hero-title">{personal.title}</h2>
        <p className="hero-sub">{personal.subtitle}</p>
        <p className="hero-summary">{personal.summary}</p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => setActive('Projects')}>View Projects</button>
          <button className="btn-outline" onClick={() => setActive('Contact')}>Get In Touch</button>
          <a className="btn-ghost" href={personal.portfolio} target="_blank" rel="noreferrer">
            Live Portfolio ↗
          </a>
        </div>
        <div className="hero-links">
          <a href={personal.github} target="_blank" rel="noreferrer" title="GitHub">
            <GithubIcon />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${personal.email}`} title="Email">
            <EmailIcon />
          </a>
        </div>
        <p className="hero-availability">🟢 {personal.availability}</p>
      </div>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────────
function Skills({ skills }) {
  if (!skills) return null;
  return (
    <section className="section">
      <h2 className="section-title">Skills</h2>
      <p className="section-sub">Technologies & tools I work with</p>
      <div className="skills-grid">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="skill-card">
            <h3 className="skill-cat">{cat}</h3>
            <ul>
              {items.map(s => (
                <li key={s} className="skill-item">
                  <span className="skill-dot" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────
function Projects({ projects }) {
  if (!projects) return null;
  return (
    <section className="section">
      <h2 className="section-title">Projects</h2>
      <p className="section-sub">Things I've built</p>
      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.name} className="project-card">
            <div className="project-header">
              <span className="project-badge">{p.highlight}</span>
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className="project-live">
                  Live ↗
                </a>
              )}
            </div>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.description}</p>
            <div className="project-stack">
              {p.stack.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Experience ───────────────────────────────────────────────────
function Experience({ experience, education }) {
  if (!experience) return null;
  return (
    <section className="section">
      <h2 className="section-title">Experience & Education</h2>
      <p className="section-sub">My professional journey</p>
      <div className="timeline">
        {experience.map((e, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-body">
              <span className="timeline-period">{e.period}</span>
              <h3 className="timeline-title">{e.title}</h3>
              <h4 className="timeline-company">{e.company}</h4>
              <ul className="timeline-points">
                {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
        {education.map((e, i) => (
          <div key={i} className="timeline-item edu">
            <div className="timeline-dot edu-dot" />
            <div className="timeline-body">
              <span className="timeline-period">{e.period}</span>
              <h3 className="timeline-title">{e.degree}</h3>
              <h4 className="timeline-company">{e.institution}</h4>
              <div className="edu-tags">
                {e.subjects.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────
function Contact({ personal }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ ok: true, msg: data.message });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ ok: false, msg: data.error });
      }
    } catch {
      setStatus({ ok: false, msg: 'Failed to send. Please email directly.' });
    }
    setSending(false);
  };

  if (!personal) return null;
  return (
    <section className="section">
      <h2 className="section-title">Contact</h2>
      <p className="section-sub">Let's work together</p>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-details">
            <div className="contact-item">
              <EmailIcon />
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>
            <div className="contact-item">
              <PhoneIcon />
              <span>{personal.phone}</span>
            </div>
            <div className="contact-item">
              <LocationIcon />
              <span>{personal.location}</span>
            </div>
            <div className="contact-item">
              <GithubIcon />
              <a href={personal.github} target="_blank" rel="noreferrer">{personal.github}</a>
            </div>
            <div className="contact-item">
              <LinkedinIcon />
              <a href={personal.linkedin} target="_blank" rel="noreferrer">{personal.linkedin}</a>
            </div>
          </div>
          <div className="availability-badge">
            <span className="pulse" />
            {personal.availability}
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell me about your project..."
              required
            />
          </div>
          {status && (
            <p className={`form-status ${status.ok ? 'ok' : 'err'}`}>{status.msg}</p>
          )}
          <button type="submit" className="btn-primary full" disabled={sending}>
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Icons ────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// ── App Root ──────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('Home');
  const { data, loading } = usePortfolio();

  if (loading) return (
    <div className="loader">
      <div className="loader-ring" />
      <p>Loading portfolio…</p>
    </div>
  );

  return (
    <div className="app">
      <Nav active={active} setActive={setActive} />
      <main>
        {active === 'Home'       && <Hero personal={data?.personal} setActive={setActive} />}
        {active === 'Skills'     && <Skills skills={data?.skills} />}
        {active === 'Projects'   && <Projects projects={data?.projects} />}
        {active === 'Experience' && <Experience experience={data?.experience} education={data?.education} />}
        {active === 'Contact'    && <Contact personal={data?.personal} />}
      </main>
      <footer className="footer">
        <p>Built with MERN Stack · Designed & Developed by Irfan Ahmed</p>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}
