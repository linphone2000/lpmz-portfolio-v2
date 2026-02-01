# Technortal Backend — Project Overview

This document provides a comprehensive explanation of the Technortal backend: its purpose, architecture, features, and how to work with the codebase.

---

## Table of Contents

1. [Project Purpose](#1-project-purpose)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Project Structure](#4-project-structure)
5. [Core Features & Modules](#5-core-features--modules)
6. [User Roles & Access Control](#6-user-roles--access-control)
7. [API Design & Standards](#7-api-design--standards)
8. [Database & Models](#8-database--models)
9. [Authentication & Security](#9-authentication--security)
10. [Configuration & Environment](#10-configuration--environment)
11. [Development Workflow](#11-development-workflow)
12. [Documentation & Monitoring](#12-documentation--monitoring)
13. [Business Logic Domains](#13-business-logic-domains)
14. [Roadmap & Sprints](#14-roadmap--sprints)

---

## 1. Project Purpose

**Technortal** is a learning platform backend that powers:

- **Course learning** — Instructors create courses (sections/lessons); learners enroll, watch content, and track progress.
- **Live classes** — Admin-created classes with enrollment and payment verification (KPay/AyaPay).
- **Community** — Forum (posts, comments, categories, stars) and gamification (XP, levels, leaderboard).
- **Mentorship** — Mentor profiles, availability, bookings, and post-session reviews.
- **Bootcamps** — Cohort-based programs with schedules, applications, and announcements.
- **Assessment** — Exams, timed sessions, and certificates with verification.

The backend is a **REST API** consumed by a frontend (e.g. React/Next.js). It uses **PostgreSQL** via Sequelize, **JWT** for auth, **Joi** for validation, and a layered **MVC-style** architecture with services, structured logging, and consistent error handling.

---

## 2. Technology Stack

| Layer              | Technology                                       |
| ------------------ | ------------------------------------------------ |
| **Runtime**        | Node.js (v18+)                                   |
| **Framework**      | Express.js 5.x                                   |
| **Database**       | PostgreSQL (v12+), Sequelize ORM                 |
| **Authentication** | JWT (jsonwebtoken), bcrypt                       |
| **Validation**     | Joi                                              |
| **Logging**        | Winston                                          |
| **File Storage**   | AWS S3 (@aws-sdk/client-s3, sharp for images)    |
| **Email**          | Nodemailer (Ethereal in dev, SMTP in production) |
| **Security**       | Helmet, CORS, express-rate-limit                 |
| **Testing**        | Jest, Supertest                                  |
| **Code Quality**   | ESLint, Prettier                                 |

The project uses **ES modules** (`"type": "module"` in `package.json`).

---

## 3. Architecture

### 3.1 Layered MVC Pattern

- **Routes** (`src/routes/`) — Define HTTP endpoints and attach middleware (auth, validation).
- **Controllers** (`src/controllers/`) — Handle request/response; delegate business logic to services.
- **Services** (`src/services/`) — Business logic, database access, external APIs; throw domain errors.
- **Models** (`src/models/`) — Sequelize schema and associations.
- **Validators** (`src/validators/`) — Joi schemas for request validation.
- **Middleware** (`src/middleware/`) — Auth, authorization, uploads, and feature-specific checks.
- **Utils** (`src/utils/`) — Logger, `ApiResponse`, error classes, pagination, etc.

### 3.2 Request Flow

1. Request hits **route** → optional **validation** (Joi) → optional **auth** → optional **authorization**.
2. **Controller** receives `req`, reads `req.validatedData` / `req.user`, calls **service**.
3. **Service** performs logic, uses **models**, throws `NotFoundError`, `ValidationError`, `ConflictError`, etc.
4. **Controller** uses `ApiResponse.success`, `ApiResponse.created`, `ApiResponse.paginated`, or lets **global error handler** map errors to HTTP status and standard error body.

### 3.3 Entry Point

- **`src/server.js`** — Creates Express app, loads config, mounts middleware (CORS, Helmet, rate limit, body parsers, static files), mounts all API routes under `/api/v1`, registers 404 and global `errorHandler`, calls `initDB()` then `app.listen()`.

---

## 4. Project Structure

```
technortal-backend/
├── src/
│   ├── server.js              # App entry, route mounting, DB init
│   ├── config/
│   │   ├── index.js            # Central config (server, db, jwt, email, storage, etc.)
│   │   └── db.js               # Sequelize instance, initDB()
│   ├── controllers/           # HTTP handlers (one per domain)
│   ├── services/              # Business logic (one per domain)
│   ├── models/                # Sequelize models + index.js (associations)
│   ├── routes/                # Express routers
│   │   └── admin/             # Admin-only routes (payments, enrollments, etc.)
│   ├── middleware/            # Auth, uploads, course/mentor/exam checks, etc.
│   ├── validators/            # Joi schemas per feature
│   ├── utils/                 # logger, response, errorHandler, pagination, etc.
│   ├── migrations/            # Sequelize migrations
│   ├── templates/             # Email HTML templates
│   └── tests/
│       ├── unit/              # Service/controller unit tests
│       ├── integration/      # API integration tests
│       ├── fixtures/          # Test data
│       ├── helpers/           # Test utilities
│       └── mocks/              # Mocks (e.g. S3)
├── public/                    # Static docs (HTML) at /api/v1/docs
├── scripts/                   # db:migrate, db:seed, db:clean, seed-admin
├── docs/                      # Project and business logic docs
│   ├── PROJECT-OVERVIEW.md    # This file
│   ├── blogic/                # Business logic (auth, courses, payments, etc.)
│   ├── project/               # Roadmap, sprints
│   ├── technical-specs/       # API, storage, payment specs
│   └── testing/               # Testing guides
├── .env.example               # Environment variable template
└── package.json
```

---

## 5. Core Features & Modules

| Domain                    | Routes Prefix                   | Main Entities                       | Description                                                                  |
| ------------------------- | ------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| **Auth**                  | `/api/v1/auth`                  | User                                | Register, login, password reset, JWT                                         |
| **Profile**               | `/api/v1/profile`               | User                                | Get/update profile, stats                                                    |
| **Users**                 | `/api/v1/users`                 | User                                | Admin user list, ban, roles, points                                          |
| **Courses**               | `/api/v1/courses`               | Course, Section, Lesson, Curriculum | CRUD, list, detail, filters                                                  |
| **Enrollments**           | `/api/v1/enrollments`           | Enrollment                          | Course enrollment, progress                                                  |
| **Lesson progress**       | `/api/v1/progress`              | LessonProgress                      | Watch time, completion                                                       |
| **Categories**            | `/api/v1/categories`            | PostCategory (forum)                | Course/forum categories                                                      |
| **Instructors**           | `/api/v1/instructors`           | User (instructor)                   | Instructor profiles, courses                                                 |
| **Reviews**               | `/api/v1/reviews`               | CourseReview                        | Course reviews and ratings                                                   |
| **Posts**                 | `/api/v1/posts`                 | Post, Comment                       | Forum posts, comments                                                        |
| **Comments**              | `/api/v1/comments`              | Comment                             | Comment CRUD                                                                 |
| **Leaderboard**           | `/api/v1/leaderboard`           | UserXP, XPHistory                   | Public XP rankings (all-time, weekly, monthly)                               |
| **XP**                    | `/api/v1/xp`                    | UserXP, XPHistory                   | User XP balance and history                                                  |
| **Mentors**               | `/api/v1/mentors`               | MentorProfile, Availability         | Mentor list, profile, availability                                           |
| **Bookings**              | `/api/v1/bookings`              | Booking                             | Create/list/cancel sessions                                                  |
| **Mentor reviews**        | `/api/v1/mentor-reviews`        | MentorReview                        | Post-session mentor reviews                                                  |
| **Classes**               | `/api/v1/classes`               | Class                               | Live classes (admin-created)                                                 |
| **Class enrollments**     | (via classes)                   | ClassEnrollment                     | Enroll with payment proof (KPay/AyaPay)                                      |
| **Payment configs**       | `/api/v1/payment-configs`       | PaymentConfig                       | Active payment methods (public)                                              |
| **Payment orders**        | `/api/v1/payment-orders`        | PaymentOrder                        | Payment orders (e.g. points top-up)                                          |
| **Admin**                 | `/api/v1/admin/*`               | —                                   | Payment orders, class enrollments, bootcamp enrollments, email notifications |
| **Testimonials**          | `/api/v1/testimonials`          | Testimonial                         | Landing page testimonials                                                    |
| **Landing page**          | `/api/v1/landing-page`          | LandingPageContent                  | Public landing content                                                       |
| **Bootcamps**             | `/api/v1/bootcamps`             | Bootcamp, Cohort                    | Bootcamp list, detail                                                        |
| **Bootcamp applications** | `/api/v1/bootcamp-applications` | EnrollmentApplication               | Apply to bootcamps                                                           |
| **Cohorts**               | `/api/v1/cohorts`               | Cohort                              | Cohort list, detail                                                          |
| **Schedule**              | `/api/v1/schedule`              | ScheduleItem, CompletedScheduleItem | Bootcamp schedule                                                            |
| **Announcements**         | `/api/v1/announcements`         | Announcement                        | Bootcamp/platform announcements                                              |
| **Exams**                 | `/api/v1/exams`                 | Exam, Question, QuestionOption      | Exam CRUD, list                                                              |
| **Exam sessions**         | `/api/v1/exam-sessions`         | ExamRegistration, ExamAnswer        | Register, start, submit answers                                              |
| **Certificates**          | `/api/v1/certificates`          | Certificate                         | Issue and verify certificates                                                |
| **Uploads**               | `/api/v1/uploads`               | —                                   | S3 uploads (avatars, images, etc.)                                           |
| **Docs**                  | `/api/v1/docs`                  | —                                   | Static API documentation (HTML)                                              |

---

## 6. User Roles & Access Control

Users have a single **role** stored on `User.role`:

| Role           | Description       | Typical Access                                                                  |
| -------------- | ----------------- | ------------------------------------------------------------------------------- |
| **learner**    | Student           | Enroll in courses, book mentors, post in forum, take exams                      |
| **instructor** | Course creator    | Create/manage courses, moderate forum (pin/lock), view analytics                |
| **mentor**     | Mentorship        | Set availability, accept bookings, receive reviews                              |
| **admin**      | Platform admin    | User management, approvals, payment/class enrollment queues, content moderation |
| **corporate**  | Corporate partner | Corporate-specific features (per roadmap)                                       |

- **Registration:** Learners, instructors, and mentors can self-register. Instructors and mentors start with `isApproved = false` until an admin approves.
- **Authorization:** Middleware checks `req.user.role` and `req.user.isApproved` (and resource ownership where needed). Admins can override many actions.
- **Banned users:** `User.isBanned` is checked at login; banned users cannot log in.

---

## 7. API Design & Standards

### 7.1 Base URL and Versioning

- Base: `http://localhost:5001` (or `PORT` from config).
- API prefix: `/api/v1`.

### 7.2 Success Responses

- **200 OK:** `ApiResponse.success(res, data, message)`
- **201 Created:** `ApiResponse.created(res, data, message)`
- **204 No Content:** `ApiResponse.noContent(res)`
- **Paginated:** `ApiResponse.paginated(res, data, meta)` — `data` = array, `meta` = `{ total, page, limit, totalPages, ... }`

Body shape:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "timestamp": "2025-01-27T12:00:00.000Z"
}
```

### 7.3 Error Responses

Controllers and services use custom errors; the global error handler maps them to HTTP status and a uniform body:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  },
  "timestamp": "2025-01-27T12:00:00.000Z"
}
```

Standard error codes (see `.cursor/rules/api-standards.mdc`): e.g. `AUTH_001`, `USER_001`, `VALIDATION_001`, `NOT_FOUND`, `CONFLICT_*`, `SERVER_001`.

### 7.4 Validation

- Request bodies (and sometimes query/params) are validated with **Joi** via `validateRequest(schema)`.
- Validated data is attached as `req.validatedData` for controllers to use.

---

## 8. Database & Models

### 8.1 Database

- **PostgreSQL** (local or hosted, e.g. Neon).
- Connection via `DATABASE_URL` in `.env`.
- Schema is managed by **migrations** in `src/migrations/` (run with `npm run db:migrate`). No `sync({ force: true })` in production.

### 8.2 Main Models (Summary)

| Model                                                                   | Purpose                                                                                     |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **User**                                                                | Accounts: email, passwordHash, fullName, role, profile fields, isApproved, isBanned, points |
| **Course, CourseSection, CourseLesson, CourseCurriculum**               | Course structure and curriculum                                                             |
| **Enrollment, LessonProgress**                                          | Course enrollment and per-lesson progress                                                   |
| **CourseReview**                                                        | Course reviews and ratings                                                                  |
| **Post, Comment, PostCategory, PostStar, PostView**                     | Forum                                                                                       |
| **UserXP, XPHistory**                                                   | Gamification and leaderboard                                                                |
| **MentorProfile, Availability, Booking, MentorReview**                  | Mentorship                                                                                  |
| **Class, ClassEnrollment**                                              | Live classes and enrollment with payment proof                                              |
| **PaymentConfig, PaymentOrder**                                         | Payment methods (KPay/AyaPay) and orders                                                    |
| **Bootcamp, Cohort, ScheduleItem, CompletedScheduleItem, Announcement** | Bootcamps and schedules                                                                     |
| **EnrollmentApplication**                                               | Bootcamp applications                                                                       |
| **Exam, Question, QuestionOption, ExamRegistration, ExamAnswer**        | Exams and answers                                                                           |
| **Certificate**                                                         | Issued certificates                                                                         |
| **LandingPageContent, Testimonial**                                     | Landing and testimonials                                                                    |
| **EmailNotificationSettings**                                           | User email preferences                                                                      |

Associations are centralized in `src/models/index.js`.

### 8.3 Seeding

- `npm run db:seed` — Populates sample users, courses, enrollments, etc. (idempotent where possible).
- `npm run db:seed:admin` — Seeds admin user(s).

---

## 9. Authentication & Security

### 9.1 Authentication

- **Login:** Email + password → validated, then bcrypt compare; on success a **JWT** is signed with `config.jwt.secret` and `config.jwt.accessTokenTTL`.
- **Protected routes:** `authenticate` middleware reads `Authorization: Bearer <token>`, verifies JWT, attaches `req.user` (id, email, role, etc.).
- **Password:** Hashed with bcrypt (rounds from `config.security.bcryptRounds`) in `User.beforeCreate` / `User.beforeUpdate`.

### 9.2 Security Measures

- **Helmet** — HTTP headers hardening.
- **CORS** — Allowed origins from `CORS_ORIGIN` (e.g. frontend URL).
- **Rate limiting** — Applied to `/api/` (e.g. 1000 requests per 15 minutes), disabled in test.
- **Validation** — All relevant inputs validated with Joi.
- **Sensitive fields** — Password hash, reset/verification tokens excluded from default User scope and never logged.

---

## 10. Configuration & Environment

Configuration is centralized in **`src/config/index.js`**, driven by environment variables (see **`.env.example`**).

| Area     | Key Variables                                                     | Notes                                         |
| -------- | ----------------------------------------------------------------- | --------------------------------------------- |
| Server   | `PORT`, `NODE_ENV`, `CORS_ORIGIN`                                 | Default port 5001                             |
| Database | `DATABASE_URL`                                                    | Required                                      |
| JWT      | `JWT_SECRET`, `JWT_EXPIRE`, `REFRESH_TTL`                         | `JWT_SECRET` required                         |
| Storage  | `STORAGE_DRIVER`, `S3_*`, `AWS_*`                                 | S3 bucket/region required when driver is `s3` |
| Email    | `SMTP_*`, `EMAIL_FROM`, `FRONTEND_URL`, `EMAIL_USE_ETHEREAL`      | Ethereal used in dev when enabled             |
| Image    | `ENABLE_IMAGE_PROCESSING`, `IMAGE_MAX_DIMENSION`, `IMAGE_QUALITY` | Optional                                      |

Validation on startup ensures required keys (e.g. `database.url`, `jwt.secret`) are present; S3 is validated when `storage.driver === 's3'`.

---

## 11. Development Workflow

### 11.1 Setup

```bash
git clone <repo>
cd technortal-backend
npm install
cp .env.example .env   # and .env.test.example .env.test if needed)
# Edit .env with DATABASE_URL, JWT_SECRET, etc.
npm run db:migrate
npm run db:seed       # optional
npm run dev           # nodemon, default http://localhost:5001
```

### 11.2 Database

- **Migrations:** `npm run db:migrate` — Run all migrations (required before seed).
- **Seed:** `npm run db:seed`, `npm run db:seed:admin`.
- **Clean:** `npm run db:clean` — Drops tables/cleanup as defined in script.

### 11.3 Testing

- **Full suite:** `npm test`
- **Unit only:** `npm run test:unit`
- **Integration only:** `npm run test:integration`
- **Watch:** `npm run test:watch`
- **Coverage:** `npm run test:coverage`

Tests use `NODE_ENV=test`, a test DB (via env), and often mocks (e.g. S3).

### 11.4 Linting and Formatting

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Format check:** `npm run format:check`

### 11.5 Code Conventions

- **.cursor/rules/** — Code style, API standards, architecture, error handling, logging, DB/Sequelize. Controllers use `asyncHandler`, `ApiResponse`, and services; errors use custom classes from `src/utils/errorHandler.js`; logging uses `src/utils/logger.js` (no `console.log`).

---

## 12. Documentation & Monitoring

- **API docs:** Served at `http://localhost:5001/api/v1/docs/` (static HTML in `public/`). Update these when endpoints change.
- **Health check:** `GET /health` — Returns server and database status (e.g. `{ status: 'OK', database: 'Connected' }`).
- **Postman:** `docs/technical-specs/Technortal API.postman_collection.json` can be imported for full API testing.

---

## 13. Business Logic Domains

Detailed business rules are in **`docs/blogic/`**:

| Document                                   | Domain           | Highlights                                        |
| ------------------------------------------ | ---------------- | ------------------------------------------------- |
| **auth.md**                                | Auth & profile   | Registration roles, JWT, password reset, approval |
| **courses.md**                             | Courses          | Sections/lessons, publish vs approve, curriculum  |
| **enrollments.md**                         | Enrollments      | Who can enroll, paid vs free, progress completion |
| **forum.md**                               | Forum            | Posts, comments, stars, best answer, XP           |
| **reviews-ratings.md**                     | Reviews          | One review per user per course, approval          |
| **gamification.md**                        | XP/levels        | XP rules, level formula, daily login, locking     |
| **leaderboard.md**                         | Leaderboard      | All-time / weekly / monthly rankings              |
| **user-management.md**                     | Users            | Admin-only, ban, roles, points top-up             |
| **instructor-mentor-approval.md**          | Approval         | isApproved workflow for instructors/mentors       |
| **storage-uploads.md**                     | Storage          | S3, image processing, signed URLs                 |
| **email-notifications.md**                 | Email            | Templates, Ethereal vs SMTP                       |
| **payment-system-explanation.md**          | Payments         | PaymentConfig, verification, KPay/AyaPay          |
| **class-enrollment-system-explanation.md** | Class enrollment | Flow, payment proof, admin verification           |

**`docs/blogic/README.md`** is the business logic index and cross-domain summary.

---

## 14. Roadmap & Sprints

**`docs/project/project-roadmap.md`** defines the MVP and phases:

- **Phase 1 (Sprint 1):** Foundation — Auth, 5 user types, profile, RBAC.
- **Phase 2 (Sprint 2):** Courses — CRUD, enrollment, progress, video (e.g. YouTube/Vimeo).
- **Phase 3 (Sprint 3):** Forum and gamification — Posts, comments, XP, leaderboard.
- **Phase 4 (Sprint 4):** Mentorship — Mentor profiles, availability, bookings, reviews.
- **Phase 5 (Sprint 5):** Bootcamps — Programs, cohorts, schedule, applications, announcements.
- **Phase 6 (Sprint 6):** Assessment & admin — Exams, certificates, admin dashboard, user/content management.

Further docs under **`docs/project/`** and **`docs/plans/`** describe sprint and implementation details (e.g. bootcamp, class enrollment, mentor, TDA assessment).

---

## Quick Reference

| Need           | Command / Location                                            |
| -------------- | ------------------------------------------------------------- |
| Start API      | `npm run dev` (default port 5001)                             |
| Run migrations | `npm run db:migrate`                                          |
| Seed data      | `npm run db:seed`                                             |
| Tests          | `npm test` / `npm run test:unit` / `npm run test:integration` |
| API docs       | `GET http://localhost:5001/api/v1/docs/`                      |
| Health         | `GET http://localhost:5001/health`                            |
| Config         | `src/config/index.js`, `.env`                                 |
| Business rules | `docs/blogic/`                                                |
| Roadmap        | `docs/project/project-roadmap.md`                             |
| Code standards | `.cursor/rules/`                                              |

---

**Document version:** 1.0  
**Last updated:** February 2025  
**Repository:** technortal-backend
