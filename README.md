# TechnoSoft

TechnoSoft is a modern technology store and service platform built for a client-facing business offering computer repair, spare parts sales, and software-related services. The project includes a responsive Arabic RTL storefront and a secure admin dashboard for managing products and services.

## Live Demo

https://technosoft-store.com/

## Overview

This platform is designed to provide a smooth online shopping and service experience with:

- Product catalog management
- Service listings and details
- Contact and WhatsApp integration
- Admin authentication and dashboard
- Product image uploads
- Mobile-friendly responsive interface

## Features

- Responsive Arabic RTL storefront
- Product and service management through admin panel
- JWT-based authentication for secure admin access
- Product image upload support
- WhatsApp integration for customer communication
- Clean and professional UI for tech-related business operations

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Authentication | JWT + bcrypt |
| Deployment | Frontend + backend hosted separately |

## Project Structure

```bash
technosoft/
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
├── README.md
├── .gitignore
└── SECURITY.md       # kept private / local only if used
```

## Getting Started

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
# Update the .env file with your local configuration
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Update the .env file with your local configuration
npm run dev
```

### 3) Admin Setup

After starting the backend, create the admin account using the admin setup endpoint in your local environment.

## Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWTs |
| `CLIENT_URL` | Frontend app URL |
| `NODE_ENV` | `development` or `production` |

### Frontend

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_IMAGE_BASE_URL` | Product image URL base |

## Production Build

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## Security Notes

This project follows common security practices such as:

- JWT-based admin authentication
- Restricted CORS configuration
- Rate limiting for API access
- Environment variables stored outside source control
- File validation for uploads

Sensitive production details, security checklists, and deployment secrets are intentionally not included in the public repository.

## License

This project is intended for portfolio and demonstration purposes. It was developed for a client and is not open for public production redistribution.

## Contact

For business inquiries or collaboration opportunities, contact the project owner directly.
