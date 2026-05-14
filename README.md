# LeadFlow CRM

LeadFlow CRM is a production-ready full-stack lead management system with a polished SaaS dashboard, responsive CRM workflows, REST APIs, MongoDB persistence, and seeded demo leads.

Live deployment URL: `https://your-leadflow-crm.vercel.app`

## Features

- Add, edit, view, delete, search, filter, and sort leads
- Status workflow: New, In Progress, Converted
- Status update endpoint and interactive lead details timeline
- Dashboard metrics: total leads, new leads, in-progress leads, converted leads, and conversion rate
- Recent leads, source breakdown, and visual analytics charts
- Responsive SaaS layout with sidebar navigation, cards, tables, badges, modals, loading states, and empty states
- Automatic demo seeding when the connected database is empty
- Environment-driven API and MongoDB configuration

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, Context API, Recharts, Lucide React
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Deployment: Vercel for frontend, Render for backend, MongoDB Atlas for database

## Folder Structure

```text
src/
  assets/
  components/
  layouts/
  pages/
  routes/
  services/
  store/
  types/
  utils/
server/
  config/
  controllers/
  middleware/
  models/
  routes/
  seed.js
  server.js
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Update `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/leadflow-crm
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
AUTO_SEED_DEMO=true
```

4. Run the app:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Seed Data

The server automatically inserts demo leads when the database is empty and `AUTO_SEED_DEMO` is not set to `false`.

Manual seed:

```bash
npm run seed
```

Reset and reseed:

```bash
npm run seed -- --force
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | API health check |
| GET | `/api/leads` | Get all leads with optional search, status, source, and sort query params |
| GET | `/api/leads/:id` | Get one lead |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update a lead |
| PATCH | `/api/leads/:id/status` | Update only lead status |
| DELETE | `/api/leads/:id` | Delete a lead |
| GET | `/api/dashboard/stats` | Get dashboard totals, conversion rate, recent leads, and source breakdown |

## Deployment

### Frontend on Vercel

1. Import the repository in Vercel.
2. Set the framework preset to Vite.
3. Add `VITE_API_URL=https://your-render-api.onrender.com/api`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Backend on Render

1. Create a Render Web Service from the same repository.
2. Use `npm install` as the build command.
3. Use `npm start` as the start command.
4. Add environment variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-leadflow-crm.vercel.app
AUTO_SEED_DEMO=true
```

### Database on MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Add a database user.
3. Allow Render access from Network Access.
4. Copy the Atlas connection string into Render as `MONGODB_URI`.

## Scripts

```bash
npm run dev        # Run frontend and backend together
npm run client     # Run only the Vite frontend
npm run server:dev # Run only the Express API with nodemon
npm run build      # Type-check and build frontend
npm start          # Start production API server
npm run seed       # Insert demo leads
```
