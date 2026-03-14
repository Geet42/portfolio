# Geet Bhute — Backend Engineer Portfolio

A full-stack developer portfolio built with **Spring Boot**, **React**, **PostgreSQL**, and **Docker** — deployed live with a real backend API serving project data from a relational database.

> **Live:** [geetbhute.vercel.app](https://geetbhute.vercel.app) · **API:** [portfolio-backend-5yxx.onrender.com/api/projects](https://portfolio-backend-5yxx.onrender.com/api/projects)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                   (React Frontend)                            │
│              Hosted on Vercel (CDN)                           │
└──────────────┬───────────────────────────────────────────────┘
               │  HTTP GET /api/projects
               │  (Axios + CORS)
               ▼
┌──────────────────────────────────────────────────────────────┐
│                   SPRING BOOT BACKEND                        │
│              (Java 17 + Spring Boot 3.2)                     │
│                  Hosted on Render                             │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  Controller  │→│   Service    │→│    Repository       │  │
│  │  (REST API)  │  │  (Business   │  │  (JPA/Hibernate)   │  │
│  │              │  │   Logic)     │  │                    │  │
│  └─────────────┘  └──────────────┘  └────────┬───────────┘  │
│                                               │              │
│  ┌─────────────┐  ┌──────────────┐            │              │
│  │  Security   │  │    CORS      │            │              │
│  │ (JWT Filter)│  │   Config     │            │              │
│  └─────────────┘  └──────────────┘            │              │
└───────────────────────────────────────────────┼──────────────┘
                                                │  JDBC
                                                ▼
┌──────────────────────────────────────────────────────────────┐
│                     POSTGRESQL                               │
│               Hosted on Render (Free)                         │
│                                                              │
│   Tables: project, project_highlights, project_tech_stack    │
│   Auto-seeded via DataLoader (CommandLineRunner)             │
└──────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Primary language |
| Spring Boot | 3.2.2 | REST API framework |
| Spring Data JPA | 3.2.x | ORM / database abstraction |
| Hibernate | 6.4.1 | JPA implementation, auto DDL |
| Spring Security | 6.2.x | JWT-based authentication, endpoint security |
| PostgreSQL Driver | 42.x | JDBC connectivity |
| Maven | 3.9.x | Build tool and dependency management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI library |
| Vite | 5.x | Build tool, dev server, HMR |
| Axios | 1.6.x | HTTP client for API calls |
| Tailwind CSS | 4.1.x | Utility-first CSS framework |
| PostCSS | 8.5.x | CSS processing pipeline |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker | Containerization of backend + database |
| Docker Compose | Multi-container orchestration (local dev) |
| Vercel | Frontend hosting (CDN, auto-deploy from GitHub) |
| Render | Backend hosting (Docker) + PostgreSQL (free tier) |
| GitHub Actions | CI/CD pipeline (optional) |

---

## Project Structure

```
portfolio/
├── frontend/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Fixed nav with glass-blur on scroll
│   │   │   ├── Hero.jsx              # Hero section + animated terminal
│   │   │   ├── About.jsx             # Bio, education, LeetCode, certs, beyond academics
│   │   │   ├── Skills.jsx            # 6-category tech skills grid
│   │   │   ├── Experience.jsx        # 4 internships with timeline
│   │   │   ├── Projects.jsx          # Fetches from Spring Boot API, filter tabs
│   │   │   ├── ProjectCard.jsx       # Individual project card with hover effects
│   │   │   ├── Contact.jsx           # Email, GitHub, LinkedIn, LeetCode links
│   │   │   ├── Footer.jsx            # Footer
│   │   │   └── Admin.jsx             # Admin panel for adding projects via API
│   │   ├── api.js                     # Axios instance (env-aware API URL)
│   │   ├── App.jsx                    # Root component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles, CSS variables, animations
│   ├── index.html                     # HTML entry
│   ├── package.json                   # Dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind configuration
│   ├── postcss.config.js              # PostCSS plugins
│   ├── .env.production                # Production API URL
│   └── Dockerfile                     # Frontend container (for Docker Compose)
│
├── portfolio/                         # Spring Boot Backend
│   ├── src/main/java/com/geet/portfolio/
│   │   ├── PortfolioApplication.java  # Spring Boot entry point
│   │   ├── config/
│   │   │   ├── CorsConfig.java        # CORS policy (localhost + Vercel + preview domains)
│   │   │   └── DataLoader.java        # Seeds 11 projects on first startup
│   │   ├── controller/
│   │   │   ├── ProjectApiController.java   # GET /api/projects, POST, DELETE
│   │   │   └── AdminController.java        # POST /api/admin/projects
│   │   ├── model/
│   │   │   └── Project.java           # JPA Entity (id, title, desc, highlights, techStack)
│   │   ├── repository/
│   │   │   └── ProjectRepository.java # JPA Repository (extends JpaRepository)
│   │   ├── service/
│   │   │   └── ProjectService.java    # Business logic layer
│   │   └── security/
│   │       ├── SecurityConfig.java    # Security filter chain, public/private endpoints
│   │       └── JwtFilter.java         # JWT token validation filter
│   ├── src/main/resources/
│   │   └── application.properties     # DB config (env vars for prod, fallback for local)
│   ├── pom.xml                        # Maven dependencies
│   └── Dockerfile                     # Multi-stage build (Maven → JRE Alpine)
│
├── docker-compose.yml                 # Local dev: PostgreSQL + Spring Boot
├── render.yaml                        # Render deployment blueprint
└── README.md                          # This file
```

---

## Backend API

### Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | Returns all projects with highlights and tech stack |
| `POST` | `/api/projects` | `X-ADMIN-TOKEN` header | Create a new project |
| `DELETE` | `/api/projects/{id}` | `X-ADMIN-TOKEN` header | Delete a project |
| `POST` | `/api/admin/projects` | `X-ADMIN-TOKEN` header | Admin endpoint to add project |
| `GET` | `/actuator/health` | Public | Health check |

### Sample Response — `GET /api/projects`

```json
[
  {
    "id": 1,
    "title": "Distributed Event Booking & Payment Microservices System",
    "description": "Architected a fault-tolerant distributed microservices system...",
    "highlights": [
      "Handled concurrent booking requests with zero overbooking",
      "Payment-gated confirmation with strict correctness guarantees",
      "End-to-end tested using Docker Compose & REST APIs"
    ],
    "techStack": [
      "Java 17", "Spring Boot", "Spring Cloud Gateway",
      "PostgreSQL", "Docker", "Microservices", "REST APIs"
    ]
  }
]
```

### Database Schema (Auto-generated by Hibernate)

```sql
CREATE TABLE project (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(255),
    description     VARCHAR(1000),
    demo_video_url  VARCHAR(255),
    github_url      VARCHAR(255),
    live_url        VARCHAR(255)
);

CREATE TABLE project_highlights (
    project_id  BIGINT REFERENCES project(id),
    highlights  VARCHAR(255)
);

CREATE TABLE project_tech_stack (
    project_id  BIGINT REFERENCES project(id),
    tech_stack  VARCHAR(255)
);
```

### Security Architecture

- **JWT Filter** (`JwtFilter.java`): Custom `OncePerRequestFilter` that validates `Bearer` tokens on protected endpoints
- **Public Endpoints**: `GET /api/projects`, `/actuator/health`, Swagger UI, static assets
- **Protected Endpoints**: All `POST`/`DELETE` operations require `X-ADMIN-TOKEN` or JWT `Authorization` header
- **CORS**: Configured to allow requests from `localhost:5173` (dev), the production Vercel URL, and Vercel preview deployment patterns
- **Stateless Sessions**: `SessionCreationPolicy.STATELESS` — no server-side session storage

### Data Seeding

`DataLoader.java` implements `CommandLineRunner` and seeds **11 projects** into PostgreSQL on first startup (when `repo.count() == 0`). Projects span:

- Distributed Systems & Resilience Engineering (4 projects)
- Cloud & Microservices (1 project)
- AI / ML / Deep Learning (3 projects)
- Data Mining & Financial ML (2 projects)
- Software Engineering & Testing (1 project)

---

## Frontend Details

### Design System

| Property | Value |
|---|---|
| Primary Font | DM Sans (Google Fonts) |
| Monospace Font | JetBrains Mono (Google Fonts) |
| Background | `#09090b` (near-black) |
| Accent Color | `#10b981` (emerald green) |
| Secondary Accent | `#818cf8` (indigo) |
| Card Style | Glass-morphism (`rgba(255,255,255,0.025)` + border) |
| Grain Overlay | SVG noise texture at 1.5% opacity |

### Key UI Features

- **Animated Terminal** (Hero): Types out developer info line-by-line with blinking cursor
- **LeetCode Stats Card** (About): Shows 132 solved problems with Easy/Medium/Hard breakdown
- **11 Certification Badges** (About): Spring Boot, Java, AWS, Azure (4x), Kubernetes, Linux, Blockchain
- **Beyond Academics Section** (About): Cricket, Rotaract Club, Competitive Programming
- **4 Internship Timeline** (Experience): Color-coded dots with connecting line
- **Project Filter Tabs** (Projects): All / Distributed Systems / AI-ML / Cloud & DevOps / Testing
- **"LIVE FROM API" Badge** (Projects): Shows `GET /api/projects → 11 results` when connected
- **Hover Effects**: Project cards lift with colored glow matching their accent

### Environment-Aware API

```javascript
// frontend/src/api.js
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
```

- **Local dev**: Falls back to `localhost:8080` (Docker backend)
- **Production**: Uses `VITE_API_URL` env var pointing to Render backend

---

## Local Development

### Prerequisites

- Docker Desktop
- Node.js 18+
- Java 17 (for IDE development, not needed for Docker)

### Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/Geet42/portfolio.git
cd portfolio

# 2. Start backend + database
docker-compose up --build

# 3. Wait for "Started PortfolioApplication" in logs
# Verify: http://localhost:8080/api/projects

# 4. Start frontend (new terminal)
cd frontend
npm install
npm run dev

# 5. Open http://localhost:5173
```

### Docker Compose Services

| Service | Image | Port | Purpose |
|---|---|---|---|
| `postgres` | `postgres:15-alpine` | 5432 | PostgreSQL database |
| `backend` | Custom (multi-stage Maven build) | 8080 | Spring Boot API |

---

## Production Deployment

### Backend — Render (Free)

1. Create PostgreSQL database on Render (free tier, 1GB)
2. Create Web Service → Docker runtime → connect GitHub repo
3. Set root directory to `portfolio`
4. Add env vars: `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `FRONTEND_URL`

### Frontend — Vercel (Free)

1. Import GitHub repo on Vercel
2. Set root directory to `frontend`, framework to Vite
3. Add env var: `VITE_API_URL` = Render backend URL + `/api`
4. Auto-deploys on every `git push`

---

## Projects Showcase (11 Total)

| # | Project | Category | Key Tech |
|---|---|---|---|
| 1 | Distributed Event Booking & Payment System | Distributed Systems | Java 17, Spring Boot, Spring Cloud Gateway, PostgreSQL |
| 2 | Banking Microservices with Resilience & Chaos Testing | Distributed Systems | Resilience4j, Chaos Toolkit, Circuit Breaker |
| 3 | Socket vs REST vs gRPC Comparison | Distributed Systems | Java, Python, gRPC, Flask, Benchmarking |
| 4 | Distributed Database Replication & Consistency | Distributed Systems | MongoDB, CAP Theorem, Replication |
| 5 | Cloud-Native Student Management System | Cloud | Flask, FastAPI, PostgreSQL, Docker Compose |
| 6 | Citrus Disease Detection (Published – JISEM 2025) | AI/ML | TensorFlow, CNN, OpenCV, 95-99% accuracy |
| 7 | AI vs Human Text Classification | AI/ML | Scikit-learn, TF-IDF, NLP |
| 8 | Embedding-Based NLP (BERT, Word2Vec, Doc2Vec) | AI/ML | BERT, Word2Vec, Ensemble Methods |
| 9 | Bitcoin Price Trend Prediction | Data Mining | XGBoost, Random Forest, 700K+ datapoints |
| 10 | Advanced BTC Prediction with Deep Learning | Data Mining | TensorFlow, CNN/LSTM, Custom Architecture |
| 11 | AI-Generated Game Code Evaluation | Testing | JUnit, 30+ Test Cases, OOP Review |

---

## Author

**Geet Prashant Bhute**
- MSc Computer Science — University College Dublin
- B.Tech Computer Science — RCOEM, Nagpur (1:1)

📧 geetbhute18@gmail.com
🐙 [github.com/Geet42](https://github.com/Geet42)
🔗 [linkedin.com/in/geetbhute](https://linkedin.com/in/geetbhute)
🏆 [leetcode.com/u/bhutegp](https://leetcode.com/u/bhutegp/) — 132 problems solved

---

## License

This project is open source for portfolio and educational purposes.
