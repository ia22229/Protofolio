const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://irfan2229.vercel.app', 'http://localhost:3000']
}));
app.use(express.json());

// ── MongoDB Connection ──────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ── Contact Schema ──────────────────────────────
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ── Portfolio Data ──────────────────────────────
const portfolioData = {
  personal: {
    name: "Irfan Ahmed",
    title: "MERN Stack Developer",
    subtitle: "MongoDB · Express.js · React.js · Node.js · REST APIs · Full-Stack",
    email: "irfanahmed9400265514@gmail.com",
    phone: "+91 95392 61066",
    location: "Kerala, India",
    linkedin: "https://linkedin.com/in/ia2229",
    github: "https://github.com/ia22229",
    portfolio: "https://irfanahmed2229.vercel.app",
    availability: "Available immediately · Full-time · Freelance · Remote",
    summary: "Motivated MERN Stack Developer and B.Tech Computer Science graduate with real-world, production-level full-stack development experience. Skilled in building complete applications independently — React.js frontends, Node.js/Express.js backends, MongoDB databases, and REST APIs — from architecture through deployment. Has shipped a live MERN POS system used daily by a real business.",
  },
  skills: {
    "MERN Stack": ["MongoDB / Mongoose","Express.js","React.js (Hooks, State)","Node.js"],
    "Frontend": ["JavaScript (ES6+)","TypeScript (familiar)","HTML5 / CSS3 / SCSS","Tailwind CSS, Bootstrap","Responsive & Adaptive UI"],
    "Backend & DB": ["REST API Design","JWT Auth, Middleware","MySQL / PostgreSQL","Python — Flask, Django"],
    "Tools & DevOps": ["Git / GitHub","Linux (CLI & Server)","Postman, VS Code","Vercel Deployment","Cursor / Copilot / Claude"],
    "Soft Skills": ["Full Module Ownership","Technical Documentation","Agile / Scrum Workflows","Analytical Debugging","Independent Self-starter"],
  },
  education: [{
    degree: "B.Tech — Computer Science & Engineering",
    institution: "MEA Engineering College, Kerala",
    period: "2021 – 2025",
    subjects: ["Data Structures & Algorithms","DBMS","Software Engineering","OOP","Computer Networks","Agile"],
  }],
  experience: [
    {
      title: "Full-Stack Python Web Development Intern",
      company: "Techmaghi",
      period: "Sep 2024 – Nov 2024",
      points: [
        "Built a production Blog Web Application using Python/Flask — followed company coding, security, and documentation standards.",
        "Developed responsive interfaces, implemented JWT token-based authentication, and integrated REST APIs — all delivered on schedule.",
        "Participated in code reviews, team meetings, and iterative bug fixing; maintained complete technical documentation.",
      ],
    },
    {
      title: "AI & Robotics Intern",
      company: "Stem Robotics",
      period: "Oct 2023 – Nov 2023",
      points: [
        "Collaborated in an agile cross-functional team on AI/automation projects.",
        "Strengthened communication and adaptability in fast-paced environments.",
      ],
    },
  ],
  projects: [
    {
      name: "Juice Corner — Full-Stack MERN POS App",
      stack: ["React.js","Node.js","Express.js","MongoDB","Vercel"],
      live: "https://juicecorner.vercel.app",
      description: "Production-grade MERN stack POS system used daily by a real business — fully responsive across tablet and desktop. Real-time order tracking, live customer display board, secure JWT auth, and MongoDB/Mongoose schema designed for reliability.",
      highlight: "Live Production App",
    },
    {
      name: "WhatsApp Automation Bot ",
      stack: ["Node.js","Express.js","WhatsApp Business API"],
      live: null,
      description: "API-integrated Node.js automation system with stateful session management; clean modular code following REST and security standards. Delivered measurable operational improvements for the client.",
      highlight: "Client Project",
    },
    {
      name: "Automated Billing System — Public Transit",
      stack: ["Python","Django","MySQL","OpenCV","YOLOv3"],
      live: null,
      description: "High-availability system integrating YOLOv3 computer vision with Django backend and MySQL — full schema design and query optimization.",
      highlight: "AI Integration",
    },
    {
      name: "Full-Stack Food Ordering Platform",
      stack: ["JavaScript","PHP","HTML5/SCSS","MySQL"],
      live: null,
      description: "Complete responsive multi-module ordering system with dual admin/user panels, cross-browser compatibility, and MySQL database integration.",
      highlight: "Full-Stack",
    },
    {
      name: "Blog Web Application",
      stack: ["Python","Flask","MySQL","REST API"],
      live: null,
      description: "Production blog platform built during Techmaghi internship — complete backend, responsive frontend, JWT auth, and full documentation.",
      highlight: "Internship Project",
    },
  ],
};

// ── Routes ──────────────────────────────────────
app.get('/api/portfolio', (req, res) => res.json(portfolioData));
app.get('/api/portfolio/personal', (req, res) => res.json(portfolioData.personal));
app.get('/api/portfolio/skills', (req, res) => res.json(portfolioData.skills));
app.get('/api/portfolio/education', (req, res) => res.json(portfolioData.education));
app.get('/api/portfolio/experience', (req, res) => res.json(portfolioData.experience));
app.get('/api/portfolio/projects', (req, res) => res.json(portfolioData.projects));

// ── Contact Route ───────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  try {
    await Contact.create({ name, email, message });
    console.log('📩 Saved to MongoDB:', { name, email });
    res.json({ success: true, message: 'Message received! Irfan will get back to you soon.' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Failed to save. Please email directly.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
