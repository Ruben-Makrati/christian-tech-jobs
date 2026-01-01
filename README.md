# Christian Tech Jobs - Full Stack Job Board

A modern, production-ready job board web application built with Next.js, TypeScript, and Firebase. This project demonstrates CRUD operations, authentication, REST APIs, database design, and a clean, responsive UI.

## 🚀 Features

### Public Features
- **Job Listing Page**: Browse all available job postings with pagination
- **Job Detail Page**: View complete job information with application form
- **Search & Filters**: 
  - Search by job title or company name
  - Filter by tech stack, job type, location, and status
  - Real-time filtering with query parameters
- **Job Application System**: Simple application form with name, email, and resume link

### Admin Features
- **Admin Authentication**: Secure login with Firebase Auth
- **Admin Dashboard**: Manage all job postings in one place
- **CRUD Operations**:
  - Create new job postings
  - Edit existing jobs
  - Delete jobs
  - Toggle job status (open/closed)
- **Application Management**: View all applications for each job

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Language**: TypeScript

## 📁 Project Structure

```
├── app/
│   ├── api/              # REST API routes
│   │   ├── jobs/         # Job CRUD endpoints
│   │   └── applications/ # Application endpoints
│   ├── admin/            # Admin pages
│   │   ├── login/        # Admin login
│   │   └── jobs/         # Job management
│   ├── jobs/             # Public job pages
│   │   └── [id]/         # Job detail page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home/job listing page
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── Navbar.tsx
│   ├── JobCard.tsx
│   ├── SearchAndFilters.tsx
│   ├── ApplicationForm.tsx
│   └── LoadingSpinner.tsx
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase client config
│   ├── firebase-admin.ts # Firebase admin config
│   ├── auth.ts           # Authentication helpers
│   ├── db.ts             # Database operations
│   └── middleware.ts     # API middleware
└── types/                # TypeScript types
    └── index.ts
```

## 🗄️ Database Models

### Job
```typescript
{
  id: string
  title: string
  company: string
  description: string
  techStack: string[]
  jobType: "Intern" | "Full-time" | "Contract"
  location: "Remote" | "On-site" | "Hybrid"
  status: "open" | "closed"
  createdAt: timestamp
}
```

### Application
```typescript
{
  id: string
  jobId: string
  name: string
  email: string
  resumeLink: string
  appliedAt: timestamp
}
```

## 🔌 API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs with optional filters
  - Query params: `status`, `jobType`, `location`, `techStack`, `limit`
  - Returns: `{ jobs: Job[], hasMore: boolean }`

- `GET /api/jobs/[id]` - Get a single job by ID
  - Returns: `Job`

- `POST /api/jobs` - Create a new job (admin only)
  - Body: `JobFormData`
  - Returns: `{ id: string, message: string }`

- `PUT /api/jobs/[id]` - Update a job (admin only)
  - Body: `Partial<JobFormData>`
  - Returns: `{ message: string }`

- `DELETE /api/jobs/[id]` - Delete a job (admin only)
  - Returns: `{ message: string }`

### Applications

- `POST /api/applications` - Submit a job application
  - Body: `{ jobId, name, email, resumeLink }`
  - Returns: `{ id: string, message: string }`

- `GET /api/applications?jobId=xxx` - Get applications for a job (admin only)
  - Returns: `{ applications: Application[] }`

## 🔐 Authentication & Authorization

- Admin authentication is handled via Firebase Auth
- Admin emails are configured via `NEXT_PUBLIC_ADMIN_EMAILS` environment variable
- All admin-only API routes are protected with middleware
- Public routes (job listing, job details) are accessible without authentication

## 🚦 Getting Started

> **📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)**

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with Firestore and Authentication enabled

### Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Get your Firebase configuration from Project Settings

3. **Configure environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
     ```
   - **Important**: Restart your dev server after creating/updating `.env.local`

4. **Create an admin user**
   - In Firebase Console → Authentication → Add user
   - Enter email and password
   - Make sure this email is in `NEXT_PUBLIC_ADMIN_EMAILS`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Go to `/admin/login` to sign in

### Troubleshooting

**Error: "Firebase: Error (auth/invalid-api-key)"**
- Make sure `.env.local` exists in the root directory
- Verify all `NEXT_PUBLIC_*` variables are set correctly
- **Restart your dev server** after changing `.env.local`
- See [SETUP.md](./SETUP.md) for detailed troubleshooting

## 📱 Usage

### For Job Seekers

1. Browse jobs on the home page
2. Use search and filters to find relevant positions
3. Click on a job to view details
4. Click "Apply for this Job" to submit an application
5. Fill in your name, email, and resume link

### For Admins

1. Sign in at `/admin/login`
2. Access the dashboard at `/admin`
3. Create new jobs with the "Create New Job" button
4. Edit or delete existing jobs
5. Toggle job status (open/closed)
6. View applications for each job

## 🎨 Features Highlights

- **Responsive Design**: Mobile-friendly UI that works on all devices
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Comprehensive error messages and validation
- **SEO Optimized**: Dynamic meta tags for job pages
- **Type Safety**: Full TypeScript implementation
- **Clean Code**: Well-organized, maintainable codebase

## 🧪 Code Quality

- TypeScript for type safety
- Clean component structure
- Meaningful variable and function names
- Proper error handling
- RESTful API design
- Responsive UI/UX

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js and Firebase

