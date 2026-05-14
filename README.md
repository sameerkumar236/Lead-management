# LeadFlow CRM – Smart Lead Management System

LeadFlow CRM is a full-stack SaaS/CRM web application designed to help businesses manage, track, and organize customer leads efficiently.

This project was built as part of the Full Stack Developer Technical Assessment. It includes lead creation, editing, deletion, lead status management, searching, filtering, and a dashboard overview.

---

## Live Deployment

Frontend Live URL: 
https://lead-management-woad-chi.vercel.app/
Backend Live API URL: 
https://lead-management-15s6.onrender.com
---

## Project Overview

LeadFlow CRM allows users to manage business leads from one simple dashboard. Users can add new leads, view all leads, update lead information, change lead status, delete leads, and monitor lead statistics.

The application includes the required CRM pages:

1. Home Page
 2. Add Lead Page
 3. Lead Listing Page
 4. Lead Details Page
 5. Dashboard Page

---

## Features

- Add new leads
 - Edit existing leads
 - Delete leads
 - View lead details
 - Change lead status
 - Search leads by name, email, or company
 - Filter leads by status
 - Filter leads by lead source
 - Dashboard with basic lead statistics
 - Responsive UI for desktop, tablet, and mobile
 - Clean and modern SaaS-style design

---

## Lead Status Options

The application supports the following lead statuses:

- New
 - In Progress
 - Converted

---

## Tech Stack

### Frontend

- React
 - Vite
 - Tailwind CSS
 - React Router

### Backend

- Node.js
 - Express.js
 - MongoDB
 - Mongoose

---

## Folder Structure

```txt
 LeadFlow-CRM/
 │
 ├── frontend/
 │ ├── src/
 │ │ ├── components/
 │ │ ├── pages/
 │ │ ├── layouts/
 │ │ ├── routes/
 │ │ ├── services/
 │ │ ├── types/
 │ │ └── utils/
 │ │
 │ ├── package.json
 │ └── vite.config.ts
 │
 ├── backend/
 │ ├── config/
 │ ├── controllers/
 │ ├── models/
 │ ├── routes/
 │ ├── middleware/
 │ ├── server.js
 │ └── package.json
 │
 └── README.md
