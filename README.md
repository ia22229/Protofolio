# 🚀 Irfan Ahmed — MERN Stack Portfolio

> A production-ready, full-stack personal portfolio built from scratch with the **MERN stack** — featuring a React frontend, an Express/Node.js REST API backend, MongoDB contact storage, and Nodemailer email integration.

**Live:** [irfan2229.vercel.app](https://irfan2229.vercel.app)

---

##  Features

-  **Fully custom React UI** — no UI libraries, pure CSS3 with Google Fonts (Syne + DM Mono)
-  **REST API backend** — Express.js serving all portfolio data as structured JSON
-  **MongoDB integration** — contact form submissions stored persistently via Mongoose
-  **Email notifications** — Nodemailer sends an email alert on every contact form submission
-  **Admin panel** — view and manage incoming messages (mark as read)
-  **Fully responsive** — works across mobile, tablet, and desktop
-  **Concurrent dev workflow** — frontend and backend run together with a single command

---

##  Project Structure

```
Protofolio-main/
├── client/                  ← React.js frontend (Create React App)
│   ├── public/
│   │   ├── index.html
│   │   ├── irf.png          ← Profile images
│   │   └── Irfan_Ahmed_cv.pdf
│   ├── src/
│   │   ├── App.jsx          ← All components & pages
│   │   ├── App.css          ← Complete custom styling
│   │   └── index.js
│   ├── .env                 ← Client environment variables
│   └── package.json
├── server/                  ← Node.js + Express.js backend
│   ├── server.js            ← All routes, MongoDB schema, Nodemailer config
│   ├── .env                 ← Server environment variables (never commit this)
│   ├── .gitignore
│   └── package.json
├── package.json             ← Root scripts (concurrently)
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, CSS3, Google Fonts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Email | Nodemailer (Gmail) |
| Dev Tools | concurrently, nodemon |
| Deployment | Vercel (frontend), Render/Railway (backend) |

---

##  Quick Start

### Prerequisites

- Node.js v18+
- npm v9+
- A MongoDB URI (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Gmail account for Nodemailer

---

### 1. Clone the repository

```bash
git clone https://github.com/ia22229/Protofolio.git
cd Protofolio-main
```

### 2. Install all dependencies

```bash
npm run install:all
```

This installs dependencies for both `server/` and `client/` in one command.

### 3. Configure environment variables

**`server/.env`**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

>  Use a [Gmail App Password](https://myaccount.google.com/apppasswords) — not your main account password.

**`client/.env`**
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run in development

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

The React frontend proxies all `/api` requests to port 5000 automatically.

---

### Run separately (optional)

```bash
# Terminal 1 — Backend (with hot reload via nodemon)
npm run dev:server

# Terminal 2 — Frontend
npm run dev:client
```

---

##  API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/portfolio` | All portfolio data (personal, skills, projects, etc.) |
| `GET` | `/api/portfolio/personal` | Personal info, links, and summary |
| `GET` | `/api/portfolio/skills` | Skills grouped by category |
| `GET` | `/api/portfolio/education` | Education history |
| `GET` | `/api/portfolio/experience` | Internship & work experience |
| `GET` | `/api/portfolio/projects` | Projects list with links |
| `POST` | `/api/contact` | Submit contact form (saves to MongoDB + sends email) |
| `GET` | `/api/admin/messages` | Get all contact messages (admin) |
| `PATCH` | `/api/admin/messages/:id/read` | Mark a message as read (admin) |

---

##  Deployment

### Frontend → Vercel

```bash
cd client
npm run build
```

Then deploy the `build/` folder to [Vercel](https://vercel.com). Set `REACT_APP_API_URL` to your deployed backend URL in Vercel's environment variables.

### Backend → Render / Railway

1. Point to the `server/` directory
2. Set start command: `node server.js`
3. Add all environment variables from `server/.env` in the dashboard

> ⚠️ Update the CORS `origin` array in `server.js` to include your live frontend URL before deploying.

---

##  Security Notes

- **Never commit `.env` files** — both are already in `.gitignore`
- Use Gmail [App Passwords](https://myaccount.google.com/apppasswords), not your main password
- Admin routes should be protected with authentication before production use

---

##  Contact

**Irfan Ahmed** — MERN Stack Developer

- 🌐 Portfolio: [irfanahmed2229.vercel.app](https://irfanahmed2229.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/ia2229](https://linkedin.com/in/ia2229)
- 💻 GitHub: [github.com/ia22229](https://github.com/ia22229)
- ✉️ Email: irfanahmed9400265514@gmail.com

---

<p align="center">Built with ❤️ using MongoDB · Express.js · React.js · Node.js</p>
