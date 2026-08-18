# FundRaise

### Connecting Startups with the Right Investors

FundRaise is a startup-investor connection platform designed to make it easier for founders to discover relevant investors and for investors to discover promising startup opportunities.

The platform focuses on creating a structured environment where founders can present their startups and investors can discover opportunities based on their interests.

**Live Demo:** https://fund-raise-olive.vercel.app

---

## Overview

Finding the right investor is one of the biggest challenges founders face during fundraising.

FundRaise is being built to simplify this process by bringing founders and investors into one platform where they can create profiles, discover opportunities, connect, communicate, and manage their interactions.

The project is designed as a full-stack product rather than a simple landing page, with separate experiences and workflows for different user roles.

---

## Key Features

### Authentication & User Management

* User registration and login
* Email verification
* JWT-based authentication
* Google OAuth
* LinkedIn OAuth
* Role-based access
* Profile completion and onboarding

### Founder Experience

* Founder profiles
* Startup information
* Startup listings
* Founder dashboard
* Investor discovery
* Connection workflows
* Communication features

### Investor Experience

* Investor profiles
* Investor dashboard
* Startup discovery
* Startup information
* Founder discovery
* Connection workflows
* Communication features

### Platform Features

* Role-based dashboards
* User profiles
* Startup discovery
* Messaging
* Notifications
* Connections
* Responsive user interface
* API-driven application architecture

---

## Technology Stack

### Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* Google OAuth
* LinkedIn OAuth
* Email OTP verification

### Development Tools

* Git
* GitHub
* Docker
* Vercel

---

## Architecture

FundRaise follows a modern full-stack architecture:

```text
Frontend
   |
   | REST API
   v
Backend
   |
   v
MongoDB
```

The frontend is responsible for the user interface and application experience, while the backend handles authentication, business logic, APIs, and database operations.

---

## My Role

I designed and developed FundRaise as a full-stack application.

My responsibilities include:

* Application architecture
* Frontend development
* Backend development
* Database integration
* Authentication and authorization
* OAuth integration
* API development
* Role-based workflows
* Dashboard development
* User onboarding
* Messaging and notification functionality
* Deployment and ongoing improvements

---

## Project Structure

```text
FundRaise/
├── app/
├── components/
├── config/
├── data/
├── lib/
├── public/
├── package.json
├── next.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Masood0319/FundRaise.git
```

Navigate into the project:

```bash
cd FundRaise
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file and add the environment variables required by your local configuration.

Do not commit private API keys, database credentials, OAuth secrets, or other sensitive environment variables to the repository.

---

## Current Status

FundRaise is an actively developed project.

The platform is being continuously improved with new functionality, UI improvements, backend integrations, and product workflows.

---

## Future Improvements

Planned improvements include:

* Advanced founder-investor matching
* Improved investor discovery
* Smarter recommendations
* Enhanced messaging
* Fundraising pipeline management
* Improved engagement tracking
* AI-powered matching and recommendations
* More advanced analytics

---

## Author

**Tariq Masood**

Full-Stack Web Developer building SaaS products and AI-powered applications.

GitHub: https://github.com/Masood0319
