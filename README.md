# Job Finder App

## Overview

A comprehensive job application platform connecting job seekers and employers, built with modern web
technologies.

## 🌟 Key Features

### For Job Seekers

-  Browse and filter job listing
-  Custom CV creation and download
-  Direct job applications
-  Real-time application tracking

### For Employers

-  Job listing management
-  Application tracking
-  Applicant notifications
-  Employer profile management

## 💻 Tech Stack

### Frontend

-  React
-  Vite
-  Tailwind CSS
-  React Router
-  ShadcnUi

### Backend

-  Express.js
-  MongoDB
-  JWT Authentication
-  Socket.io
-  passport

## 🚀 Quick Start

### Prerequisites

-  Node.js (v14+)
-  MongoDB

### Installation

1. Clone repository

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies

   ```bash
   # Frontend
   cd client && npm install

   # Backend
   cd server && npm install
   ```

3. Configure environment
   -  Create `.env` in `/server`
   -  Add:
      ```
      PORT=5000
      MONGO_URI=<your-mongodb-connection-string>
      JWT_SECRET=<your-secret>
      ```

### Running Application

```bash
# Start backend
cd server
npm start

# Start frontend
cd client
npm run dev
```

## 🌐 Deployment

-  Frontend: Vercel, Netlify
-  Backend: Heroku, Render
-  Database: MongoDB Atlas


## 🌟 API Endpoints

### Authentication Routes
| Method | Endpoint                    | Description               |
|:-------|:----------------------------|:--------------------------|
| POST   | `/auth/signup`              | User registration         |
| POST   | `/auth/google`              | Google sign-in            |
| POST   | `/auth/login`               | User login                |
| GET    | `/auth/verify/:token`       | Verify user token         |

### Employer Routes
| Method | Endpoint                                  | Description                       |
|:-------|:------------------------------------------|:----------------------------------|
| POST   | `/employer/signup`                        | Employer registration             |
| POST   | `/employer/login`                         | Employer login                    |
| POST   | `/employer/jobs/add`                      | Add new job listing               |
| GET    | `/employer/jobs/getalljobs`               | Get all job listings              |
| GET    | `/employer/getalljobsbyemployer/:userId`  | Get jobs by specific employer     |
| DELETE | `/employer/deletejobbyid/:id`             | Delete a job listing               |
| POST   | `/employer/resend-verification-token`     | Resend verification token         |
| POST   | `/employer/forgot-password`               | Send password reset email         |
| POST   | `/employer/reset-password/:token`         | Reset password                    |
| GET    | `/employer/getemployer/:id`               | Get employer details              |

### Job Routes
| Method | Endpoint                             | Description                  |
|:-------|:-------------------------------------|:-----------------------------|
| GET    | `/jobs/`                             | Get all jobs                 |
| GET    | `/jobs/jobs/user/:userId`            | Get jobs by user             |
| GET    | `/jobs/jobs/:jobId`                  | Get single job details       |
| GET    | `/jobs/getrecentjobs`                | Get recent job listings      |
| GET    | `/jobs/getjobbysearch/:searchText`   | Search jobs                  |
| POST   | `/jobs/uploadfile/:userId`           | Upload file                  |

### Resume Routes
| Method | Endpoint                      | Description           |
|:-------|:------------------------------|:----------------------|
| PUT    | `/resume/update-resume/:id`   | Update resume         |
| GET    | `/resume/:userId`             | Get user resume       |

### Application Routes
| Method | Endpoint                                             | Description                        |
|:-------|:-----------------------------------------------------|:-----------------------------------|
| POST   | `/applications/`                                     | Add new application                |
| GET    | `/applications/user/:userId`                         | Get user applications              |
| GET    | `/applications/job/:jobId`                           | Get job applications               |
| GET    | `/applications/:applicationId`                       | Get single application             |
| PUT    | `/applications/:applicationId`                       | Update application status          |
| DELETE | `/applications/:applicationId`                       | Delete application                 |
| GET    | `/applications/get-all-jobs-by-employer/:employerId` | Get employer's jobs                |
## 🔒 Authentication

-  JWT-based authentication
-  Role-based access control
-  Protected routes for users and employers

## 📝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request



### Figma Design
[View Full Design on Figma](https://www.figma.com/design/KbcMKZjdjCGQPdjNhz1XHl/Untitled?m=auto&t=gnjKbTVFGeDr7F66-6)

- Comprehensive UI/UX design for the entire application
- Includes wireframes, component designs, and interaction flows
- Provides a blueprint for frontend development

[Remaining README content stays the same as in the previous submission]
