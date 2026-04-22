# Irfan Ahmed — MERN Stack Portfolio

A full-stack portfolio built with **MongoDB · Express.js · React.js · Node.js**.

## Project Structure

```
portfolio/
├── server/          ← Express.js REST API
│   ├── server.js    ← All routes + portfolio data
│   └── package.json
├── client/          ← React.js frontend
│   ├── src/
│   │   ├── App.jsx  ← All components + pages
│   │   ├── App.css  ← Full styling
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
├── package.json     ← Root scripts
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
# Install root dev tools
npm install

# Install server deps
cd server && npm install && cd ..

# Install client deps
cd client && npm install && cd ..
```

### 2. Run in development (both together)

```bash
npm run dev
```

This runs:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000 (proxies API calls to port 5000)

### 3. Run separately

```bash
# Terminal 1 — Backend
npm run dev:server

# Terminal 2 — Frontend
npm run dev:client
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/portfolio` | All portfolio data |
| GET | `/api/portfolio/personal` | Personal info & links |
| GET | `/api/portfolio/skills` | Skills by category |
| GET | `/api/portfolio/education` | Education history |
| GET | `/api/portfolio/experience` | Work experience |
| GET | `/api/portfolio/projects` | Projects list |
| POST | `/api/contact` | Contact form submission |

## Adding MongoDB (Optional Upgrade)

To persist contact form submissions, install Mongoose and connect:

```bash
cd server && npm install mongoose dotenv
```

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Then in `server.js`:
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const ContactSchema = new mongoose.Schema({
  name: String, email: String, message: String, createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', ContactSchema);

// In the POST /api/contact route:
await Contact.create({ name, email, message });
```

## Deployment

### Vercel (Frontend)
```bash
cd client && npm run build
# Deploy the build/ folder to Vercel
```

### Render / Railway (Backend)
- Point to `server/` directory
- Start command: `node server.js`

## Tech Stack

- **Frontend**: React 18, CSS3 (custom, no UI library), Google Fonts (Syne + DM Mono)
- **Backend**: Node.js, Express.js, CORS
- **Database**: Ready for MongoDB/Mongoose integration
- **Deployment**: Vercel (frontend), any Node host (backend)
