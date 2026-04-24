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
    // 1. Save to Database
    await Contact.create({ name, email, phone: phone || '', message });
    console.log('📩 Saved to MongoDB:', { name, email, phone });

        // 2. Trigger Hacker-Mode Phone Auto-Reply (MacroDroid)
    // ONLY run this if the user actually typed a phone number
    if (process.env.MACRODROID_WEBHOOK_URL && phone) { 
      try {
        await fetch(process.env.MACRODROID_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: phone // This maps to [webhook_param_phone] in MacroDroid
          })
        });
        console.log("📱 Fired auto-reply webhook to MacroDroid!");
      } catch (webhookError) {
        console.error("⚠️ Failed to trigger phone webhook:", webhookError);
      }
    }

    // 3. Send Notification Email to You
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New message from ${name}`,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:auto;background:#0e0e0e;border-radius:16px;overflow:hidden;border:1px solid rgba(255,107,0,0.2);">
          <div style="background:linear-gradient(135deg,#ff6b00,#ff9a3c);padding:24px 32px;">
            <h2 style="color:#fff;margin:0;font-size:1.4rem;">📬 New Portfolio Message</h2>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:0.85rem;">Someone reached out via irfan2229.vercel.app</p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:0.82rem;width:80px;">NAME</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#f0f0f0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:0.82rem;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;"><a href="mailto:${email}" style="color:#ff6b00;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:0.82rem;">PHONE</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#f0f0f0;">${phone}</td></tr>` : ''}
            </table>
            <div style="margin-top:20px;">
              <p style="color:#888;font-size:0.82rem;margin-bottom:8px;">MESSAGE</p>
              <div style="background:#1f1f1f;border-left:3px solid #ff6b00;padding:16px;border-radius:0 8px 8px 0;color:#f0f0f0;line-height:1.6;">${message}</div>
            </div>
            <a href="mailto:${email}" style="display:inline-block;margin-top:20px;background:#ff6b00;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Reply Now →</a>
          </div>
          <div style="padding:16px 32px;background:#161616;font-size:0.75rem;color:#555;">Sent from irfan2229.vercel.app</div>
        </div>
      `
    });

    // 4. Send Auto-Reply Email to the User
    await transporter.sendMail({
      from: `"Irfan Ahmed" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:auto;background:#0e0e0e;border-radius:16px;overflow:hidden;border:1px solid rgba(255,107,0,0.2);">
          <div style="background:linear-gradient(135deg,#ff6b00,#ff9a3c);padding:24px 32px;">
            <h2 style="color:#fff;margin:0;">Hey ${name}! 👋</h2>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:0.9rem;">Thanks for reaching out</p>
          </div>
          <div style="padding:28px 32px;">
            <p style="color:#a0a0a0;line-height:1.8;margin-bottom:20px;">
              I've received your message and will get back to you as soon as possible — usually within <strong style="color:#ff6b00;">24 hours</strong>.
            </p>
            <div style="background:#1f1f1f;border-left:3px solid #ff6b00;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
              <p style="color:#666;font-size:0.8rem;margin:0 0 8px;">YOUR MESSAGE</p>
              <p style="color:#f0f0f0;margin:0;line-height:1.6;">${message}</p>
            </div>
            <a href="https://irfan2229.vercel.app" style="display:inline-block;background:#ff6b00;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.95rem;">
              View My Portfolio →
            </a>
          </div>
          <div style="padding:20px 32px;background:#161616;border-top:1px solid #1f1f1f;">
            <p style="color:#555;font-size:0.8rem;margin:0;">
              <strong style="color:#ff6b00;">Irfan Ahmed</strong> · MERN Stack Developer · Kerala, India<br/>
              <a href="https://github.com/ia22229" style="color:#ff6b00;">GitHub</a> &nbsp;·&nbsp;
              <a href="https://linkedin.com/in/ia2229" style="color:#ff6b00;">LinkedIn</a>
            </p>
          </div>
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
