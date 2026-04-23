import React, { useState, useEffect } from 'react';
import './App.css';
import './Admin.css';
const API = 'https://my-portfolio-backend-2ixh.onrender.com';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const auth        = getAuth(firebaseApp);
const provider    = new GoogleAuthProvider();
const ADMIN_EMAIL = 'irfanahmed9400265514@gmail.com';
const ADMIN_TOKEN = 'irfan-admin-secret';
const COUNTRY_CODES = [
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+1',   flag: '🇺🇸', name: 'USA' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
];
function usePortfolio() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/portfolio`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}
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
        <li>
          <button
            className={active === 'Admin' ? 'active admin-btn' : 'admin-btn'}
            onClick={() => { setActive('Admin'); setMenuOpen(false); }}
          ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/></svg></button>
        </li>
      </ul>
    </nav>
  );
}


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
          <a className="btn-ghost" href={personal.portfolio} target="_blank" rel="noreferrer">Live Portfolio ↗</a>
        </div>
        <div className="hero-links">
          <a href={personal.github} target="_blank" rel="noreferrer"><GithubIcon /></a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /></a>
          <a href={`mailto:${personal.email}`}><EmailIcon /></a>
        </div>
        <p className="hero-availability">🟢 {personal.availability}</p>
      </div>
    </section>
  );
}


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
                  <span className="skill-dot" />{s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


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
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="project-live">Live ↗</a>}
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
          <div key={i} className="timeline-item">
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


function Contact({ personal }) {
  const [form, setForm]     = useState({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const fullPhone = form.phone ? `${form.countryCode} ${form.phone}` : '';
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: fullPhone,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ ok: true, msg: data.message });
        setForm({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
      } else {
        setStatus({ ok: false, msg: data.error });
      }
    } catch {
      setStatus({ ok: false, msg: 'Failed to send. Please email directly.' });
    }
    setSending(false);
  };

  if (!personal) return null;
  const selected = COUNTRY_CODES.find(c => c.code === form.countryCode) || COUNTRY_CODES[0];

  return (
    <section className="section">
      <h2 className="section-title">Contact</h2>
      <p className="section-sub">Let's work together</p>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-details">
            <div className="contact-item"><EmailIcon /><a href={`mailto:${personal.email}`}>{personal.email}</a></div>
            <div className="contact-item"><PhoneIcon /><span>{personal.phone}</span></div>
            <div className="contact-item"><LocationIcon /><span>{personal.location}</span></div>
            <div className="contact-item"><GithubIcon /><a href={personal.github} target="_blank" rel="noreferrer">{personal.github}</a></div>
            <div className="contact-item"><LinkedinIcon /><a href={personal.linkedin} target="_blank" rel="noreferrer">{personal.linkedin}</a></div>
          </div>
          <div className="availability-badge">
            <span className="pulse" />{personal.availability}
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
          </div>

          {}
          <div className="form-group">
            <label>Phone <span style={{color:'var(--muted)',fontWeight:400}}>(optional)</span></label>
            <div className="phone-row">
              <div className="country-selector" onClick={() => setShowCodes(s => !s)}>
                <span>{selected.flag}</span>
                <span>{selected.code}</span>
                <span className="dropdown-arrow">▾</span>
                {showCodes && (
                  <div className="country-dropdown">
                    {COUNTRY_CODES.map(c => (
                      <div
                        key={c.code}
                        className={`country-option ${c.code === form.countryCode ? 'selected' : ''}`}
                        onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, countryCode: c.code })); setShowCodes(false); }}
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                        <span style={{marginLeft:'auto',color:'var(--accent)',fontSize:'0.8rem'}}>{c.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                className="phone-input"
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project..." required />
          </div>
          {status && <p className={`form-status ${status.ok ? 'ok' : 'err'}`}>{status.msg}</p>}
          <button type="submit" className="btn-primary full" disabled={sending}>
            {sending ? 'Sending…' : 'Send Message ✉'}
          </button>
          <p style={{textAlign:'center',fontSize:'0.75rem',color:'var(--muted)',marginTop:'0.5rem'}}>
            You'll receive an auto-reply confirmation email
          </p>
        </form>
      </div>
    </section>
  );
}

function Admin() {
  const [user, setUser]         = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [filter, setFilter]     = useState('all'); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      if (u && u.email === ADMIN_EMAIL) fetchMessages();
    });
    return unsub;
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setError('Access denied. Only Irfan can access this dashboard.');
      }
    } catch (err) {
      setError('Login failed. Try again.');
    }
  };

  const logout = () => signOut(auth);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/messages`, {
        headers: { 'x-admin-token': ADMIN_TOKEN }
      });
      const data = await res.json();
      setMessages(data);
    } catch {
      setError('Failed to load messages.');
    }
    setLoading(false);
  };

  const markRead = async (id) => {
    await fetch(`${API}/api/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: { 'x-admin-token': ADMIN_TOKEN }
    });
    setMessages(m => m.map(msg => msg._id === id ? { ...msg, read: true } : msg));
  };

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await fetch(`${API}/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': ADMIN_TOKEN }
    });
    setMessages(m => m.filter(msg => msg._id !== id));
  };

  const filtered = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
  );
  const unreadCount = messages.filter(m => !m.read).length;

  if (!user) return (
    <section className="section admin-login">
      <div className="admin-login-card">
        <div className="admin-lock"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/></svg></div>
        <h2>Admin Dashboard</h2>
        <p>Sign in with your Google account to view messages</p>
        {error && <p className="form-status err">{error}</p>}
        <button className="btn-primary" onClick={login}>
          <GoogleIcon /> Sign in with Google
        </button>
      </div>
    </section>
  );

  if (user.email !== ADMIN_EMAIL) return (
    <section className="section admin-login">
      <div className="admin-login-card">
        <div className="admin-lock">⛔</div>
        <h2>Access Denied</h2>
        <p>Only Irfan's account can access this dashboard.</p>
        <button className="btn-outline" onClick={logout}>Sign Out</button>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="admin-header">
        <div>
          <h2 className="section-title">Messages</h2>
          <p className="section-sub">{unreadCount} unread · {messages.length} total</p>
        </div>
        <div className="admin-user">
          <img src={user.photoURL} alt="" className="admin-avatar" />
          <button className="btn-outline" onClick={logout}>Sign Out</button>
        </div>
      </div>

      <div className="admin-filters">
        {['all','unread','read'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && unreadCount > 0 && <span className="filter-badge">{unreadCount}</span>}
          </button>
        ))}
        <button className="btn-ghost" onClick={fetchMessages} style={{marginLeft:'auto'}}>↻ Refresh</button>
      </div>

      {loading && <div className="loader"><div className="loader-ring"/></div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <p>📭 No {filter !== 'all' ? filter : ''} messages yet</p>
        </div>
      )}

      <div className="messages-list">
        {filtered.map(msg => (
          <div key={msg._id} className={`message-card ${!msg.read ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-sender">
                <div className="sender-avatar">{msg.name[0].toUpperCase()}</div>
                <div>
                  <h4>{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="message-email">{msg.email}</a>
                  {msg.phone && <p className="message-phone">📞 {msg.phone}</p>}
                </div>
              </div>
              <div className="message-meta">
                <span className="message-date">
                  {new Date(msg.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                </span>
                {!msg.read && <span className="unread-dot" />}
              </div>
            </div>
            <p className="message-body">{msg.message}</p>
<div className="message-actions">
  <a href={`mailto:${msg.email}`} className="action-reply">Reply ✉</a>
  {msg.phone && (
    <a href={`https://wa.me/${msg.phone.replace(/[^0-9]/g,'')}`}
      target="_blank" rel="noreferrer" className="action-whatsapp">
      WhatsApp 💬
    </a>
  )}
  {!msg.read && (
    <button className="action-read" onClick={() => markRead(msg._id)}>
      Mark Read ✓
    </button>
  )}
  <button className="action-delete" onClick={() => deleteMsg(msg._id)}>🗑</button>
</div>
          </div>
        ))}
      </div>
    </section>
  );
}


const GithubIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedinIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const EmailIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/></svg>;
const LocationIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const GoogleIcon   = () => <svg viewBox="0 0 24 24" width="18" height="18" style={{marginRight:'8px'}}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;


export default function App() {
  const [active, setActive] = useState('Home');
  const { data, loading }   = usePortfolio();

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
        {active === 'Admin'      && <Admin />}
      </main>
      <footer className="footer">
        <p>Built with MERN Stack · Designed & Developed by Irfan Ahmed</p>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}
