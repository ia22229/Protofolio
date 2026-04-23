const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'https://irfan2229.vercel.app',
    'http://localhost:3000'
  ]
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, default: '' },
  message:   { type: String, required: true },
  read:      { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

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
      name: "WhatsApp Automation Bot — Skin Clinic",
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

app.get('/api/portfolio',             (req, res) => res.json(portfolioData));
app.get('/api/portfolio/personal',    (req, res) => res.json(portfolioData.personal));
app.get('/api/portfolio/skills',      (req, res) => res.json(portfolioData.skills));
app.get('/api/portfolio/education',   (req, res) => res.json(portfolioData.education));
app.get('/api/portfolio/experience',  (req, res) => res.json(portfolioData.experience));
app.get('/api/portfolio/projects',    (req, res) => res.json(portfolioData.projects));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    await Contact.create({ name, email, phone: phone || '', message });
    console.log('📩 Saved to MongoDB:', { name, email, phone });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#0d1520;color:#e2e8f0;border-radius:12px;">
          <h2 style="color:#00d4ff;margin-bottom:4px;">New Portfolio Message</h2>
          <hr style="border-color:#1e3a5f;margin:16px 0"/>
          <p><strong style="color:#94a3b8">Name:</strong> ${name}</p>
          <p><strong style="color:#94a3b8">Email:</strong> <a href="mailto:${email}" style="color:#00d4ff">${email}</a></p>
          ${phone ? `<p><strong style="color:#94a3b8">Phone:</strong> ${phone}</p>` : ''}
          <p><strong style="color:#94a3b8">Message:</strong></p>
          <div style="background:#111c2d;padding:16px;border-radius:8px;border-left:3px solid #00d4ff;margin-top:8px;">
            ${message}
          </div>
          <hr style="border-color:#1e3a5f;margin:16px 0"/>
          <p style="font-size:12px;color:#64748b">Sent from irfan2229.vercel.app</p>
        </div>
      `
    });

    await transporter.sendMail({
      from: `"Irfan Ahmed" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#0d1520;color:#e2e8f0;border-radius:12px;">
          <h2 style="color:#00d4ff;">Hey ${name}! 👋</h2>
          <p style="line-height:1.7;color:#94a3b8">
            Thanks for getting in touch! I've received your message and will get back to you as soon as possible — usually within 24 hours.
          </p>
          <div style="background:#111c2d;padding:16px;border-radius:8px;border-left:3px solid #00d4ff;margin:20px 0;">
            <p style="margin:0;font-size:13px;color:#64748b">Your message:</p>
            <p style="margin:8px 0 0;color:#e2e8f0">${message}</p>
          </div>
          <p style="color:#94a3b8">In the meantime, feel free to check out my work:</p>
          <a href="https://irfanahmed2229.vercel.app" style="display:inline-block;background:#00d4ff;color:#080c14;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:700;margin-top:8px;">
            View Portfolio
          </a>
          <hr style="border-color:#1e3a5f;margin:24px 0"/>
          <p style="font-size:13px;color:#64748b">
            Irfan Ahmed · MERN Stack Developer · Kerala, India<br/>
            <a href="https://github.com/ia22229" style="color:#00d4ff">GitHub</a> · 
            <a href="https://linkedin.com/in/ia2229" style="color:#00d4ff">LinkedIn</a>
          </p>
        </div>
      `
    });

    res.json({ success: true, message: `Thanks ${name}! I'll get back to you soon. Check your email for confirmation.` });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to send. Please email directly.' });
  }
});

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'irfan-admin-secret';

function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/admin/messages', adminAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.patch('/api/admin/messages/:id/read', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

app.delete('/api/admin/messages/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
